// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { Viewer, Entity } from "resium";
import * as Resium from "resium";
import * as Cesium from "cesium";

const Globe = ({ latitude, longitude, altitude }) => {
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState();
  const [issLatitude, setIssLatitude] = useState(0);
  const [issLongtitude, setIssLongtitude] = useState(0);
  const [viewerRef, setViewerRef] = useState(null);
  const [iSSEntity, setISSEntity] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  // const [longArr, setLongArr] = useState([])

  // const canvas = useRef();
  // const scene = new Cesium.Scene({
  //   canvas : viewerRef,
  // });

  // const fullScreenHandler = () => {
  //   const canvas = viewerRef;
  //   if ('webkitRequestFullscreen' in canvas) {
  //             canvas['webkitRequestFullscreen']() // Safari
  //         } else {
  //             canvas.Fullscreen.requestFullscreen();
  //         }
  //     }
  //     Cesium.fullscreenButton.viewModel.command.beforeExecute.addEventListener(fullScreenHandler)
  //     Cesium.fullscreenButton.viewModel.command.afterExecute.addEventListener(fullScreenHandler)

  // console.log('screen', viewerRef)

  const [operatorLat, setOperatorLat] = useState();
  const [operatorLong, setOperatorLong] = useState();
  const [operatorCity, setOperatorCity] = useState();

  function showPosition() {
    fetch("https://ipwhois.app/json/?objects=city,latitude,longitude")
      .then((response) => response.json())
      .then((data) => {
        let currentLat = parseFloat(data.latitude).toFixed(2);
        let currentLong = parseFloat(data.longitude).toFixed(2);
        let currentCity = data.city;
        setOperatorLat(currentLat);
        setOperatorLong(currentLong);
        setOperatorCity(currentCity);
        // Adding position marker - the main map

        // Adding position to the 3D Map

        // Showing Local Solar Time
      })
      .catch(console.error);
  }
  setTimeout(function () {
    showPosition();
  }, 500);

  useEffect(() => {
    if ((typeof(latitude) ==='undefined') || (typeof(longitude) === 'undefined') || (typeof(operatorLat) ==='undefined') || (typeof(operatorLong) ==='undefined') || (typeof(operatorCity) ==='undefined')) {
      return; 
    }
      setIssLatitude(latitude);
      setIssLongtitude(longitude);
      if (viewerRef) {
        viewerRef.entities.add({
          position: Cesium.Cartesian3.fromDegrees(
            longitude,
            latitude,
            parseFloat(altitude) * 1000
          ),

          point: { pixelSize: 6, color: Cesium.Color.GOLD },
        });

        viewerRef.entities.add({
          position: Cesium.Cartesian3.fromDegrees(
            Number(operatorLat),
            Number(operatorLong),
            100
          ),

          point: { pixelSize: 6, color: Cesium.Color.GOLD },
          label: {
            text: `You are here in ${operatorCity}`,
            show: true,
            showBackground: true,
            font: "15px Open Sans sans-serif",
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
            verticalOrigin: Cesium.VerticalOrigin.CENTER,
            pixelOffset: new Cesium.Cartesian2(15, 0),
            backgroundColor: Cesium.Color.WHITE,
            fillColor: Cesium.Color.PURPLE,
            style: Cesium.LabelStyle.FILL,
          },
        });
        const newEntity = viewerRef.entities.add({
          name: "ISS",
          position: Cesium.Cartesian3.fromDegrees(longitude, latitude, 100),
          point: {
            pixelSize: 10,
            point: { pixelSize: 8, color: Cesium.Color.YELLOW },
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 2,
          },
          label: {
            text: `Latitude: ${latitude.toFixed(
              2
            )}, Longitude: ${longitude.toFixed(2)}`,
            show: true,
            showBackground: true,
            font: "15px Open Sans sans-serif",
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
            verticalOrigin: Cesium.VerticalOrigin.CENTER,
            pixelOffset: new Cesium.Cartesian2(15, 0),
            backgroundColor: Cesium.Color.WHITE,
            fillColor: Cesium.Color.PURPLE,
            style: Cesium.LabelStyle.FILL,
          },
        });

        // remove previous entity
        if (iSSEntity) {
          viewerRef.entities.remove(iSSEntity);
          // set new entity
        }
        setISSEntity(newEntity);
        // showISSTrajectory()
      }
    
  }, [iSSEntity, latitude, longitude, viewerRef]);

  return (
    <> 
    {((typeof(latitude) ==='undefined') || (typeof(longitude) === 'undefined') || (typeof(operatorLat) ==='undefined') || (typeof(operatorLong) ==='undefined') || (typeof(operatorCity) ==='undefined'))?
    <h6>Loading...</h6>
      :<Viewer
        style={{ height: "100%", width: "100%", position: "absolute" }}
        infoBox={true}
        ref={(e) => {
          if (e !== null) {
            // @ts-ignore
            setViewerRef(e.cesiumElement);
          }
        }}
        homeButton={true}
        sceneModePicker={true}
        projectionPicker={true}
        baseLayerPicker={true}
        navigationHelpButton={true}
      ></Viewer>
}
    </>
  );
};

export default Globe;
