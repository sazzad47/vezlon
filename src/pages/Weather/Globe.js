// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Viewer } from "resium";
import * as Resium from "resium";
import * as Cesium from "cesium";

const Globe = ({ latitude, longitude }) => {
  const [issLatitude, setIssLatitude] = useState(0);
  const [issLongtitude, setIssLongtitude] = useState(0);
  const [viewerRef, setViewerRef] = useState(null);
  const [iSSEntity, setISSEntity] = useState(null);

  useEffect(() => {
    if (latitude && longitude) {
      setIssLatitude(latitude);
      setIssLongtitude(longitude);
      if (viewerRef) {
        const newEntity = viewerRef.entities.add({
          name: "ISS",
          position: Cesium.Cartesian3.fromDegrees(longitude, latitude, 100),
          point: {
            pixelSize: 10,
            color: Cesium.Color.YELLOW,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 2,
          },
        });
        // remove previous entity
        if (iSSEntity) {
          viewerRef.entities.remove(iSSEntity);
          // set new entity
        }
        setISSEntity(newEntity);
      }
    }
  }, [iSSEntity, latitude, longitude, viewerRef]);

  return (
    <Viewer
      style={{ height: "100%", width: "100%", position: "absolute" }}
      infoBox={false}
      ref={(e) => {
        if (e !== null) {
          // @ts-ignore
          setViewerRef(e.cesiumElement);
        }
      }}
      homeButton={false}
      sceneModePicker={false}
      projectionPicker={false}
      baseLayerPicker={false}
      navigationHelpButton={false}
    ></Viewer>
  );
};

export default Globe;
