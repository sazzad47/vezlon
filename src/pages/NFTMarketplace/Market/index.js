import React, { useState, useEffect } from "react";
import "../../../assets/scss/config/saas/marketplace.scss";
import {
  Card,
  CardHeader,
  CardBody,
  Col,
  Container,
  Row,
  TabContent,
  TabPane,
  NavItem,
  NavLink,
  Nav,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  CardFooter,
} from "reactstrap";
import { Link } from "react-router-dom";
import classnames from "classnames";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import orbitalsm from "../../../assets/images/marketplaceSoon/orbital.png";
import logo from "../../../assets/images/logo-sm.png";

import { cardData } from "./Data";
import img4 from "../../../assets/images/small/img-4.jpg";

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DetailsModal, MarketPlaceModal, RestrictedModal } from "./Modals";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Marketplace = () => {
  document.title = "Marketplace | Velzon - React Admin & Dashboard Template";

 

  const [customActiveTab, setcustomActiveTab] = useState("1");
 
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };
 
  
  const [files, setFiles] = useState([]);

  

 

  
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Marketplace" pageTitle="Marketplace" />

          <div className="search-box my-4">
            <input
              id="search-user"
              type="text"
              className="form-control bg-light border-light"
              placeholder="Search here..."
            />
            <i className="ri-search-2-line search-icon"></i>
          </div>

          <Row>
            <Col xxl={12}>
              <ToastContainer />
            
                <CardBody>
                  <Nav
                    tabs
                    className="nav nav-tabs nav-tabs-custom nav-success nav-justified mb-3"
                  >
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={`${classnames({
                          active: customActiveTab === "1",
                        })} `}
                        onClick={() => {
                          toggleCustom("1");
                        }}
                      >
                        Processing (70)
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customActiveTab === "2",
                        })}
                        onClick={() => {
                          toggleCustom("2");
                        }}
                      >
                        Custom Blocks (0)
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent
                    activeTab={customActiveTab}
                    className="text-muted"
                  >
                    <TabPane tabId="1" id="home1">
                     
                      <Row>
                        {cardData.map((item, index ) => (
                              
                                <Col xl={4} md={6} key={index}>
                                    <Card>
                                     
                                      <div style={{minHeight:'10rem', minWidth:'100%'}}>

                                        <img style={{width:'100%', height:'100%', objectFit: 'contain'}} src={item.image}  alt="..." />
                                      </div>
                                      
                                        <CardBody>
                                            <h5 className="card-title">{item.heading}</h5>
                                            <p className="text-muted">{item.subHeading}</p>
                                            <div className="d-flex align-items-end justify-content-between">
                                                <p className="text-muted 
                                                justify-content-center flex align-items-center ">
                                                    <i className="bx bx-coin-stack"></i>{item.speed}
                                                </p>
                                                <p className="text-muted 
                                                justify-content-center flex align-items-center ">
                                                    <i className="bx bx-bookmarks"></i>{item.public}
                                                </p>
                                              
                                              </div> 
                                            
                                        </CardBody>
                                        <CardFooter className="d-flex align-items-center justify-content-between">
                                          {item.restricted? <RestrictedModal /> : <DetailsModal item = {item}/>}
                                         {item.restricted?<p 
                                               style={{color:"red"}} 
                                                className="card-text text-bg-danger"
                                                >
                                                <i className="bx bx-lock-alt"></i>Restricted Block
                                             </p>:null} 
                                        </CardFooter>
                                    </Card>
                                </Col>
                        )
                        )}
                        </Row>
                     
                  
                      
                    </TabPane>

                  
                    <TabPane tabId="2">
                     
                        <div className="text-center mt-6">
                          <h3>Custom Blocks</h3>
                          <p>
                            Manage your custom building blocks to the platform
                          </p>
                        </div>

                        
                            <Row>
                            <Col xl={4} md={6} >
                            
                                
                                <Card style={{border:"2px dashed #32383e", borderRadius:"6px", minHeight:"25rem", display:'flex', justifyContent:'center'}}>
                                  <FilePond
                                    files={files}
                                    onupdatefiles={setFiles}
                                    allowMultiple={true}
                                    maxFiles={10}
                                    name="files"
                                    className="filepond filepond-input-multiple"
                                    allowImagePreview={false}
                                    onaddfile={() =>
                                      toast.success("Successfully uploaded")
                                    }
                                    
                                    labelButtonProcessItem="upload"
                                  />
                                 </Card>
                                 </Col>
                               
                                {files.map((item, index) => (
                                   <Col xl={4} md={6} key={index} >
                                      <Card style={{maxHeight:'25rem'}}>
                                   
                                    <div style={{minHeight:'10rem', minWidth:'100%'}}>

                                      <img style={{width:'100%', height:'100%', objectFit: 'contain'}} src={orbitalsm}  alt="..." />
                                    </div>
                                    
                                      <CardBody>
                                          <h5 className="card-title">Building Detection</h5>
                                          <p className="text-muted">This block provides a water-related geohazards prediction processing workflow with Sentinel-2 Geotiff format scenes.</p>
                                          <div className="d-flex align-items-end justify-content-between">
                                              <p className="text-muted 
                                              justify-content-center flex align-items-center ">
                                                  <i className="bx bx-coin-stack"></i>100 per km
                                              </p>
                                              <p className="text-muted 
                                              justify-content-center flex align-items-center ">
                                                  <i className="bx bx-bookmarks"></i>2.0.0 public
                                              </p>
                                            
                                            </div> 
                                          
                                      </CardBody>
                                      <CardFooter className="d-flex align-items-center justify-content-between">
                                        <RestrictedModal />
                                         <p 
                                             style={{color:"red"}} 
                                              className="card-text text-bg-danger"
                                              >
                                              <i className="bx bx-lock-alt"></i>Not Verified
                                           </p>
                                      </CardFooter>
                                  </Card>
                                  </Col>
                             
                           
                                ))}
                              
                            
                                </Row>
                           
                         

                       
                        <Row className="mt-5">
                                <Col xxl={6}>
                                    <Card>
                                        <Row className="g-0">
                                            <Col md={4}>
                                                <img className="rounded-start img-fluid h-100 object-cover" src={img4} alt="Card" />
                                            </Col>
                                            <Col md={8}>
                                                <CardHeader>
                                                    <h5 className="card-title mb-0">SELL CUSTOM BLOCKS IN THE
                                                        MARKETPLACE
                                                        </h5>
                                                </CardHeader>
                                                <CardBody>
                                                <p 
                                                                style={{maxWidth:"50%", width:"500px"}}
                                                                className="p-2"    
                                                            >
                                                                Are you interested in enabling
                                                                other developers to use your
                                                                custom blocks for a royalty fee?
                                                                We allow you to monitize your
                                                                geospatial offering in the marketplace.
                                                            </p>
                                                </CardBody>
                                                <CardFooter className="d-flex justify-content-end">
                                                  <MarketPlaceModal/>
                                                </CardFooter>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                                </Row>
                    
                    </TabPane>
                  </TabContent>
                </CardBody>

            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Marketplace;
