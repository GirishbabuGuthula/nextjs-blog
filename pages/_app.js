import Head from 'next/head';

import '../styles/globals.css'
import Layout from '../components/layout/layout'

function MyApp({ Component, pageProps }) {
  return (
      <Layout>
          <Head>
            <meta name="viewport" content="device-width, initial-scale= 1" />
          </Head>
          <Component {...pageProps} />
      </Layout>
  );
}

export default MyApp
