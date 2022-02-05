import Header from "./header";
import Footer from "./footer";
// import "tailwindcss/tailwind.css";

const Layout = ({ children }) => {
  return (
    <>
      <Header></Header>
      <body>{children}</body>
      <Footer></Footer>
    </>
  );
};

export default Layout;
