import React, {useEffect, useState} from 'react';
import "react-leaflet-fullscreen/dist/styles.css";
import Marker from 'react-leaflet-enhanced-marker';
import { MapContainer, Polyline, Popup, TileLayer, Tooltip, useMap } from 'react-leaflet';
import { FullscreenControl } from "react-leaflet-fullscreen";
import Satellite from '../../assets/images/satellite.png';
import FullScreenDropdown from '../../Components/Common/FullScreenDropdown';


const WorldMap = ({latlngs, latitude, longitude }) => {
  const position = [26.4887, 77.981];
  const coord = [latitude, longitude];
  const [operatorLat, setOperatorLat] = useState();
  const [operatorLong, setOperatorLong] = useState();
  const [operatorCity, setOperatorCity] = useState();
  const operatorPosition = [operatorLat, operatorLong];
  
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
  


 const options = {
  "delay": 400,
  "dashArray": [
    10,
    20
  ],
  "weight": 5,
  "color": "#0000FF",
  "pulseColor": "#FFFFFF",
  "paused": false,
  "reverse": false,
  "hardwareAccelerated": true
};

const pos = [
  [36.460353, 126.440674],
  [34.789594, 135.438084], //to jpn
  [36.460353, 126.440674],
  [55.410343, 37.902312], //to rus
  [36.460353, 126.440674],
  [40.085148, 116.552407] //to chi
];
  const trajectory = [];

  useEffect(() => {
    trajectory.push(latitude, longitude)
  },[latitude, longitude])
  console.log('trajectory', latlngs)


  return (
    <>
      {latitude && longitude && latlngs ? (
        <>
        <MapContainer
          center={coord}
          zoom={3}
          scrollWheelZoom={false}
          style={{ minHeight: '100%', minWidth: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={coord}
            icon={<img src={Satellite} style={{ width: '100px' }} />}
          > 
           
            <Popup>INTERNATIONAL SPACE STATION LIVE COORDINATES</Popup>
          </Marker>
          <Marker
           position = {operatorPosition}
          
           >
          <Tooltip direction="bottom" offset={[20, 20]} opacity={1} permanent>
            You are here in {operatorCity} <br/> Latitude: {operatorLat} ° <br/> Longitude: {operatorLong} °
            </Tooltip>
          </Marker>
         <Polyline positions={latlngs} color="red" />
          {/* {latlngs ? <AntPath positions={latlngs} options={options} /> : null}   */}
          <FullscreenControl position = 'topright' forceSeparateButton = {true}/>
        </MapContainer>
       
        </>

      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default WorldMap;
