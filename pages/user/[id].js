import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Footer from "../../components/footer";
import jwtDecode from "jwt-decode";
import UserContext from "../../context/loginstate";

const UserDetails = () => {
  const userLoginState = useContext(UserContext);
  const [userRole, setUserRole] = useState();
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [projBlocks, setProjBlocks] = useState({});
  const [loadingBlocks, setLoadingBlocks] = useState(false);

  const loadUser = async () => {
    try {
      const res = await axios.get(`${process.env.API_ENDPOINT}/user/${id}`);
      setUser(res.data);
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  const loadUserDetails = async () => {
    try {
      console.log(user.firstname);
      const res = await axios.get(
        `${process.env.API_ENDPOINT}/block/user/${user.firstname}`
        // `${process.env.API_ENDPOINT}/block/user/${user.email}`
      );
      setProjBlocks(res.data);
      setLoadingBlocks(true);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const allProjectBlocks = () => (
    <div>
      <ul>
        {projBlocks.map((blk) => (
          <Link href={`/block/${blk.postalcode}`} key={blk._id}>
            <li key={blk._id}>
              Postal Code: {blk.postalcode}, Status: {blk.status}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    loadUserDetails();
  }, [loading]);

  const checkLoginStatus = () => {
    let token = localStorage.getItem("token");
    if (token) {
      userLoginState.setLoginState(true);
    }
  };

  const decodeToken = () => {
    let token = localStorage.getItem("token");

    if (token) {
      let decodedToken = jwtDecode(token);
      if (decodedToken) {
        setUserRole(decodedToken.role);
      }
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    decodeToken();
  }, [userLoginState]);

  // useEffect(() => {
  //   if (!userLoginState.isLoggedIn) {
  //     router.push("/");
  //   }
  // }, [userLoginState]);

  useEffect(() => {
    if (userRole === "Auditor") {
      router.push("/turnon");
    }
  }, [userRole]);

  useEffect(() => {
    if (userRole === "Admin") {
      router.push("/dashboard");
    }
  }, [userRole]);

  return (
    <>
      <div className="userblockcontainer">
        <div className="usercontent">
          <h2 className="title">Blocks under {user.firstname}</h2>
          {loadingBlocks ? allProjectBlocks() : <h4>loading</h4>}
        </div>

        {/* {loading ? (
        <>
          <h4>User Type: {user.usertype}</h4>
          <h4>Email: {user.email}</h4>
        </>
      ) : (
        ""
      )} */}
      </div>
      <Footer />
    </>
  );
};

export default UserDetails;
