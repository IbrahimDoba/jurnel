import { BiLogIn } from 'react-icons/bi';
import SidebarLink from './sidebar-link';

function SignInButton() {
  return (
    <SidebarLink path='/auth/login' text='login' icon={<BiLogIn size={25} />} />
  );
}

export default SignInButton;
