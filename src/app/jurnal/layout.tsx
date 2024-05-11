import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className='md:relative grid md:grid-cols-[auto_1fr]'>
        <Sidebar />
        <main className='min-h-[calc(100vh-60.08px)]'>{children}</main>
      </div>
      <div id='portal'></div>
    </>
  );
};

export default Layout;
