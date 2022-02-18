import Link from "next/link";

const Header = () => {
  return (
    <header>
      <Link href="/dashboard">
        <a>
          <h1>Solva</h1>
        </a>
      </Link>
      <Link href="/addblock">
        <a>
          <h4>Add Block</h4>
        </a>
      </Link>
      <Link href="/addadmin">
        <a>
          <h4>Add Staff/Auditor</h4>
        </a>
      </Link>
      <Link href="/adduser">
        <a>
          <h4>Add Auditor</h4>
        </a>
      </Link>
      <Link href="/usersmanagement">
        <a>
          <h4>Manage User Accounts</h4>
        </a>
      </Link>
      <Link href="/auditorsmanagement">
        <a>
          <h4>Manage Auditor Accounts</h4>
        </a>
      </Link>
    </header>
  );
};

export default Header;
