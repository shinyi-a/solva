import "../styles/globals.css";
import Head from "next/head";
import Layout from "../components/layout";
import UserContext from "../context/loginstate";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [userLoginState, setLoginState] = useState(false);
  const userLoginData = {
    isLoggedIn: userLoginState,
    setLoginState: (state) => setLoginState(state),
  };

  useEffect(() => {
    // console.log("login state: ", userLoginState);
    if (!userLoginState.isLoggedIn) {
      const loggedInUser = localStorage.getItem("token");
      // console.log("llogged in user: ", loggedInUser);
      if (loggedInUser) {
        setLoginState(true);
      } else {
        // console.log("no local storage found for userID");
      }
    } else {
      // console.log("user is logged in");
    }
  }, [userLoginState]);

  return (
    <>
      <UserContext.Provider value={userLoginData}>
        <Head>
          <title>S O L V A</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContext.Provider>
    </>
  );
}

export default MyApp;
