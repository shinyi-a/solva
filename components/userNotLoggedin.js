import { useContext } from "react";
import Link from "next/link";
import UserContext from "../context/loginstate";

const NotLoggedIn = (props) => {
  const userLoginState = useContext(UserContext);

  if (userLoginState.isLoggedIn === false) {
    return (
      <div>
        <div>
          <div className="flex justify-center mb-5">Please Log In to View</div>
          <button>
            <Link href="/">Go to Login</Link>
          </button>
        </div>
      </div>
    );
  } else {
    return <>{props}</>;
  }
};

export default NotLoggedIn;
