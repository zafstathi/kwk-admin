import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//hook
import useReq from "../../hooks/useReq";
//spinner
import Spinner from "../../components/Spinner";
import Paginations from "../../components/Paginations";
function OrderHome() {
  const [qry, setQry] = useState({
    start: 0,
    limit: 10,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(null);

  const { sendRequest } = useReq();

  useEffect(() => {
    setLoading(true);
    sendRequest(
      `admin/order/${qry.start}/${qry.limit}`,
      "GET",
      null,
      onResponse
    );
  }, []);

  const onResponse = (err, res) => {
    setLoading(false);
    if (err) {
      console.log(err);
      return;
    }
    console.log(res.data.data);
    setTotalPages(Math.ceil(res.data.data.pages));
    setOrders(res.data.data.list);
  };

  //pagination
  const handlePageClick = (data) => {
    let start = data.selected * qry.limit;
    setLoading(true);
    sendRequest(`admin/order/${start}/${qry.limit}`, "GET", null, onResponse);
  };
  return (
    <>
      <main className="main-content p-5" role="main">
        <div className="row mb-5">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="row ">
                  <div className="col-md-12">
                    <h1>Orders</h1>
                  </div>
                </div>
                <div className="table-responsive">
                <table
                  id="datatable-1"
                  className="table table-datatable  table-striped table-hover"
                >
                  <thead>
                    <tr>
                      <th>Order Id</th>
                      <th>Amount</th>
                      <th>Products</th>
                      <th>Product Quantity</th>
                      <th>State</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders && !loading ? (
                      orders.map(order => { 
                        let totalproduct=0;
                        totalproduct = order.products.reduce((accumulator, product) => {
                          return accumulator + product.quantity;
                        }, 0);
                       console.log("total product",totalproduct);
                        return(
                          <tr id={order.id}>
                          <td>{order._id}</td>
                          <td>{order.amount}</td>
                          <td>{order.products.length }</td>
                          <td>{totalproduct }</td>
                          <td>
                            {order.state === "New" && (
                              <span class="badge badge-info">New</span>
                            )}
                            {order.state === "Confirmed" && (
                              <span class="badge badge-success">Confirmed</span>
                            )}
                            {order.state === "Approved" && (
                              <span class="badge badge-primary">Approved</span>
                            )}
                            {order.state === "PENDING" && (
                              <span class="badge badge-warning">PENDING</span>
                            )}
                            {order.state === "Failed" && (
                              <span class="badge badge-danger">Failed</span>
                            )}
                            {order.state === "Rejected" && (
                              <span class="badge badge-danger">Rejected</span>
                            )}
                            {order.state === "Waiting" && (
                              <span class="badge badge-light">Waiting</span>
                            )}
                            {order.state === "Delivered" && (
                              <span class="badge badge-success">Delivered</span>
                            )}
                            {order.state === "Completed" && (
                              <span class="badge badge-light">
                                Driver Allocated
                              </span>
                            )}
                            {order.state === "Ready" && (
                              <span class="badge badge-info">Ready</span>
                            )}
                            {order.state === "Cancelled" && (
                              <span class="badge badge-danger">Cancelled</span>
                            )}
                            {order.state === "Picked Up" && (
                              <span class="badge badge-info">Picked Up</span>
                            )}
                            {order.state === "Picked" && (
                              <span class="badge badge-info">
                                Empty Tank picked
                              </span>
                            )}
                            {order.state === "Droped" && (
                              <span class="badge badge-warning">
                                Empty Tank Dropped
                              </span>
                            )}
                            {order.state === "Received" && (
                              <span class="badge badge-success">
                                Empty Tank Received
                              </span>
                            )}
                            {order.state === "Closed" && (
                              <span class="badge badge-success">Closed</span>
                            )}
                          </td>
                          <td className="text-center">
                            <Link to={`/order/detail/${order._id}`}>
                              <button className="btn btn-sm btn-light waves-effect waves-light">
                                View
                              </button>
                            </Link>
                          </td>
                        </tr>
                        )
                        
                            }))
                     : (
                      <tr>
                        <td colspan="6">
                          <Spinner />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                </div>
                <Paginations
                  handlePageClick={handlePageClick}
                  totalPages={totalPages}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-md-12">
            <footer>Powered by - DevJuction</footer>
          </div>
        </div>
      </main>
    </>
  );
}

export default OrderHome;
