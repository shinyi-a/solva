import axios from "axios";
import React, { useState } from "react";

export default function AddBlock() {
  const [blockInput, setBlockInput] = useState({
    postalcode: "",
    capacity_kwp: "",
    panels: "",
    panelkwp: "",
    status: "pending",
    projectmanager: "",
    pendingdate: new Date(),
    constructiondate: "",
    tncdate: "",
    turnondate: "",
    tncreport_doc: "",
    asbulit_doc: "",
  });
  const [postalEmpty, setPostalEmpty] = useState(null);
  const [postalValid, setPostalValid] = useState(null);
  //   const cap = Math.round(panels * capacity_kwp * 100 + Number.EPSILON) / 100;
  //to validate postal length - must input 6 numbers
  const validatePostal = (pwd) => {
    const re = /^[0-9]{6,6}$/;
    return re.test(pwd);
  };

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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (blockInput.postalcode && postalValid) {
      axios
        .post(`${process.env.API_ENDPOINT}/block`, blockInput)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log("err");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="postalcode">Postal Code: </label>
      <input
        type="number"
        name="postalcode"
        id="postalcode"
        onChange={handleChange}
        onBlur={handlePostalBlur}
        placeholder="Postal Code"
      />
      <br />
      {postalEmpty ? <span>Please enter postal code.</span> : ""}
      <br />
      {postalValid === false ? <span>Please enter a 6 digit number.</span> : ""}
      <br />
      <input type="submit" name="submitAddBlock" id="submitAddBlock" />
    </form>
  );
}
