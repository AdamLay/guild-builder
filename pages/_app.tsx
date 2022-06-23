import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../data/store";
import { Provider } from "react-redux";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Guild Builder</title>
        <meta name="description" content="Build your Guild!" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Aclonica&family=Merriweather:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
