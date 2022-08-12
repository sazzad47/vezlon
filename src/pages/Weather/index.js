import React from "react";
import MapTabContainer from "./mapTabContainer";
import ISSData from "./issData";
import WorldMap from "./WorldMap";
import Globe from "./Globe";
import ISSStream from "./ISSStream";
import { Col, Row } from "reactstrap";

const Weather = () => {
  const [latitude, setLatitude] = React.useState();
  const [longitude, setLongitude] = React.useState();

  return (
    <>
      <div className="page-content mx-3">
        <Row>
          <Col xl={8} md={12}>
            <div
              className="mb-3"
              style={{ height: "35rem", width: "100%", position: "relative" }}
            >
              <Globe latitude={latitude} longitude={longitude} />
            </div>
          </Col>
          <Col xl={4} md={12} style={{ maxHeight: "35rem" }}>
            <div className="mt-3" style={{ height: "33%" }}>
              <WorldMap latitude={latitude} longitude={longitude} />
            </div>
            <div className="mt-3" style={{ height: "33%", minWidth: "100%" }}>
              <ISSStream width="100%" height="100%" />
            </div>
            <div
              className="mb-3 mt-3"
              style={{ height: "34%", overflow: "hidden" }}
            >
              <ISSData
                setLatitude={setLatitude}
                setLongitude={setLongitude}
                dataColors='["--vz-primary", "--vz-success"]'
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="mt-3">
            <MapTabContainer
              setLatitude={setLatitude}
              setLongitude={setLongitude}
              latitude={latitude}
              dataColors='["--vz-primary", "--vz-success"]'
              longitude={longitude}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Weather;
