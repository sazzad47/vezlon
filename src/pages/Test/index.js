import React from "react";
import { Col, Container, Row } from "reactstrap";
import Widget from "./Widgets";
import BestSellingProducts from "./BestSellingProducts";
import RecentActivity from "./RecentActivity";
import RecentOrders from "./RecentOrders";
import Revenue from "./Revenue";
import SalesByLocations from "./SalesByLocations";
import StoreVisits from "./StoreVisits";
import TopSellers from "./TopSellers";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import BalanceOverview from "./BalanceOverview";
import TopReferrals from "./TopReferrals";
import TopPages from "./TopPages";
import MyPortfolio from "./MyPortfolio";

const DashboardEcommerce = () => {
  document.title="Dashboard | Velzon - React Admin & Dashboard Template";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
                <Row>
                  <Col>
                    <div className="h-100">
                    <Row>
                      <Col xs={12}>
                      <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0">Test</h4>
                        <div className="page-title-right">
                          <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item active">Test</li>
                          </ol>
                        </div>
                      </div>
                  </Col>
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
            <RecentActivity />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardEcommerce;
