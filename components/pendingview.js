import { useRouter } from "next/router";

const PendingView = ({ children }) => {
  const router = useRouter();
  const { blk, id } = children;
  const splitDateTime = blk.pendingdate.split("T");
  const onlyDate = splitDateTime[0];
  const splitDate = onlyDate.split("-");
  const displaydate = `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
  return (
    <>
      <h1>{blk.postalcode}</h1>
      <h3>Status: {blk.status}</h3>
      <h4>Project Manager in Charge: {blk.projectmanager}</h4>
      <h4>Pending Date: {displaydate}</h4>
      <button onClick={() => router.push(`/block/${id}/update`)}>
        Ready for Construction
      </button>
    </>
  );
};

export default PendingView;
