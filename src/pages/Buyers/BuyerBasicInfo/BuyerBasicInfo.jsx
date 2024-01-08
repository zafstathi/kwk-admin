import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useReq from "../../../hooks/useReq";
import Spinner from "../../../components/Spinner";
import { toast, ToastContainer } from "react-toastify";

function BuyerBasicInfo() {
  const [buyer, setBuyer] = useState(null);
  const location = useLocation();
  const [status, setStatus] = useState(false);
  const { sendRequest } = useReq();

  useEffect(() => {
    const buyerId = location.pathname.split("/")[3];
    sendRequest(`admin/buyer/${buyerId}`, "GET", null, onResponse);
  }, [location]);

  const onResponse = (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    setBuyer(res.data.data);
  };

  const updateStatus = (status) => {
    const buyerId = location.pathname.split("/")[3];
    sendRequest(
      `admin/user/update-status/${buyerId}`,
      "PUT",
      { status: status },
      updateStatusResponse
    );
  };

  const updateStatusResponse = (err, res) => {
    if (res && res.data.statusCode === 200) {
      console.log(res);
      buyer.status = res.data.data.status;
      toast("Buyer status has been updated");
    }
    setStatus(false);
  };

  return (
    <main className="main-content p-5" role="main">
      <div className="col-lg-12 col-md-12">
        <div className="card mb-5">
          <div className="card-body">
            {buyer ? (
              <div className="row personal-info">
                <div className="col-lg-4 col-sm-6 col-md-12">
                  <img
                    src={
                      buyer?.photo_url
                        ? buyer?.photo_url
                        : "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                    }
                    className="dp"
                    alt="Logo"
                  />
                </div>
                <div className="col-lg-6 col-sm-8 col-md-5">
                  <div className="row">
                    <div className="col-sm-3 col-lg-5 col-md-6">
                      <b> {buyer.name} </b>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-sm-6 col-lg-3">
                      <i className="batch-icon batch-icon-user-alt-add"></i>
                      Reviews (215)
                    </div>
                    <div className="col-sm-6 col-lg-9">
                      <span className="text-warning ">
                        {" "}
                        <i className="batch-icon batch-icon-star-alt"></i>
                        <i className="batch-icon batch-icon-star-alt"></i>
                        <i className="batch-icon batch-icon-star-alt"></i>
                        <i className="batch-icon batch-icon-star-alt"></i>
                        <i className="batch-icon batch-icon-star-alt"></i>
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3 col-lg-3">
                      <b>Email:</b>
                    </div>
                    <div className="col-sm-9 col-lg-9">{buyer.email}</div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4 col-lg-3">
                      <b>Contact:</b>
                    </div>
                    <div className="col-sm-8 col-lg-9">
                      {buyer.phone_no !== "+undefined" ? buyer.phone_no : "NA"}
                      {console.log(buyer.phone_no)}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4 col-lg-3">
                      <b>Checkr:</b>
                    </div>
                    <div className="col-sm-8 col-lg-9">
                      <i class="batch-icon batch-icon-tick"></i>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4 col-lg-3">
                      <b>Status:</b>
                    </div>
                    <div className="col-sm-8 col-lg-9">
                      {!status ? (
                        <span>
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
                        </span>
                      ) : (
                        ""
                      )}
                      <span>
                        {status ? (
                          <div class="btn-group btn-staus">
                            <button
                              class="btn btn-primary btn-sm dropdown-toggle"
                              type="button"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              {buyer.status}
                            </button>
                            <div class="dropdown-menu ">
                              <a
                                class="dropdown-item"
                                onClick={() => updateStatus("active")}
                              >
                                Active
                              </a>
                              <a
                                class="dropdown-item"
                                onClick={() => updateStatus("inactive")}
                              >
                                In-Active
                              </a>
                              <a
                                class="dropdown-item"
                                onClick={() => updateStatus("pending")}
                              >
                                Pending
                              </a>
                              <a
                                class="dropdown-item"
                                onClick={() => updateStatus("blocked")}
                              >
                                Blocked
                              </a>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </span>
                      &nbsp;
                      <span>
                        <a onClick={() => setStatus(!status)}>
                          <i className="batch-icon batch-icon-pen"></i>
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}

export default BuyerBasicInfo;
