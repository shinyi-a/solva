// import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Footer from "../components/footer";
import jwtDecode from "jwt-decode";
import UserContext from "../context/loginstate";

export default function AddUser() {
  const userLoginState = useContext(UserContext);
  const [userRole, setUserRole] = useState();
  const router = useRouter();
  const [signupInput, setSignupInput] = useState({
    firstname: "",
    email: "",
    password: "",
    usertype: "Auditor",
  });
  const [firstnameEmpty, setFirstnameEmpty] = useState(null);
  const [emailEmpty, setEmailEmpty] = useState(null);
  const [passwordEmpty, setPasswordEmpty] = useState(null);
  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);

  //to validate email
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  //to validate password length - min: 6, max: 20
  const validatePassword = (pwd) => {
    const re = /^.{6,20}$/;
    return re.test(pwd);
  };

  //set user input
  const handleChange = (e) => {
    const label = e.target.name;
    const value = e.target.value;
    setSignupInput({ ...signupInput, [label]: value });
    console.log(signupInput);
  };

  //check if input fields are empty
  const handleFirstnameBlur = () => {
    !signupInput.firstname ? setFirstnameEmpty(true) : setFirstnameEmpty(false);
  };

  const handleEmailBlur = () => {
    if (!signupInput.email) {
      setEmailValid(null);
      setEmailEmpty(true);
    } else {
      const isValid = validateEmail(signupInput.email);
      setEmailValid(isValid);
      setEmailEmpty(false);
    }
  };

  const handlePasswordBlur = () => {
    if (!signupInput.password) {
      setPasswordValid(null);
      setPasswordEmpty(true);
    } else {
      const isValid = validatePassword(signupInput.password);
      setPasswordValid(isValid);
      setPasswordEmpty(false);
    }
  };

  //post user input
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      signupInput.firstname &&
      signupInput.email &&
      signupInput.password &&
      emailValid &&
      passwordValid
    ) {
      try {
        const res = await fetch(`${process.env.API_ENDPOINT}/user`, {
          method: "POST",
          body: JSON.stringify(signupInput),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        router.push(`/user/${data._id}`);
      } catch (err) {
        console.log(err);
        // router.push('/failedlisting')
      }
    } else {
      console.log("err");
    }
  };

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

  useEffect(() => {
    if (!userLoginState.isLoggedIn) {
      router.push("/");
    }
  }, [userLoginState]);

  useEffect(() => {
    if (userRole === "Auditor") {
      router.push("/turnon");
    }
  }, [userRole]);

  return (
    <>
      <div className="addcontainer">
        <div className="addcard">
          <h2 className="title">Add New Auditor</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="firstname">Name: </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              onChange={handleChange}
              onBlur={handleFirstnameBlur}
            />
            <br />
            {firstnameEmpty ? (
              <span className="warning">Please enter name.</span>
            ) : (
              ""
            )}
            <br />
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={handleChange}
              onBlur={handleEmailBlur}
            />
            <br />
            {emailEmpty ? (
              <span className="warning">Please enter email.</span>
            ) : (
              ""
            )}
            {emailValid === false ? (
              <span className="warning">
                Please enter email in correct format.
              </span>
            ) : (
              ""
            )}
            <br />
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              onBlur={handlePasswordBlur}
            />
            <br />
            {passwordEmpty ? (
              <span className="warning">Please enter password.</span>
            ) : (
              ""
            )}
            {passwordValid === false ? (
              <span className="warning">
                Please enter between 6 to 20 letters for password.
              </span>
            ) : (
              ""
            )}
            <br />
            <input type="submit" name="submitSignup" id="submitSignup" />
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
