import type { Metadata } from 'next';

import '~/app/globals.css';
import { Providers } from '~/app/providers';
import { APP_NAME, APP_DESCRIPTION } from '~/lib/constants';

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Only get session if sponsored signer is enabled or seed phrase is provided
  const sponsorSigner = process.env.SPONSOR_SIGNER === 'true';
  const hasSeedPhrase = !!process.env.SEED_PHRASE;
  const shouldUseSession = sponsorSigner || hasSeedPhrase;

  let session = null;
  if (shouldUseSession) {
    try {
      const { getSession } = await import('~/auth');
      session = await getSession();
    } catch (error) {
      console.warn('Failed to get session:', error);
    }
  }

  return (
    <html lang="en">
      <body>
        <Providers session={session} shouldUseSession={shouldUseSession}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
