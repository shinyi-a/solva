import Header from "./header";
import Footer from "./footer";
import NavBar from "./navbar";
// import "tailwindcss/tailwind.css";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <NavBar />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
