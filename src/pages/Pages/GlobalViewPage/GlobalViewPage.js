import React, { useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import './globalView.scss';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import MapActions from '../../../Components/GlobalViewComponents/Actions/mapActions';
import FootageComponent from '../../../Components/GlobalViewComponents/FootageComponent';
import CesiumComponent from '../../../Components/GlobalViewComponents/CesiumComponent';
import ConfirmBookmark from '../../../Components/GlobalViewComponents/Actions/confirmBookmark';
import { Cartesian2, Cartesian3, Cartographic, createWorldTerrain, HeightReference, HorizontalOrigin, Math, sampleTerrainMostDetailed, VerticalOrigin } from 'cesium';
import { DispatchContext, initialState, reducer, StateContext } from './StateProvider';
import dron from '../../../assets/images/dron.png';
import * as Cesium from "cesium";
import { flightData, flightData2, flightData3 } from './flightData';


const GlobalViewPage = () => {
  document.title = "Global Asset View | Velzon - React Admin & Dashboard Template";
  const [showPosition, setShowPosition] = useState(false)
  const { startBookMark, bookmarked } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [, forceUpdate] = useReducer((x) => x + 1, 0)
  const viewerRef = useRef(null);
  const viewer = viewerRef?.current?.cesiumElement;
  
  // creating moving entities

  
  
 
  // const timeStepInSeconds = 30;
  // const totalSeconds = timeStepInSeconds * (flightData.length - 1);
  // const start = Cesium.JulianDate.fromIso8601("2020-03-09T23:10:00Z");
  // const stop = Cesium.JulianDate.addSeconds(start, totalSeconds, new Cesium.JulianDate());
  
  
  
  
  // // The SampledPositionedProperty stores the position and timestamp for each sample along the radar sample series.
  // const positionProperty1 = new Cesium.SampledPositionProperty();
  // const positionProperty2 = new Cesium.SampledPositionProperty();
  // const positionProperty3 = new Cesium.SampledPositionProperty();
  
  // for (let i = 0; i < flightData.length; i++) {
  //   const dataPoint = flightData[i];
  
  //   // Declare the time for this individual sample and store it in a new JulianDate instance.
  //   const time = Cesium.JulianDate.addSeconds(start, i * timeStepInSeconds, new Cesium.JulianDate());
  //   const position = Cesium.Cartesian3.fromDegrees(dataPoint.longitude, dataPoint.latitude, dataPoint.height);
  //   // Store the position along with its timestamp.
  //   // Here we add the positions all upfront, but these can be added at run-time as samples are received from a server.
  //   positionProperty1.addSample(time, position);
  
    
  // }
  
  // // STEP 4 CODE (green circle entity)
  // // Create an entity to both visualize the entire radar sample series with a line and add a point that moves along the samples.
  // viewer?.entities.add({
  //   availability: new Cesium.TimeIntervalCollection([ new Cesium.TimeInterval({ start: start, stop: stop }) ]),
  //   position: positionProperty1,
  //   billboard: {
  //     image: dron,
  //     eyeOffset: new Cartesian3(0.0, 0.0, -10.0),
  //     heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
  //     verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
  //     horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
  //     disableDepthTestDistance: 1.2742018*10**7 
  //   },
  //   path: new Cesium.PathGraphics({
  //     width: 3,
  //     leadTime: 0,
      
  //   })
  // });
  
  
  // for (let i = 0; i < flightData.length; i++) {
  //   const dataPoint = flightData2[i];
  
  //   // Declare the time for this individual sample and store it in a new JulianDate instance.
  //   const time = Cesium.JulianDate.addSeconds(start, i * timeStepInSeconds, new Cesium.JulianDate());
  //   const position = Cesium.Cartesian3.fromDegrees(dataPoint.longitude, dataPoint.latitude, dataPoint.height);
  //   // Store the position along with its timestamp.
  //   // Here we add the positions all upfront, but these can be added at run-time as samples are received from a server.
  //   positionProperty2.addSample(time, position);
  
    
  // }
  
  // // STEP 4 CODE (green circle entity)
  // // Create an entity to both visualize the entire radar sample series with a line and add a point that moves along the samples.
  // viewer?.entities.add({
  //   availability: new Cesium.TimeIntervalCollection([ new Cesium.TimeInterval({ start: start, stop: stop }) ]),
  //   position: positionProperty2,
  //   billboard: {
  //     image: dron,
  //     eyeOffset: new Cartesian3(0.0, 0.0, -10.0),
  //     heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
  //     verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
  //     horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
  //     disableDepthTestDistance: 1.2742018*10**7 
  //   },
  //   path: new Cesium.PathGraphics({
  //     width: 3,
  //     leadTime: 0,
      
  //   })
  // });
 
  
  // for (let i = 0; i < flightData.length; i++) {
  //   const dataPoint = flightData3[i];
  
  //   // Declare the time for this individual sample and store it in a new JulianDate instance.
  //   const time = Cesium.JulianDate.addSeconds(start, i * timeStepInSeconds, new Cesium.JulianDate());
  //   const position = Cesium.Cartesian3.fromDegrees(dataPoint.longitude, dataPoint.latitude, dataPoint.height);
  //   // Store the position along with its timestamp.
  //   // Here we add the positions all upfront, but these can be added at run-time as samples are received from a server.
  //   positionProperty3.addSample(time, position);
  
    
  // }
  
  // // STEP 4 CODE (green circle entity)
  // // Create an entity to both visualize the entire radar sample series with a line and add a point that moves along the samples.
  // viewer?.entities.add({
  //   availability: new Cesium.TimeIntervalCollection([ new Cesium.TimeInterval({ start: start, stop: stop }) ]),
  //   position: positionProperty3,
  //   billboard: {
  //     image: dron,
  //     eyeOffset: new Cartesian3(0.0, 0.0, -10.0),
  //     heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
  //     verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
  //     horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
  //     disableDepthTestDistance: 1.2742018*10**7 
  //   },
  //   path: new Cesium.PathGraphics({
  //     width: 3,
  //     leadTime: 0,
      
  //   })
  // });
  


  var isBookmarking = useRef(false); // ref is used here because, without it, "viewerClicked" function will be accessing the stale value of "startBookMark"
  isBookmarking.current = startBookMark;
  const terrainProvider = createWorldTerrain()

  // calculates the mouse's position
  function calcMousePos(evt) {
    const scene = viewerRef.current?.cesiumElement?.scene;
    if (!scene) return;
    const ellipsoid = scene.globe.ellipsoid;
    const cartesian = scene.camera.pickEllipsoid(evt?.endPosition, ellipsoid);
    if (cartesian) return cartesian;
    return null;
  }

  function radiansToDegrees(radians) {
    let pi = Math.PI;
    return radians * (180 / pi);
  }
  
  // calculates the coordinates of the clicked location/position
  const getPosition = (object) => {
    const scene = viewerRef.current?.cesiumElement?.scene;
    if (!scene) return;
    const ellipsoid = scene?.globe?.ellipsoid;
    const { x, y } = object.position
    const cartesian = scene?.camera?.pickEllipsoid(new Cartesian2(x, y), ellipsoid);
    if (!cartesian) return;
    const { latitude, longitude, height } = ellipsoid.cartesianToCartographic(cartesian);

    const lat = Number(radiansToDegrees(latitude).toFixed(5));
    const long = Number(radiansToDegrees(longitude).toFixed(5));
    const alt = Number(radiansToDegrees(height).toFixed(5));
    return { lat, long, alt };
  }

  const getTerrainHeight = async(longitude, latitude) => {
    const positions = [
      Cartographic.fromDegrees(longitude, latitude)
    ]

      const sample = await sampleTerrainMostDetailed(terrainProvider, positions)
      const height = (radiansToDegrees(sample[0]?.height))
        
      return height
  }

  const viewerClicked = (object, entity) => {
    // if the user is bookmarking a location
    if (isBookmarking?.current && (entity === undefined)) {
      const position = getPosition(object);
      if (!position) return;
      const { lat, long } = position;
      const height = getTerrainHeight(long, lat)
      dispatch({
        type: "UPDATE_BOOKMARKING",
        payload: {
          method: "lat",
          value: lat
        }
      })
      dispatch({
        type: "UPDATE_BOOKMARKING",
        payload: {
          method: "long",
          value: long
        }
      })
      dispatch({
        type: "UPDATE_BOOKMARKING",
        payload: {
          method: "alt",
          value: height
        }
      })

    }
    // if the user want's to view more about a bookmarked location entity?.id?._position?._value
    if (entity) {
      const name = entity?.id?._name
      const selectedEntity = bookmarked.filter(bookmark => bookmark.name === name)
      flyToPos(selectedEntity[0]?.longitude, selectedEntity[0]?.latitude);
  }
}


  // flies the camera to a specified location
  const flyToPos = async (longitude, latitude) => {
    if (!longitude || !latitude) return
    const height = await getTerrainHeight(longitude, latitude);

    const viewer = viewerRef?.current?.cesiumElement
    viewer?.camera?.flyTo({
      destination: Cartesian3.fromDegrees(longitude, latitude, height + 500.00)
    });

  }

  const tooltip = document.createElement('DIV');
  tooltip.className = "toolTip-gl"
  
  const title = document.createElement('DIV');
  title.className = "tooltipdiv-inner";
  tooltip.appendChild(title);
  
  
  tooltip.style.display = 'none';
  

   //show coordinates on hover
   const coordinates = viewerRef?.current?.cesiumElement?.entities?.add({
    label: {
      show: false,
      showBackground: true,
      font: "14px monospace",
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      verticalOrigin: Cesium.VerticalOrigin.TOP,
      pixelOffset: new Cesium.Cartesian2(15, 0),
    },
  });
  console.log('coordinates', coordinates)

  const scratch3dPosition = new Cesium.Cartesian3();
  const scratch2dPosition = new Cesium.Cartesian2();
  viewerRef?.current?.cesiumElement?.clock.onTick.addEventListener(function(clock) {
    let position3d;
    let position2d;
   

    // Not all entities have a position, need to check.
    if (coordinates?.position) {
        position3d = coordinates?.position.getValue(clock.currentTime, scratch3dPosition);
    } 

    // Moving entities don't have a position for every possible time, need to check.
    if (position3d) {
        position2d = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
          viewerRef?.current?.cesiumElement?.scene, position3d, scratch2dPosition);
    }

    // Having a position doesn't guarantee it's on screen, need to check.
    if (position2d) {
        // Set the HTML position to match the coordinates's position.
        tooltip.style.left = position2d.x + 30 + "px";
        tooltip.style.top = (position2d.y - tooltip.clientHeight/2) + "px";
        
    } 
   
});

 
  // updates the mouse's position (latitude and longitude)
  const updateHoverCoord = (evt) => {
    let cartesian = calcMousePos(evt)
   
    if (!coordinates) return;
   
    if (cartesian && showPosition) {
      const cartographic = Cartographic.fromCartesian(
        cartesian
      );
      const longitudeString = Math.toDegrees(
        cartographic.longitude
      ).toFixed(2);
      const latitudeString = Math.toDegrees(
        cartographic.latitude
      ).toFixed(2);
      
      coordinates.position = cartesian;
      tooltip.style.display = 'block';
      // coordinates.label.text =
      //   `Lon: ${`   ${longitudeString}`.slice(-7)}\u00B0` +
      //   `\nLat: ${`   ${latitudeString}`.slice(-7)}\u00B0`;
      tooltip.innerHTML = `Latitude: ${latitudeString}, Longitude: ${longitudeString}`;
      viewerRef?.current?.cesiumElement?.container?.appendChild(tooltip);
      } else {
        tooltip.style.display = 'none';
      }
      
       
    
    
    
       
    
    // dispatch({
    //   type: "UPDATE_HOVERCOORDS",
    //   payload: {
    //     long: longitude,
    //     lat: latitude,
    //   }
    // })
  }
  useEffect(() => {
    forceUpdate()
   
  },[])

  // prevent the cesium viewer from rerendering 
  const cesiumComponent = useMemo(() => (
    <>
      <CesiumComponent
        // start = {start}
        // stop = {stop}
        updateHoverCoord={updateHoverCoord}
        viewerRef={viewerRef}
        viewerClicked={viewerClicked}
      />
    </>
  ), [showPosition])


  return (
    <div className="page-content">
          <Container fluid>
      
      <Row>
          <Col xs={12}>
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0">Global Asset View</h4>

                  <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                          
                          <li className="breadcrumb-item active">Global Asset View</li>
                      </ol>
                  </div>

              </div>
          </Col>
      </Row>
        

                <MapActions setShowPosition={setShowPosition} flyToPos={flyToPos} />
        <Row>
         
           
              
           
             
             

               
                <Col xs={7} style={{minHeight:'40rem'}}>
                <div className='w-100 h-100 position-relative' id='globalAssetView_wrapper'>
                {/* <ConfirmBookmark /> */}
                {cesiumComponent}
                  {/* <CesiumComponent
                  updateHoverCoord={updateHoverCoord}
                  viewerRef={viewerRef}
                  viewerClicked={viewerClicked}
                /> */}
                </div>
                
                
                  
                </Col>
               
                <Col xs={5}>
                 
               <FootageComponent/>
                  
                </Col>
               
             
             
           
        
        </Row>
     
    </Container>
    </div>
  );
}


const GlobalAssetView = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <GlobalViewPage />
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export default GlobalAssetView;