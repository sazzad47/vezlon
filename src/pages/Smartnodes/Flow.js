import React from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import "./Search.css";
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import { Container } from "reactstrap";
import TabContainer from "./TabContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Flow() {
  return (
    <div>
      <React.Fragment>
        <ToastContainer
          autoClose={2000}
          closeButton={true}
          hideProgressBar={false}
        />
        <div className="page-content">
          <Container fluid>
            <BreadCrumb title="Smart Nodes" pageTitle="Flow" />
            <Row>
              <Col lg={15}>
                <TabContainer />
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    </div>
  );
}
export default Flow;
