import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

const AuditorManagement = () => {
  const [allAuditors, setAllAuditors] = useState([]);
  const [loadingAll, setLoadingAll] = useState(false);
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

  const allData = () => (
    <div>
      <ul>
        {allAuditors.map((user) => (
          <li key={user._id}>
            <Link href={`/user/${user._id}`}>
              <a>
                {user.firstname}, {user.email}, {user.usertype}
              </a>
            </Link>
            <button onClick={() => handleDelete(user._id)}>Delete User</button>
          </li>
        ))}
      </ul>
    </div>
  );

  const handleDelete = async (auditor) => {
    try {
      const res = await axios.delete(
        `${process.env.API_ENDPOINT}/user/${auditor}`
      );
      router.push("/auditorsmanagement");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>All Auditors</h1>
      {loadingAll ? allData() : <h3>Loading...</h3>}
    </>
  );
};

export default AuditorManagement;
