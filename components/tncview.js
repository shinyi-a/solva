import { useRouter } from "next/router";

const TNCView = ({ children }) => {
  const router = useRouter();
  const { blk, id } = children;
  const changeDate = (input) => {
    const splitDateTime = input.split("T");
    const onlyDate = splitDateTime[0];
    const splitDate = onlyDate.split("-");
    return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
  };

  return (
    <article>
      <p>Postal Code: {blk.postalcode}</p>
      <p>Block Status: {blk.status}</p>
      <p>Project Manager in Charge: {blk.projectmanager}</p>
      <p>Construction Date: {changeDate(blk.constructiondate)}</p>
      <p>Testing and Commissioning Date: {changeDate(blk.tncdate)}</p>
      <p>Total Block Capacity (kWp): {blk.capacity_kwp}</p>
      <p>No. of Panels: {blk.panels}</p>
      <p>Panel Maximum Power (Pmax/W): {blk.panelkwp}</p>
      <button onClick={() => router.push(`/block/${id}/update`)}>
        Ready for Turn On
      </button>
    </article>
  );
};

export default TNCView;
