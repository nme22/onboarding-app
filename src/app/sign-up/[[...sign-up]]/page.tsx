import { SignUp } from '@clerk/nextjs';

export default function Page() {
  const localization = {
    signUp: {
      start: {
        title: 'Sign Up',
        subtitle: 'to continue to this same app named as something else!',
        actionText: 'New User?',
        actionLink: `Already have an account?`,
      },
    },
  };
  return (
    <SignUp
      appearance={{
        variables: {
          colorPrimary: '#00308F',
          colorBackground: '#0F52BA',
          colorText: 'white',
          spacingUnit: '1rem',
          fontSmoothing: 'auto',
        },
      }}
    />
  );
}
