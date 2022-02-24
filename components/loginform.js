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
    setLoginInput({ ...loginInput, [label]: value });
    console.log(loginInput);
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
          console.log("invalid email or password");
        }

        //Assign JWT to local storage once login successful
        localStorage.setItem("token", decodedResponse.token);
        //setState to login
        userLoginContext.setLoginState(true);
        SetLoginError(null);
        let currenttoken = decodedResponse.token;
        let decodedToken = jwtDecode(currenttoken);
        if (decodedToken) {
          setUserRole(decodedToken.role);
        }
        if (userRole) {
          if (userRole === "Auditor") {
            router.push("/turnon");
          } else {
            router.push("/dashboard");
          }
        }

        //redirect user to home page (for when user just logged in, prior not logged in before)
        // console.log("this is stored into storage");
        // console.log(decodedResponse.token);
        // router.push("/dashboard");
        // try {
        //   router.push("/dashboard");
        // } catch (error) {
        //   console.log(error.message);
        // }
      } catch (err) {
        try {
          console.log(err);
        } catch (modalWindowError) {
          console.log(
            "ErrorModalWindow Window Error: " + modalWindowError.message
          );
        }
      }
      //   axios
      //     .post(`${process.env.API_ENDPOINT}/user`, loginInput)
      //     .then(function (response) {
      //       console.log(response);
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });
    } else {
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
