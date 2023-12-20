import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//hook
import useReq from "../../hooks/useReq";
//spinner
import Spinner from "../../components/Spinner";
import Paginations from "../../components/Paginations";
function SellerHome() {
  const [qry, setQry] = useState({
    start: 0,
    limit: 10,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sellers, setSellers] = useState(null);

  const { sendRequest } = useReq();

  useEffect(() => {
    setLoading(true);
    sendRequest(
      `admin/user/seller/${qry.start}/${qry.limit}`,
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
    setTotalPages(Math.ceil(res.data.data.pages));
    setSellers(res.data.data.list);
  };

  //pagination
  const handlePageClick = (data) => {
    let start = data.selected * qry.limit;
    setLoading(true);
    sendRequest(
      `admin/user/seller/${start}/${qry.limit}`,
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
                      KWK Seller <i className="batch-icon batch-icon-users"></i>
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
                    {sellers && !loading ? (
                      sellers.map((seller) => (
                        <tr key={seller.id}>
                          <td>
                            {seller.first_name} {seller.last_name}
                          </td>
                          <td>{seller.email}</td>
                          <td>{seller.phone_no}</td>
                          <td>
                            {seller.status === "active" && (
                              <span class="badge badge-success">Active</span>
                            )}
                            {seller.status === "inactive" && (
                              <span class="badge badge-secondary">
                                Inactive
                              </span>
                            )}
                            {seller.status === "blocked" && (
                              <span class="badge badge-danger">Blocked</span>
                            )}
                            {seller.status === "pending" && (
                              <span class="badge badge-primary">Pending</span>
                            )}
                          </td>
                          <td>
                            {seller.verified && (
                              <span class="badge badge-success">Verified</span>
                            )}
                            {!seller.verified && (
                              <span class="badge badge-primary">Pending</span>
                            )}
                          </td>
                          <td className="text-center">
                            <Link to={`/seller/detail/${seller._id}`}>
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
        </div>

        <div className="row mb-4">
          <div className="col-md-12">
            <footer>Powered by -DevJuntion</footer>
          </div>
        </div>
      </main>
    </>
  );
}

export default SellerHome;
