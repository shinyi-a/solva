import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Footer from "../../components/footer";
import UserContext from "../../context/loginstate";

const Account = () => {
  const userLoginState = useContext(UserContext);
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const loadUser = async () => {
    try {
      const res = await axios.get(`${process.env.API_ENDPOINT}/user/${id}`);
      setUser(res.data);
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const checkLoginStatus = () => {
    let token = localStorage.getItem("token");
    if (token) {
      userLoginState.setLoginState(true);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (!userLoginState.isLoggedIn) {
      router.push("/404");
    }
  }, [userLoginState]);

  return (
    <>
      <div className="accountContainer">
        <div className="accountCard">
          {loading ? (
            <>
              <h2 className="title">Hello, {user.firstname}.</h2>
              <h3>User Type: {user.usertype}</h3>
              <h3>Email: {user.email}</h3>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Account;
