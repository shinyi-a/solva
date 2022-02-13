import { useState, useEffect, Component } from "react";
import axios from "axios";
import Link from "next/link";
// import { useRouter } from "next/router";
import { XYPlot, LineSeries } from "react-vis";

const Dashboard = () => {
  const [constructionHDB, setConstructionHDB] = useState([]);
  const [tncHDB, setTnCHDB] = useState([]);
  const [graphHDB, setGraphHDB] = useState([]);
  const [loadingConstruction, setLoadingConstruction] = useState(false);
  const [loadingTnC, setLoadingTnC] = useState(false);
  const [loadingGraph, setLoadingGraph] = useState(false);
  // const router = useRouter();

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

  const loadGraph = async () => {
    try {
      const res = await axios.get(`${process.env.API_ENDPOINT}/block/graph`);
      setGraphHDB(res.data);
      setLoadingGraph(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadConstruction();
    loadTnC();
    loadGraph();
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

  const graphData = () => (
    <div>
      <h2>Graph Data</h2>
      <ul>
        {graphHDB.map((blk) => (
          <>
            <li key={blk._id}> {blk.postalcode} </li>
            <p>{blk.turnondate}</p>
          </>
          // <Link href={`/${blk.postalcode}`} key={blk._id}>
          // <li key={blk._id}> {blk.postalcode} </li>
          // <p>{blk.turnondate}</p>
          // </Link>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <h1>Dashboard</h1>
      {loadingConstruction ? constructionData() : <h3>Loading...</h3>}
      {loadingTnC ? TnCData() : <h3>Loading...</h3>}
      {loadingGraph ? graphData() : <h3>Loading...</h3>}
    </>
  );
};

export default Dashboard;
