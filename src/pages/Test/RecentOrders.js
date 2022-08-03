import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col } from 'reactstrap';
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
    return (
        <React.Fragment>
            <Col>
                <Card>
                    <CardHeader className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Recent Orders</h4>
                        <div className="flex-shrink-0">
                            <button type="button" className="btn btn-soft-info btn-sm">
                                <i className="ri-file-list-3-line align-middle"></i> Generate Report
                            </button>
                        </div>
                    </CardHeader>

                    <CardBody>
                       
                        {/* <div className="table-responsive table-card">
                            <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
                                <thead className="text-muted table-light">
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Customer</th>
                                        <th scope="col">Purchased</th>
                                        <th scope="col">Revenue</th>
                                    </tr>
                                </thead>
                            <tbody>
                                    {(recentOrdersTest || []).map((item, key) => (<tr key={key}>
                                        <td>
                                            <Link to="/apps-ecommerce-order-details" className="fw-medium link-primary">{item.orderId}</Link>
                                        </td>
                                        <td>{item.date}</td>
                                        <td>
                                            <span className={"badge badge-soft-" + item.statusClass}>{item.status}</span>
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="flex-shrink-0 me-2">
                                                    <img src={item.img} alt="" className="avatar-xs rounded-circle" />
                                                </div>
                                                <div className="flex-grow-1">{item.name}</div>
                                            </div>
                                        </td>
                                        <td>{item.purchased}</td>
                                        <td>{item.revenue}</td>
                                    </tr>))}
                                </tbody>
                                <tfoot className="table-light">
                                    <tr>
                                        <td colSpan="5">Total</td>
                                        <td>$947.55</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                         */}
                        <Grid
                            data={data2}
                            columns={[
                                "ID", "Date", "Status", "Customer", "Purchased", "Revenue"]}
                            sort={true}
                        />
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default RecentOrders;