import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown,
} from "reactstrap";
import { BalanceOverviewCharts } from "./BalanceOverviewCharts";

const BalanceOverview = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((preState) => !preState);
  const [timePeriod, setTimePeriod] = useState("Current Year");

  const timePeriods = ["Today", "Last Week", "Last Month", "Current Year"];

  function getData(timePeriod) {
    switch (timePeriod) {
      case "Today":
        return { costs: 5, revenue: 6 };
      case "Last Week":
        return { costs: 15, revenue: 13 };
      case "Last Month":
        return { costs: 53, revenue: 69 };
      case "Current Year":
        return { costs: 584, revenue: 497 };
      default:
        return "";
    }
  }

  return (
    <React.Fragment>
      <Col xxl={6}>
        <Card className="card-height-100">
          <CardHeader className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Cost Overview</h4>
            <div className="flex-shrink-0">
              <Dropdown
                className="card-header-dropdown"
                isOpen={dropdownOpen}
                toggle={toggle}
              >
                <DropdownToggle
                  className="text-reset dropdown-btn"
                  tag="a"
                  role="button"
                >
                  <span className="fw-semibold text-uppercase fs-12">
                    Sort by:{" "}
                  </span>
                  <span className="text-muted">
                    {timePeriod}
                    <i className="mdi mdi-chevron-down ms-1"></i>
                  </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                  {timePeriods.map((value) => {
                    return (
                      <DropdownItem
                        key={value}
                        onClick={() => setTimePeriod(value)}
                      >
                        {value}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </Dropdown>
            </div>
          </CardHeader>
          <CardBody className="px-0">
            <ul className="list-inline main-chart text-center mb-0">
              <li className="list-inline-item chart-border-left me-0 border-0">
                <h4 className="text-primary">
                  ${getData(timePeriod).revenue}k{" "}
                  <span className="text-muted d-inline-block fs-13 align-middle ms-2">
                    Revenue
                  </span>
                </h4>
              </li>
              <li className="list-inline-item chart-border-left me-0">
                <h4>
                  ${getData(timePeriod).costs}k
                  <span className="text-muted d-inline-block fs-13 align-middle ms-2">
                    Costs
                  </span>
                </h4>
              </li>
            </ul>

            <div id="revenue-expenses-charts" dir="ltr">
              <BalanceOverviewCharts
                timePeriod={timePeriod}
                dataColors='["--vz-success", "--vz-danger"]'
              />
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default BalanceOverview;
