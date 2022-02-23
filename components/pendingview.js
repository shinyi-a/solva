import { useRouter } from "next/router";

const PendingView = ({ children }) => {
  const router = useRouter();
  const { blk, id } = children;
  const splitDateTime = blk.pendingdate.split("T");
  const onlyDate = splitDateTime[0];
  const splitDate = onlyDate.split("-");
  const displaydate = `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
  return (
    <article>
      <p>Postal Code: {blk.postalcode}</p>
      <p>
        Block Status: <span className="statushighlightpen">{blk.status}</span>
      </p>
      <p>Project Manager in Charge: {blk.projectmanager}</p>
      <p>Pending Date: {displaydate}</p>
      <button onClick={() => router.push(`/block/${id}/update`)}>
        Ready for Construction
      </button>
    </article>
  );
};

export default PendingView;
