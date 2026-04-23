import type { Metadata } from 'next';
import './globals.css';
import BottomNav from '@/components/BottomNav';

export const metadata: Metadata = {
  title: 'CardNexus | Professional Portfolio',
  description: 'Enterprise-grade digital asset management for card collectors',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className="antialiased min-h-screen bg-slate-50">
        <main className="max-w-lg mx-auto px-5 pt-8 pb-28">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
