import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { savePDF } from "@progress/kendo-react-pdf";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Modal,
  ModalHeader,
} from "reactstrap";

//import Images
import illustrator from "../../assets/images/illustrator-1.png";

const TopReferrals = () => {
  const PDFComponent = useRef(null);

  const [modal_backdrop, setmodal_backdrop] = useState(false);
  function tog_backdrop() {
    setmodal_backdrop(!modal_backdrop);
  }
  const generatePDF = (event) => {
    savePDF(PDFComponent.current, { paperSize: "A4" });
    setmodal_backdrop(false);
  };
  return (
    <React.Fragment>
      <Col xl={6} md={6}>
        <Card className="card-height-100">
          <CardHeader className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Top Referrals Pages</h4>
            <div className="flex-shrink-0">
              <button
                type="button"
                className="btn btn-soft-primary btn-sm"
                onClick={tog_backdrop}
              >
                Export Report
              </button>
            </div>
          </CardHeader>
          <Modal
            isOpen={modal_backdrop}
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
              Get Report
            </ModalHeader>
            <div className="modal-body text-center p-5">
              <lord-icon
                src="https://cdn.lordicon.com/rwzqttux.json"
                trigger="loop"
                colors="primary:#121331,secondary:#08a88a"
                style={{ width: "120px", height: "120px" }}
              ></lord-icon>

              <div className="mt-4">
                <h4 className="mb-3">Generate and download report.</h4>
                <p className="text-muted mb-4">
                  {" "}
                  Generate your report in a PDF format and download it.
                </p>
                <div className="hstack gap-2 justify-content-center">
                  <Link
                    to="#"
                    className="btn btn-link link-success fw-medium"
                    onClick={() => setmodal_backdrop(false)}
                  >
                    <i className="ri-close-line me-1 align-middle"></i> Close
                  </Link>
                  <Link
                    to="#"
                    className="btn btn-success"
                    onClick={generatePDF}
                  >
                    Get report
                  </Link>
                </div>
              </div>
            </div>
          </Modal>
          <div ref={PDFComponent}>
            <CardBody>
              <Row className="align-items-center">
                <Col xs={6}>
                  <h6 className="text-muted text-uppercase fw-semibold text-truncate fs-12 mb-3">
                    Total Referrals Page
                  </h6>
                  <h4 className="fs- mb-0">725,800</h4>
                  <p className="mb-0 mt-2 text-muted">
                    <span className="badge badge-soft-success mb-0">
                      <i className="ri-arrow-up-line align-middle"></i> 15.72 %
                    </span>{" "}
                    vs. previous month
                  </p>
                </Col>
                <Col xs={6}>
                  <div className="text-center">
                    <img src={illustrator} className="img-fluid" alt="" />
                  </div>
                </Col>
              </Row>
              <div className="mt-3 pt-2">
                <div className="progress progress-lg rounded-pill">
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: "25%" }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                  <div
                    className="progress-bar bg-info"
                    role="progressbar"
                    style={{ width: "18%" }}
                    aria-valuenow="18"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: "22%" }}
                    aria-valuenow="22"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: "16%" }}
                    aria-valuenow="16"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{ width: "19%" }}
                    aria-valuenow="19"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>

              <div className="mt-3 pt-2">
                <div className="d-flex mb-2">
                  <div className="flex-grow-1">
                    <p className="text-truncate text-muted fs-14 mb-0">
                      <i className="mdi mdi-circle align-middle text-primary me-2"></i>
                      www.google.com
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <p className="mb-0">24.58%</p>
                  </div>
                </div>
                <div className="d-flex mb-2">
                  <div className="flex-grow-1">
                    <p className="text-truncate text-muted fs-14 mb-0">
                      <i className="mdi mdi-circle align-middle text-info me-2"></i>
                      www.youtube.com
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <p className="mb-0">17.51%</p>
                  </div>
                </div>
                <div className="d-flex mb-2">
                  <div className="flex-grow-1">
                    <p className="text-truncate text-muted fs-14 mb-0">
                      <i className="mdi mdi-circle align-middle text-success me-2"></i>
                      www.meta.com
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <p className="mb-0">23.05%</p>
                  </div>
                </div>
                <div className="d-flex mb-2">
                  <div className="flex-grow-1">
                    <p className="text-truncate text-muted fs-14 mb-0">
                      <i className="mdi mdi-circle align-middle text-warning me-2"></i>
                      www.medium.com
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <p className="mb-0">12.22%</p>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="flex-grow-1">
                    <p className="text-truncate text-muted fs-14 mb-0">
                      <i className="mdi mdi-circle align-middle text-danger me-2"></i>
                      Other
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <p className="mb-0">17.58%</p>
                  </div>
                </div>
              </div>

              <div className="mt-2 text-center">
                <Link to="#" className="text-muted text-decoration-underline">
                  Show All
                </Link>
              </div>
            </CardBody>
          </div>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default TopReferrals;
