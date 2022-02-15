import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
// import Graph from "../components/turnongraph";

const Dashboard = () => {
  const [constructionHDB, setConstructionHDB] = useState([]);
  const [tncHDB, setTnCHDB] = useState([]);
  const [loadingConstruction, setLoadingConstruction] = useState(false);
  const [loadingTnC, setLoadingTnC] = useState(false);

  const loadConstruction = async () => {
    try {
      const res = await axios.get(
        `${process.env.API_ENDPOINT}/block/construction`
      );
      setConstructionHDB(res.data);
      setLoadingConstruction(true);
    } catch (err) {
      console.log(err);
    }
  };

  const loadTnC = async () => {
    try {
      const res = await axios.get(`${process.env.API_ENDPOINT}/block/tnc`);
      setTnCHDB(res.data);
      setLoadingTnC(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadConstruction();
    loadTnC();
  }, []);

  // const constructionData = constructionHDB.map((blk) => {
  //   return (
  //     <div key={blk._id}>
  //       <p>{blk.postalcode}</p>
  //     </div>
  //   );
  // });

  const constructionData = () => (
    <div>
      <h2>Construction</h2>
      <ul>
        {constructionHDB.map((blk) => (
          <Link href={`/${blk.postalcode}`}>
            <li key={blk._id}> {blk.postalcode} </li>
          </Link>
        ))}
      </ul>
    </div>
  );

  const TnCData = () => (
    <div>
      <h2>Testing and Commissioning</h2>
      <ul>
        {tncHDB.map((blk) => (
          <Link href={`/${blk.postalcode}`}>
            <li key={blk._id}> {blk.postalcode} </li>
          </Link>
        ))}
      </ul>
    </div>
  );

  // const tncData = tncHDB.map((blk) => {
  //   return (
  //     <div key={blk._id}>
  //       <p>{blk.postalcode}</p>
  //     </div>
  //   );
  // });

  return (
    <>
      <h1>Dashboard</h1>
      {loadingConstruction ? constructionData() : <h3>Loading...</h3>}
      {loadingTnC ? TnCData() : <h3>Loading...</h3>}
      {/* <Graph /> */}
    </>
  );
};

export default Dashboard;
