import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import UserContext from "../context/loginstate";
import Login from "../components/loginform";

export default function Home() {
  const userContext = useContext(UserContext);
  const router = useRouter();

  //to is to redirect logged in users away from login screen
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      userContext.setLoginState(true);
      console.log(token);
      router.push("/dashboard");
    }
  }, []);

  return <Login />;
}
