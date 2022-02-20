import Link from "next/link";

const Turnon = ({ hdbblocks }) => {
  return (
    <>
      <h1>All Turned On Blocks</h1>
      <ul>
        {hdbblocks.map((blk) => (
          <Link href={`/block/${blk.postalcode}`} key={blk._id}>
            <li key={blk._id}> {blk.postalcode} </li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export async function getStaticProps() {
  const res = await fetch(`${process.env.API_ENDPOINT}/block/turnon`);
  const hdbblocks = await res.json();
  return {
    props: {
      hdbblocks,
    },
  };
}

export default Turnon;
////////////////////////////////////////////////////////////////////////////////////////////

// import { useState, useEffect } from "react";
// import axios from "axios";
// import Link from "next/link";

// const Turnon = () => {
//   const [allTurnon, setAllTurnon] = useState([]);
//   const [loadingAll, setLoadingAll] = useState(false);

//   const loadAll = async () => {
//     try {
//       const res = await axios.get(`${process.env.API_ENDPOINT}/block/turnon`);
//       setAllTurnon(res.data);
//       setLoadingAll(true);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     loadAll();
//   }, []);

//   const allData = () => (
//     <div>
//       <ul>
//         {allTurnon.map((blk) => (
//           <Link href={`/block/${blk.postalcode}`} key={blk._id}>
//             <li key={blk._id}> {blk.postalcode} </li>
//           </Link>
//         ))}
//       </ul>
//     </div>
//   );

//   return (
//     <>
//       <h1>All Turned On Blocks</h1>
//       {loadingAll ? allData() : <h3>Loading...</h3>}
//     </>
//   );
// };

// export default Turnon;
