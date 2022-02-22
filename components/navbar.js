import Link from "next/link";

const NavBar = () => {
  return (
    <ul>
      <Link href="/addblock">
        <a>
          <li className="navlink">
            <span className="material-icons md-24">&#xeb62;</span> Add New Block
          </li>
        </a>
      </Link>
      <Link href="/all">
        <a>
          <li className="navlink">
            <span className="material-icons md-24">&#xe7ee;</span> All HDB
            Blocks
          </li>
        </a>
      </Link>
      <Link href="/pending">
        <a>
          <li className="navlink">
            <span className="material-icons md-24">&#xf1bb;</span> Pending
          </li>
        </a>
      </Link>
      <Link href="/construction">
        <a>
          <li className="navlink">
            <span className="material-icons md-24">&#xea3c;</span> Construction
          </li>
        </a>
      </Link>
      <Link href="/TnC">
        <a>
          <li className="navlink">
            <span className="material-icons md-24">&#xea3d;</span> Testing and
            Commissioning
          </li>
        </a>
      </Link>
      <Link href="/turnon">
        <a>
          <li className="navlink">
            <span className="material-icons md-24">&#xec0f;</span> Turned On
          </li>
        </a>
      </Link>
    </ul>
  );
};

export default NavBar;
