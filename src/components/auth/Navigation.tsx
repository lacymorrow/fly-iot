import { MenuOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Button } from 'antd';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { StyledNav } from '../../styles/components/navigation';

const authPages = ['/account'];

const Navigation = () => {
  const { data: session } = useSession();
  const { pathname } = useRouter();

  if (session?.userId) {
    const menu = (
      <Menu>
        <Menu.Item key="navigation:1">
          <Link href="/account">
            <a>
              {
                // session?.user?.username ||
                session?.user?.name?.split(' ')[0] ||
                  session?.user?.email ||
                  'Account'
              }
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="navigation:2">
          <Link href="/u/dashboard">
            <a>Dashboard</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="navigation:3">
          <Link href="/u/schedule">
            <a>Schedule</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="navigation:4">
          <Link href="/u/devices">
            <a>My Devices</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="navigation:5">
          <Link href="/api/auth/signout">
            <a
              onClick={async (event) => {
                event.preventDefault();
                await signOut({
                  redirect: authPages.includes(pathname),
                  callbackUrl: '/',
                });
              }}
            >
              Sign out
            </a>
          </Link>
        </Menu.Item>
      </Menu>
    );
    return (
      <StyledNav>
        <Dropdown overlay={menu} placement="bottomRight">
          <Button
            icon={<MenuOutlined />}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            Menu
          </Button>
        </Dropdown>
      </StyledNav>
    );
  }
  return (
    <StyledNav>
      <Button onClick={() => signIn()} icon={<MenuOutlined />}>
        Sign in
      </Button>
    </StyledNav>
  );
};

export default Navigation;
