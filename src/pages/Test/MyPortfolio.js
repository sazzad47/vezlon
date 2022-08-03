import React from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

//import Images
import btc from "../../assets/images/svg/crypto-icons/btc.svg";
import eth from "../../assets/images/svg/crypto-icons/eth.svg";
import ltc from "../../assets/images/svg/crypto-icons/ltc.svg";
import dash from "../../assets/images/svg/crypto-icons/dash.svg";

import { PortfolioCharts } from './DashboardCryptoCharts';

const MyPortfolio = () => {
    return (
        <React.Fragment>
            <div className="col-xxl-3">
                <div className="card card-height-100">
                <div className="card-header border-0 align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Cost</h4>
                        <div>
                        <UncontrolledDropdown className="card-header-dropdown">
                                <DropdownToggle className="text-reset dropdown-btn" tag="a" role="button">
                                    <span className="fw-semibold text-uppercase fs-12">Sort by: </span><span className="text-muted">1 Month<i className="mdi mdi-chevron-down ms-1"></i></span>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-end">
                                    <DropdownItem>1 Month</DropdownItem>
                                    <DropdownItem>3 Months</DropdownItem>
                                    <DropdownItem>6 Months</DropdownItem>
                                    <DropdownItem>1 Year</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                    </div>
                    <div className="card-body">
                        <div id="portfolio_donut_charts" className="apex-charts" dir="ltr">
                            <PortfolioCharts dataColors ='["--vz-primary", "--vz-info", "--vz-warning", "--vz-success"]'/>
                        </div>

                        <ul className="list-group list-group-flush border-dashed mb-0 mt-3 pt-2">
                            <li className="list-group-item px-0">
                                <div className="d-flex">
                                    <div className="flex-grow-1 ms-2">
                                        <h6 className="mb-1">Maintenance</h6>
                                       
                                    </div>
                                    <div className="flex-shrink-0 text-end">
                                        <h6 className="mb-1">$50 </h6>
                                       
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item px-0">
                                <div className="d-flex">
                                    
                                    <div className="flex-grow-1 ms-2">
                                        <h6 className="mb-1">Hosting</h6>
                                      
                                    </div>
                                    <div className="flex-shrink-0 text-end">
                                        <h6 className="mb-1">$11.50 </h6>
                                       
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item px-0">
                                <div className="d-flex">
                                    
                                    <div className="flex-grow-1 ms-2">
                                        <h6 className="mb-1">Firebase</h6>
                                        
                                    </div>
                                    <div className="flex-shrink-0 text-end">
                                        <h6 className="mb-1">$50 </h6>
                                       
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item px-0 pb-0">
                                <div className="d-flex">
                                    
                                    <div className="flex-grow-1 ms-2">
                                        <h6 className="mb-1">Mongo</h6>
                                       
                                    </div>
                                    <div className="flex-shrink-0 text-end">
                                        <h6 className="mb-1">$57</h6>
                                      
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