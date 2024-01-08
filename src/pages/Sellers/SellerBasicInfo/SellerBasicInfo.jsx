import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useReq from "../../../hooks/useReq";
import Spinner from "../../../components/Spinner";
import { toast, ToastContainer } from "react-toastify";
import "../Seller.css";
import ProductsListing from "../../../components/products/Products-Listing";
import ShopDetail from "../../../components/shop/Shop-detail";
function SellerBasicInfo() {
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState(null);
  const [shops, setShops] = useState(null);
  const [status, setStatus] = useState(false);
  const location = useLocation();
  const { sendRequest } = useReq();

  useEffect(() => {
    const sellerId = location.pathname.split("/")[3];
    sendRequest(`admin/seller/${sellerId}`, "GET", null, onResponse);
  }, [location]);

  const onResponse = (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("SellerInfos", res.data);
    setSeller(res.data.data.user);
    setProducts(res.data.data.products);
    setShops(res.data.data.user.seller);
  };

  const updateStatus = (status) => {
    const sellerId = location.pathname.split("/")[3];
    sendRequest(
      `admin/user/update-status/${sellerId}`,
      "PUT",
      { status: status },
      updateStatusResponse
    );
  };

  const updateStatusResponse = (err, res) => {
    if (res && res.data.statusCode === 200) {
      console.log(res.data);
      seller.status = res.data.data.status;
      toast("Seller status has been updated");
    }
    setStatus(false);
  };

  return (
    <main className="main-content p-5" role="main">
      <div className="row seller-container">
        <div className="col-lg-6 col-md-12 col-sm-12">
          <h2>Seller Details</h2>
          <div className="card mb-5">
            <div className="card-body">
              {seller ? (
                <div className="row personal-info">
                  <div className="col-lg-4 col-sm-6 col-md-3">
                    <img
                      src={
                        seller.photo_url
                          ? seller.photo_url
                          : "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                      }
                      className="dp"
                      alt="Logo"
                    />
                  </div>
                  <div className="col-lg-8 col-sm-6 col-md-6 ">
                    <div className="row">
                      <div className="col-lg-2"></div>
                      <div className="col-sm-6 col-lg-10 col-md-6">
                        <b> {seller.name} </b>
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-lg-2"></div>
                      <div className="col-lg-4 col-sm-4 col-md-4">
                        <i className="batch-icon batch-icon-user-alt-add"></i>
                        Reviews (215)
                      </div>
                      <div className="col-sm-10 col-lg-6 col-md-6">
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
                      <div className="col-lg-4 col-sm-4 col-md-3">
                        <b>Email:</b>
                      </div>

                      <div
                        className="col-sm-10 col-lg-6 col-md-9"
                        style={{ fontSize: 10 }}
                      >
                        {seller.email}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-2"></div>
                      <div className="col-lg-4 col-sm-6 col-md-4">
                        <b>Contact:</b>
                      </div>

                      <div
                        className="col-sm-10 col-lg-5 col-md-9"
                        style={{ fontSize: 12 }}
                      >
                        {" "}
                        {seller.phone_no}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-2"></div>
                      <div className="col-lg-4 col-sm-6 col-md-4">
                        <b>Checkr:</b>
                      </div>

                      <div className="col-sm-10 col-lg-5 col-md-6">
                        <i class="batch-icon batch-icon-tick"></i>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-2"></div>
                      <div className="col-sm-7 col-lg-4">
                        <b>Status:</b>
                      </div>
                      <div className="col-sm-10 col-lg-6">
                        {!status ? (
                          <span>
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
                                {seller.status}
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
        <div className="col-lg-6 col-sm-12">
          {shops && <ShopDetail data={shops} />}
        </div>
      </div>
      {products && <ProductsListing data={products} />}

      <ToastContainer />
    </main>
  );
}

export default SellerBasicInfo;
