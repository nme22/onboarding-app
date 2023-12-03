'use client';

import * as React from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verifying, setVerifying] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [code, setCode] = React.useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isLoaded && !signUp) return null;

    try {
      // Start the Sign Up process using the email address method
      await signUp.create({
        emailAddress: email,
        password,
      });

      // Start the verification - a message will be sent to the
      // email with a one-time code
      await signUp.prepareEmailAddressVerification();

      // Set 'verifying' true to display second form and capture the OTP code
      setVerifying(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling for more on error handling
      console.error('Error:', JSON.stringify(err, null, 2));
      window.alert('YO THIS EMAIL TAKEN. PICK A DIFFERENT EMAIL!');
    }
  }

  async function handleVerification(e: React.FormEvent) {
    e.preventDefault();

    if (!isLoaded && !signUp) return null;

    try {
      // Use the code provided by the user and attempt verification
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      // This mainly for debuggin while developing.
      // Once your Instance is setup this should not be required.
      if (completeSignUp.status !== 'complete') {
        console.error(JSON.stringify(completeSignUp, null, 2));
        //This is where the custom flow is failing
        console.log("Something didn't go as planned");
      }

      // If verification was completed, create a session for the user
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });

        // redirect user
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
        <button type='submit'>Complete your sign up</button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label id='email'>Email:</label>
        <input
          value={email}
          id='email'
          name='email'
          type='email'
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className='block text-sm mt-8' htmlFor='password'>
          Password
        </label>
        <input
          id='password'
          type='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button type='submit'>Send Code</button>
      </div>
    </form>
  );
}
