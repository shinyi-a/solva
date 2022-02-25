import Link from "next/link";
import Footer from "../components/footer";
import jwtDecode from "jwt-decode";
import UserContext from "../context/loginstate";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

const Construction = ({ hdbblocks }) => {
  const router = useRouter();
  const userLoginState = useContext(UserContext);
  const [userRole, setUserRole] = useState();

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

  useEffect(() => {
    if (!userLoginState.isLoggedIn) {
      router.push("/404");
    }
  }, [userLoginState]);

  useEffect(() => {
    if (userRole === "Auditor") {
      router.push("/turnon");
    }
  }, [userRole]);

  return (
    <>
      <div className="blockviewcontainer">
        <div className="blockview">
          <h2 className="title">All Construction Blocks</h2>
          <ul>
            {hdbblocks.map((blk) => (
              <Link href={`/block/${blk.postalcode}`} key={blk._id}>
                <li key={blk._id}>
                  <span className="postalhighlight">{blk.postalcode}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export async function getStaticProps() {
  const res = await fetch(`${process.env.API_ENDPOINT}/block/construction`);
  const hdbblocks = await res.json();
  return {
    props: {
      hdbblocks,
    },
  };
}

export default Construction;
