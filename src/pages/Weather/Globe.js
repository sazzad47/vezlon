// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Viewer, Entity } from 'resium';
import * as Resium from 'resium';
import * as Cesium from 'cesium';


const Globe = ({ latitude, longitude, altitude }) => {
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState()
  const [issLatitude, setIssLatitude] = useState(0);
  const [issLongtitude, setIssLongtitude] = useState(0);
  const [viewerRef, setViewerRef] = useState(null);
  const [iSSEntity, setISSEntity] = useState(null);
  const [coordinates, setCoordinates] = useState([])
  // const [longArr, setLongArr] = useState([])
  
  useEffect ( () => {

    const prepareArr = () => {
     
      if (typeof(latitude || longitude) === 'undefined') {
          return;
      }
      

        coordinates.push(latitude, longitude)
       
      
      
      
      

     
     
 
  }
  prepareArr()
        
         
     }, [latitude, longitude])
     
   console.log('coordinate', coordinates)
  

  useEffect(() => {

   
         
    if (latitude && longitude) {
      setIssLatitude(latitude);
      setIssLongtitude(longitude);
      if (viewerRef) {
        viewerRef.entities.add({
          // Setting up the ISS position and altitude
          position: Cesium.Cartesian3.fromDegrees(longitude, latitude, parseFloat(altitude) * 1000),
          // ISS is rendered as a gold point
          point: {pixelSize: 6, color: Cesium.Color.GOLD},
        });
        const newEntity = viewerRef.entities.add({
          name: 'ISS',
          position: Cesium.Cartesian3.fromDegrees(longitude, latitude, 100),
          point: {
            pixelSize: 10,
            point: {pixelSize: 8, color: Cesium.Color.YELLOW},
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 2,
          },
          label: {
            text:`Latitude: ${latitude.toFixed(2)}, Longitude: ${longitude.toFixed(2)}`,
            show: true,
            showBackground: true,
            font: "15px Open Sans sans-serif",
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
            verticalOrigin: Cesium.VerticalOrigin.CENTER,
            pixelOffset: new Cesium.Cartesian2(15, 0),
            backgroundColor: Cesium.Color.WHITESMOKE,
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
    
    }
    
  }, [iSSEntity, latitude, longitude, viewerRef]);

  return (
   
      <Viewer
        style={{height:'100%', width:'100%', position:'absolute' }}
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
      >
         
       
      </Viewer>
   
  );
};

export default Globe;
