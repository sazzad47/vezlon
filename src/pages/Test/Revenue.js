import React, { useState } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { RevenueCharts } from "./DashboardEcommerceCharts";
import CountUp from "react-countup";

const Revenue = () => {
  
  const [timePeriod, setTimePeriod]= useState('ALL');
   
  const timePeriods = ['ALL', '1M', '6M', '1Y'];
  function getSeries (timePeriod) {
    switch(timePeriod) {
        case 'ALL': 
            return [
              758545, 2243.89, 3674,  11.32
            ];
        case '1M': 
            return [
              554, 22.89, 36, 17.22
            ];
        case '6M': 
            return [
              2585, 72.89, 234, 13.53
            ];
        case '1Y' :
            return [
              23585, 222.89, 967,  21.24
            ];
        default:
            return "";
        
    }
}

  return (
    <React.Fragment>
      <Card>
        <CardHeader className="border-0 align-items-center d-flex">
          <h4 className="card-title mb-0 flex-grow-1">Revenue </h4>
          <div className="d-flex gap-1">
            {timePeriods.map((value) => {
              return <button key={value} onClick= {() => setTimePeriod(value)} type="button" className="btn btn-soft-dark btn-sm">
              {value}
            </button>
            })}
          </div>
        </CardHeader>

        <CardHeader className="p-0 border-0 bg-soft-light">
          <Row className="g-0 text-center">
            <Col xs={6} sm={3}>
              <div className="p-3 border border-dashed border-start-0">
                <h5 className="mb-1">
                  <CountUp start={0} end={getSeries(timePeriod)[0]} duration={3} separator="," />
                </h5>
                <p className="text-muted mb-0">Orders</p>
              </div>
            </Col>
            <Col xs={6} sm={3}>
              <div className="p-3 border border-dashed border-start-0">
                <h5 className="mb-1">
                  <CountUp
                    suffix="k"
                    prefix="$"
                    start={0}
                    decimals={2}
                    end={getSeries(timePeriod)[1]}
                    duration={3}
                  />
                </h5>
                <p className="text-muted mb-0">Earnings</p>
              </div>
            </Col>
            <Col xs={6} sm={3}>
              <div className="p-3 border border-dashed border-start-0">
                <h5 className="mb-1">
                  <CountUp start={0} end={getSeries(timePeriod)[2]} duration={3} />
                </h5>
                <p className="text-muted mb-0">Refunds</p>
              </div>
            </Col>
            <Col xs={6} sm={3}>
              <div className="p-3 border border-dashed border-start-0 border-end-0">
                <h5 className="mb-1 text-success">
                  <CountUp
                    start={0}
                    end={getSeries(timePeriod)[3]}
                    decimals={2}
                    duration={3}
                    suffix="%"
                  />
                </h5>
                <p className="text-muted mb-0">Conversation Ratio</p>
              </div>
            </Col>
          </Row>
        </CardHeader>

        <CardBody className="p-0 pb-2">
          <div className="w-100">
            <div dir="ltr">
              <RevenueCharts timePeriod= {timePeriod} dataColors='["--vz-success", "--vz-info", "--vz-danger"]' />
            </div>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Revenue;
