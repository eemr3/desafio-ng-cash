import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from '../context/AuthProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>NG-Transfer</title>
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
