import React from "react";
import { Col, Container, Row } from "reactstrap";
import Section from "./Section";
import Widget from "./Widgets";
import RecentOrders from "./RecentOrders";
import Revenue from "./Revenue";
import SalesByLocations from "./SalesByLocations";
import BalanceOverview from "./BalanceOverview";
import TopReferrals from "./TopReferrals";
import TopPages from "./TopPages";
import MyPortfolio from "./Costs";

const DashboardEcommerce = () => {
  document.title = "Dashboard | Velzon - React Admin & Dashboard Template";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <div className="h-100">
                <Row>
                  <Section />
                </Row>
                <Row>
                  <Widget />
                </Row>
                <Row>
                  <Col xl={8}>
                    <Revenue />
                  </Col>
                  <SalesByLocations />
                </Row>
                <Row>
                  <RecentOrders />
                </Row>
                <Row>
                  <MyPortfolio />
                </Row>
                <Row>
                  <BalanceOverview />
                </Row>
                <Row>
                  <TopReferrals />
                  <TopPages />
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardEcommerce;
