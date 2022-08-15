import React, { useState } from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown,
} from "reactstrap";

import { CostCharts } from "./CostCharts";

const MyPortfolio = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((preState) => !preState);
  const [timePeriod, setTimePeriod] = useState("1 Month");

  const timePeriods = ["1 Month", "3 Months", "6 Months", "1 Year"];
  function getData(timePeriod) {
    switch (timePeriod) {
      case "1 Month":
        return { maintenance: 50, hosting: 11.5, firebase: 50, mongo: 57 };
      case "3 Months":
        return { maintenance: 150, hosting: 34.5, firebase: 150, mongo: 171 };
      case "6 Months":
        return { maintenance: 300, hosting: 69, firebase: 300, mongo: 342 };
      case "1 Year":
        return { maintenance: 600, hosting: 183, firebase: 600, mongo: 684 };
      default:
        return "";
    }
  }

  return (
    <React.Fragment>
      <div className="col-xxl-3">
        <div className="card card-height-100">
          <div className="card-header border-0 align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Cost</h4>
            <div>
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
          </div>
          <div className="card-body">
            <div id="portfolio_donut_charts" className="apex-charts" dir="ltr">
              <CostCharts
                timePeriod={timePeriod}
                dataColors='["--vz-primary", "--vz-info", "--vz-warning", "--vz-success"]'
              />
            </div>

            <ul className="list-group list-group-flush border-dashed mb-0 mt-3 pt-2">
              <li className="list-group-item px-0">
                <div className="d-flex">
                  <div className="flex-grow-1 ms-2">
                    <h6 className="mb-1">Maintenance</h6>
                  </div>
                  <div className="flex-shrink-0 text-end">
                    <h6 className="mb-1">
                      ${getData(timePeriod).maintenance}{" "}
                    </h6>
                  </div>
                </div>
              </li>
              <li className="list-group-item px-0">
                <div className="d-flex">
                  <div className="flex-grow-1 ms-2">
                    <h6 className="mb-1">Hosting</h6>
                  </div>
                  <div className="flex-shrink-0 text-end">
                    <h6 className="mb-1">${getData(timePeriod).hosting} </h6>
                  </div>
                </div>
              </li>
              <li className="list-group-item px-0">
                <div className="d-flex">
                  <div className="flex-grow-1 ms-2">
                    <h6 className="mb-1">Firebase</h6>
                  </div>
                  <div className="flex-shrink-0 text-end">
                    <h6 className="mb-1">${getData(timePeriod).firebase} </h6>
                  </div>
                </div>
              </li>
              <li className="list-group-item px-0 pb-0">
                <div className="d-flex">
                  <div className="flex-grow-1 ms-2">
                    <h6 className="mb-1">Mongo</h6>
                  </div>
                  <div className="flex-shrink-0 text-end">
                    <h6 className="mb-1">${getData(timePeriod).mongo}</h6>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyPortfolio;
