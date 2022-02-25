import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import UserContext from "../context/loginstate";

const PendingView = ({ children }) => {
  const router = useRouter();
  const { blk, id } = children;
  const userLoginState = useContext(UserContext);
  const [userRole, setUserRole] = useState();

  const splitDateTime = blk.pendingdate.split("T");
  const onlyDate = splitDateTime[0];
  const splitDate = onlyDate.split("-");
  const displaydate = `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;

  const checkLoginStatus = () => {
    let token = localStorage.getItem("token");
    if (token) {
      userLoginState.setLoginState(true);
    }
  };

  const decodeToken = () => {
    let token = localStorage.getItem("token");

    if (token) {
      let decodedToken = jwtDecode(token);
      if (decodedToken) {
        setUserRole(decodedToken.role);
      }
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    decodeToken();
  }, [userLoginState]);

  return (
    <article>
      <p>Project Manager in Charge: {blk.projectmanager}</p>
      <p>Pending Date: {displaydate}</p>
      {userRole === "Staff" ? (
        <button onClick={() => router.push(`/block/${id}/update`)}>
          Ready for Construction
        </button>
      ) : (
        <></>
      )}
    </article>
  );
};

export default PendingView;
