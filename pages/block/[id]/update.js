import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import UpdateContruction from "../../../components/constructioncard";
import UpdateTnC from "../../../components/tnccard";
import UpdateTurnon from "../../../components/turnoncard";
import axios from "axios";
import Footer from "../../../components/footer";

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
    if (id !== undefined) {
      loadBlk();
    }
  }, [id]);

  if (loadingBlk) {
    if (blk.status === "Pending") {
      return (
        <>
          <div className="updatecontainer">
            <div className="updatecard">
              <h2 className="title">Enter Construction Details</h2>
              <h3>Postal Code: {id}</h3>
              <UpdateContruction>{blk}</UpdateContruction>
            </div>
          </div>
          <Footer />
        </>
      );
    }
    if (loadingBlk && blk.status === "Construction") {
      return (
        <>
          <div className="updatecontainer">
            <div className="updatecard">
              <h2 className="title">Enter T&amp;C Details</h2>
              <h3>Postal Code: {id}</h3>
              <UpdateTnC>{blk}</UpdateTnC>
            </div>
          </div>
          <Footer />
        </>
      );
    }
    if (loadingBlk && blk.status === "Testing and Commissioning") {
      return (
        <>
          <div className="updatecontainer">
            <div className="updatecard">
              <h2 className="title">Enter Turn On Details</h2>
              <h3>Postal Code: {id}</h3>
              <UpdateTurnon>{blk}</UpdateTurnon>
            </div>
          </div>
          <Footer />
        </>
      );
    }
  } else {
    return <h1>loading...</h1>;
  }
};
export default BlockEdit;
