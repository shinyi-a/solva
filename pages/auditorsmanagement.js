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
    <div>
      <ul>
        {allAuditors.map((user) => (
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
    <>
      <h1 className="title">Auditors Management</h1>
      <Link href="/adduser">
        <a>
          <h4>Add Auditor</h4>
        </a>
      </Link>
      {loadingAll ? allData() : <h3>Loading...</h3>}
    </>
  );
};

export default AuditorManagement;
