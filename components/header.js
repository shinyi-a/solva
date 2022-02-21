import Link from "next/link";

const Header = () => {
  return (
    <header>
      <Link href="/dashboard">
        <a>
          <h1>Solva</h1>
        </a>
      </Link>
      <ul>
        <Link href="/usersmanagement">
          <a>
            <li>Manage User Accounts</li>
          </a>
        </Link>
        <Link href="/auditorsmanagement">
          <a>
            <li>Manage Auditor Accounts</li>
          </a>
        </Link>
        <Link href="/">
          <a>
            <li>Add Your Profile</li>
          </a>
        </Link>
        <Link href="/">
          <a>
            <li>Add Logout Function</li>
          </a>
        </Link>
      </ul>
    </header>
  );
};

export default Header;
