import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Dashboard = () => {
  const [constructionHDB, setConstructionHDB] = useState([]);
  const [tncHDB, setTnCHDB] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //   const loadConstruction = async () => {
  //     try {
  //       const res = await axios.get(
  //         `${process.env.API_ENDPOINT}/block/construction`
  //       );
  //       setConstructionHDB(res.data);
  //       setLoading(false);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   const loadTnC = async () => {
  //     try {
  //       const res = await axios.get(`${process.env.API_ENDPOINT}/block/tnc`);
  //       setTnCHDB(res.data);
  //       setLoading(false);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  const loadTest = async () => {
    try {
      const res = await axios.get(`${process.env.API_ENDPOINT}/block/all`);
      console.log(res.data);
      setTnCHDB(res.data);
      setLoading(true);
    } catch (err) {
      console.log("this is err: " + err);
    }
  };

  useEffect(() => {
    // loadConstruction();
    // loadTnC();
    loadTest();
  }, []);

  //   const testdata = tncHDB.map((item) => {
  //     const testhdb = item.postalcode;
  //     return <h1>{testhdb}</h1>;
  //   });

  // const testdata = tncHDB[0];
  const testdata = tncHDB.map((blk) => {
    return (
      <div key={blk._id}>
        <p>{blk.postalcode}</p>
      </div>
    );
  });
  // console.log(tncHDB[1].postalcode);

  return (
    <>
      <h1>hello world</h1>
      {loading ? testdata : <h1>waiting</h1>}
    </>
  );
};

export default Dashboard;
