import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import UpdateContruction from "../../../components/constructioncard";
import UpdateTnC from "../../../components/tnccard";
import UpdateTurnon from "../../../components/turnoncard";
import axios from "axios";

const BlockEdit = () => {
  const router = useRouter();
  const { id } = router.query;
  const [blk, setBlk] = useState({});
  const [loadingBlk, setLoadingBlk] = useState(false);

  const loadBlk = async () => {
    try {
      const res = await axios.get(`${process.env.API_ENDPOINT}/block/${id}`);
      setBlk(res.data[0]);
      setLoadingBlk(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadBlk();
  }, []);

  if (loadingBlk) {
    if (blk.status === "Pending") {
      return <UpdateContruction>{blk}</UpdateContruction>;
    }
    if (loadingBlk && blk.status === "Construction") {
      return <UpdateTnC>{blk}</UpdateTnC>;
    }
    if (loadingBlk && blk.status === "Testing and Commissioning") {
      return <UpdateTurnon>{blk}</UpdateTurnon>;
    }
  } else {
    return <h1>loading...</h1>;
  }
};
export default BlockEdit;
