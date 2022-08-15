import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { topPages } from "./TopPagesData";

const TopPages = () => {
  const [isTopPageDropdown, setTopPageDropdown] = useState(false);
  const toggleDropdown = () => {
    setTopPageDropdown(!isTopPageDropdown);
  };
  const [timePeriod, setTimePeriod] = useState("Today");

  const timePeriods = ["Today", "Last Week", "Last Month", "Current Year"];
  return (
    <React.Fragment>
      <Col xl={6} md={6}>
        <Card className="card-height-100">
          <CardHeader className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Top Pages</h4>
            <div className="flex-shrink-0">
              <Dropdown
                isOpen={isTopPageDropdown}
                toggle={toggleDropdown}
                className="card-header-dropdown"
              >
                <DropdownToggle
                  tag="a"
                  className="text-reset dropdown-btn"
                  role="button"
                >
                  <span className="text-muted fs-16">
                    <i className="mdi mdi-dots-vertical align-middle"></i>
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
          <CardBody>
            <div className="table-responsive table-card">
              <table className="table align-middle table-borderless table-centered table-nowrap mb-0">
                <thead className="text-muted table-light">
                  <tr>
                    <th scope="col" style={{ width: "62" }}>
                      Active Page
                    </th>
                    <th scope="col">Active</th>
                    <th scope="col">Users</th>
                  </tr>
                </thead>
                <tbody>
                  {(topPages || [])
                    .find((item) => item.timePeriod === timePeriod)
                    ?.data.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <Link to="#">{item.page}</Link>
                        </td>
                        <td>{item.active}</td>
                        <td>{item.user}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default TopPages;
