import React, {useEffect, useState} from 'react';
import "react-leaflet-fullscreen/dist/styles.css";
import Marker from 'react-leaflet-enhanced-marker';
import { MapContainer, Polyline, Popup, TileLayer, Tooltip, useMap } from 'react-leaflet';
import { FullscreenControl } from "react-leaflet-fullscreen";
import Satellite from '../../assets/images/satellite.png';
import FullScreenDropdown from '../../Components/Common/FullScreenDropdown';
import useGeoLocation from './useGeoLocation';


const WorldMap = ({coords, latitude, longitude }) => {
  const location = useGeoLocation();
  const coord = [Number(latitude), Number(longitude)];
  const operatorLat = location.loaded? location.coordinates.lat : null;
  const operatorLong = location.loaded? location.coordinates.lng : null;
  const operatorPosition = [operatorLat, operatorLong];
  
 
  
  
  console.log('operatorPosition', operatorPosition)


  return (
    <>
       {(latitude && longitude) &&
      
       
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
           <Tooltip direction="bottom" offset={[20, 20]} opacity={1} permanent>
              Latitude: {latitude?.toFixed(1)} ° <br/> Longitude: {longitude?.toFixed(1)} °
            </Tooltip>
            <Popup>INTERNATIONAL SPACE STATION LIVE COORDINATES</Popup>
          </Marker>
          {location.loaded && <Marker
           position = {operatorPosition}
          
           >
          <Tooltip direction="bottom" offset={[20, 20]} opacity={1} permanent>
            You are here <br/> Latitude: {operatorLat?.toFixed(1)} ° <br/> Longitude: {operatorLong?.toFixed(1)} °
            </Tooltip>
          </Marker>}
         <Polyline positions={coords} color="red" />
            
          <FullscreenControl position = 'topright' forceSeparateButton = {true}/>
        </MapContainer>
       
      }

      
    </>
  );
};

export default WorldMap;
