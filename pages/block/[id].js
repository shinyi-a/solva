import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import PendingView from "../../components/pendingview";
import ConstructionView from "../../components/constructionview";
import TNCView from "../../components/tncview";
import TurnonView from "../../components/turnonview";

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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      loadBlk();
    }
  }, [id]);

  if (loadingBlk) {
    if (blk.status === "Pending") {
      return <PendingView>{{ blk, id }}</PendingView>;
    }
    if (loadingBlk && blk.status === "Construction") {
      return <ConstructionView>{{ blk, id }}</ConstructionView>;
    }
    if (loadingBlk && blk.status === "Testing and Commissioning") {
      return <TNCView>{{ blk, id }}</TNCView>;
    }
    if (loadingBlk && blk.status === "Turned On") {
      return <TurnonView>{blk}</TurnonView>;
    }
  } else {
    return <h1>loading...</h1>;
  }
};

export default BlockDetails;
