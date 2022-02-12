import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const Construction = () => {
  const [allConstruction, setAllConstruction] = useState([]);
  const [loadingAll, setLoadingAll] = useState(false);

  const loadConstruction = async () => {
    try {
      const res = await axios.get(
        `${process.env.API_ENDPOINT}/block/construction`
      );
      setAllConstruction(res.data);
      setLoadingAll(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadConstruction();
  }, []);

  const constructionData = () => (
    <div>
      <ul>
        {allConstruction.map((blk) => (
          <Link href={`/${blk.postalcode}`} key={blk._id}>
            <li key={blk._id}> {blk.postalcode} </li>
          </Link>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <h1>All Construction Blocks</h1>
      {loadingAll ? constructionData() : <h3>Loading...</h3>}
    </>
  );
};

export default Construction;
