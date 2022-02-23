import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Graph from "../components/turnongraph";
import NavBar from "../components/navbar";
import DashFooter from "../components/dashboardfooter";

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
    <>
      <h2 className="title">Construction</h2>
      <ul>
        {constructionHDB.map((blk) => (
          <li key={blk._id}>
            <Link href={`/block/${blk.postalcode}`}>
              <a>
                <span className="postalhighlight">{blk.postalcode}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );

  // console.log(tncHDB);

  const TnCData = () => (
    <>
      <h2 className="title">Testing and Commissioning</h2>
      <ul>
        {tncHDB.map((blk) => (
          <li key={blk._id}>
            <Link href={`/block/${blk.postalcode}`}>
              <a>
                <span className="postalhighlight">{blk.postalcode}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );

  // const tncData = tncHDB.map((blk) => {
  //   return (
  //     <div key={blk._id}>
  //       <p>{blk.postalcode}</p>
  //     </div>
  //   );
  // });

  return (
    <div className="dashboardcontainer">
      <div className="dashboardnavbar">
        <NavBar />
      </div>
      <div className="dashboardcontentcontainer">
        <div className="dashboardcontent">
          <div className="dashboardtop">
            <h2 className="title">Turned On Blocks in a Year</h2>
            <Graph />
          </div>
          <div className="dashboardblocks">
            <div className="dashboardconstruct">
              {loadingConstruction ? constructionData() : <h3>Loading...</h3>}
            </div>
            <div className="dashboardtnc">
              {loadingTnC ? TnCData() : <h3>Loading...</h3>}
            </div>
          </div>
          <div className="dashboardfooter">
            <DashFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
