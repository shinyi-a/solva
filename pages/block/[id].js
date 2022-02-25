import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import PendingView from "../../components/pendingview";
import ConstructionView from "../../components/constructionview";
import TNCView from "../../components/tncview";
import TurnonView from "../../components/turnonview";
import Footer from "../../components/footer";

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
    const mapURL = `https://developers.onemap.sg/commonapi/staticmap/getStaticImage?layerchosen=grey&lat=${mapLat}&lng=${mapLng}&zoom=17&height=450&width=450&points=[${mapLat},${mapLng},%22249,188,23%22,%22%22]`;

    if (blk.status === "Pending") {
      return (
        <>
          <div className="cardcontainer">
            <section>
              <div className="cardcontent">
                <h2 className="title">{id}</h2>
                <h3>
                  Block Status:{" "}
                  <span className="statushighlightpen">{blk.status}</span>
                </h3>
                <div className="mapplacement">
                  <img src={mapURL} />
                </div>
                <div className="carddetails">
                  <p>
                    Address: BLOCK {map.BLK_NO}, {map.ROAD_NAME}, SINGAPORE{" "}
                    {map.POSTAL}
                  </p>
                  <PendingView>{{ blk, id }}</PendingView>
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </>
      );
    }
    if (loadingBlk && blk.status === "Construction") {
      return (
        <>
          <div className="cardcontainer">
            <section>
              <div className="cardcontent">
                <h2 className="title">{id}</h2>
                <h3>
                  Block Status:{" "}
                  <span className="statushighlightcon">{blk.status}</span>
                </h3>
                <div className="mapplacement">
                  <img src={mapURL} />
                </div>
                <div className="carddetails">
                  <p>
                    Address: BLOCK {map.BLK_NO}, {map.ROAD_NAME}, SINGAPORE{" "}
                    {map.POSTAL}
                  </p>
                  <ConstructionView>{{ blk, id }}</ConstructionView>
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </>
      );
    }
    if (loadingBlk && blk.status === "Testing and Commissioning") {
      return (
        <>
          <div className="cardcontainer">
            <section>
              <div className="cardcontent">
                <h2 className="title">{id}</h2>
                <h3>
                  Block Status:{" "}
                  <span className="statushighlighttnc">{blk.status}</span>
                </h3>
                <div className="mapplacement">
                  <img src={mapURL} />
                </div>
                <div className="carddetails">
                  <p>
                    Address: BLOCK {map.BLK_NO}, {map.ROAD_NAME}, SINGAPORE{" "}
                    {map.POSTAL}
                  </p>
                  <TNCView>{{ blk, id }}</TNCView>
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </>
      );
    }
    if (loadingBlk && blk.status === "Turned On") {
      return (
        <>
          <div className="cardcontainer">
            <section>
              <div className="cardcontent">
                <h2 className="title">{id}</h2>
                <h3>
                  Block Status:{" "}
                  <span className="statushighlighton">{blk.status}</span>
                </h3>
                <div className="mapplacement">
                  <img src={mapURL} />
                </div>
                <div className="carddetails">
                  <p>
                    Address: BLOCK {map.BLK_NO}, {map.ROAD_NAME}, SINGAPORE{" "}
                    {map.POSTAL}
                  </p>
                  <TurnonView>{blk}</TurnonView>
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </>
      );
    }
  } else {
    return <h1>loading...</h1>;
  }
};

export default BlockDetails;
