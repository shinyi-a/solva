import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const AllBlocks = () => {
  const [allHDB, setAllHDB] = useState([]);
  const [loadingAll, setLoadingAll] = useState(false);

  const loadAll = async () => {
    try {
      const res = await axios.get(`${process.env.API_ENDPOINT}/block/all`);
      setAllHDB(res.data);
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
        {allHDB.map((blk) => (
          <Link href={`/${blk.postalcode}`} key={blk._id}>
            <li key={blk._id}> {blk.postalcode} </li>
          </Link>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <h1>All Blocks</h1>
      {loadingAll ? allData() : <h3>Loading...</h3>}
    </>
  );
};

export default AllBlocks;
