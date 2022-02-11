import { ReactNode } from 'react';

import { Layout } from 'antd';
import { Header, Content, Footer } from 'antd/lib/layout/layout';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Navigation from '../components/auth/Navigation';
import config from '../utils/config';

type MainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: MainProps) => {
  const { pathname } = useRouter();
  return (
    <Layout style={{ backgroundColor: 'transparent' }}>
      {props.meta}
      <Header
        style={{ backgroundColor: 'transparent' }}
        className="flex justify-between mb-12"
      >
        {pathname !== '/' && (
          <div className="font-extrabold text-6xl text-gray-900 inline">
            <Link href="/">
              <a>{config.title}</a>
            </Link>
          </div>
        )}
        <Navigation />
      </Header>
      <Content className="max-w-xl mx-auto">{props.children}</Content>
      <Footer
        style={{ backgroundColor: 'transparent' }}
        className="border-t border-gray-300 text-center py-8 text-sm"
      >
        © Copyright {new Date().getFullYear()} {config.title}
      </Footer>
    </Layout>
  );
};

export default Main;
