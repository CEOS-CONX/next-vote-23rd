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
      <body className="mx-auto flex min-h-full max-w-97.5 flex-col bg-linear-to-b from-background to-gradient-end md:max-w-none">
        <Header />
        <Navigation />
        <main className="flex-1 px-5">{children}</main>
      </body>
    </html>
  );
}
