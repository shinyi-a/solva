import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div className="headernav">
        <div className="headernavlogo">
          <Link href="/dashboard">
            <a>
              <div className="headerlogo">
                <img src="/logo.png" width="80px" height="80px" />
                <a href="/dashboard">
                  <h1 className="logo dashboardlogo">SOLVA</h1>
                </a>
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
                <Link href="/auditorsmanagement">
                  <a>
                    <span className="material-icons md-36">&#xe939;</span>
                  </a>
                </Link>
              </div>
            </li>
            <li className="headerli">
              <div className="headericon">
                <Link href="/auditorsmanagement">
                  <a>
                    <span className="material-icons md-36">&#xf02e;</span>
                  </a>
                </Link>
              </div>
            </li>
            <li className="headerli">
              <div className="headericonlast">
                <Link href="/auditorsmanagement">
                  <a>
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
};

export default Header;
