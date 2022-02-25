// import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";
import Footer from "../components/footer";
import UserContext from "../context/loginstate";

export default function AddBlock() {
  const userLoginState = useContext(UserContext);
  const [userRole, setUserRole] = useState();

  const router = useRouter();
  const [blockInput, setBlockInput] = useState({
    postalcode: "",
    capacity_kwp: "",
    panels: "",
    panelkwp: "",
    status: "Pending",
    projectmanager: "",
    email: "",
    pendingdate: new Date(),
    constructiondate: "",
    tncdate: "",
    turnondate: "",
    tncreport_doc: "",
    asbulit_doc: "",
  });
  const [postalEmpty, setPostalEmpty] = useState(null);
  const [postalValid, setPostalValid] = useState(null);

  //to validate postal length - must input 6 numbers
  const validatePostal = (pwd) => {
    const re = /^[0-9]{6,6}$/;
    return re.test(pwd);
  };

  //check user type
  const decodeToken = () => {
    console.log("Inside Header.tsx: decoding local storage token");
    let token = localStorage.getItem("token");
    console.log("Current Token: ", token);

    if (token) {
      let decodedToken = jwtDecode(token);
      console.log("Current decoded Token", decodedToken);
      if (decodedToken) {
        setUserRole(decodedToken.role);
        setBlockInput({
          ...blockInput,
          email: decodedToken.sub,
          projectmanager: decodedToken.firstname,
        });
      }
    }
  };

  useEffect(() => {
    decodeToken();
  }, []);

  //set user input
  const handleChange = (e) => {
    const label = e.target.name;
    const value = e.target.value;
    setBlockInput({ ...blockInput, [label]: value });
    console.log(blockInput);
  };

  //check if input fields are empty
  const handlePostalBlur = () => {
    if (!blockInput.postalcode) {
      setPostalValid(null);
      setPostalEmpty(true);
    } else {
      const isValid = validatePostal(blockInput.postalcode);
      setPostalValid(isValid);
      setPostalEmpty(false);
    }
  };

  //post user input
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (blockInput.postalcode && postalValid && userRole === "Staff") {
      //   axios
      //     .post(`${process.env.API_ENDPOINT}/block`, blockInput)
      //     .then(function (response) {
      //       console.log(response);
      //       router.push(`/block/${blockInput.postalcode}`);
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });
      try {
        const res = await fetch(`${process.env.API_ENDPOINT}/block`, {
          method: "POST",
          body: JSON.stringify(blockInput),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log("this is sent to server");
        console.log(blockInput);
        router.push(`/block/${data.postalcode}`);
      } catch (err) {
        console.log(err);
        // router.push("/failedlisting");
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
    if (userRole === "Admin") {
      router.push("/dashboard");
    }
  }, [userRole]);

  return (
    <>
      <div className="addcontainer">
        <div className="addcard">
          <h2 className="title">Add New Block</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="postalcode">Postal Code: </label>
            <input
              type="number"
              name="postalcode"
              id="postalcode"
              min="0"
              onChange={handleChange}
              onBlur={handlePostalBlur}
              placeholder="Postal Code"
            />
            <br />
            {postalEmpty ? (
              <span className="warning">Please enter postal code.</span>
            ) : (
              ""
            )}
            {postalValid === false ? (
              <span className="warning">Please enter a 6 digit number.</span>
            ) : (
              ""
            )}
            <br />
            <input type="submit" name="submitAddBlock" id="submitAddBlock" />
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
