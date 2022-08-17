import React, { useState, useRef, useEffect } from 'react';
import { Viewer, Entity } from 'resium';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import MapTabContainer from './mapTabContainer';
import ISSData from './issData';
import WorldMap from './WorldMap';
import Globe from './Globe';
import ISSStream from './ISSStream';
import { Card, CardBody, Col, Input, Label, Row } from 'reactstrap';
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
        <Row className='mb-3'>
          
          <Col xl={8} md={12}>
          
            
          <div style={{minHeight:'36.7rem',width:'100%', position:'relative'}}>

          <Globe latitude={latitude} longitude={longitude} altitude={altitude} /> 
          </div>
          
           
           
          </Col>
          <Col xl={4} md={12}>
           <div style={{maxHeight:'33rem'}}> 
                                <Card>
                                   
                                   
                                        <div id="gmaps-markers" className="wmap" style={{ position: "relative" }}>
                                        <WorldMap latitude={latitude} longitude={longitude} />
                                            </div>
                                    
                                </Card>
                                <Card>
                                   
                                   
                                        <div id="gmaps-markers" className="wmap" style={{ position: "relative" }}>
                                        <ISSStream width='100%' height='100%' />
                                            </div>
                                    
                                </Card>
                                <Card>
                                   
                                   
                                        <div id="gmaps-markers" className="wmap" style={{ position: "relative" }}>
                                        <RightSideISSData pause = {pause} setLatitude={setLatitude} setLongitude={setLongitude} setAltitude ={setAltitude} dataColors='["--vz-primary", "--vz-success"]' />
                                            </div>
                                    
                                </Card>
                           
          </div>
          </Col>
        
        </Row>
        <Row>
          <Col className='mt-5'>
          

          <MapTabContainer  pause = {pause} setLatitude={setLatitude} setLongitude={setLongitude} altitude={altitude} latitude={latitude} dataColors='["--vz-primary", "--vz-success"]' longitude={longitude}/>
          
          </Col>
        </Row>
        
      </div>
    </>
  );
};

export default Weather;
