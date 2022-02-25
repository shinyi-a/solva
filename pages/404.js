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
        <h1>Oops! Page not found.</h1>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
