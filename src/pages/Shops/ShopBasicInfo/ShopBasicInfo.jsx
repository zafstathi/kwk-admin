import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
//hook
import useReq from "../../../hooks/useReq";
//spinner
import Spinner from "../../../components/Spinner";
function ShopBasicInfo() {
  const [shop, setShop] = useState(null);
  const location = useLocation();
  const { sendRequest } = useReq();
  useEffect(() => {
    const shopId = location.pathname.split("/")[3];
    sendRequest(`shops/${shopId}`, "GET", null, onResponse);
  }, [location]);

  const onResponse = (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    setShop(res.data);
  };
  return (
    <main className="main-content p-5" role="main">
     <div className="row mb-1">
      <div className="col-md-10">
      <h2>Shops Basic Info</h2>
      </div>
      <div
                className="btn-group ml-5"
                role="group"
                aria-label="Previous or Next Page"
              >
                {shop && (
            <Link to={`/shop/basicInfoEdit/${shop.id}`}>
              <button type="button" className="btn btn-primary ml-5">
                Edit
              </button>
            </Link>
          )}
                  </div>
                  </div>
      <div className="card mb-5">
        <div className="card-body">
          {shop ? (
            <div className="email-pager-container">
              

              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Shop Id</h6>
                  </div>
                  <div className="col-sm-3 text-secondary">
                    {shop.id}
                  </div>
                </div>
                <div className="border-top my-3"></div>
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Shop Name</h6>
                  </div>
                  <div className="col-sm-3 text-secondary">
                    {shop.shopName}
                  </div>
                </div>
                <div className="border-top my-3"></div>
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Phone</h6>
                  </div>
                  <div className="col-sm-3 text-secondary">
                    {shop.phone}
                  </div>
                </div>
                <div className="border-top my-3"></div>
              </div>
            </div>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
      
      
    </main>
  );
}

export default ShopBasicInfo;
