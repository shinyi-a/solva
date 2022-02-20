import "../styles/globals.css";
import Head from "next/head";
import LayoutContent from "../components/layout";
import "antd/dist/antd.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Solva</title>
      </Head>
      <LayoutContent>
        <Component {...pageProps} />
      </LayoutContent>
    </>
  );
}

export default MyApp;
