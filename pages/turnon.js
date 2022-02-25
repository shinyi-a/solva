import Link from "next/link";
import Footer from "../components/footer";
import UserContext from "../context/loginstate";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

const Turnon = ({ hdbblocks }) => {
  const userLoginState = useContext(UserContext);
  const router = useRouter();

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
      <div className="blockviewcontainer">
        <div className="blockview">
          <h2 className="title">All Turned On Blocks</h2>
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
  const res = await fetch(`${process.env.API_ENDPOINT}/block/turnon`);
  const hdbblocks = await res.json();
  return {
    props: {
      hdbblocks,
    },
  };
}

export default Turnon;
