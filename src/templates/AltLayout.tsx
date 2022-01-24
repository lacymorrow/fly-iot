import { ReactNode } from 'react';

import Link from 'next/link';

import { PageWrapper, Wrapper } from '../styles/alt';
import config from '../utils/config';

type AltProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Alt = (props: AltProps) => (
  <PageWrapper className="alternative min-h-screen">
    {props.meta}
    <div className="pt-2 pb-8 w-100 w-full mx-auto flex-col justify-center text-gray-900">
      <div className="relative">
        {/* <div className="text-xl uppercase">{config.tagline}</div> */}
        {/* <ul className="flex flex-wrap text-lg sm:text-xl mx-auto text-center sm:absolute right-0 font-semibold lowercase justify-center opacity-50 transition">
          <li className="p-5">
            <Link href="/">
              <a className="text-white transition">Home</a>
            </Link>
          </li>
          <li className="p-5">
            <Link href="/about">
              <a className="text-white transition">About</a>
            </Link>
          </li>
          <li className="p-5">
            <Link href="/contact">
              <a className="text-white transition">Contact</a>
            </Link>
          </li>
        </ul> */}
        <div className="font-extrabold text-8xl px-5 md:pl-10 text-white text-center sm:text-left hover:opacity-100 hover:text-white">
          <Link href="/">
            <a className="font-extrabold text-8xl text-whit text-center transition duration-500 ease-in-out opacity-60 hover:opacity-80 hover:text-white">
              {config.title}
            </a>
          </Link>
        </div>
      </div>
    </div>
    <div className="px-5">
      <Wrapper className="max-w-screen-md w-full mx-auto bg-black rounded-lg overflow-hidden relative">
        {props.children}
      </Wrapper>
    </div>
    {/* <div className="text-center py-16 text-xs uppercase text-gray-700">
      © Copyright {new Date().getFullYear()} {config.title}
    </div> */}
  </PageWrapper>
);

export default Alt;
