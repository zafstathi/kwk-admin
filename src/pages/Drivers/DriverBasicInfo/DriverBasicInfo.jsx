import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
//hook
import useReq from "../../../hooks/useReq";
//spinner
import Spinner from "../../../components/Spinner";
import "../Driver.css";
import { toast, ToastContainer } from "react-toastify";
function DriverBasicInfo() {
  const [driver, setDriver] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [status, setStatus] = useState(false);
  const [checkr, setCheckr] = useState(false);
  const location = useLocation();

  const { sendRequest } = useReq();
  useEffect(() => {
    const driverId = location.pathname.split("/")[3];
    sendRequest(`admin/driver/${driverId}`, "GET", null, onResponse);
  }, [location]);

  const onResponse = (err, res) => {
    if (err) {
      return;
    }

    setDriver(res.data.data);
    setVehicle(res.data.data.driver[0]);
  };

  const updateStatus = (status) => {
    const driverId = location.pathname.split("/")[3];
    sendRequest(
      `admin/user/update-status/${driverId}`,
      "PUT",
      { status: status },
      updateStatusResponse
    );
  };
  const updateCheckr = (checkr) => {
    const driverId = location.pathname.split("/")[3];
    sendRequest(
      `admin/user/update-checkr/${driverId}`,
      "PUT",
      { checkr: checkr },
      updateCheckrResponse
    );
  };
  const formatDate = (timestamp) => {
    const dateObject = new Date(timestamp);
    return dateObject.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };
  const updateStatusResponse = (err, res) => {
    if (res && res.data.statusCode === 200) {
      console.log(res);
      driver.status = res.data.data.status;
      toast("Driver status has been updated");
    }
    setStatus(false);
  };

  const updateCheckrResponse = (err, res) => {
    if (res && res.data.checkrCode === 200) {
      console.log(res);
      driver.checkr = res.data.data.checkr;
      toast("Driver checkr has been updated");
    }
    setStatus(false);
  };
  return (
    <main className="main-content p-5" role="main">
      <div className="col-lg-12">
        <div className="card mb-5">
          <div className="card-body">
            {driver ? (
              <div className="row personal-info">
                <div className="col-lg-2 col-sm-6">
                  <img
                    src={
                      driver.photo_url
                        ? driver.photo_url
                        : "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                    }
                    className="dp"
                    alt="Logo"
                  />
                </div>
                <div className="col-lg-4 col-sm-12 ">
                  <div className="row">
                    <div className="col-lg-2"></div>
                    <div className="col-sm-10 col-lg-10">
                      <b>
                        {" "}
                        {driver.first_name} {driver.middle_name}{" "}
                        {driver.last_name}
                      </b>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-lg-2"></div>

                    <div className="col-sm-4 col-lg-4">
                      <i className="batch-icon batch-icon-user-alt-add"></i>{" "}
                      Reviews (215)
                    </div>
                    <div className="col-sm-5 col-lg-4">
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
                    <div className="col-lg-2"></div>
                    <div className="col-sm-4 col-lg-4">
                      <b>Email:</b>
                    </div>
                    <div className="col-sm-6 col-lg-6" style={{ fontSize: 9 }}>
                      {driver.email}
                    </div>
                  </div>
                  <div className="row">
                    <div className=" col-lg-2"></div>
                    <div className="col-sm-4 col-lg-4">
                      <b>Contact:</b>
                    </div>
                    <div className="col-sm-5 col-lg-6" style={{ fontSize: 9 }}>
                      {driver.phone_no}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-2"></div>
                    <div className="col-sm-4">
                      <b>Checkr:</b>
                    </div>
                    <div className="col-sm-5">
                      {driver.checkr_status ? (
                        <i class="batch-icon batch-icon-tick"></i>
                      ) : (
                        <i class="batch-icon batch-icon-cross"></i>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-2"></div>
                    <div className="col-sm-4">
                      <b>Status:</b>
                    </div>
                    <div className="col-sm-5">
                      {!status ? (
                        <span>
                          {driver.status === "active" && (
                            <span class="badge badge-success">Active</span>
                          )}
                          {driver.status === "inactive" && (
                            <span class="badge badge-secondary">Inactive</span>
                          )}
                          {driver.status === "blocked" && (
                            <span class="badge badge-danger">Blocked</span>
                          )}
                          {driver.status === "pending" && (
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
                              {driver.status}
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
                <div className="col-lg-6 ">
                  <div className="statusIcon">
                    {" "}
                    <i className="batch-icon batch-icon-user-alt-3"></i>{" "}
                    Available{" "}
                  </div>
                </div>
              </div>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-5">
          <h2>License Detail</h2>
          <div className="card mb-5 info-card">
            <div className="card-body">
              {vehicle ? (
                <div className="row">
                  <div className="col-sm-3">
                    <img
                      src="https://www.linkpicture.com/q/pngegg-1_17.png"
                      width="145"
                      alt="QuillPro"
                    />
                  </div>
                  <div className="col-sm-9 license-details">
                    <div className="row">
                      <div className="col-sm-2"></div>
                      <div className="col-sm-6">
                        {" "}
                        <b>License State: </b>
                      </div>
                      <div className="col-sm-4">{vehicle.license_state} </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2"></div>
                      <div className="col-sm-6">
                        {" "}
                        <b>License Number: </b>
                      </div>
                      <div className="col-sm-4">{vehicle.license_number} </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2"></div>
                      <div className="col-sm-6">
                        {" "}
                        <b>License Expiry Date: </b>
                      </div>
                      <div className="col-sm-4">
                        {formatDate(vehicle.license_expiry_date)}{" "}
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
        <div className="col-lg-7">
          <h2>Vehicle Detail</h2>
          <div className="card mb-5 info-card vehicle-info">
            <div className="card-body">
              {vehicle ? (
                <div className="row">
                  <div className="col-sm-3">
                    <img
                      src="https://www.linkpicture.com/q/Lovepik_com-400679119-cartoon-car.png"
                      width="145"
                      alt="QuillPro"
                    />
                  </div>
                  <div className="col-sm-9 license-details">
                    <div className="row">
                      <div className="col-sm-3">
                        {" "}
                        <b>Vehicle Type:</b>
                      </div>
                      <div className="col-sm-3">
                        {vehicle.vehicle.vehicle_type}
                      </div>
                      <div className="col-sm-3">
                        {" "}
                        <b> Insurance Number: </b>
                      </div>
                      <div className="col-sm-3">
                        {vehicle.vehicle.insurance_number}{" "}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        {" "}
                        <b>Insurance Expiry Date:</b>
                      </div>
                      <div className="col-sm-3">
                        {formatDate(vehicle.license_expiry_date)}
                      </div>
                      <div className="col-sm-3">
                        {" "}
                        <b>Vehicle Make</b>
                      </div>
                      <div className="col-sm-3">
                        {vehicle.vehicle.vehicle_make}{" "}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        {" "}
                        <b>Vehicle Color: </b>
                      </div>
                      <div className="col-sm-3">
                        {vehicle.vehicle.vehicle_color}{" "}
                      </div>
                      <div className="col-sm-3">
                        {" "}
                        <b>Vehicle Number</b>
                      </div>
                      <div className="col-sm-3">
                        {vehicle.vehicle.vehicle_number}{" "}
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
      </div>
      <ToastContainer />
    </main>
  );
}

export default DriverBasicInfo;
