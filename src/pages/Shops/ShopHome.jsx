import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useReq from "../../hooks/useReq";
//spinner
import Spinner from "../../components/Spinner";
function ShopHome() {
  const [shops, setShops] = useState(null);

  const { sendRequest } = useReq();

  useEffect(() => {
    sendRequest("shops", "GET", null, onResponse);
  }, []);

  const onResponse = (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    setShops(res.data);
  };
  const ApproveShop = (id) => {
    console.log(id);
  };

  const DeleteShop = (id) => {
    console.log(id);
  };
  return (
    <>
      <div className="row ml-5 mt-5 mr-5">
        <div className="col-md-12">
          <h1>Shop</h1>
        </div>
      </div>
      <main className="main-content p-5" role="main">
        <div className="row mb-5">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <table
                  id="datatable-1"
                  className="table table-datatable  table-striped table-hover"
                >
                  <thead>
                    <tr>
                      <th>Shop Id</th>
                      <th>Shop Name</th>
                      <th>Phone</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shops ? (
                      shops.map((shop) => (
                        <tr key={shop.id}>
                          <td>{shop.id}</td>
                          <td>{shop.shopName}</td>
                          <td>{shop.phone}</td>
                          <td className="text-center">
                            <button
                              className="del-elm btn btn-sm btn-outline-danger mx-2"
                              onClick={() => {
                                ApproveShop(shop.id);
                              }}
                            >
                              Shop
                            </button>
                            <Link to={`/shop/basicInfo/${shop.id}`}>
                              <button className="btn  btn-sm btn-outline-primary mx-2">
                                View
                              </button>
                            </Link>
                            <button
                              className="del-elm btn btn-sm btn-outline-danger mx-2"
                              onClick={() => {
                                DeleteShop(shop.id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <Spinner />
                    )}
                  </tbody>
                </table>
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

export default ShopHome;
