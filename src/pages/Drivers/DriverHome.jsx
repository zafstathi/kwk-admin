import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useReq from "../../hooks/useReq";
//spinner
import Spinner from "../../components/Spinner";
import Paginations from "../../components/Paginations";
function DriverHome() {
  const [qry, setQry] = useState({
    start: 0,
    limit: 10,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [drivers, setDrivers] = useState(null);

  const { sendRequest } = useReq();

  useEffect(() => {
    setLoading(true);
    sendRequest(
      `admin/user/driver/${qry.start}/${qry.limit}`,
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
    console.log("res.data", res.data.data);
    setTotalPages(Math.ceil(res.data.data.pages));
    setDrivers(res.data.data.list);
  };

  //pagination
  const handlePageClick = (data) => {
    let start = data.selected * qry.limit;
    setLoading(true);
    sendRequest(
      `admin/user/driver/${start}/${qry.limit}`,
      "GET",
      null,
      onResponse
    );
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
                    <h1>
                      KWK Driver <i className="batch-icon batch-icon-users"></i>
                    </h1>
                  </div>
                </div>
                <div className="table-responsive">

                <table id="datatable-1" className="table  table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Status</th>
                      <th>Checkr</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {drivers && !loading ? (
                      drivers.map((driver) => (
                        <tr key={driver.id}>
                          <td>
                            {driver.first_name} {driver.last_name}
                          </td>
                          <td>{driver.email}</td>
                          <td>{driver.phone_no}</td>
                          <td>
                            {driver.status === "active" && (
                              <span class="badge badge-success">Active</span>
                            )}
                            {driver.status === "inactive" && (
                              <span class="badge badge-secondary">
                                Inactive
                              </span>
                            )}
                            {driver.status === "blocked" && (
                              <span class="badge badge-danger">Blocked</span>
                            )}
                            {driver.status === "pending" && (
                              <span class="badge badge-primary">Pending</span>
                            )}
                          </td>
                          <td>
                            {driver.verified && (
                              <span class="badge badge-success">Verified</span>
                            )}
                            {!driver.verified && (
                              <span class="badge badge-primary">Pending</span>
                            )}
                          </td>
                          <td className="text-center">
                            <Link to={`/driver/detail/${driver._id}`}>
                              <button className="btn btn-sm btn-light waves-effect waves-light">
                                View
                              </button>
                            </Link>
                            {/* <button
                              className="btn btn-sm  btn-dark waves-effect waves-light"
                              onClick={() => {
                                DeleteDriver(driver.id);
                              }}
                            >
                              Delete
                            </button> */}
                          </td>
                        </tr>
                      ))
                    ) : (
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
            <footer>Powered by - DevJunction</footer>
          </div>
        </div>
      </main>
    </>
  );
}

export default DriverHome;
