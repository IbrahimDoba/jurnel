'use client';
import Image from 'next/image';
import SidebarLink from './sidebar-link';
import SignInButton from './sign-in-button';
import UserButton from './user-button';

import { IRootState } from '@/redux/store';
import { BookMarked, List } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const { user } = useSelector((state: IRootState) => state.user);

  return (
    <>
      <aside
        className={`max-md:hidden z-30 border-r border-dashed border-r-primary bg-main transition-all duration-300 sticky top-[61px] h-full max-h-[calc(100vh-61px)]`}
      >
        <nav className='h-full flex flex-col gap-6 py-6 px-4 justify-between transition-all duration-300'>
          <div className='relative flex justify-between items-center'>
            <Link href='/words' className='flex text-xl items-center font-bold'>
              <Image
                src='/wordgen.png'
                alt='logo'
                width={40}
                height={40}
                className='rounded-lg'
              />
            </Link>
          </div>

          {/* main nav */}
          <ul className='flex flex-col gap-4 min-w-full py-4'>
            <SidebarLink
              path='/jurnal '
              text='jurnal '
              icon={<BookMarked size={20} />}
            />
            <SidebarLink
              path='/lists'
              text='lists'
              icon={<List size={20} />}
            />
          </ul>

          {/* user info | auth status */}
          <div className='border-t border-t-primary px-1 pt-2'>
            {user ? <UserButton user={user} /> : <SignInButton />}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
