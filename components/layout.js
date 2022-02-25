import Header from "./header";
import Footer from "./footer";

const Layout = ({ children }) => {
  let ftype = children.type;
  let fname = ftype.name;
  if (fname === "Home") {
    return <div>{children}</div>;
  } else if (fname === "Dashboard") {
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
