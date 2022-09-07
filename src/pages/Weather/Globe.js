// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { Viewer, Entity } from "resium";
import * as Resium from "resium";
import * as Cesium from "cesium";
import image from '../../assets/images/iss.png'
import location from '../../assets/images/location.png'
import {Ion, createWorldTerrain, Cartesian3, Color} from "cesium";
import useGeoLocation from "./useGeoLocation";


const Globe = ({center, latitude, longitude, altitude, latlngs }) => {
  Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ODM0MzAyMy1mNWRjLTQyYzUtYjAzOS04ZGU3ZjBhZTkwMjMiLCJpZCI6MTA3MDg3LCJpYXQiOjE2NjIzOTg3Mjl9.R_BUei3bJYBOpQw4t0E5RmK9Mm8w2h4J-wBa3qOjeOM";
  const worldTerrain = createWorldTerrain();
  const [viewerRef, setViewerRef] = useState(null);
  const [iSSEntity, setISSEntity] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const [issLat, setIssLat] = useState(null);
  const [issLong, setIssLong] = useState(null);
  const canvas = document.getElementsByClassName('cesium-viewer')
  
  // const centerISS = () => {
  //  if ((typeof(latitude) ==='undefined') || (typeof(longitude) === 'undefined')) {
  //   return;
  //  }
  //   const cartographic = Cesium.Cartographic.fromDegrees(Number(latitude), Number(longitude), 100);
  //   if (!Cesium.Rectangle?.contains(viewerRef?.camera.computeViewRectangle(), cartographic)) {
  //     const destination = Cesium.Cartesian3.fromDegrees(Number(latitude), Number(longitude), 100);
  //     viewerRef?.camera.flyTo({destination, duration: .5});}
    
  // }
  
  function fullScreenHandler () {
    const canvas = viewerRef?.scene.canvas;
    if ('webkitRequestFullscreen' in canvas) {
              canvas['webkitRequestFullscreen'](canvas) // Safari
          } else {
              Cesium.Fullscreen.requestFullscreen(canvas);
          }
      }
      viewerRef?.fullscreenButton.viewModel.command.beforeExecute.addEventListener(fullScreenHandler)
      viewerRef?.fullscreenButton.viewModel.command.afterExecute.addEventListener(fullScreenHandler)
 
  const location = useGeoLocation();
  const operatorLat = location.loaded? location.coordinates.lat.toFixed(1) : null;
  const operatorLong = location.loaded? location.coordinates.lng.toFixed(1) : null;
  const operatorPosition = [operatorLat, operatorLong];
  
   
  // function showPosition() {
  //   fetch("https://ipwhois.app/json/?objects=city,latitude,longitude")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       let currentLat = parseFloat(data.latitude).toFixed(2);
  //       let currentLong = parseFloat(data.longitude).toFixed(2);
  //       let currentCity = data.city;
  //       setOperatorLat(currentLat);
  //       setOperatorLong(currentLong);
  //       setOperatorCity(currentCity);
    
  //     })
  //     .catch(console.error);
  // }
  // useEffect(() => {
  //   showPosition();
  // },[])
  
  
 
  useEffect(() => {
    setIssLat(latitude);
    setIssLong(longitude);
    
  },[latitude, longitude])
 
  //  useEffect(() => {
  //   if ((typeof(issLat) ==='undefined') || (typeof(issLong) === 'undefined')) {
  //        return; 
  //      }
  //      if(!center) {
  //       return;
  //     }
  //    centerISS();
   
  //  })
  // useEffect(() => {
   
  //   if ((typeof(latitude) ==='undefined') || (typeof(longitude) === 'undefined') || (typeof(operatorLat) ==='undefined') || (typeof(operatorLong) ==='undefined') || (typeof(operatorCity) ==='undefined')) {
  //     return; 
  //   }
  //     setIssLatitude(latitude);
  //     setIssLongtitude(longitude);
  //     if (viewerRef) {
  //       viewerRef.entities.add({
  //         position: Cesium.Cartesian3.fromDegrees(
  //           longitude,
  //           latitude,
  //           parseFloat(altitude) * 1000
  //         ),

  //         point: { pixelSize: 6, color: Cesium.Color.GOLD },
  //       });

  //       viewerRef.entities.add({
  //         position: Cesium.Cartesian3.fromDegrees(
  //           Number(operatorLat),
  //           Number(operatorLong),
  //           100
  //         ),

  //         point: { pixelSize: 6, color: Cesium.Color.GOLD },
  //         label: {
  //           text: `You are here in ${operatorCity}`,
  //           show: true,
  //           showBackground: true,
  //           font: "15px Open Sans sans-serif",
  //           horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
  //           verticalOrigin: Cesium.VerticalOrigin.CENTER,
  //           pixelOffset: new Cesium.Cartesian2(15, 0),
  //           backgroundColor: Cesium.Color.WHITE,
  //           fillColor: Cesium.Color.PURPLE,
  //           style: Cesium.LabelStyle.FILL,
  //         },
  //       });
  //       const newEntity = viewerRef.entities.add({
  //         name: "ISS",
  //         position: Cesium.Cartesian3.fromDegrees(longitude, latitude, 100),
  //         point: {
  //           pixelSize: 10,
  //           point: { pixelSize: 8, color: Cesium.Color.YELLOW },
  //           outlineColor: Cesium.Color.BLACK,
  //           outlineWidth: 2,
  //         },
  //         label: {
  //           text: `Latitude: ${latitude.toFixed(
  //             2
  //           )}, Longitude: ${longitude.toFixed(2)}`,
  //           show: true,
  //           showBackground: true,
  //           font: "15px Open Sans sans-serif",
  //           horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
  //           verticalOrigin: Cesium.VerticalOrigin.CENTER,
  //           pixelOffset: new Cesium.Cartesian2(15, 0),
  //           backgroundColor: Cesium.Color.WHITE,
  //           fillColor: Cesium.Color.PURPLE,
  //           style: Cesium.LabelStyle.FILL,
  //         },
  //       });

  //       // remove previous entity
  //       if (iSSEntity) {
  //         viewerRef.entities.remove(iSSEntity);
  //         // set new entity
  //       }
  //       setISSEntity(newEntity);
  //       // showISSTrajectory()
  //     }
    
  // }, [iSSEntity, latitude, longitude, viewerRef]);

 
  const issInfo = `Latitude: ${latitude?.toFixed(1)}, Longitude: ${longitude?.toFixed(1)}`
  const operatorInfo = `Your are here; Latitude: ${operatorLat}, Longitude: ${operatorLong}`
  return (
    <> 
    
    {(issLat && issLong) && <Viewer 
      full
        terrainProvider={worldTerrain}
        style={{ height: "100%", width: "100%", position: "absolute" }}
       
        ref={(e) => {
          if (e !== null) {
            // @ts-ignore
            setViewerRef(e.cesiumElement);
          }
        }}
       
      >    
          {latlngs?.length < 4? null : <Resium.Entity>
            <Resium.PolylineGraphics
                show
                width={10}
                material = {new Cesium.PolylineGlowMaterialProperty({
                  glowPower: 0.2,
                  taperPower: 0.5,
                  color: Cesium.Color.CORNFLOWERBLUE,
                })}
                // material={Cesium.Color.RED}
                positions={Cesium.Cartesian3.fromDegreesArray(latlngs)}
            />
        </Resium.Entity>}
          <Resium.Entity 
           name="ISS"
           description="Here is ISS"
           position={Cartesian3.fromDegrees(issLat, issLong, 100)}
           billboard={{ image }}
          >
            <Resium.LabelGraphics
             text= {issInfo}
             fillColor={Color.ORANGE} 
             show = {true}
             showBackground = {true}
             font = "15px Open Sans sans-serif"
             horizontalOrigin = {Cesium.HorizontalOrigin.LEFT}
             verticalOrigin = {Cesium.VerticalOrigin.CENTER}
             pixelOffset = {new Cesium.Cartesian2(15, 0)}
             backgroundColor = {Cesium.Color.WHITE}
            
             style = {Cesium.LabelStyle.FILL}
             />
        </Resium.Entity>
          {location.loaded && <Resium.Entity 
           name="Operator Position"
           description="You are here."
           position={Cartesian3.fromDegrees(Number(operatorLat), Number(operatorLong), 100)}
           billboard={{ location }}
          >
            <Resium.LabelGraphics
             text= {location.loaded? operatorInfo : 'Loading...'}
             fillColor={Color.ORANGE} 
             show = {true}
             showBackground = {true}
             font = "15px Open Sans sans-serif"
             horizontalOrigin = {Cesium.HorizontalOrigin.LEFT}
             verticalOrigin = {Cesium.VerticalOrigin.CENTER}
             pixelOffset = {new Cesium.Cartesian2(15, 0)}
             backgroundColor = {Cesium.Color.WHITE}
            
             style = {Cesium.LabelStyle.FILL}
             />
        </Resium.Entity>}
        
      </Viewer>}
      
    </>
  );
};

export default Globe;
