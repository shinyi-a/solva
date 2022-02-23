import Link from "next/link";

const Pending = ({ hdbblocks }) => {
  return (
    <div className="blockviewcontainer">
      <div className="blockview">
        <h2 className="title">All Pending Blocks</h2>
        <ul>
          {hdbblocks.map((blk) => (
            <Link href={`/block/${blk.postalcode}`} key={blk._id}>
              <li key={blk._id}>
                <span className="postalhighlight">{blk.postalcode}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch(`${process.env.API_ENDPOINT}/block/pending`);
  const hdbblocks = await res.json();
  return {
    props: {
      hdbblocks,
    },
  };
}

export default Pending;
////////////////////////////////////////////////////////////////////////////////////////////

// import { useState, useEffect } from "react";
// import axios from "axios";
// import Link from "next/link";

// const Pending = () => {
//   const [allPending, setAllPending] = useState([]);
//   const [loadingAll, setLoadingAll] = useState(false);

//   const loadPending = async () => {
//     try {
//       const res = await axios.get(`${process.env.API_ENDPOINT}/block/pending`);
//       setAllPending(res.data);
//       setLoadingAll(true);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     loadPending();
//   }, []);

//   const PendingData = () => (
//     <div>
//       <ul>
//         {allPending.map((blk) => (
//           <Link href={`/block/${blk.postalcode}`} key={blk._id}>
//             <li key={blk._id}> {blk.postalcode} </li>
//           </Link>
//         ))}
//       </ul>
//     </div>
//   );

//   return (
//     <>
//       <h1>All Pending Blocks</h1>
//       {loadingAll ? PendingData() : <h3>Loading...</h3>}
//     </>
//   );
// };

// export default Pending;
