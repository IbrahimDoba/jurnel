import Sidebar from '@/components/sidebar';
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Journal',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <>
      <main className='min-h-screen relative grid grid-cols-[auto_1fr]'>
        <Sidebar />
        <div className='min-h-[calc(100vh-60px)]'>{children}</div>
      </main>
    </>
  );
};

export default Layout;
