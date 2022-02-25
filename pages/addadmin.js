// import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Footer from "../components/footer";
import jwtDecode from "jwt-decode";
import UserContext from "../context/loginstate";

// import { useAuth } from "../context/authcontext";
// import { auth } from "../firebase";
// import { getAuth } from "firebase/auth";
// import app from "../firebase";

// import { createUserWithEmailAndPassword } from "firebase/auth";

export default function AddAdmin() {
  const userLoginState = useContext(UserContext);
  const [userRole, setUserRole] = useState();
  const [signupInput, setSignupInput] = useState({
    firstname: "",
    email: "",
    password: "",
    usertype: "",
  });
  const [firstnameEmpty, setFirstnameEmpty] = useState(null);
  const [emailEmpty, setEmailEmpty] = useState(null);
  const [passwordEmpty, setPasswordEmpty] = useState(null);
  const [userRoleEmpty, setUserRoleEmpty] = useState(null);
  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const router = useRouter();

  //   const { signup } = useAuth();
  //   const auth = getAuth(app);

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

  const handleUserBlur = () => {
    !signupInput.usertype ? setUserRoleEmpty(true) : setUserRoleEmpty(false);
  };

  //post user input
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      signupInput.firstname &&
      signupInput.email &&
      signupInput.password &&
      signupInput.usertype &&
      emailValid &&
      passwordValid
    ) {
      // axios
      //   .post(`${process.env.API_ENDPOINT}/user`, signupInput)
      //   .then(function (response) {
      //     console.log(response);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
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
      router.push("/404");
    }
  }, [userLoginState]);

  useEffect(() => {
    if (userRole === "Auditor") {
      router.push("/turnon");
    }
  }, [userRole]);

  useEffect(() => {
    if (userRole === "Staff") {
      router.push("/dashboard");
    }
  }, [userRole]);

  return (
    <>
      <div className="addcontainer">
        <div className="addcard">
          <h2 className="title">Add New User</h2>
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
            <label htmlFor="usertype">Select a user role: </label>
            <select
              name="usertype"
              id="usertype"
              onChange={handleChange}
              onBlur={handleUserBlur}
            >
              <option value="">User role</option>
              <option value="Staff">Staff</option>
              <option value="Auditor">Auditor</option>
            </select>
            <br />
            {userRoleEmpty ? <span>Please select a user role.</span> : ""}
            <br />
            <input type="submit" name="submitSignup" id="submitSignup" />
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
