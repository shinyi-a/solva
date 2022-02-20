import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import UserContext from "../context/loginstate";
import Login from "../components/loginform";

export default function Home() {
  const userContext = useContext(UserContext);
  const router = useRouter();

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
      router.push("/");
    }
  }, []);
  return (
    <div id="container" style={{ padding: "24px" }}>
      <Login />
    </div>
  );
}
