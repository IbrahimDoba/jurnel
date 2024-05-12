import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';

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
    <html lang='en'>
      <body className={spaceGrotesk.className}>
        {children}
        <div id='portal'></div>
      </body>
    </html>
  );
}
