import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactElement } from 'react';

interface SidebarLinkProps {
  path: string;
  icon: ReactElement;
  text: string;
}

function SidebarLink(props: SidebarLinkProps) {
  const pathname = usePathname();

  return (
    <li className='relative group'>
      <Link
        href={props.path}
        className={`tracking-widest text-sm rounded-md p-2 font-medium flex items-center justify-center focus-visible:outline-accent focus-visible:text-accent ${
          pathname === props.path ? 'text-accent bg-accent/20' : ''
        }`}
      >
        {props.icon}
      </Link>
      <div
        className={`max-md:hidden
            whitespace-nowrap absolute top-1.5 left-full rounded-md 
            px-2 py-1 ml-6 bg-accent text-main text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
         `}
      >
        {props.text}
      </div>
    </li>
  );
}

export default SidebarLink;
