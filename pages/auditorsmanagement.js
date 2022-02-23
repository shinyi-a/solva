import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

const AuditorManagement = () => {
  const [allAuditors, setAllAuditors] = useState([]);
  const [loadingAll, setLoadingAll] = useState(false);
  const [del, setDel] = useState(false);
  const router = useRouter();

  const loadAll = async () => {
    try {
      const res = await axios.get(`${process.env.API_ENDPOINT}/user/auditor`);
      setAllAuditors(res.data);
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

  const allData = () => (
    <div className="usercontainer">
      <ul>
        {allAuditors.map((user) => (
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

  // const handleDelete = async (auditor) => {
  //   try {
  //     const res = await axios.delete(
  //       `${process.env.API_ENDPOINT}/user/${auditor}`
  //     );
  //     // router.push("/auditorsmanagement");
  //     router.refresh();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleDelete = async (auditor) => {
    try {
      const res = await fetch(`${process.env.API_ENDPOINT}/user/${auditor}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("success");
      setDel(true);
    } catch (err) {
      // router.push('/failedlisting')
      console.log("delete failed: ", err);
    }
  };

  return (
    <div className="managementcontainer">
      <div className="managementpanel">
        <h2 className="title">Auditors Management</h2>
        <div className="adduserbar">
          <Link href="/adduser">
            <a>
              <button className="adduser">
                <span className="material-icons md-24">&#xe7fe;</span> Add
                Auditor
              </button>
            </a>
          </Link>
        </div>
        {loadingAll ? allData() : <h3>Loading...</h3>}
      </div>
    </div>
  );
};

export default AuditorManagement;
