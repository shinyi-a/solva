import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const UpdateContruction = ({ children }) => {
  const id = children.postalcode;
  const [userInput, setUserInput] = useState({
    ...children,
    status: "Construction",
  });
  const [dateEmpty, setDateEmpty] = useState(null);
  const [typeEmpty, setTypeEmpty] = useState(null);
  const [panelEmpty, setPanelEmpty] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const label = e.target.name;
    const value = e.target.value;
    const blockcapacity = 0;
    if (!typeEmpty && !panelEmpty) {
      blockcapacity = (userInput.panelkwp * userInput.panels) / 1000;
    }
    setUserInput({ ...userInput, capacity_kwp: blockcapacity, [label]: value });
  };

  const handleDateBlur = () => {
    !userInput.constructiondate ? setDateEmpty(true) : setDateEmpty(false);
  };

  const handleTypeBlur = () => {
    !userInput.panelkwp ? setTypeEmpty(true) : setTypeEmpty(false);
  };

  const handlePanelBlur = () => {
    !userInput.panels ? setPanelEmpty(true) : setPanelEmpty(false);
  };

  const displayCapacity = 0;
  if (!typeEmpty && !panelEmpty) {
    displayCapacity = (userInput.panelkwp * userInput.panels) / 1000;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dateEmpty && !typeEmpty && !panelEmpty) {
      try {
        axios.put(`${process.env.API_ENDPOINT}/block/${id}`, userInput);
        router.push(`/block/${id}`);
      } catch (err) {
        console.log(err);
        console.log("update failed: ", err);
        router.push("/404");
      }
    } else {
      console.log("err");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="constructiondate">Construction Start Date: </label>
      <input
        type="date"
        name="constructiondate"
        id="constructiondate"
        onChange={handleChange}
        onBlur={handleDateBlur}
      />
      <br />
      {dateEmpty ? <span className="warning">Please enter date.</span> : ""}
      <br />
      <label>Total Block Capacity (kWp): {displayCapacity}</label>
      <br />
      <br />
      <label htmlFor="panelkwp">Panel Maximum Power (Pmax/W): </label>
      <select
        name="panelkwp"
        id="panelkwp"
        onChange={handleChange}
        onBlur={handleTypeBlur}
      >
        <option value="">Panel Type</option>
        <option value="375">375 Wp</option>
        <option value="385">385 Wp</option>
        <option value="395">395 Wp</option>
        <option value="405">405 Wp</option>
      </select>
      <br />
      {typeEmpty ? (
        <span className="warning">Please select panel type.</span>
      ) : (
        ""
      )}
      <br />
      <label htmlFor="panels">No. of Panels: </label>
      <input
        type="number"
        name="panels"
        id="panels"
        min="0"
        onChange={handleChange}
        onBlur={handlePanelBlur}
      />
      <br />
      {panelEmpty ? (
        <span className="warning">Please enter number of panels.</span>
      ) : (
        ""
      )}
      <br />
      <input type="submit" />
    </form>
  );
};

export default UpdateContruction;
