import { ReactNode } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import AuthStatus from '../components/auth/Navigation';
import config from '../utils/config';

type MainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: MainProps) => {
  const { pathname } = useRouter();
  return (
    <div className="p-2">
      {props.meta}

      <div className="max-w-screen-xl w-full mx-auto relative">
        <div>
          {pathname !== '/' && (
            <div className="pb-6">
              <div className="font-extrabold text-6xl text-gray-900">
                <Link href="/">
                  <a>{config.title}</a>
                </Link>
              </div>
            </div>
          )}

          <div className="absolute z-10 top-0 right-0 pt-6">
            <div className="flex flex-wrap text-xl">
              <AuthStatus />
            </div>
          </div>
        </div>

        <div className="py-6">{props.children}</div>

        {/* <div className="border-t border-gray-300 text-center py-8 text-sm">
        © Copyright {new Date().getFullYear()} {config.title}
      </div> */}
      </div>
    </div>
  );
};

export default Main;
