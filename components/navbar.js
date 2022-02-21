import Link from "next/link";

const NavBar = () => {
  return (
    <>
      <Link href="/dashboard">
        <a>
          <h1 className="sidenav__list-item">Solva</h1>
        </a>
      </Link>
      <ul className="sidenav__list">
        <Link href="/all">
          <a>
            <li className="sidenav__list-item">All HDB Blocks</li>
          </a>
        </Link>
        <Link href="/pending">
          <a>
            <li className="sidenav__list-item">Pending</li>
          </a>
        </Link>
        <Link href="/construction">
          <a>
            <li className="sidenav__list-item">Construction</li>
          </a>
        </Link>
        <Link href="/TnC">
          <a>
            <li className="sidenav__list-item">Testing and Commissioning</li>
          </a>
        </Link>
        <Link href="/turnon">
          <a>
            <li className="sidenav__list-item">Turned On</li>
          </a>
        </Link>
      </ul>
    </>
  );
};

export default NavBar;
