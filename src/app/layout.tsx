import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import MetaPixel from '@/components/meta-pixel';
import GoogleTag from '@/components/google-tag';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Srisandang',
  description: 'Vendor Pengadaan Baju dan Merchandise Berkualitas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <MetaPixel />
        <GoogleTag />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
