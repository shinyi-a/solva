// import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";

export default function AddUser() {
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

  return (
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
      {firstnameEmpty ? <span>Please enter name.</span> : ""}
      <br />
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
      {emailEmpty ? <span>Please enter email.</span> : ""}
      <br />
      {emailValid === false ? (
        <span>Please enter email in correct format.</span>
      ) : (
        ""
      )}
      <br />
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
      {passwordEmpty ? <span>Please enter password.</span> : ""}
      <br />
      {passwordValid === false ? (
        <span>Please enter between 6 to 20 letters for password.</span>
      ) : (
        ""
      )}
      <br />
      <br />
      <input type="submit" name="submitSignup" id="submitSignup" />
    </form>
  );
}
