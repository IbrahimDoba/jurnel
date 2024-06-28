import Footer from "@/components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="grid h-full w-full">{children}</main>
      <Footer />
    </>
  );
}
