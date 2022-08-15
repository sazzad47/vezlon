import {
  Card,
  Col,
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
  Container,
} from "reactstrap";
import CountUp from "react-countup";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { useState } from "react";
const RestrictedModal = () => {
  const [restrictedModal, setRestrictedModal] = useState(false);
  function tog_backdrop() {
    setRestrictedModal(!restrictedModal);
  }
  return (
    <>
      <Link
        to="#"
        onClick={() => tog_backdrop()}
        className="btn btn-primary stretched-link"
      >
        See Details
      </Link>
      <Modal
        isOpen={restrictedModal}
        toggle={() => {
          tog_backdrop();
        }}
        backdrop={"static"}
        id="staticBackdrop"
        centered
      >
        <ModalHeader
          id="staticBackdropLabel"
          toggle={() => {
            tog_backdrop();
          }}
        >
          Restricted
        </ModalHeader>
        <div className="modal-body text-center p-5">
          <lord-icon
            src="https://cdn.lordicon.com/falqeilw.json"
            trigger="loop"
            colors="primary:#121331,secondary:#08a88a"
            style={{ width: "120px", height: "120px" }}
          ></lord-icon>
          <div className="mt-4">
            <h4 className="mb-3">Restricted block</h4>
            <p className="text-muted mb-4">
              {" "}
              Sorry, this is a restricted block. You can't access this block
              without authorized permission.
            </p>
            <div className="hstack gap-2 justify-content-center">
              <Link
                to="#"
                className="btn btn-link link-success fw-medium"
                onClick={() => setRestrictedModal(false)}
              >
                <i className="ri-close-line me-1 align-middle"></i> Close
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
const UnverifiedModal = () => {
  const [restrictedModal, setRestrictedModal] = useState(false);
  function tog_backdrop() {
    setRestrictedModal(!restrictedModal);
  }
  return (
    <>
      <Link
        to="#"
        onClick={() => tog_backdrop()}
        className="btn btn-primary stretched-link"
      >
        See Details
      </Link>
      <Modal
        isOpen={restrictedModal}
        toggle={() => {
          tog_backdrop();
        }}
        backdrop={"static"}
        id="staticBackdrop"
        centered
      >
        <ModalHeader
          id="staticBackdropLabel"
          toggle={() => {
            tog_backdrop();
          }}
        >
          Not Verified
        </ModalHeader>
        <div className="modal-body text-center p-5">
          <lord-icon
            src="https://cdn.lordicon.com/falqeilw.json"
            trigger="loop"
            colors="primary:#121331,secondary:#08a88a"
            style={{ width: "120px", height: "120px" }}
          ></lord-icon>
          <div className="mt-4">
            <h4 className="mb-3">This block is not verified.</h4>
            <p className="text-muted mb-4">
              {" "}
              This block is not verified. Kindly get in touch with our
              partnership team at{" "}
              <span style={{ color: "#3498db" }}>
                partnerships@marketplace.com
              </span>{" "}
              to get your block verified.
            </p>
            <div className="hstack gap-2 justify-content-center">
              <Link
                to="#"
                className="btn btn-link link-success fw-medium"
                onClick={() => setRestrictedModal(false)}
              >
                <i className="ri-close-line me-1 align-middle"></i> Close
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
const MarketPlaceModal = () => {
  const [modal_center, setmodal_center] = useState(false);
  function tog_center() {
    setmodal_center(!modal_center);
  }
  return (
    <>
      <Button
        color="dark"
        outline
        className="btn btn-ghost-dark"
        onClick={() => tog_center()}
      >
        Sell Block
      </Button>
      <Modal
        isOpen={modal_center}
        toggle={() => {
          tog_center();
        }}
        backdrop={"static"}
        id="staticBackdrop"
        centered
      >
        <ModalHeader
          id="staticBackdropLabel"
          toggle={() => {
            tog_center();
          }}
        >
          Marketplace
        </ModalHeader>
        <div className="modal-body text-center p-5">
          <lord-icon
            src="https://cdn.lordicon.com/rwzqttux.json"
            trigger="loop"
            colors="primary:#121331,secondary:#08a88a"
            style={{ width: "120px", height: "120px" }}
          ></lord-icon>
          <div className="mt-4">
            <h4 className="mb-3"> Sell custom blocks in the marketplace</h4>
            <p className="text-muted mb-4">
              {" "}
              Please get in touch with our partnership team at
              partnerships@marketplace.com to discuss opportunities for making
              your custom blocks available in the marketplace
            </p>
            <div className="hstack gap-2 justify-content-center">
              <Link
                to="#"
                className="btn btn-link link-success fw-medium"
                onClick={() => setmodal_center(false)}
              >
                <i className="ri-close-line me-1 align-middle"></i> Close
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
const DetailsModal = ({ item }) => {
  const [detailsModal, setDetailsModal] = useState(false);
  function tog_modal() {
    setDetailsModal(!detailsModal);
  }

  const [customActiveTab, setcustomActiveTab] = useState("1");
  const toggleTab = (tab2) => {
    if (customActiveTab !== tab2) {
      setcustomActiveTab(tab2);
    }
  };
  const [modal_animationZoom, setmodal_animationZoom] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const getImg = (image) => {
    setImageSrc(image);
    setmodal_animationZoom(!modal_animationZoom);
  };
  return (
    <>
      <Link
        to="#"
        onClick={() => tog_modal()}
        className="btn btn-primary stretched-link"
      >
        See Details
      </Link>
      <Modal
        size="xl"
        isOpen={detailsModal}
        toggle={() => {
          tog_modal();
        }}
        id="exampleModal"
      >
        <div>
          <div
            className="d-flex justify-content-between"
            style={{ padding: "2rem" }}
          >
            <h4>Marketplace</h4>
            <div>
              <Button
                type="button"
                className="btn-close"
                onClick={() => {
                  setDetailsModal(false);
                }}
                aria-label="Close"
              ></Button>
            </div>
          </div>
        </div>
        <ModalBody>
          <Row className="g-4">
            <Col lg={4}>
              <div>
                <Card className="ribbon-box border shadow-none right">
                  <img
                    src={item.image}
                    alt="orbitaal insight profile"
                    className="img-fluid rounded"
                  />
                </Card>
              </div>
            </Col>
            <Col lg={8}>
              <div>
                <h4 className="fw-bold"> {item.modalHeading} </h4>
                <div className="hstack gap-3 flex-wrap">
                  <div className="text-muted"> {item.name} </div>
                  <div className="vr"></div>
                  <div className="text-muted">
                    <i className="bx bx-coin-stack"></i> {item.speed}
                  </div>
                  <div className="vr"></div>
                  <div className="text-muted">
                    <i className="bx bx-bookmarks"></i> {item.public}
                  </div>
                </div>
                <div className="mt-3">
                  {item.modalButtons.map((label, index) => (
                    <button
                      key={index}
                      className="m-2 rounded-pill btn btn-secondary"
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div style={{ marginTop: "2rem" }}>
                  <p>{item.modalDescription}</p>
                </div>
              </div>
            </Col>
            <Nav
              tabs
              className="nav nav-tabs nav-tabs-custom nav-success nav-justified mb-3"
            >
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={{
                    active: customActiveTab === "1",
                  }}
                  onClick={() => {
                    toggleTab("1");
                  }}
                >
                  Overview
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({
                    active: customActiveTab === "2",
                  })}
                  onClick={() => {
                    toggleTab("2");
                  }}
                >
                  Sample Data
                </NavLink>
              </NavItem>
            </Nav>
            <div>
              <TabContent activeTab={customActiveTab} className="text-muted">
                <TabPane tabId="1" id="home1">
                  <div>
                    <div>
                      <h3>Description</h3>
                    </div>
                    <p>{item.modalDescription}</p>
                    <h3 className="mb-3">Performance</h3>

                    <section className="py-5 position-relative bg-light">
                      <Container>
                        <Row className="text-center gy-4">
                          <Col lg={3} className="col-6">
                            <div>
                              <h2 className="mb-2">
                                <span
                                  className="counter-value"
                                  data-target="100"
                                >
                                  <CountUp
                                    start={0}
                                    end={item.performance.latency}
                                    duration={1}
                                  />
                                </span>
                                ms
                              </h2>
                              <div className="text-muted">Latency</div>
                            </div>
                          </Col>

                          <Col lg={3} className="col-6">
                            <div>
                              <h2 className="mb-2">
                                <span
                                  className="counter-value"
                                  data-target="24"
                                >
                                  <CountUp
                                    start={0}
                                    end={item.performance.accuracy}
                                    duration={1}
                                  />
                                </span>
                                %
                              </h2>
                              <div className="text-muted">Accuracy</div>
                            </div>
                          </Col>

                          <Col lg={3} className="col-6">
                            <div>
                              <h2 className="mb-2">
                                <span
                                  className="counter-value"
                                  data-target="20.3"
                                >
                                  <CountUp
                                    start={0}
                                    end={item.performance.cpuUsage}
                                    duration={1}
                                  />
                                </span>
                                %
                              </h2>
                              <div className="text-muted">CPU Usage</div>
                            </div>
                          </Col>

                          <Col lg={3} className="col-6">
                            <div>
                              <h2 className="mb-2">
                                <span
                                  className="counter-value"
                                  data-target="50"
                                >
                                  <CountUp
                                    start={0}
                                    end={item.performance.systemThroughput}
                                    duration={1}
                                  />
                                </span>
                                fps
                              </h2>
                              <div className="text-muted">
                                System Throughput
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Container>
                    </section>
                    <div className="mt-4">
                      <h3>Edge Device</h3>
                      <h6 className="mt-4">{item.deviceName}</h6>
                    </div>
                    <p>{item.deviceDescription}</p>
                  </div>
                </TabPane>
                <TabPane tabId="2">
                  <Modal
                    id="flipModal"
                    isOpen={modal_animationZoom}
                    toggle={() => setmodal_animationZoom(!modal_animationZoom)}
                    modalClassName="zoomIn"
                    centered
                  >
                    <img
                      src={imageSrc}
                      alt="platoi sample data"
                      className=" m-2"
                    />
                  </Modal>
                  <div className="mt-3 d-flex flex-wrap gap-2">
                    <div style={{ cursor: "pointer" }}>
                      {item.modalImages.map((image, index) => (
                        <>
                          <img
                            key={index}
                            onClick={() => getImg(image)}
                            src={image}
                            alt="sample data"
                            className=" m-2"
                          />
                        </>
                      ))}
                    </div>
                  </div>
                </TabPane>
              </TabContent>
            </div>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="btn-animation"
            onClick={() => {
              setDetailsModal(false);
            }}
          >
            Add Block
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export { RestrictedModal, UnverifiedModal, MarketPlaceModal, DetailsModal };
