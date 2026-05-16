import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';

export const metadata: Metadata = {
  title: 'Next Vote 23rd',
  description: 'CEOS 23rd Vote',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="from-background to-gradient-end mx-auto flex min-h-full max-w-none flex-col bg-linear-to-b max-md:max-w-97.5">
        <Header />
        <Navigation />
        <main className="flex-1 px-5">{children}</main>
      </body>
    </html>
  );
}
