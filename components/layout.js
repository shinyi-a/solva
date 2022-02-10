import Header from "./header";
import Footer from "./footer";
// import "tailwindcss/tailwind.css";

const Layout = ({ children }) => {
  return (
    <>
      <Header></Header>
      <div>{children}</div>
      <Footer></Footer>
    </>
  );
};

export default Layout;
