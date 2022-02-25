import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Link from "next/link";
import Graph from "../components/turnongraph";
import NavBar from "../components/navbar";
import DashFooter from "../components/dashboardfooter";
import UserContext from "../context/loginstate";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";

const Dashboard = () => {
  const userLoginState = useContext(UserContext);
  const [constructionHDB, setConstructionHDB] = useState([]);
  const [tncHDB, setTnCHDB] = useState([]);
  const [loadingConstruction, setLoadingConstruction] = useState(false);
  const [loadingTnC, setLoadingTnC] = useState(false);
  const [userRole, setUserRole] = useState();
  const [userEmail, setUserEmail] = useState();
  const router = useRouter();

  const decodeToken = () => {
    let token = localStorage.getItem("token");
    // console.log("Current Token: ", token);

    if (token) {
      let decodedToken = jwtDecode(token);
      // console.log("Current decoded Token", decodedToken);
      if (decodedToken) {
        setUserRole(decodedToken.role);
        setUserEmail(decodedToken.sub);
      }
    }
  };

  const loadConstruction = async () => {
    try {
      const res = await axios.get(
        `${process.env.API_ENDPOINT}/block/construction/${userEmail}`
      );
      setConstructionHDB(res.data);
      setLoadingConstruction(true);
    } catch (err) {
      console.log(err);
    }
  };

  const loadTnC = async () => {
    try {
      const res = await axios.get(
        `${process.env.API_ENDPOINT}/block/tnc/${userEmail}`
      );
      setTnCHDB(res.data);
      setLoadingTnC(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    decodeToken();
  }, []);

  useEffect(() => {
    loadConstruction();
  }, [userEmail, userRole]);

  useEffect(() => {
    loadTnC();
  }, [userEmail, userRole]);

  useEffect(() => {
    // console.log("dashboard: ", userLoginState.isLoggedIn);
    if (!userLoginState.isLoggedIn) {
      router.push("/");
    }
  }, [userLoginState]);

  useEffect(() => {
    if (userRole === "Auditor") {
      router.push("/turnon");
    }
  }, [userRole]);

  const constructionData = () => (
    <>
      <h2 className="title">Your Construction Blocks</h2>
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

  const TnCData = () => (
    <>
      <h2 className="title">Your T&amp;C Blocks</h2>
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

  let staffView = (
    <div className="dashboardcontainer">
      <div className="dashboardnavbar">
        <NavBar />
      </div>
      <div className="dashboardcontentcontainer">
        <div className="dashboardcontent">
          <div className="dashboardcontentnofooter">
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
          </div>
          <div className="dashboardfooter">
            <DashFooter />
          </div>
        </div>
      </div>
    </div>
  );

  let adminView = (
    <div className="dashboardcontainer">
      <div className="dashboardnavbar">
        <NavBar />
      </div>
      <div className="dashboardcontentcontainer">
        <div className="dashboardcontent">
          <div className="dashboardcontentnofooter">
            <div className="dashboardtop">
              <h2 className="title">Turned On Blocks in a Year</h2>
              <Graph />
            </div>
          </div>
          <div className="dashboardfooter">
            <DashFooter />
          </div>
        </div>
      </div>
    </div>
  );

  if (userRole === "Staff") {
    return staffView;
  }
  if (userRole === "Admin") {
    return adminView;
  }

  if (!userRole) {
    return <div></div>;
  }
};

export default Dashboard;
