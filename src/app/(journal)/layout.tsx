import Sidebar from '@/components/sidebar';
import React from 'react';
import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@/components/navbar';

export const metadata: Metadata = {
  title: 'Journal',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <main className='min-h-screen relative grid grid-cols-[auto_1fr]'>
        <Sidebar />
        <div className='min-h-[calc(100vh-60px)]'>{children}</div>
      </main>
    </>
  );
};

export default Layout;
