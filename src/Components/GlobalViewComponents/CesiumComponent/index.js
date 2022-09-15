import { Ion, createWorldTerrain, ScreenSpaceEventType } from 'cesium';
import React from 'react';
import { Container } from 'reactstrap';
import { Camera, Globe, Scene, Viewer, ScreenSpaceEventHandler, ScreenSpaceEvent, Clock } from 'resium';
import BookmarkedLocations from '../Locations/BookmarkedLocations';
import BookmarkingLocation from '../Locations/BookmarkingLocation';

const CesiumComponent = ({
  // start,
  // stop,
  updateHoverCoord,
  viewerRef,
  viewerClicked,
}) => {

  Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyMDc1ZDFhNS04MTI2LTRhNGMtOGE5NS1kMzc5NTQyZTNhM2QiLCJpZCI6MTA0NDY2LCJpYXQiOjE2NjAyMjI1ODF9.q5-l9OGgiW1Z0G3E0UK1SQkuqemxawu8Rl7-lvC6gpI";
  const worldTerrain = createWorldTerrain();

  return ( 
    <Container style={{width:'100%', height:'100%', position:'relative'}}>
      <Viewer
       
        
        ref={viewerRef}
        terrainProvider={worldTerrain}
        fullscreenElement='globalAssetView_wrapper'
        onClick={viewerClicked}
        full
      > 
       {/* <Clock
       startTime = {start.clone()}
       stopTime = {stop.clone()}
       currentTime = {start.clone()}
       multiplier = {50}
       shouldAnimate = {true}
       /> */}
        <Scene />
        <ScreenSpaceEventHandler>
          <ScreenSpaceEvent action={(evt) => updateHoverCoord(evt)} type={ScreenSpaceEventType.MOUSE_MOVE} />
        </ScreenSpaceEventHandler>
        <Globe />
        <Camera />
        <BookmarkedLocations />
        <BookmarkingLocation />
      </Viewer>
    </Container>
  )
}

export default CesiumComponent;