import Link from 'next/link';
import React from 'react';
import { BsDiscord, BsInstagram, BsTwitter } from 'react-icons/bs';

function Footer() {
  return (
    <footer className='h-[60px] flex justify-center items-center bg-main border-t border-t-primary py-4 px-6 md:px-8 lg:px-24 max-w-[90rem] mx-auto'>
      <ul className='flex gap-4 text-accent'>
        <li>
          <Link href='https://discord.gg/NuqrZARzCb' target='_blank'>
            <BsDiscord />
          </Link>
        </li>
        <li>
          <Link href='https://www.instagram.com/officialwordgen' target='_blank'>
            <BsInstagram />
          </Link>
        </li>
        <li>
          <Link href='https://twitter.com/wordgen' target='_blank'>
            <BsTwitter />
          </Link>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
