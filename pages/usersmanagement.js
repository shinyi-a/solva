import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import Footer from "../components/dashboardfooter";

const UserManagement = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loadingAll, setLoadingAll] = useState(false);
  const [del, setDel] = useState(false);
  const router = useRouter();

  const loadAll = async () => {
    try {
      const res = await axios.get(`${process.env.API_ENDPOINT}/user/all`);
      setAllUsers(res.data);
      setLoadingAll(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    if (del) {
      loadAll();
      setDel(false);
    }
  }, [del]);

  // const handleDelete = async (auditor) => {
  //   try {
  //     const res = await axios.delete(
  //       `${process.env.API_ENDPOINT}/user/${auditor}`
  //     );
  //     console.log("sucessful delete");
  //     setDel(true);
  //     router.push("/dashboard");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleDelete = async (user) => {
    try {
      const res = await fetch(`${process.env.API_ENDPOINT}/user/${user}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("success");
      setDel(true);
    } catch (err) {
      console.log("delete failed: ", err);
    }
  };

  const allData = () => (
    <div className="usercontainer">
      <ul>
        {allUsers.map((user) => (
          <li key={user._id}>
            <div className="useritem">
              <Link href={`/user/${user._id}`}>
                <a className="userlink">
                  <div className="userfirstname">{user.firstname}</div>
                  <div className="useremail">{user.email}</div>
                  <div className="userusertype">{user.usertype}</div>
                </a>
              </Link>
              <div className="userdel">
                <button
                  className="userdelbtn"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete User
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="managementcontainer">
      <div className="managementpanel">
        <h2 className="title">Users Management</h2>
        <div className="adduserbar">
          <Link href="/addadmin">
            <a>
              <button className="adduser">
                <span className="material-icons md-24">&#xe7fe;</span> Add User
              </button>
            </a>
          </Link>
        </div>
        {loadingAll ? allData() : <h3>Loading...</h3>}
      </div>
      <Footer />
    </div>
  );
};

export default UserManagement;
