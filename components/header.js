import Link from "next/link";

const Header = () => {
  return (
    <header>
      <Link href="/dashboard">
        <a>
          <h1>Solva</h1>
        </a>
      </Link>
    </header>
  );
};

export default Header;
