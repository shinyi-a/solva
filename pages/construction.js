import Link from "next/link";

const Construction = ({ hdbblocks }) => {
  return (
    <>
      <h1>All Construction Blocks</h1>
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
  const res = await fetch(`${process.env.API_ENDPOINT}/block/construction`);
  const hdbblocks = await res.json();
  return {
    props: {
      hdbblocks,
    },
  };
}

export default Construction;
////////////////////////////////////////////////////////////////////////////////////////////

// import { useState, useEffect } from "react";
// import axios from "axios";
// import Link from "next/link";

// const Construction = () => {
//   const [allConstruction, setAllConstruction] = useState([]);
//   const [loadingAll, setLoadingAll] = useState(false);

//   const loadConstruction = async () => {
//     try {
//       const res = await axios.get(
//         `${process.env.API_ENDPOINT}/block/construction`
//       );
//       setAllConstruction(res.data);
//       setLoadingAll(true);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     loadConstruction();
//   }, []);

//   const constructionData = () => (
//     <div>
//       <ul>
//         {allConstruction.map((blk) => (
//           <Link href={`/block/${blk.postalcode}`} key={blk._id}>
//             <li key={blk._id}> {blk.postalcode} </li>
//           </Link>
//         ))}
//       </ul>
//     </div>
//   );

//   return (
//     <>
//       <h1>All Construction Blocks</h1>
//       {loadingAll ? constructionData() : <h3></h3>}
//     </>
//   );
// };

// export default Construction;
