import Header from "./header";
import Footer from "./footer";

const Layout = ({ children }) => {
  if (children.type.name === "Home") {
    return <div>{children}</div>;
  } else if (children.type.name === "Dashboard") {
    return (
      <>
        <Header />
        <div>{children}</div>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <div>{children}</div>
        <Footer />
      </>
    );
  }
};

export default Layout;
