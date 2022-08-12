import React from "react";
import Marker from "react-leaflet-enhanced-marker";
import { MapContainer, Popup, TileLayer, useMap } from "react-leaflet";

import Satellite from "../../assets/images/satellite.png";

const WorldMap = ({ latitude, longitude }) => {
  const position = [26.4887, 77.981];
  const coord = [latitude, longitude];

  return (
    <>
      {latitude || longitude ? (
        <MapContainer
          center={coord}
          zoom={3}
          scrollWheelZoom={false}
          style={{ minHeight: "100%", minWidth: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={coord}
            icon={<img src={Satellite} style={{ width: "100px" }} />}
          >
            <Popup>INTERNATIONAL SPACE STATION LIVE COORDINATES</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default WorldMap;
