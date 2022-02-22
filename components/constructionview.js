import { useRouter } from "next/router";

const ConstructionView = ({ children }) => {
  const router = useRouter();
  const { blk, id } = children;
  const splitDateTime = blk.constructiondate.split("T");
  const onlyDate = splitDateTime[0];
  const splitDate = onlyDate.split("-");
  const displaydate = `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
  return (
    <article>
      <p>Postal Code: {blk.postalcode}</p>
      <p>Block Status: {blk.status}</p>
      <p>Project Manager in Charge: {blk.projectmanager}</p>
      <p>Construction Date: {displaydate}</p>
      <p>Total Block Capacity (kWp): {blk.capacity_kwp}</p>
      <p>No. of Panels: {blk.panels}</p>
      <p>Panel Maximum Power (Pmax/W): {blk.panelkwp}</p>
      <button onClick={() => router.push(`/block/${id}/update`)}>
        Ready for Testing and Commissioning
      </button>
    </article>
  );
};

export default ConstructionView;
