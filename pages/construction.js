import Link from "next/link";
import Footer from "../components/dashboardfooter";

const Construction = ({ hdbblocks }) => {
  return (
    <div className="blockviewcontainer">
      <div className="blockview">
        <h2 className="title">All Construction Blocks</h2>
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
      <Footer />
    </div>
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
