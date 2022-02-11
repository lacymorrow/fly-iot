import { useEffect } from 'react';

import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';

import * as ga from '../lib/ga';

import '../styles/global/reset.css';
import 'antd/dist/antd.css';
import '../styles/global/global.css';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };
    // When the component is mounted, subscribe to router changes
    // and log those page views
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  return (
    <SessionProvider session={session}>
      <NextNProgress
        startPosition={0.2}
        stopDelayMs={100}
        showOnShallow={false}
      />
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
