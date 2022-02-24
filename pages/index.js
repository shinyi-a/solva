import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import UserContext from "../context/loginstate";
import Login from "../components/loginform";

export default function Home() {
  const userContext = useContext(UserContext);
  const router = useRouter();

  //to is to redirect logged in users away from login screen
  //if user role is auditor, redirect to turn on page only
  useEffect(() => {
    console.log(
      "UseEffect in Login.tsx is triggered, checking for local Storage token"
    );
    let token = localStorage.getItem("token");
    if (token) {
      console.log(
        "Login.tsx: User is logged in, rerouting user away from login page"
      );
      userContext.setLoginState(true);
      console.log(token);
      router.push("/dashboard");
    }
  }, []);

  return <Login />;
}
