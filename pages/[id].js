//this is the individual block page
import { useRouter } from "next/router";

const BlockDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
};

export default BlockDetails;
