import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { create } from "ipfs-http-client";

const UpdateTurnon = ({ children }) => {
  const id = children.postalcode;
  const [userInput, setUserInput] = useState({
    ...children,
    status: "Turned On",
  });
  const [dateEmpty, setDateEmpty] = useState(null);
  const [reportEmpty, setReportEmpty] = useState(null);
  const [drawingEmpty, setDrawingEmpty] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const label = e.target.name;
    const value = e.target.value;
    setUserInput({ ...userInput, [label]: value });
  };

  const handleDateBlur = () => {
    !userInput.turnondate ? setDateEmpty(true) : setDateEmpty(false);
  };

  const handleReportBlur = () => {
    !userInput.tncreport_doc ? setReportEmpty(true) : setReportEmpty(false);
  };

  const handleDrawingBlur = () => {
    !userInput.asbulit_doc ? setDrawingEmpty(true) : setDrawingEmpty(false);
  };

  const url = "https://ipfs.infura.io:5001/api/v0";
  const client = create(url);

  const [reportUrl, setReportUrl] = useState("");
  const [drawingUrl, setDrawingUrl] = useState("");

  const onReportUpload = async (e) => {
    const report = e.target.files[0];
    try {
      const addedReport = await client.add(report);
      const reportUrl = `https://ipfs.infura.io/ipfs/${addedReport.path}`;
      console.log("ipfs url: ", reportUrl);
      setUserInput({ ...userInput, tncreport_doc: reportUrl });
      setReportUrl(reportUrl);
      setReportEmpty(false);
    } catch (e) {
      // router.push("/404");
      console.log("Error uploading file: ", e);
    }
  };
  const onDrawingUpload = async (e) => {
    const drawing = e.target.files[0];
    try {
      const addedDrawing = await client.add(drawing);
      const drawingUrl = `https://ipfs.infura.io/ipfs/${addedDrawing.path}`;
      console.log("ipfs url: ", drawingUrl);
      setUserInput({ ...userInput, asbulit_doc: drawingUrl });
      setDrawingUrl(drawingUrl);
      setDrawingEmpty(false);
    } catch (e) {
      // router.push("/404");
      console.log("Error uploading file: ", e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !dateEmpty &&
      !reportEmpty &&
      !drawingEmpty &&
      reportUrl &&
      drawingUrl &&
      userInput.turnondate
    ) {
      try {
        axios.put(`${process.env.API_ENDPOINT}/block/${id}`, userInput);
        router.push(`/block/${id}`);
      } catch (err) {
        // router.push("/404");
        console.log(err);
        console.log("update failed: ", err);
      }
    } else {
      console.log("err");
    }
  };

  return (
    <form>
      <label htmlFor="turnondate">Turned On Date: </label>
      <input
        type="date"
        name="turnondate"
        id="turnondate"
        onChange={handleChange}
        onBlur={handleDateBlur}
      />
      <br />
      {dateEmpty ? <span className="warning">Please enter date.</span> : ""}
      <br />
      <label htmlFor="tncreport_doc">
        Upload Testing and Commissioning Report:{" "}
      </label>
      <input
        type="file"
        name="tncreport_doc"
        id="tncreport_doc"
        onChange={onReportUpload}
        onBlur={handleReportBlur}
      />
      <br />
      {reportEmpty ? (
        <span className="warning">
          Please upload testing and commissioning report.
        </span>
      ) : (
        ""
      )}
      <br />
      <label htmlFor="asbulit_doc">Upload As-Built Drawing: </label>
      <input
        type="file"
        name="asbulit_doc"
        id="asbulit_doc"
        onChange={onDrawingUpload}
        onBlur={handleDrawingBlur}
      />
      <br />
      {drawingEmpty ? (
        <span className="warning">Please upload as-built drawing.</span>
      ) : (
        ""
      )}
      <br />
      <input type="submit" onClick={handleSubmit} />
    </form>
  );
};

export default UpdateTurnon;
