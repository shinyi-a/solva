//this is the individual block page
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const BlockDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [blk, setBlk] = useState({});
  const [loadingBlk, setLoadingBlk] = useState(false);

  const loadBlk = async () => {
    try {
      const res = await axios.get(`${process.env.API_ENDPOINT}/block/${id}`);
      setBlk(res.data[0]);
      setLoadingBlk(true);
      console.log(replydata[0].status);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadBlk();
  }, []);

  let statusName = "";
  if (loadingBlk) {
    switch (true) {
      case blk.status.toString() === "pending":
        statusName = "Pending";
        break;
      case blk.status.toString() === "construction":
        statusName = "Under Construction";
        break;
      case blk.status.toString() === "tnc":
        statusName = "Waiting for Testing and Commissioning";
        break;
      case blk.status.toString() === "turnon":
        statusName = "Turned On";
        break;
    }
  }

  return (
    <div>
      <h1>{id}</h1>
      {loadingBlk ? (
        <>
          <h3>Status: {statusName}</h3>
          <h4>Project Manager in Charge: {blk.projectmanager}</h4>
          <h4>Block Capacity (kWp): {blk.capacity_kwp}</h4>
          <h4>No. of Panels: {blk.panels}</h4>
          <h4>Panel Maximum Power (Pmax/W): {blk.panelkwp}</h4>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default BlockDetails;
