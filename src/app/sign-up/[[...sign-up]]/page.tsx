import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <SignUp
      appearance={{
        variables: {
          colorPrimary: 'red',
          colorBackground: 'blue',
          colorText: 'white',
          colorAlphaShade: 'blue',
        },
      }}
    />
  );
}
