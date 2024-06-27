import MaxWidth from '@/components/shared/max-width';
import Sidebar from '@/components/sidebar';
import type { Metadata } from 'next';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Journal',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className='h-full relative grid md:grid-cols-[auto_1fr]'>
        <Sidebar />
        <MaxWidth>{children}</MaxWidth>
      </main>
    </>
  );
};

export default Layout;
