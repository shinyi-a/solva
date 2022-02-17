import Link from "next/link";

const NavBar = () => {
  return (
    <ul>
      <Link href="/all">
        <a>
          <li>All HDB Blocks</li>
        </a>
      </Link>
      <Link href="/pending">
        <a>
          <li>Pending</li>
        </a>
      </Link>
      <Link href="/construction">
        <a>
          <li>Construction</li>
        </a>
      </Link>
      <Link href="/TnC">
        <a>
          <li>Testing and Commissioning</li>
        </a>
      </Link>
      <Link href="/turnon">
        <a>
          <li>Turned On</li>
        </a>
      </Link>
    </ul>
  );
};

export default NavBar;
