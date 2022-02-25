import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import UserContext from "../context/loginstate";

const TNCView = ({ children }) => {
  const router = useRouter();
  const { blk, id } = children;
  const userLoginState = useContext(UserContext);
  const [userRole, setUserRole] = useState();

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

  const changeDate = (input) => {
    const splitDateTime = input.split("T");
    const onlyDate = splitDateTime[0];
    const splitDate = onlyDate.split("-");
    return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
  };

  return (
    <article>
      <p>Project Manager in Charge: {blk.projectmanager}</p>
      <p>Construction Date: {changeDate(blk.constructiondate)}</p>
      <p>Testing and Commissioning Date: {changeDate(blk.tncdate)}</p>
      <p>Total Block Capacity (kWp): {blk.capacity_kwp}</p>
      <p>No. of Panels: {blk.panels}</p>
      <p>Panel Maximum Power (Pmax/W): {blk.panelkwp}</p>
      {userRole === "Staff" ? (
        <button onClick={() => router.push(`/block/${id}/update`)}>
          Ready for Turn On
        </button>
      ) : (
        <></>
      )}
    </article>
  );
};

export default TNCView;
