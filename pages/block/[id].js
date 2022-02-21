import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import PendingView from "../../components/pendingview";
import ConstructionView from "../../components/constructionview";
import TNCView from "../../components/tncview";
import TurnonView from "../../components/turnonview";

const BlockDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [blk, setBlk] = useState({});
  const [map, setMap] = useState({});
  const [loadingBlk, setLoadingBlk] = useState(false);
  const [loadingMap, setLoadingMap] = useState(false);

  const loadBlk = async () => {
    axios
      .all([
        await axios.get(
          `https://developers.onemap.sg/commonapi/search?searchVal=${id}&returnGeom=Y&getAddrDetails=Y&pageNum=1`
        ),
        await axios.get(`${process.env.API_ENDPOINT}/block/${id}`),
      ])
      .then(
        axios.spread((res1, res2) => {
          setMap(res1.data.results[0]);
          setLoadingMap(true);
          setBlk(res2.data[0]);
          setLoadingBlk(true);
        })
      );
  };

  useEffect(() => {
    if (id !== undefined) {
      loadBlk();
    }
  }, [id]);

  if (loadingBlk && loadingMap) {
    const mapLat = parseFloat(map.LATITUDE).toFixed(5);
    const mapLng = parseFloat(map.LONGITUDE).toFixed(5);
    // console.log(map);
    const mapURL = `https://developers.onemap.sg/commonapi/staticmap/getStaticImage?layerchosen=grey&lat=${mapLat}&lng=${mapLng}&zoom=17&height=450&width=450&points=[${mapLat},${mapLng},%22255,0,%22,%22%22]`;

    if (blk.status === "Pending") {
      return (
        <>
          <img src={mapURL} />
          <h3>
            Address: BLOCK {map.BLK_NO}, {map.ROAD_NAME}
          </h3>
          <PendingView>{{ blk, id }}</PendingView>
        </>
      );
    }
    if (loadingBlk && blk.status === "Construction") {
      return (
        <>
          <img src={mapURL} />
          <h3>
            Address: BLOCK {map.BLK_NO}, {map.ROAD_NAME}
          </h3>
          <ConstructionView>{{ blk, id }}</ConstructionView>
        </>
      );
    }
    if (loadingBlk && blk.status === "Testing and Commissioning") {
      return (
        <>
          <img src={mapURL} />
          <h3>
            Address: BLOCK {map.BLK_NO}, {map.ROAD_NAME}
          </h3>
          <TNCView>{{ blk, id }}</TNCView>
        </>
      );
    }
    if (loadingBlk && blk.status === "Turned On") {
      return (
        <>
          <img src={mapURL} />
          <h3>
            Address: BLOCK {map.BLK_NO}, {map.ROAD_NAME}
          </h3>
          <TurnonView>{blk}</TurnonView>;
        </>
      );
    }
  } else {
    return <h1>loading...</h1>;
  }
};

export default BlockDetails;
