import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const UpdateTnC = ({ children }) => {
  const id = children.postalcode;
  const [tncdateInput, setTncdateInput] = useState({
    ...children,
    status: "Testing and Commissioning",
  });
  const [inputEmpty, setInputEmpty] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    let dateinput = e.target.value;
    setTncdateInput({ ...tncdateInput, tncdate: dateinput });
    console.log(tncdateInput);
  };

  const handleBlur = () => {
    !tncdateInput.tncdate ? setInputEmpty(true) : setInputEmpty(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputEmpty && tncdateInput.tncdate) {
      try {
        axios.put(`${process.env.API_ENDPOINT}/block/${id}`, tncdateInput);
        router.push(`/block/${id}`);
      } catch (err) {
        router.push("/failedlisting");
        console.log(err);
        console.log("update failed: ", err);
      }
    } else {
      console.log("err");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="tncdate">Testing and Commissioning Date: </label>
      <input
        type="date"
        name="tncdate"
        id="tncdate"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <br />
      {inputEmpty ? <span>Please enter date.</span> : ""}
      <br />
      <input type="submit" />
    </form>
  );
};

export default UpdateTnC;
