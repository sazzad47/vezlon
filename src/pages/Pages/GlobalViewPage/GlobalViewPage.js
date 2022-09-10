import React, { useContext, useMemo, useReducer, useRef } from 'react';
import { Col, Container, Row } from 'reactstrap';
import './globalView.scss';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import MapActions from '../../../Components/GlobalViewComponents/Actions/mapActions';
import FootageComponent from '../../../Components/GlobalViewComponents/FootageComponent';
import CesiumComponent from '../../../Components/GlobalViewComponents/CesiumComponent';
import ConfirmBookmark from '../../../Components/GlobalViewComponents/Actions/confirmBookmark';
import { Cartesian2, Cartesian3, Cartographic, createWorldTerrain, Math, sampleTerrainMostDetailed } from 'cesium';
import { DispatchContext, initialState, reducer, StateContext } from './StateProvider';


const GlobalViewPage = () => {
  document.title = "Global Asset View | Velzon - React Admin & Dashboard Template";

  const { startBookMark, bookmarked } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const viewerRef = useRef(null);
  var isBookmarking = useRef(false); // ref is used here because, without it, "viewerClicked" function will be accessing the stale value of "startBookMark"
  isBookmarking.current = startBookMark;
  const terrainProvider = createWorldTerrain()

  // calculates the mouse's position
  function calcMousePos(evt) {
    const scene = viewerRef.current?.cesiumElement?.scene;
    if (!scene) return;
    const ellipsoid = scene.globe.ellipsoid;
    const cartesian = scene.camera.pickEllipsoid(evt.endPosition, ellipsoid);
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

  // updates the mouse's position (latitude and longitude)
  const updateHoverCoord = (evt) => {
    const cartesian = calcMousePos(evt)
    if (!cartesian) return;
    const cartographic = Cartographic.fromCartesian(cartesian);
    const longitude = Math.toDegrees(
      cartographic.longitude
    ).toFixed(2);
    const latitude = Math.toDegrees(
      cartographic.latitude
    ).toFixed(2);

    dispatch({
      type: "UPDATE_HOVERCOORDS",
      payload: {
        long: longitude,
        lat: latitude,
      }
    })
  }

  // prevent the cesium viewer from rerendering 
  const cesiumComponent = useMemo(() => (
    <>
      <CesiumComponent
        updateHoverCoord={updateHoverCoord}
        viewerRef={viewerRef}
        viewerClicked={viewerClicked}
      />
    </>
  ), [])


  return (
    <Container className="page-content overflow-hidden">
      <Container fluid className='p-0'>
        <BreadCrumb title="Global Asset View" pageTitle="Pages" />
        <Row className='no-gutters'>
          <Col xs={12}>
            <div className='p-0 w-100 h-100 globalAssetView_container' id='globalAssetView_wrapper' fluid>
              <div className='p-0 mapActions_wrapper'>
                <MapActions flyToPos={flyToPos} />
              </div>
              <div className='p-0 d-flex position-relative overflow-auto globalassetview_bottom'>
                <ConfirmBookmark />
                {cesiumComponent}
                <FootageComponent />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
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