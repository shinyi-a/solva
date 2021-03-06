import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import UserContext from "../context/loginstate";
import jwtDecode from "jwt-decode";

export default function Login() {
  const router = useRouter();
  const userLoginContext = useContext(UserContext);
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const [emailEmpty, setEmailEmpty] = useState(null);
  const [passwordEmpty, setPasswordEmpty] = useState(null);
  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [loginError, SetLoginError] = useState(null);
  const [emptyInput, setEmptyInput] = useState(null);
  const [userRole, setUserRole] = useState();

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
    SetLoginError(false);
    setEmptyInput(false);
    setLoginInput({ ...loginInput, [label]: value });
  };

  //check if input fields are empty
  const handleEmailBlur = () => {
    if (!loginInput.email) {
      setEmailValid(null);
      setEmailEmpty(true);
    } else {
      const isValid = validateEmail(loginInput.email);
      setEmailValid(isValid);
      setEmailEmpty(false);
    }
  };

  const handlePasswordBlur = () => {
    if (!loginInput.password) {
      setPasswordValid(null);
      setPasswordEmpty(true);
    } else {
      const isValid = validatePassword(loginInput.password);
      setPasswordValid(isValid);
      setPasswordEmpty(false);
    }
  };

  //post user input
  const handleSubmit = async (e) => {
    e.preventDefault();
    SetLoginError(false);
    if (
      loginInput.email &&
      loginInput.password &&
      emailValid &&
      passwordValid
    ) {
      try {
        //Login Post request
        const response = await fetch(`${process.env.API_ENDPOINT}/sessions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginInput),
        });

        const decodedResponse = await response.json();

        if (decodedResponse.status === 401) {
          SetLoginError({
            status: decodedResponse.status,
            message: decodedResponse.message,
          });
          setLoginInput({ email: "", password: "" });
          email.value = "";
          password.value = "";
          console.log("invalid email or password");
        }

        //Assign JWT to local storage once login successful
        if (decodedResponse.token !== undefined) {
          localStorage.setItem("token", decodedResponse.token);
          //setState to login
          userLoginContext.setLoginState(true);
          SetLoginError(null);
          let currenttoken = decodedResponse.token;
          let decodedToken = jwtDecode(currenttoken);
          if (decodedToken) {
            setUserRole(decodedToken.role);
            if (decodedToken.role === "Auditor") {
              router.push("/turnon");
            } else {
              router.push("/dashboard");
            }
          }
        }
      } catch (err) {
        router.push("/404");
        try {
          console.log(err);
        } catch (modalWindowError) {
          console.log(
            "ErrorModalWindow Window Error: " + modalWindowError.message
          );
        }
      }
    } else {
      setEmptyInput(true);
      console.log("err");
    }
  };

  if (!userLoginContext.isLoggedIn) {
    return (
      <div className="loginlanding">
        <div className="loginbar">
          <form onSubmit={handleSubmit} className="loginform">
            <div className="loginlogo">
              <img src="/logo.png" width="80px" height="80px" />
              <h1 className="logo loginlogo loginlogopadding">SOLVA</h1>
            </div>
            <div className="logininput">
              <label htmlFor="email">Email:</label>
              <br />
              <input
                type="text"
                name="email"
                id="email"
                placeholder="example@solva.com"
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
              <br />
              <label htmlFor="password">Password: </label>
              <br />
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
              <br />
              <input
                className="loginbtn"
                type="submit"
                name="submitSignup"
                id="submitSignup"
              />
              {loginError ? (
                <span className="warning">
                  Wrong email or password. Try again.
                </span>
              ) : (
                ""
              )}
              {emptyInput ? (
                <span className="warning">
                  Empty/invalid field(s). Please enter login credentials.
                </span>
              ) : (
                ""
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (!userLoginContext || userLoginContext.isLoggedIn) {
    return <></>;
  }
}
