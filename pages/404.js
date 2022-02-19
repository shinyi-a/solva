import { useRouter } from "next/router";
import { useEffect } from "react";

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/dashboard");
    }, 3000);
  }, []);
  return (
    <>
      <h1>Oops! Page not found.</h1>
    </>
  );
};

export default NotFound;
