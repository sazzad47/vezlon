import React, { Component } from "react";
import Leaflet, {control} from "leaflet";
import { AttributionControl, MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./sensorMap.css";
import "leaflet.heat";
import SensorPopup from "./SensorPopup/SensorPopup";
import "leaflet-textpath";
import getDistanceBetweenPoints from "../../../../helpers/distanceCalculator/getDistanceBetweenPoints";
import SensorMapFilterSideBar from "./SensorMapFilterSideBar/sensorMapFilterSideBar";
import { CardBody, Col, Row } from "reactstrap";
import smartSensor from "./sensorsData.json";
import eventCases1 from "./eventCases1.json";
import eventCases2 from "./eventCases2.json";
Leaflet.Icon.Default.imagePath = "../node_modules/leaflet";
delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default class MapMarkerCustomIcons extends Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 5,
    sensorsData: [],
    eventCases: [],
  };
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.existingPolylines = [];
    this.exisitngHeatLayers = [];
    this.linkedSensors = [];
    this.sensorList = [];
    this.mapLayers = [];
  }
  

  componentDidMount() {
    smartSensor.forEach((element) => {
      this.mapLayers.push({
        groupLayerName: element.name,
        sensorBattery: element.batteryStatus,
        sensorType: element.sensorType,
        groupLayers: [],
      });
    });

    setTimeout(() => {
      this.createHeatMaps(eventCases1);
    }, 5000);

    setTimeout(() => {
      this.createHeatMaps(eventCases2);
    }, 10000);

    
  }

  createLinkPopupData = (sensorNames, connectionStrength) => {
    return (
      "<div>" +
      "<h5 class='linkPopupTitle'>Link Info</h5>" +
      "<div class='hstack gap-3'>" +
      "<div class='p-1 px-2 popupConnectedSensorsTitle'> <strong>Connected Sensors:</strong></div>" +
      "<div class='p-1 px-2'>" +
      "<p>" +
      sensorNames.split(" ")[0] +
      " " +
      sensorNames.split(" ")[1] +
      " " +
      sensorNames.split(" ")[2] +
      " " +
      sensorNames.split(" ")[3] +
      "</p>" +
      "</div>" +
      "</div>" +
      "<div class='hstack gap-3'>" +
      "<div class='linkPopupTitle p-1 px-2'> <strong>Connection Strength:</strong></div>" +
      "<div class='p-1 px-2'>" +
      connectionStrength +
      "%</div>" +
      "</div>" +
      "</div>"
    );
  };

  createHeatMaps = (eventCases) => {
    let newHeatCoordinates = [];
    let polyLines = [];

    eventCases.forEach((event) => {
      event.forEach((eventDetail) => {
        this.findCloseAreas(eventDetail, newHeatCoordinates);
      });
    });

    this.populateHeatLayers(newHeatCoordinates,polyLines)

    const combinations = ([head, ...tail]) =>
      tail.length > 0
        ? [...tail.map((tailValue) => [head, tailValue]), ...combinations(tail)]
        : [];
    let combinationsArray = combinations(polyLines);

    this.populatePolylines(polyLines,combinationsArray)


  };
  
  populateHeatLayers = (newHeatCoordinates,polyLines) => {
    newHeatCoordinates.map((element) => {
      polyLines.push(element);
      if (this.findExisitngHeatAreas(element) === false) {
        let heatLayer = Leaflet.heatLayer(
          [
            [
              element?.sensorCoordinates[0],
              element?.sensorCoordinates[1],
              2500,
            ],
          ],
          {
            radius: 40,
            max: 1.0,
            blur: 40,
            gradient: { 0.7: "lime" },
            attribution: element.sensorName,
          }
        );
        this.mapLayers.forEach((layer) => {
          if (layer["groupLayerName"] === element.sensorName) {
            layer["groupLayers"].push(heatLayer);
          }
        });
        this.exisitngHeatLayers.push(heatLayer);
        return this.mapRef.current.addLayer(heatLayer);
      } else {
        this.exisitngHeatLayers.forEach((heatLayer) => {
          if (heatLayer.options.attribution === element.sensorName) {
            let newGradient = null;

            if (Object.values(heatLayer.options.gradient).includes("blue")) {
              newGradient = { 0.5: "blue", 0.7: "lime", 1: "red" };
            } else {
              newGradient = { 0.5: "blue", 0.7: "lime" };
            }

            heatLayer.setOptions({ gradient: newGradient });
            heatLayer.setOptions({ radius: heatLayer.options.radius + 10 });

            this.mapLayers.forEach((layer) => {
              if (layer["groupLayerName"] === element.sensorName) {
                layer["groupLayers"].forEach((subLayer) => {
                  if (subLayer instanceof Leaflet.HeatLayer) {
                    subLayer = heatLayer;
                  }
                });
              }
            });
          }
        });
      }
    });
  };

  populatePolylines = (polyLines,combinationsArray) => {
    if (this.findExisitngPolylines(polyLines) === false) {
      combinationsArray.forEach((comb) => {
        let comArr = [];
        let tempName = "";

        comb.forEach((element) => {
          comArr.push(element.sensorCoordinates);
          tempName += element.sensorName + " ";
        });

        var polyline = Leaflet.polyline(comArr, {
          color: "red",
          weight: 5,
          dashArray: 4,
          attribution: tempName,
        }).bindPopup(this.createLinkPopupData(tempName, 5));

        this.mapLayers.forEach((layer) => {
          if (
            tempName
              .toUpperCase()
              .includes(layer["groupLayerName"].toUpperCase())
          ) {
            layer["groupLayers"].push(polyline);
          }
        });

        this.mapRef.current.addLayer(polyline);
        this.existingPolylines.push(polyline);
        this.linkedSensors.push({ linkName: tempName, connectionStrength: 5 });
      });
    } else {
      this.existingPolylines.forEach((polyline) => {
        let tempName = "";
        combinationsArray.forEach((comb) => {
          comb.forEach((element) => {
            tempName += element.sensorName + " ";
          });
        });

        if (tempName === polyline.options.attribution) {
          polyline.setStyle({ weight: polyline.options.weight + 1 });
          polyline
            .getPopup()
            .setContent(this.createLinkPopupData(tempName, 10));
          polyline.getPopup().update();
        }

        this.mapLayers.forEach((layer) => {
          if (
            tempName
              .toUpperCase()
              .includes(layer["groupLayerName"].toUpperCase())
          ) {
            layer["groupLayers"].forEach((subLayer) => {
              if (subLayer instanceof Leaflet.Polyline) {
                subLayer = polyline;
              }
            });
          }
        });
      });
    }
  };
  

  findExisitngHeatAreas = (heatLayer) => {
    if (this.exisitngHeatLayers.length !== 0) {
      let fetchResult = false;
      this.exisitngHeatLayers.forEach((element) => {
        if (element.options.attribution === heatLayer.sensorName)
          return (fetchResult = true);
      });
      return fetchResult;
    }
    return false;
  };

  findExisitngPolylines = (polylineComb) => {
    if (this.existingPolylines.length !== 0) {
      let fetchResult = false;
      this.existingPolylines.forEach((existingElement) => {
        let tempName = "";
        polylineComb.forEach((element) => {
          tempName += element.sensorName + " ";
        });
        if (existingElement.options.attribution === tempName)
          return (fetchResult = true);
      });
      return fetchResult;
    }
    return false;
  };

  findCloseAreas = (event, newHeatCoordinates) => {
    smartSensor.forEach((sensor) => {
      var distanceInMeters = getDistanceBetweenPoints(
        event.position[0],
        event.position[1],
        sensor.markerPosition[0],
        sensor.markerPosition[1]
      );
      if (distanceInMeters * 0.001 <= 10) {
        newHeatCoordinates.push({
          sensorName: sensor.name,
          sensorCoordinates: [
            sensor.markerPosition[0],
            sensor.markerPosition[1],
          ],
        });
      }
    });
  };
  
  createMapLegend = (map) => {
    var legend = Leaflet.control({ position: "bottomright" });
    legend.onAdd = function (map) {
      var div = Leaflet.DomUtil.create("div", "heatMapLegend");
      div.innerHTML += "<h5 style='color:black'>Sensor Detection</h5>";
      div.innerHTML +=
        '<span style="background-color:#13c56b">&nbsp;&nbsp;&nbsp;&nbsp;</span ><span style="color:black"> Low </span><br>';
      div.innerHTML +=
        '<i style="background-color: #6691E7">&nbsp;&nbsp;&nbsp;&nbsp;</i><span style="color:black"> Occasional </span><br>';
      div.innerHTML +=
        '<i style="background-color:#ed5e5e">&nbsp;&nbsp;&nbsp;&nbsp;</i><span style="color:black"> Often </span><br>';
      return div;
    };
    map.addControl(legend);
   
    
    
  };
 
  render() {
    // this.mapRef.current.addControl();
    console.log('instance', this.mapLayers)
   
    let layer = Leaflet.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      // {
      //   attribution:
      //     '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      // }
    );
    const position = [this.state.lat, this.state.lng];

    return (
      <Row>
        <Col lg={3}>
          <CardBody>
            <SensorMapFilterSideBar
              mapRef={this.mapRef}
              sensorList={smartSensor}
              mapLayers={this.mapLayers}
            />
          </CardBody>
        </Col>
        <Col lg={9}>
          <MapContainer
            center={position}
            zoom={this.state.zoom}
            style={{ height: "500px" }}
            layers={layer}
            whenCreated={(mapInstance) => {
              this.mapRef.current = mapInstance;
              this.createMapLegend(mapInstance);
            }}
          attributionControl={false}
          >
           
            {/* <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               /> */}
          
            {smartSensor &&
              smartSensor.map((item, index) => (
                <SensorPopup
                mapLayers={this.mapLayers}
                key={index}
                item={item}
                index={index}
                />
                ))}
                {/* <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              /> */}
          </MapContainer>
        </Col>
      </Row>
    );
  }
}
