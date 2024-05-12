import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <main className='min-h-[calc(100vh-121px)] grid'>{children}</main>
      <Footer />
    </div>
  );
}
