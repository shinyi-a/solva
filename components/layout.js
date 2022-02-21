import Header from "./header";
import Footer from "./footer";
import NavBar from "./navbar";
// import "tailwindcss/tailwind.css";

const Layout = ({ children }) => {
  if (children.type.name === "Home") {
    return <div>{children}</div>;
  } else {
    return (
      <div className="grid-container">
        <div className="header">
          <Header />
        </div>

        <div className="sidenav">
          <NavBar />
        </div>
        <div className="main">{children}</div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    );
  }
};

export default Layout;
