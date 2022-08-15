import React, { useState, useRef, useEffect } from 'react';
import { Viewer, Entity } from 'resium';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import MapTabContainer from './mapTabContainer';
import ISSData from './issData';
import WorldMap from './WorldMap';
import Globe from './Globe';
import ISSStream from './ISSStream';
import { Col, Input, Label, Row } from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import RightSideISSData from './RightSideISSData';


const Weather = () => {
 
  const [latitude, setLatitude] = React.useState();
  const [longitude, setLongitude] = React.useState();
  const [altitude, setAltitude] = React.useState();

  const [pause, setPause] = useState(false)


  const handlePause = () => setPause(!pause);
  console.log('pause', pause)
  
  return (
    <>
      <div className="page-content mx-3">
      <Row>
                <Col xs={12}>
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0">ISS Analytics</h4>

                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                
                                <li className="breadcrumb-item active">ISS Analytics</li>
                            </ol>
                        </div>

                    </div>
                </Col>
            </Row>
        
        <Row>
          <Col xl={12} md={12}>
        <div style={{height: '3rem'}} className="d-flex align-items-center justify-content-end form-check form-switch form-switch-right form-switch-md">
            {/* <div>

                        <Label className="form-label text-muted">Center ISS</Label>
                        <Input className="form-check-input code-switcher" type="checkbox" />
            </div> */}
            <div>

                        <Label className="form-label text-muted">Pause Updates</Label>
                        <Input onChange={(e) => setPause(e.target.checked)} className="form-check-input code-switcher" type="checkbox" />
            </div>
           </div>
          </Col>
        </Row>
        <Row>
          <Col xl={8} md={12}>
          
             
          <div className='mb-3' style={{height:'35rem',width:'100%', position:'relative'}}>

          <Globe latitude={latitude} longitude={longitude} altitude={altitude} /> 
          </div>
          
           
           
          </Col>
          <Col xl={4} md={12} style={{maxHeight:'33.4rem'}}>
          
          <div className='mt-3 mt-md-0' style={{height:'30%', }}>
            <WorldMap latitude={latitude} longitude={longitude} />
          </div>
          <div className='mt-3' style={{height: '30%', minWidth:'100%',}}>
             <ISSStream width='100%' height='100%' />
          </div>
          <div  className='mb-3 mt-3' style={{ height: '40%', overflow: 'hidden'}}>
             <RightSideISSData pause = {pause} setLatitude={setLatitude} setLongitude={setLongitude} setAltitude ={setAltitude} dataColors='["--vz-primary", "--vz-success"]' />
          </div>
          </Col>
        </Row>
        <Row>
          <Col className='mt-3'>
          

          <MapTabContainer  pause = {pause} setLatitude={setLatitude} setLongitude={setLongitude} altitude={altitude} latitude={latitude} dataColors='["--vz-primary", "--vz-success"]' longitude={longitude}/>
          
          </Col>
        </Row>
        
      </div>
    </>
  );
};

export default Weather;
