'use client';

import * as React from 'react';
import { useSignIn } from '@clerk/nextjs';
import { EmailCodeFactor, SignInFirstFactor } from '@clerk/types';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [verifying, setVerifying] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [code, setCode] = React.useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isLoaded && !signIn) return null;

    try {
      // Start the Sign Up process using the phone number method
      const { supportedFirstFactors } = await signIn.create({
        identifier: email,
      });

      // Filter the returned array to find the 'phone_code' entry
      const isEmailCodeFactor = (
        factor: SignInFirstFactor
      ): factor is EmailCodeFactor => {
        return factor.strategy === 'email_code';
      };
      const emailCodeFactor = supportedFirstFactors?.find(isEmailCodeFactor);

      if (emailCodeFactor) {
        // Grab the emailAddressId
        const { emailAddressId } = emailCodeFactor;

        // Send the OTP code to the user
        await signIn.prepareFirstFactor({
          strategy: 'email_code',
          emailAddressId,
        });

        // Set 'verifying' true to display second form and capture the OTP code
        setVerifying(true);
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling for more on error handling
      console.error('Error:', JSON.stringify(err, null, 2));
    }
  }

  async function handleVerification(e: React.FormEvent) {
    e.preventDefault();

    if (!isLoaded && !signIn) return null;

    try {
      // Use the code provided by the user and attempt verification
      const completeSignIn = await signIn.attemptFirstFactor({
        strategy: 'email_code',
        code,
      });

      // This mainly for debuggin while developing.
      // Once your Instance is setup this should not be required.
      if (completeSignIn.status !== 'complete') {
        console.error(JSON.stringify(completeSignIn, null, 2));
      }

      // If verification was completed, create a session for the user
      if (completeSignIn.status === 'complete') {
        await setActive({ session: completeSignIn.createdSessionId });

        // Redirect user
        router.push('/dashboard');
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling for more on error handling
      console.error('Error:', JSON.stringify(err, null, 2));
    }
  }

  if (verifying) {
    return (
      <form onSubmit={handleVerification}>
        <label id='code'>Code</label>
        <input
          value={code}
          id='code'
          name='code'
          onChange={(e) => setCode(e.target.value)}
        />
        <button type='submit'>Verify</button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <label id='email'>email</label>
      <input
        value={email}
        id='email'
        name='email'
        type='tel'
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type='submit'>Send Code</button>
    </form>
  );
}
