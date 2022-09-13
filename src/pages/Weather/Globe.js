// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { Viewer, Entity } from "resium";
import * as Resium from "resium";
import * as Cesium from "cesium";
import image from '../../assets/images/iss.png'
import location from '../../assets/images/location.png'
import {Ion, createWorldTerrain, Cartesian3, Cartesian2, Color} from "cesium";
import useGeoLocation from "./useGeoLocation";



const Globe = ({center, latitude, longitude, altitude, latlngs }) => {
  
  const location = useGeoLocation();
  const operatorLat = location.loaded? location.coordinates.lat.toFixed(1) : null;
  const operatorLong = location.loaded? location.coordinates.lng.toFixed(1) : null;

  
 
  const [viewerRef, setViewerRef] = useState(null);

 
  const [issLat, setIssLat] = useState(null);
  const [issLong, setIssLong] = useState(null);
  const [id, setId] = useState(null);
  
  
  const issTooltip = document.createElement('DIV');
  issTooltip.className = "toolTip-left"
  
  const title = document.createElement('DIV');
  title.className = "tooltipdiv-inner";
  issTooltip.appendChild(title);
  
  
  issTooltip.style.display = 'none';
  issTooltip.innerHTML = `Latitude: ${latitude?.toFixed(1)}, Longitude: ${longitude?.toFixed(1)}`;
  viewerRef?.container.appendChild(issTooltip);
  
  const operatorTooltip = document.createElement('DIV');
  operatorTooltip.className = "toolTip-left"
  
  const OperatorTitle = document.createElement('DIV');
  title.className = "tooltipdiv-inner";
  operatorTooltip.appendChild(OperatorTitle);
  
  
  operatorTooltip.style.display = 'none';
  operatorTooltip.innerHTML = `Latitude: ${operatorLat}, Longitude: ${operatorLong}`;
  viewerRef?.container.appendChild(operatorTooltip);


let issEntity = viewerRef?.entities.getById('1')
let operatorEntity = viewerRef?.entities.getById('2')

const scratch3dPosition = new Cesium.Cartesian3();
const scratch2dPosition = new Cesium.Cartesian2();
var isISSEntityVisible = true;
var isOperatorEntityVisible = true;
// Every animation frame, update the HTML element position from the issEntity.
viewerRef?.clock.onTick.addEventListener(function(clock) {
    let issPosition3d;
    let issPosition2d;
   

    // Not all entities have a position, need to check.
    if (issEntity?.position) {
        issPosition3d = issEntity?.position.getValue(clock.currentTime, scratch3dPosition);
    } 

    // Moving entities don't have a position for every possible time, need to check.
    if (issPosition3d) {
        issPosition2d = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
            viewerRef?.scene, issPosition3d, scratch2dPosition);
    }

    // Having a position doesn't guarantee it's on screen, need to check.
    if (issPosition2d) {
        // Set the HTML position to match the issEntity's position.
        issTooltip.style.left = issPosition2d.x + 30 + "px";
        issTooltip.style.top = (issPosition2d.y - issTooltip.clientHeight/2) + "px";

        if (!isISSEntityVisible) {
          isISSEntityVisible = true;
          issTooltip.style.display = 'block';
      }
        
    } else if (isISSEntityVisible) {
      // Hide HTML when entity goes off screen or loses its position.
      isISSEntityVisible = false;
      issTooltip.style.display = 'none';
  }
   
});
viewerRef?.clock.onTick.addEventListener(function(clock) {
    
    let OperatorPosition3d;
    let OperatorPosition2d;

    // Not all entities have a position, need to check.
    if (operatorEntity?.position) {
        OperatorPosition3d = operatorEntity?.position.getValue(clock.currentTime, scratch3dPosition);
    } 

    // Moving entities don't have a position for every possible time, need to check.
    if (OperatorPosition3d) {
        OperatorPosition2d = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
            viewerRef?.scene, OperatorPosition3d, scratch2dPosition);
    }

    // Having a position doesn't guarantee it's on screen, need to check.
    if (OperatorPosition2d) {
        // Set the HTML position to match the operatorEntity's position.
       
        operatorTooltip.style.left = OperatorPosition2d.x + 30 + "px";
        operatorTooltip.style.top = (OperatorPosition2d.y - operatorTooltip.clientHeight/2) + "px";
        
        if (!isOperatorEntityVisible) {
          isOperatorEntityVisible = true;
          operatorTooltip.style.display = 'block';
      }
    } 
    else if (isOperatorEntityVisible) {
      // Hide HTML when entity goes off screen or loses its position.
      isOperatorEntityVisible = false;
      operatorTooltip.style.display = 'none';
  }
   
});

 console.log('id', id)
 

  useEffect(() => {
    if (center) {
      viewerRef?.camera.setView({
        destination : Cesium.Cartesian3.fromDegrees(
          latitude,
          longitude,
          Cesium.Ellipsoid.WGS84.cartesianToCartographic(viewerRef?.camera.position).height
        )
    });
    }
    
  })
 
        
  var scene = viewerRef?.scene;
      var handler = new Cesium.ScreenSpaceEventHandler(scene?.canvas);
      
      //Mouse in custom pop-up
      handler.setInputAction(function (movement) {
       
        if (scene?.mode !== Cesium.SceneMode.MORPHING) {
          var pickedObject = scene?.pick(movement.endPosition);
          
          if (Cesium.defined(pickedObject) && pickedObject.id._id === '1') {
            
            isISSEntityVisible = false;
            
            // issTooltip.style.display = 'block';
           
          } 
          else {
            issTooltip.style.display = 'none';
          }
          if (Cesium.defined(pickedObject) && pickedObject.id._id === '2') {
            // operatorTooltip.style.display = 'block';
            isOperatorEntityVisible = false;
          } else {
           
            // isISSEntityVisible = true;
            // issTooltip.style.display = 'none';
            operatorTooltip.style.display = 'none';
          }
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  
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
 
  
   
  
 
  useEffect(() => {
    setIssLat(latitude);
    setIssLong(longitude);
    
  },[latitude, longitude])

 
 const issDes = `Latitude: ${latitude?.toFixed(1)}, Longitude: ${longitude?.toFixed(1)}`;
 const operatorDes = `Latitude: ${operatorLat}, Longitude: ${operatorLong}`;
  return (
    <> 
    
    {(issLat && issLong) && <Viewer 
      full
       
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
                eyeOffset = {new Cartesian3(0.0, 0.0, -10.0)}
                heightReference = {Cesium.HeightReference.CLAMP_TO_GROUND}
                verticalOrigin = {Cesium.VerticalOrigin.CENTER}
                horizontalOrigin = {Cesium.HorizontalOrigin.CENTER}
                disableDepthTestDistance= {1.2742018*10**7} 
            />
        </Resium.Entity>}
          <Resium.Entity 
           id = '1'
           name="ISS"
           description= {issDes}
           position={Cartesian3.fromDegrees(issLat, issLong, 100)}
         
          >
            <Resium.BillboardGraphics
                image = {image}
                // scale = {0.2}
                eyeOffset = {new Cartesian3(0.0, 0.0, -10.0)}
                heightReference = {Cesium.HeightReference.CLAMP_TO_GROUND}
                verticalOrigin = {Cesium.VerticalOrigin.CENTER}
                horizontalOrigin = {Cesium.HorizontalOrigin.CENTER}
                disableDepthTestDistance= {1.2742018*10**7} 
            />

           
        </Resium.Entity>
          {location.loaded && <Resium.Entity 
           id= "2"
           name="Operator Position"
           description= {operatorDes}
           position={Cartesian3.fromDegrees(Number(operatorLat), Number(operatorLong), 100)}
           width={10}
           point= {{ pixelSize: 8, color: Cesium.Color.YELLOW }}
          >
           
        </Resium.Entity>}
        
      </Viewer>}
      
    </>
  );
};

export default Globe;
