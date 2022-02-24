import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import UserContext from "../context/loginstate";

const ConstructionView = ({ children }) => {
  const router = useRouter();
  const { blk, id } = children;
  const userLoginState = useContext(UserContext);
  const [userRole, setUserRole] = useState();

  const splitDateTime = blk.constructiondate.split("T");
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
    console.log("Inside Header.tsx: decoding local storage token");
    let token = localStorage.getItem("token");
    console.log("Current Token: ", token);

    if (token) {
      let decodedToken = jwtDecode(token);
      console.log("Current decoded Token", decodedToken);
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
      <p>Construction Date: {displaydate}</p>
      <p>Total Block Capacity (kWp): {blk.capacity_kwp}</p>
      <p>No. of Panels: {blk.panels}</p>
      <p>Panel Maximum Power (Pmax/W): {blk.panelkwp}</p>
      {userRole === "Staff" ? (
        <button onClick={() => router.push(`/block/${id}/update`)}>
          Ready for Testing and Commissioning
        </button>
      ) : (
        <></>
      )}
    </article>
  );
};

export default ConstructionView;
