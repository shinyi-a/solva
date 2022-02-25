import { useRouter } from "next/router";
import { useEffect } from "react";
import Footer from "../components/footer";

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/dashboard");
    }, 3000);
  }, []);
  return (
    <>
      <div className="notfoundcontainer">
        <div className="notfoundcard">
          <div className="notfoundnum">
            <span className="notfoundtitle">4</span>
            <img
              className="moonimg"
              src="/crescent-moon.png"
              width="150px"
              height="150px"
            />
            <span className="notfoundtitle">4</span>
          </div>
          <h1>Oops! Page not found.</h1>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
