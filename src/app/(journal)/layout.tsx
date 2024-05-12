import Sidebar from '@/components/sidebar';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className='relative grid md:grid-cols-[auto_1fr]'>
        <Sidebar />
        <div className='min-h-[calc(100vh-60px)]'>{children}</div>
      </div>
    </>
  );
};

export default Layout;
