import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

import { Share_Tech_Mono, Orbit } from 'next/font/google';

const ShareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font--ShareTechMono',
});

const orbit = Orbit({
  subsets: ['latin'],
  weight: '400',
  adjustFontFallback: false,
  variable: '--font--orbit',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={`${ShareTechMono.variable} ${orbit.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
