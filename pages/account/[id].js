import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Footer from "../../components/footer";

// import Link from "next/link";

const Account = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  //   const [projBlocks, setProjBlocks] = useState({});
  //   const [loadingBlocks, setLoadingBlocks] = useState(false);

  const loadUser = async () => {
    try {
      const res = await axios.get(`${process.env.API_ENDPOINT}/user/${id}`);
      setUser(res.data);
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  //   const loadUserDetails = async () => {
  //     try {
  //       console.log(user.firstname);
  //       const res = await axios.get(
  //         `${process.env.API_ENDPOINT}/block/user/${user.firstname}`
  //         // `${process.env.API_ENDPOINT}/block/user/${user.email}`
  //       );
  //       setProjBlocks(res.data);
  //       setLoadingBlocks(true);
  //       console.log(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   const allProjectBlocks = () => (
  //     <div>
  //       <ul>
  //         {projBlocks.map((blk) => (
  //           <Link href={`/block/${blk.postalcode}`} key={blk._id}>
  //             <li key={blk._id}>
  //               Postal Code: {blk.postalcode}, Status: {blk.status}
  //             </li>
  //           </Link>
  //         ))}
  //       </ul>
  //     </div>
  //   );

  useEffect(() => {
    loadUser();
  }, []);

  //   useEffect(() => {
  //     loadUserDetails();
  //   }, [loading]);

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
          {/* {loadingBlocks ? allProjectBlocks() : <h4>loading</h4>} */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Account;
