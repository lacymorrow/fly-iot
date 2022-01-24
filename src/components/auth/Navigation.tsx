import { MenuIcon } from '@heroicons/react/solid';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';

import { StyledDropdown, StyledNav } from '../../styles/components/navigation';

const authPages = ['/account'];

const AuthStatus = () => {
  const { data: session } = useSession();
  const { pathname } = useRouter();
  const { buttonProps, itemProps, isOpen } = useDropdownMenu(2);

  if (session) {
    return (
      <StyledNav>
        <button className="relative w-6" {...buttonProps}>
          <MenuIcon />

          <StyledDropdown className={isOpen ? 'visible' : ''} role="menu">
            <Link href="/account">
              <a {...itemProps[0]}>
                {
                  // session?.user?.username ||
                  session?.user?.name?.split(' ')[0] ||
                    session?.user?.email ||
                    'My Account'
                }
              </a>
            </Link>
            <Link href="/api/auth/signout">
              <a
                onClick={async (event) => {
                  event.preventDefault();
                  await signOut({
                    redirect: authPages.includes(pathname),
                    callbackUrl: '/',
                  });

                  // If on a protected page, redirect
                  // if (authPages.includes(pathname)) {
                  //   push(data.url);
                  // }
                }}
                {...itemProps[1]}
              >
                Sign out
              </a>
            </Link>
          </StyledDropdown>
        </button>
      </StyledNav>
    );
  }
  return (
    <StyledNav>
      <button onClick={() => signIn()}>Sign in</button>
      {/* <MenuIcon /> */}
    </StyledNav>
  );
};

export default AuthStatus;
