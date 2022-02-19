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
    <>
      <h1>{blk.postalcode}</h1>
      <h3>Status: {blk.status}</h3>
      <h4>Project Manager in Charge: {blk.projectmanager}</h4>
      <h4>Construction Date: {changeDate(blk.constructiondate)}</h4>
      <h4>Testing and Commissioning Date: {changeDate(blk.tncdate)}</h4>
      <h4>Total Block Capacity (kWp): {blk.capacity_kwp}</h4>
      <h4>No. of Panels: {blk.panels}</h4>
      <h4>Panel Maximum Power (Pmax/W): {blk.panelkwp}</h4>
      <button onClick={() => router.push(`/block/${id}/edit`)}>
        Ready for Turn On
      </button>
    </>
  );
};

export default TNCView;
