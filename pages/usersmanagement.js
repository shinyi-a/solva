import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

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
    <div>
      <ul>
        {allUsers.map((user) => (
          <li key={user._id}>
            <Link href={`/user/${user._id}`}>
              <a>
                {user.firstname}, {user.email}, {user.usertype}{" "}
              </a>
            </Link>
            <button onClick={() => handleDelete(user._id)}>Delete User</button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <h1 className="title">Users Management</h1>
      <Link href="/addadmin">
        <a>
          <h4>Add Staff/Auditor</h4>
        </a>
      </Link>
      {loadingAll ? allData() : <h3>Loading...</h3>}
    </>
  );
};

export default UserManagement;
