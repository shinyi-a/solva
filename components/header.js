import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import UserContext from "../context/loginstate";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";

const Header = () => {
  const { id } = router.query;
  const userLoginState = useContext(UserContext);
  const [userRole, setUserRole] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userUserid, setUserid] = useState();

  const handleLogoutClick = () => {
    localStorage.clear();
    userLoginState.setLoginState(false);
    setUserRole("");
  };

  const decodeToken = () => {
    let token = localStorage.getItem("token");

    if (token) {
      let decodedToken = jwtDecode(token);
      if (decodedToken) {
        setUserRole(decodedToken.role);
        setUserEmail(decodedToken.email);
        setUserid(decodedToken.userid);
      }
    }
  };

  const checkLoginStatus = () => {
    let token = localStorage.getItem("token");
    if (token) {
      userLoginState.setLoginState(true);
    }
  };

  useEffect(() => {
    checkLoginStatus();
    decodeToken();
    loadUserDetails();
  }, [userRole, userLoginState, userEmail]);

  //load current user details from DB
  const loadUserDetails = async () => {
    try {
      const res = await axios.get(
        // `${process.env.API_ENDPOINT}/block/user/${user.firstname}`
        `${process.env.API_ENDPOINT}/block/user/${userEmail}`
      );
      setProjBlocks(res.data);
      setLoadingBlocks(true);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const adminHeader = (
    <header>
      <div className="headernav">
        <div className="headernavlogo">
          <Link href="/dashboard">
            <a>
              <div className="headerlogo">
                <img src="/logo.png" width="80px" height="80px" />
                <h1 className="logo dashboardlogo">SOLVA</h1>
              </div>
            </a>
          </Link>
        </div>
        <div id="headernavoptions">
          <ul id="horizontal-list">
            <li className="headerli">
              <div className="headericon">
                <Link href="/usersmanagement">
                  <a>
                    <span className="material-icons md-36">&#xe939;</span>
                  </a>
                </Link>
              </div>
            </li>
            <li className="headerli">
              <div className="headericon">
                <Link href={`/account/${userUserid}`}>
                  <a>
                    <span className="material-icons md-36">&#xf02e;</span>
                  </a>
                </Link>
              </div>
            </li>
            <li className="headerli">
              <div className="headericonlast">
                <Link href="/">
                  <a onClick={handleLogoutClick}>
                    <span className="material-icons md-36">&#xe9ba;</span>
                  </a>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );

  const staffHeader = (
    <header>
      <div className="headernav">
        <div className="headernavlogo">
          <Link href="/dashboard">
            <a>
              <div className="headerlogo">
                <img src="/logo.png" width="80px" height="80px" />
                <h1 className="logo dashboardlogo">SOLVA</h1>
              </div>
            </a>
          </Link>
        </div>
        <div id="headernavoptions">
          <ul id="horizontal-list">
            <li className="headerli">
              <div className="headericon">
                <Link href="/auditorsmanagement">
                  <a>
                    <span className="material-icons md-36">&#xe939;</span>
                  </a>
                </Link>
              </div>
            </li>
            <li className="headerli">
              <div className="headericon">
                <Link href={`/account/${userUserid}`}>
                  <a>
                    <span className="material-icons md-36">&#xf02e;</span>
                  </a>
                </Link>
              </div>
            </li>
            <li className="headerli">
              <div className="headericonlast">
                <Link href="/">
                  <a onClick={handleLogoutClick}>
                    <span className="material-icons md-36">&#xe9ba;</span>
                  </a>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );

  const auditorHeader = (
    <header>
      <div className="headernav">
        <div className="headernavlogo">
          <Link href="/turnon">
            <a>
              <div className="headerlogo">
                <img src="/logo.png" width="80px" height="80px" />
                <h1 className="logo dashboardlogo">SOLVA</h1>
              </div>
            </a>
          </Link>
        </div>
        <div id="headernavoptions">
          <ul id="horizontal-list">
            <li className="headerli">
              <div className="headericon">
                <Link href={`/account/${userUserid}`}>
                  <a>
                    <span className="material-icons md-36">&#xf02e;</span>
                  </a>
                </Link>
              </div>
            </li>
            <li className="headerli">
              <div className="headericonlast">
                <Link href="/">
                  <a onClick={handleLogoutClick}>
                    <span className="material-icons md-36">&#xe9ba;</span>
                  </a>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );

  if (userRole === "Admin") {
    return adminHeader;
  }
  if (userRole === "Staff") {
    return staffHeader;
  }
  if (userRole === "Auditor") {
    return auditorHeader;
  }
  if (!userRole || id === "404") {
    return <div></div>;
  }
};

export default Header;
