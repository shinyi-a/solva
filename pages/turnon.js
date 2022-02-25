import Link from "next/link";
import Footer from "../components/footer";
import jwtDecode from "jwt-decode";
import UserContext from "../context/loginstate";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

const Turnon = ({ hdbblocks }) => {
  const userLoginState = useContext(UserContext);
  const router = useRouter();
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
      router.push("/");
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
////////////////////////////////////////////////////////////////////////////////////////////

// import { useState, useEffect } from "react";
// import axios from "axios";
// import Link from "next/link";

// const Turnon = () => {
//   const [allTurnon, setAllTurnon] = useState([]);
//   const [loadingAll, setLoadingAll] = useState(false);

//   const loadAll = async () => {
//     try {
//       const res = await axios.get(`${process.env.API_ENDPOINT}/block/turnon`);
//       setAllTurnon(res.data);
//       setLoadingAll(true);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     loadAll();
//   }, []);

//   const allData = () => (
//     <div>
//       <ul>
//         {allTurnon.map((blk) => (
//           <Link href={`/block/${blk.postalcode}`} key={blk._id}>
//             <li key={blk._id}> {blk.postalcode} </li>
//           </Link>
//         ))}
//       </ul>
//     </div>
//   );

//   return (
//     <>
//       <h1>All Turned On Blocks</h1>
//       {loadingAll ? allData() : <h3>Loading...</h3>}
//     </>
//   );
// };

// export default Turnon;
