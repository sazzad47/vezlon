import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
const SensorPopup = ({ mapLayers, item, index }) => {
  const batteryLevelObject = {
    "100-80": "la-battery-full fullIconLevel",
    "79-60": "la-battery-three-quarters mediumIconLevel",
    "59-40": "la-battery-half mediumIconLevel ",
    "39-20": "la-battery-quarter lowIconLevel",
    "19-0": "la-battery-empty lowIconLevel",
  };
  const connectionStrengthObject = {
    "100-80": "ri-signal-wifi-fill fullIconLevel",
    "79-60": "ri-signal-wifi-3-fill mediumIconLevel",
    "59-40": "ri-signal-wifi-2-fill mediumIconLevel",
    "39-20": "ri-signal-wifi-1-fill lowIconLevel",
    "19-0": "ri-signal-wifi-line lowIconLevel",
  };
  const checkItemLevelObject = (itemLevel, itemLevelObject) => {
    let key = "";
    Object.keys(itemLevelObject).forEach((el) => {
      let keyObject = el.split("-");
      if (itemLevel <= +keyObject[0] && itemLevel >= +keyObject[1]) {
        key = keyObject;
        return;
      }
    });
    return key;
  };

  const sensorBatteryStatusIconDisplay = (batteryStatus) => {
    const batteryLevel = checkItemLevelObject(
      batteryStatus,
      batteryLevelObject
    );
    let formattedBatteryLevel = `${batteryLevel[0]}-${batteryLevel[1]}`;
    return (
      <i
        className={`las ${
          batteryLevelObject[formattedBatteryLevel] || "la-battery-empty"
        }`}
      />
    );
  };

  const sensorConnectionStrengthIconDisplay = (connectionStrength) => {
    const connectionLevel = checkItemLevelObject(
      connectionStrength,
      connectionStrengthObject
    );
    let formattedConnectionStrength = `${connectionLevel[0]}-${connectionLevel[1]}`;
    return (
      <i
        className={`las ${
          connectionStrengthObject[formattedConnectionStrength] ||
          "ri-signal-wifi-line"
        }`}
      />
    );
  };

  const bindMarker = (ref) => {
    if (ref) {
      mapLayers.forEach((element) => {
        if (element["groupLayerName"] === item.name) {
          element["groupLayers"].push(ref);
        }
      });
    }
  };

  return (
    <Marker
      attribution={item.name}
      key={index}
      position={item?.markerPosition}
      ref={bindMarker}
    >
      <Popup className="sensorMapPopup" closeButton={false}>
        <Card
          className={
            item && item.status.toUpperCase() === "ONLINE"
              ? "border card-border-success"
              : "border card-border-danger"
          }
        >
          <CardHeader className="sensorMapPopupCardHeader">
            <div className="sensorPopupHeaderIcons">
              <span className="float-end">
                <span>{item && item.batteryStatus}%</span>
                <span className="sensorBatteryIcon">
                  {sensorBatteryStatusIconDisplay(item.batteryStatus)}
                </span>
                &nbsp;&nbsp;
                <span>{item && item.connectionStrength}%</span>
                <span className="sensorSignalIcon">
                  {sensorConnectionStrengthIconDisplay(item.connectionStrength)}
                </span>
              </span>
            </div>

            <h6 className="card-title mb-0">
              {item && item.name} &nbsp;
              <span
                className={
                  item && item.status.toUpperCase() === "ONLINE"
                    ? " badge bg-success align-middle fs-10"
                    : " badge bg-danger align-middle fs-10"
                }
              >
                {item && item.status}
              </span>
            </h6>
          </CardHeader>
          <CardBody className="sensorMapCardBody">
            <Row>
              <Col>
                <div className="row pt-2">
                  <Col md={3}>
                    {" "}
                    <h6 className="ipAddressHeading">IP Address:</h6>
                  </Col>
                  <Col>{item && item.ipAddress} </Col>
                </div>
                <div className="row pt-2">
                  <Col md={3}>
                    <h6 className="ipAddressHeading">IP History: </h6>
                  </Col>
                  <Col md={5}>
                    <select
                      className="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                    >
                      <option value="IP LIST">
                        {item && item.ipHistory && item.ipHistory.length} IP
                        LIST
                      </option>
                      {item &&
                        item.ipHistory.map((element, index) => (
                          <option key={index} value={element}>
                            {element}
                          </option>
                        ))}
                    </select>
                  </Col>
                </div>
                <div className="row pt-2">
                  <Col md={3}>
                    {" "}
                    <h6>Sensors: </h6>
                  </Col>
                  <Col md={6}>
                    <div key={index} className="live-preview">
                      <div className="d-flex flex-wrap gap-2">
                        {item &&
                          item.sensors.map((element, index) => (
                            <span
                              key={index}
                              className="badge badge-outline-warning"
                            >
                              {element}
                            </span>
                          ))}
                      </div>
                    </div>
                  </Col>
                </div>
                <div className="row pt-2">
                  <Col md={3}>
                    <h6>Vendor: </h6>
                  </Col>
                  <Col md={6}>{item && item.vendor}</Col>
                </div>
              </Col>

              <Col>
                <div className="row pt-2">
                  <Col xs="4">
                    <h6>Location: </h6>
                  </Col>
                  <Col>{item && item.location} </Col>
                </div>
                <div className="row pt-2">
                  <Col xs="4">
                    {" "}
                    <h6>Services:</h6>
                  </Col>
                  <Col>
                    <div key={index} className="live-preview">
                      <div className="d-flex flex-wrap gap-2">
                        {item &&
                          item.services.map((element, index) => (
                            <span
                              key={index}
                              className="badge badge-outline-warning"
                            >
                              {element}
                            </span>
                          ))}{" "}
                      </div>
                    </div>
                  </Col>
                </div>
                <div className="row pt-2">
                  <Col xs="4">
                    <h6>First Seen:</h6>
                  </Col>
                  <Col>{item && item.firstSeen}</Col>
                </div>
                <div className="row pt-2">
                  <Col xs="4">
                    <h6>Last Seen:</h6>
                  </Col>
                  <Col>{item && item.lastSeen}</Col>
                </div>
                <div className="row pt-2">
                  <Col xs="4">
                    <h6>Asset Management:</h6>
                  </Col>
                  <Col><Link style={{ textDecoration: 'none', }} target={"_blank"} to='iss-analytics'>Click here</Link></Col>
                </div>
              </Col>
            </Row>

            <div className="text-end"></div>
          </CardBody>
        </Card>
      </Popup>
    </Marker>
  );
};

export default SensorPopup;
