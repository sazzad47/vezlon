import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {savePDF} from '@progress/kendo-react-pdf';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import { Grid, _ } from 'gridjs-react';
import { recentOrdersTest } from '../../common/data';


const data2 = [
    ["#VZ2112", "10 Oct, 14:47", "Paid", "Alex Smith", "Credits", "$9.98"],
    ["#VZ2111", "17 Oct, 02:10", "Pending", "Jansh Brown", "Credits", "$270.60"],
    ["#VZ2109", "26 Oct, 08:20", "Paid", "Ayaan Bowen", "Credits", "$145.42"],
    ["#VZ2108", "02 Nov, 04:52", "Unpaid", "Prezy Mark", "Credits", "$170.68"],
    ["#VZ2107", "10 Nov, 07:20", "Paid", "Vihan Hudda", "Credits", "$350.87"],
];

const RecentOrders = () => {
    const PDFComponent = useRef(null);
    const handlePDF = (event) => {
        savePDF(PDFComponent.current, {paperSize:'A4'})
    }
    const orderstatus = [
        {
          options: [
            { label: "Status", value: "Status" },
            { label: "All", value: "All" },
            { label: "Pending", value: "Pending" },
            { label: "Inprogress", value: "Inprogress" },
            { label: "Cancelled", value: "Cancelled" },
            { label: "Pickups", value: "Pickups" },
            { label: "Returns", value: "Returns" },
            { label: "Delivered", value: "Delivered" },
          ],
        },
      ];
      const orderpayement = [
        {
          options: [
            { label: "Select Payment", value: "Select Payment" },
            { label: "All", value: "All" },
            { label: "Mastercard", value: "Mastercard" },
            { label: "Paypal", value: "Paypal" },
            { label: "Visa", value: "Visa" },
            { label: "COD", value: "COD" },
          ],
        },
      ];
    return (
        <React.Fragment>
            <Col>
                <Card>
                    <CardHeader className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Recent Orders</h4>
                        <div className="flex-shrink-0">
                            <button type="button" className="btn btn-soft-info btn-sm"onClick={handlePDF}  >
                                <i className="ri-file-list-3-line align-middle"></i> Generate Report
                            </button>
                        </div>
                    </CardHeader>
                    <CardBody className="border border-dashed border-end-0 border-start-0">
                <form>
                  <Row className="g-3">
                    <Col sm={6} className="col-xxl-5">
                      <div className="search-box">
                        <input
                          type="text"
                          className="form-control search"
                          placeholder="Search for order ID, customer, order status or something..."
                        />
                        <i className="ri-search-line search-icon"></i>
                      </div>
                    </Col>

                    <Col sm={6} className="col-xxl-2">
                      <div>
                        <Flatpickr
                          className="form-control"
                          id="datepicker-publish-input"
                          placeholder="Select a date"
                          options={{
                            altInput: true,
                            altFormat: "F j, Y",
                            mode: "multiple",
                            dateFormat: "d.m.y",
                          }}
                        />
                      </div>
                    </Col>

                    <Col sm={4} className="col-xxl-2">
                      <div>
                        <Select
                        
                          options={orderstatus}
                          name="choices-single-default"
                          id="idStatus"
                        ></Select>
                      </div>
                    </Col>

                    <Col sm={4} className="col-xxl-2">
                      <div>
                        <Select
                         
                          options={orderpayement}
                          name="choices-payment-default"
                          id="idPayment"
                        ></Select>
                      </div>
                    </Col>

                    <Col sm={4} className="col-xxl-1">
                      <div>
                        <button type="button" className="btn btn-primary w-100">
                          {" "}
                          <i className="ri-equalizer-fill me-1 align-bottom"></i>
                          Filters
                        </button>
                      </div>
                    </Col>
                  </Row>
                </form>
              </CardBody>
                    <div ref={PDFComponent}> 
                    <CardBody>
                        <Grid
                            data={data2}
                            columns={[
                                "ID", "Date", "Status", "Customer", "Purchased", "Revenue"]}
                            sort={true}
                            pagination={
                                true
                            }
                        />
                    </CardBody>
                    </div>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default RecentOrders;