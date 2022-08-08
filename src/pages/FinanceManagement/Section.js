import React from "react";
import { Col } from "reactstrap";

const Section = () => {
  return (
    <React.Fragment>
      <Col xs={12}>
        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
          <h4 className="mb-sm-0">Finance Management</h4>
          <div className="page-title-right">
            <ol className="breadcrumb m-0">
              <li className="breadcrumb-item active">Finance Management</li>
            </ol>
          </div>
        </div>
      </Col>
    </React.Fragment>
  );
};

export default Section;
