import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import ReduxWrapper from './ReduxWrapper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@/components/navbar';
import MobileNav from '@/components/mobile-nav';
import Footer from '@/components/footer';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'WordGen',
    template: `%s - WordGen`,
  },
  description: 'Learn new words and journal.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxWrapper>
      <body className={spaceGrotesk.className}>
      <ToastContainer />
        <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
          <Navbar />
          <MobileNav />
          {children}
        </div>
      </body>
    </ReduxWrapper>
  );
}
