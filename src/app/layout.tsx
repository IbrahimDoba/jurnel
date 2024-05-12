import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WordGen',
  description: 'Learn new words and journal.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={spaceGrotesk.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <div id='portal'></div>
      </body>
    </html>
  );
}
