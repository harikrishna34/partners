import Head from 'next/head';
import { useState } from 'react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useFavicon } from '@mantine/hooks';
import { AuthProvider } from '@/context/Auth';
import { theme } from '@/styles/theme';

export default function App(props) {
  const [favicon, setFavicon] = useState(
    'https://www.anvayaa.com/src/img/logo.png',
  );
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout || ((page) => page);
  useFavicon(favicon);
  return (
    <>
      <Head>
        <title>Partner Management | Anvayaa</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <Notifications />
        <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
      </MantineProvider>
    </>
  );
}
