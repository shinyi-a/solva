import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const TnC = () => {
  const [allTnC, setAllTnC] = useState([]);
  const [loadingAll, setLoadingAll] = useState(false);

  const loadAll = async () => {
    try {
      const res = await axios.get(`${process.env.API_ENDPOINT}/block/tnc`);
      setAllTnC(res.data);
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
        {allTnC.map((blk) => (
          <Link href={`/${blk.postalcode}`} key={blk._id}>
            <li key={blk._id}> {blk.postalcode} </li>
          </Link>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <h1>All Testing and Commissioning Blocks</h1>
      {loadingAll ? allData() : <h3>Loading...</h3>}
    </>
  );
};

export default TnC;
