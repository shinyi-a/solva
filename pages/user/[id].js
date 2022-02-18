import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

const UserDetails = () => {
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

  let userRole = "";
  if (loading) {
    switch (true) {
      case user.usertype.toString() === "pm":
        userRole = "Staff";
        break;
      case user.usertype.toString() === "audit":
        userRole = "Auditor";
        break;
    }
  }

  return (
    <div>
      <h1>{user.firstname}</h1>
      {loading ? (
        <>
          <h4>User Type: {userRole}</h4>
          <h4>Email: {user.email}</h4>
        </>
      ) : (
        ""
      )}
      {loadingBlocks ? allProjectBlocks() : <h4>loading</h4>}
    </div>
  );
};

export default UserDetails;