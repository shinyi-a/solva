import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const Turnon = () => {
  const [allTurnon, setAllTurnon] = useState([]);
  const [loadingAll, setLoadingAll] = useState(false);

  const loadAll = async () => {
    try {
      const res = await axios.get(`${process.env.API_ENDPOINT}/block/turnon`);
      setAllTurnon(res.data);
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
        {allTurnon.map((blk) => (
          <Link href={`/${blk.postalcode}`} key={blk._id}>
            <li key={blk._id}> {blk.postalcode} </li>
          </Link>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <h1>All Turn On Blocks</h1>
      {loadingAll ? allData() : <h3>Loading...</h3>}
    </>
  );
};

export default Turnon;
