import React, { useRef, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Modal,
  ModalHeader,
} from "reactstrap";
import { Link } from "react-router-dom";
import { savePDF } from "@progress/kendo-react-pdf";
import Vector from "../DashboardEcommerce/VectorMap";

const SalesByLocations = () => {
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
      <Col xl={4}>
        <Card className="card-height-100">
          <CardHeader className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Sales by Locations</h4>
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
              <div
                data-colors='["--vz-light", "--vz-success", "--vz-primary"]'
                style={{ height: "269px" }}
                dir="ltr"
              >
                <Vector value="world_mill" />
              </div>

              <div className="px-2 py-2 mt-1">
                <p className="mb-1">
                  Canada <span className="float-end">75%</span>
                </p>
                <div className="progress mt-2" style={{ height: "6px" }}>
                  <div
                    className="progress-bar progress-bar-striped bg-primary"
                    role="progressbar"
                    style={{ width: "75%" }}
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="75"
                  ></div>
                </div>

                <p className="mt-3 mb-1">
                  Greenland <span className="float-end">47%</span>
                </p>
                <div className="progress mt-2" style={{ height: "6px" }}>
                  <div
                    className="progress-bar progress-bar-striped bg-primary"
                    role="progressbar"
                    style={{ width: "47%" }}
                    aria-valuenow="47"
                    aria-valuemin="0"
                    aria-valuemax="47"
                  ></div>
                </div>

                <p className="mt-3 mb-1">
                  Russia <span className="float-end">82%</span>
                </p>
                <div className="progress mt-2" style={{ height: "6px" }}>
                  <div
                    className="progress-bar progress-bar-striped bg-primary"
                    role="progressbar"
                    style={{ width: "82%" }}
                    aria-valuenow="82"
                    aria-valuemin="0"
                    aria-valuemax="82"
                  ></div>
                </div>
              </div>
            </CardBody>
          </div>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default SalesByLocations;
