import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import UserContext from "../context/loginstate";
import jwtDecode from "jwt-decode";

const NavBar = () => {
  const userLoginState = useContext(UserContext);
  const [userRole, setUserRole] = useState();
  const [userUserid, setUserid] = useState();

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
        setUserid(decodedToken.userid);
      }
    }
  };

  useEffect(() => {
    checkLoginStatus();
    console.log("current user role", userRole);
    console.log("current user id" + userUserid);
  }, []);

  useEffect(() => {
    decodeToken();
    console.log("current user role", userRole);
    console.log("current user id" + userUserid);
  }, [userLoginState]);

  if (userRole === "Staff") {
    return (
      <ul>
        <Link href="/addblock">
          <a>
            <li className="navlink">
              <span className="material-icons md-24">&#xeb62;</span> Add New
              Block
            </li>
          </a>
        </Link>
        <Link href="/all">
          <a>
            <li className="navlink">
              <span className="material-icons md-24">&#xe7ee;</span> All HDB
              Blocks
            </li>
          </a>
        </Link>
        <Link href="/pending">
          <a>
            <li className="navlink">
              <span className="material-icons md-24">&#xf1bb;</span> Pending
            </li>
          </a>
        </Link>
        <Link href="/construction">
          <a>
            <li className="navlink">
              <span className="material-icons md-24">&#xea3c;</span>{" "}
              Construction
            </li>
          </a>
        </Link>
        <Link href="/TnC">
          <a>
            <li className="navlink">
              <span className="material-icons md-24">&#xea3d;</span> Testing and
              Commissioning
            </li>
          </a>
        </Link>
        <Link href="/turnon">
          <a>
            <li className="navlink">
              <span className="material-icons md-24">&#xec0f;</span> Turned On
            </li>
          </a>
        </Link>
        <Link href={`/user/${userUserid}`}>
          <a>
            <li className="navlink">
              <span className="material-icons md-24">&#xf1d0;</span> Your Blocks
            </li>
          </a>
        </Link>
      </ul>
    );
  }

  if (userRole === "Admin") {
    return (
      <ul>
        <Link href="/all">
          <a>
            <li className="navlink">
              <span className="material-icons md-24">&#xe7ee;</span> All HDB
              Blocks
            </li>
          </a>
        </Link>
        <Link href="/pending">
          <a>
            <li className="navlink">
              <span className="material-icons md-24">&#xf1bb;</span> Pending
            </li>
          </a>
        </Link>
        <Link href="/construction">
          <a>
            <li className="navlink">
              <span className="material-icons md-24">&#xea3c;</span>{" "}
              Construction
            </li>
          </a>
        </Link>
        <Link href="/TnC">
          <a>
            <li className="navlink">
              <span className="material-icons md-24">&#xea3d;</span> Testing and
              Commissioning
            </li>
          </a>
        </Link>
        <Link href="/turnon">
          <a>
            <li className="navlink">
              <span className="material-icons md-24">&#xec0f;</span> Turned On
            </li>
          </a>
        </Link>
      </ul>
    );
  }

  if (!userRole) {
    return <div>loading</div>;
  }
};

export default NavBar;
