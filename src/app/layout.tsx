import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { ptBR } from '@clerk/localizations';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Echelon Soccer',
  description: 'App designed to find out who is playing where on game day.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localization = {
    formButtonPrimary: 'Sign Up!',
    socialButtonsBlockButton: '{{provider|titleize}}',
    dividerText: 'Or',
    signUp: {
      start: {
        title: 'Sign Up.',
        subtitle: 'to continue to this same app named as something else!',
        actionText: 'New User?',
        actionLink: `Already have an account?`,
      },
    },
  };
  return (
    <ClerkProvider
      localization={localization}
      appearance={{
        layout: {
          showOptionalFields: true,
          socialButtonsPlacement: 'bottom',
          socialButtonsVariant: 'blockButton',
          termsPageUrl: 'https://clerk.com/terms',
          privacyPageUrl: 'https://clerk.com/privacy',
          helpPageUrl: 'https://clerk.com/help',
        },
      }}
    >
      <html>
        <body>
          <Navbar />
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
