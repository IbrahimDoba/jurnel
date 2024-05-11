'use client';
import { useState } from 'react';
import SidebarLink from './sidebar-link';
import UserButton from './user-button';
import SignInButton from './sign-in-button';
import { BiBook, BiPen } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';

const Sidebar = () => {

   const user = null;

  return (
    <>
      <aside
        className={`max-md:hidden z-50 border-r bg-white transition-all duration-300 sticky top-[60px] h-full max-h-[calc(100svh-60px)]`}
      >
        <nav className='h-full flex flex-col gap-6 py-6 px-4 justify-between transition-all duration-300'>
          <div className='relative flex justify-between items-center'>
            <div className='flex text-xl items-center font-bold'>
              <div className='w-10 h-10 rounded-full bg-accent/80'></div>
            </div>
          </div>

          {/* main nav */}
          <ul className='flex flex-col gap-4 min-w-full py-4'>
            <SidebarLink
              path='/jurnal/new'
              text='new jurnal'
              icon={<BiPen size={25} />}
            />
            <SidebarLink
              path='/profile'
              text='profile'
              icon={<CgProfile size={25} />}
            />
            <SidebarLink
              path='/jurnal/jurnals'
              text='jurnals'
              icon={<BiBook size={25} />}
            />
          </ul>

          {/* user info | auth status */}
          <div className='border-t px-1 pt-2 bg-eme'>
            {user ? (
              <UserButton user={user} />
            ) : (
              <SignInButton  />
            )}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
