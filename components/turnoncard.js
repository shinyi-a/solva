// import React, { useState } from "react";
// import { useRouter } from "next/router";
// import axios from "axios";

const UpdateTurnon = ({ children }) => {
  const id = children.postalcode;
  // const [tncdateInput, setTncdateInput] = useState({
  //   ...children,
  //   status: "Turned On",
  // });
  // const [inputEmpty, setInputEmpty] = useState(null);
  // const router = useRouter();

  return (
    <form>
      <label htmlFor="turnondate">Turned On Date: </label>
      <input type="date" name="turnondate" id="turnondate" />
      <br />
      <label htmlFor="tncreport_doc">
        Upload Testing and Commissioning Report:{" "}
      </label>
      <input type="text" name="tncreport_doc" id="tncreport_doc" />
      <br />
      <label htmlFor="asbulit_doc">Upload As-Built Drawing: </label>
      <input type="text" name="asbulit_doc" id="asbulit_doc" />
      <br />
      <input type="submit" />
    </form>
  );
};

export default UpdateTurnon;
