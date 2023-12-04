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
    signUp: {
      start: {
        title: 'Sign Up',
        subtitle: 'to continue to this same app named as something else!',
        actionText: 'New User?',
        actionLink: `Don't have an account?`,
      },
    },
  };
  const appearance = {
    layout: {
      socialButtonsPlacement: 'bottom',
      socialButtonsVariant: 'iconButton',
      termsPageUrl: 'https://clerk.com/terms',
      privacyPageUrl: 'https://clerk.com/privacy',
      showOptionalFields: 'true',
      helpPageUrl: 'https://clerk.com/help',
    },
  };
  return (
    <ClerkProvider localization={localization} appearance={appearance}>
      <html lang='en'>
        <body>
          <Navbar />
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
