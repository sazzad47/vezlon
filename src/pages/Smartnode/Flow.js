import React from 'react';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import './Search.css'
import DnDFlow from './Dragdrop';
import {  Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import { Container } from 'reactstrap';
import ImageH from './ImageH';
import Sidebar from './Sidebar';
function Flow() {
  
   return (
    
    <div>
      
      <React.Fragment>
      
      <div className="page-content">
      <Container fluid>
      <BreadCrumb title="Smart Nodes" pageTitle="Flow" />
      <Row>
                            <Col lg={15}>
                                <Card>
                                    <CardHeader>
                                        <h4 className="card-title mb-0" >Smart Nodes</h4>
                                        
                                    </CardHeader>
                                    
                                    <CardBody>
                                        <div id="gmaps-markers" className="gmaps" style={{ position: "relative",height:"600px", width:"100%" }}>
                                        <div style={{width: "100%",height:"100%"}}>
    
 <DnDFlow />
</div>
                                            </div>
                                            
                                    </CardBody>
                                </Card>
                            </Col>
                           
                            </Row>
                            <Row>
                            <Col lg={15}>
                                <Card>
                                    <CardHeader>
                                        <h4 className="card-title mb-0" >Image Handler</h4>
                                        
                                    </CardHeader>
                                    <CardBody>
                                        <div id="gmaps-markers" className="gmaps" style={{ position: "relative",height:"600px", width:"100%" }}>
                                        <div style={{width: "100%",height:"100%"}}>
    <ImageH />

</div>
                                            </div>
                                            
                                    </CardBody>
                                </Card>
                            </Col>
                           
                            </Row>
      
   
                            
   </Container>
   
   </div>
   </React.Fragment>
   </div>

   );
   
   }
   
   export default Flow;

  
   