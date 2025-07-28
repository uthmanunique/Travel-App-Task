// travel-app-task/src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ItineraryProvider } from '../context/ItineraryContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Travel App',
  description: 'Plan your trips with ease',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ItineraryProvider>{children}</ItineraryProvider>
      </body>
    </html>
  );
}