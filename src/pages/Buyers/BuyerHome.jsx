import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//hook
import useReq from "../../hooks/useReq";
//spinner
import Spinner from "../../components/Spinner";
import Paginations from "../../components/Paginations";

function BuyerHome() {
  const [qry, setQry] = useState({
    start: 0,
    limit: 10,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [buyers, setBuyer] = useState();

  const { sendRequest } = useReq();

  useEffect(() => {
    setLoading(true);
    sendRequest(
      `admin/user/buyer/${qry.start}/${qry.limit}`,
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
    setBuyer(res.data.data.list);
  };

  //pagination
  const handlePageClick = (data) => {
    let start = data.selected * qry.limit;
    setLoading(true);
    sendRequest(
      `admin/user/buyer/${start}/${qry.limit}`,
      "GET",
      null,
      onResponse
    );
  };
  return (
    <>
      <main className="main-content p-5" role="main">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <h1>
                    KWK Buyer <i className="batch-icon batch-icon-users"></i>
                  </h1>
                </div>
              </div>
              <div className="table-responsive">
              <table
                id="datatable-1"
                className="table table-datatable  table-striped table-hover"
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Verified</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {buyers && !loading ? (
                    buyers.map((buyer) => (
                      <tr key={buyer.id}>
                        <td>
                          {buyer.first_name} {buyer.last_name}
                        </td>
                        <td>{buyer.email}</td>
                        <td>{buyer.phone_no!=='+undefined'?buyer.phone_no:'NA'}</td>
                        <td>
                          {buyer.status === "active" && (
                            <span class="badge badge-success">Active</span>
                          )}
                          {buyer.status === "inactive" && (
                            <span class="badge badge-secondary">Inactive</span>
                          )}
                          {buyer.status === "blocked" && (
                            <span class="badge badge-danger">Blocked</span>
                          )}
                          {buyer.status === "pending" && (
                            <span class="badge badge-primary">Pending</span>
                          )}
                        </td>
                        <td>
                          {buyer.verified && (
                            <span class="badge badge-success">Verified</span>
                          )}
                          {!buyer.verified && (
                            <span class="badge badge-primary">Pending</span>
                          )}
                        </td>
                        <td className="text-center">
                          <Link to={`/buyer/detail/${buyer._id}`}>
                            <button className="btn btn-sm btn-light waves-effect waves-light">
                              View
                            </button>
                          </Link>
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

        <div className="row mb-4">
          <div className="col-md-12">
            <footer>Powered by - DevJuction</footer>
          </div>
        </div>
      </main>
    </>
  );
}

export default BuyerHome;
