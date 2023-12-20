import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
//hook
import useReq from "../../../hooks/useReq";
//spinner
import Spinner from "../../../components/Spinner";
import { toast, ToastContainer } from "react-toastify";
import { date } from "yup";
import "../Order.css";
function OrderBasicInfo() {
  const [order, setOrder] = useState(null);
  const [uorder,setUOrder]=useState(null);
  const [buyer, setBuyer] = useState(null);
  const [seller, setSelelr] = useState(null);
  const [driver, setDriver] = useState(null);
  const [status, setStatus] = useState(false);
  var data;

  const location = useLocation();
  const { sendRequest } = useReq();
  useEffect(() => {
    
    const orderId = location.pathname.split("/")[3];
    console.log("order id",orderId)
    sendRequest(`admin/order/${orderId}`, "GET", null, onResponse);
  }, [location]);

  const onResponse = (err, res) => {
   
    console.log('in')
    if (err) {
      console.log(err);
      return;
    }
    data=res.data.data.order;
   console.log("data",data);
   
   setOrder(data)
    console.log("orderee",order)
    setBuyer(res.data.data.buyer);
    console.log("buyers",buyer)
    setSelelr(res.data.data.seller);
    setDriver(res.data.data.driver);
    console.log(seller)
  };
  useEffect(() => {
    setOrder(data);
    console.log("orderin",order)
  }, [data]);
  const updateStatus = (status) => {
    const driverId = location.pathname.split("/")[3];
    sendRequest(`admin/user/update-status/${driverId}`, "PUT", { status: status }, updateStatusResponse);
  }

  const updateStatusResponse = (err, res) => {

    if (res && res.data.statusCode === 200) {
      console.log(res);
      driver.status = res.data.data.status;
      toast('Driver status has been updated');
    }
    setStatus(false);
  }


  return (
    <main className="main-content p-5" role="main">
      <div className="row seller-container">
        <div className="col-lg-6">
          <h2>Buyer Details</h2>
          <div className="card mb-5">
            <div className="card-body">
              {buyer ? (
                <div className="row personal-info">
                  <div className="col-lg-4 col-sm-6">
                    <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" className="dp" alt="Logo" />
                  </div>
                  <div className="col-lg-8 col-sm-6 ">
                    <div className="row">
                    <div className="col-lg-2"></div>
                      <div className="col-sm-3 col-lg-6">
                        <b>  {buyer.name}   </b>
                      </div>
                    </div>
                    <div className="row ">
                    <div className="col-lg-2"></div>
                    <div className="col-sm-5 col-lg-5">
                    <i className="batch-icon batch-icon-user-alt-add"></i> Reviews (215)
                  </div>
                      <div className="col-sm-5 col-lg-5">
                        <span className="text-warning "> <i className="batch-icon batch-icon-star-alt"></i><i className="batch-icon batch-icon-star-alt"></i><i className="batch-icon batch-icon-star-alt"></i><i className="batch-icon batch-icon-star-alt"></i><i className="batch-icon batch-icon-star-alt"></i>
                        </span>
                      </div>
                     
                    </div>
                    <div className="row">
                    <div className="col-lg-2"></div>
                      <div className="col-sm-5 col-lg-5"><b>Email:</b></div>
                      <div className="col-sm-7 col-lg-5" style={{fontSize:9}}>{buyer.email}</div>
                    </div>
                    <div className="row">
                    <div className="col-lg-2"></div>
                      <div className="col-sm-5 col-lg-5"><b>Contact:</b></div>
                      <div className="col-sm-7 col-lg-5" style={{fontSize:9}}>{buyer.phone_no!=='+undefined'?buyer.phone_no:'NA'}</div>
                    </div>

                    <div className="row">
                    <div className="col-lg-2"></div>
                      <div className="col-sm-5 col-lg-5"><b>Status:</b></div>
                      <div className="col-sm-7 col-lg-5">
                        {<span>{buyer.status === "active" && (
                          <span class="badge badge-success">Active</span>
                        )}
                          {buyer.status === "inactive" && (
                            <span class="badge badge-secondary">
                              Inactive
                            </span>
                          )}
                          {buyer.status === "blocked" && (
                            <span class="badge badge-danger">Blocked</span>
                          )}
                          {buyer.status === "pending" && (
                            <span class="badge badge-primary">Pending</span>
                          )}
                        </span>}
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

      <div className="col-lg-6">
        <h2>Seller Details</h2>
        {seller?  
        <div className="card mb-5">
          <div className="card-body">
            {seller ? (
              <div className="row personal-info">
                <div className="col-lg-4 col-sm-6">
                  <img src="assets/img/shop.jpg" className="dp" alt="Logo" />
                </div>
                <div className="col-lg-8 col-sm-6 ">
                  <div className="row">
                  <div className="col-lg-2"></div>
                    <div className="col-sm-6 col-lg-6">
                      <b>  {seller.first_name} {seller.last_name}   </b>
                    </div>
                  </div>
                  <div className="row ">
                  <div className="col-lg-2"></div>
                  <div className="col-sm-4 col-lg-5">
                  <i className="batch-icon batch-icon-user-alt-add"></i> Reviews (215)
                </div>
                    <div className="col-sm-5 col-lg-5">
                      <span className="text-warning "> <i className="batch-icon batch-icon-star-alt"></i><i className="batch-icon batch-icon-star-alt"></i><i className="batch-icon batch-icon-star-alt"></i><i className="batch-icon batch-icon-star-alt"></i><i className="batch-icon batch-icon-star-alt"></i>
                      </span>
                    </div>
                  
                  </div>
                  <div className="row">
                  <div className="col-lg-2"></div>
                    <div className="col-sm-6 col-lg-4"><b>Shop:</b></div>
                    <div className="col-sm-6 col-lg-6" style={{fontSize:9}}>{seller.email}</div>
                  </div>
                  <div className="row">
                  <div className="col-lg-2"></div>
                    <div className="col-sm-6 col-lg-4"><b>Email:</b></div>
                    <div className="col-sm-6 col-lg-6" style={{fontSize:9}}>{seller.email}</div>
                  </div>
                  <div className="row">
                  <div className="col-lg-2"></div>
                    <div className="col-sm-6 col-lg-4"><b>Contact:</b></div>
                    <div className="col-sm-7 col-lg-6 " style={{fontSize:9}}>{seller.phone_no}</div>
                  </div>

                  <div className="row">
                  <div className="col-lg-2"></div>
                    <div className="col-sm-5 col-lg-4"><b>Status:</b></div>
                    <div className="col-sm-7 col-lg-6">
                      {<span>{buyer.status === "active" && (
                        <span class="badge badge-success">Active</span>
                      )}
                        {buyer.status === "inactive" && (
                          <span class="badge badge-secondary">
                            Inactive
                          </span>
                        )}
                        {buyer.status === "blocked" && (
                          <span class="badge badge-danger">Blocked</span>
                        )}
                        {buyer.status === "pending" && (
                          <span class="badge badge-primary">Pending</span>
                        )}
                      </span>}
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
:
<div className="card mb-5">
          <div className="card-body">
        
     <div>
        Seller not Allocated
        </div>
</div>
</div>
      }      </div>
      
 


        {/* <div className="col-lg-6">
          <ShopDetail data = {shops} />
      
        </div> */}
      </div>
      <div className="row">
        <div className="col-lg-7">
          <h2>Driver Details</h2>
          {driver?
          <div className="card mb-5">
          <div className="card-body">
            {driver ? (
              <div className="row personal-info">
                <div className="col-lg-4 col-sm-6">
                  <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" className="dp" alt="Logo" />
                </div>
                <div className="col-lg-8 col-sm-6  ">
                  <div className="row">
                  <div className="col-lg-2"></div>
                    <div className="col-sm-8">
                      <b>  {driver.first_name}    {driver.middle_name}   {driver.last_name}</b>
                    </div>
                  </div>
                  <div className="row ">
                  <div className="col-lg-2"></div>
                  <div className="col-sm-4 col-lg-4">
                      <i className="batch-icon batch-icon-user-alt-add"></i> Reviews (215)
                    </div>
                    <div className="col-sm-5 col-lg-6">
                      <span className="text-warning "> <i className="batch-icon batch-icon-star-alt"></i><i className="batch-icon batch-icon-star-alt"></i><i className="batch-icon batch-icon-star-alt"></i><i className="batch-icon batch-icon-star-alt"></i><i className="batch-icon batch-icon-star-alt"></i>
                      </span>
                    </div>
                    
                  </div>
                  <div className="row">
                  <div className="col-lg-2"></div>
                    <div className="col-sm-4 col-lg-4"><b>Email:</b></div>
                    <div className="col-sm-6 col-lg-6" style={{fontSize:8}}>{driver.email}</div>
                  </div>
                  <div className="row">
                  <div className="col-lg-2"></div>
                    <div className="col-sm-5 col-lg-4"><b>Contact:</b></div>
                    <div className="col-sm-6 col-lg-6" style={{fontSize:8}}>{driver.phone_no}</div>
                  </div>
                  <div className="row">
                  <div className="col-lg-2"></div>
                    <div className="col-sm-4 col-lg-4"><b>Checkr:</b></div>
                    <div className="col-sm-6 col-lg-6"><i class="batch-icon batch-icon-tick"></i></div>
                  </div>
                  <div className="row">
                  <div className="col-lg-2"></div>
                    <div className="col-sm-4 col-lg-4"><b>Status:</b></div>
                    <div className="col-sm-6 col-lg-6">
                      {!status ? <span>{driver.status === "active" && (
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
                      </span> : ''}
                      <span>
                        {status ? <div class="btn-group btn-staus">
                          <button class="btn btn-primary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {driver.status}
                          </button>
                          <div class="dropdown-menu ">
                            <a class="dropdown-item" onClick={() => updateStatus('active')}>Active</a>
                            <a class="dropdown-item" onClick={() => updateStatus('inactive')}>In-Active</a>
                            <a class="dropdown-item" onClick={() => updateStatus('pending')}>Pending</a>
                            <a class="dropdown-item" onClick={() => updateStatus('blocked')}>Blocked</a>

                          </div>
                        </div> :
                          ""
                        }

                      </span>
                      &nbsp;<span><a onClick={() => setStatus(!status)}><i className="batch-icon batch-icon-pen"></i></a></span>
                    </div>
                  </div>
                </div>
             
              </div>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
        :
        <div className="card mb-5">
          <div className="card-body">
        <div>
          Driver not Allocated
        </div>
        </div>
        </div>
          }

        </div>
        <div class=" order col-md-12 col-lg-5 col-sm-12">
         <h2>Order Details</h2>
          <div class="card mb-5">
            <div class="card-table table-responsive ">
              <table class="table table-hover table-sm align-middle">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th class="text-right">Unit Price</th>
                    <th class="text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                {(order && order.products) ?
                   order.products.map(product => {
                    let totalprice= 0
                    Object.values(product.price).map((value)=>
                      totalprice+= value
                    )
                    return (
                  <>
                  <tr>
                    <td>
                      {product.title}
                      <div>
                        <small class="boldness-light">Color: Red; Size: 9;</small>
                      </div>
                    </td>
                    <td>
                      {product.quantity}
                    </td>
                    <td class="text-right">
                      ${totalprice}
                    </td>
                    <td class="text-right">
                      ${totalprice * product.quantity}
                    </td>
                  </tr>

                </>
                )})

                 : (
                  <tr>
                    <td colspan="6">
                      <Spinner />
                    </td>
                  </tr>
                )}

                {/* <tr>
                          <td colspan="3" class="text-right">
                            <strong>Sub-Total:</strong>
                          </td>
                          <td class="text-right">
                            $571
                          </td>
                        </tr>
                        <tr>
                          <td colspan="3" class="text-right">
                            <strong>Sales Tax (5%):</strong>
                          </td>
                          <td class="text-right">
                            $28.55
                          </td>
                        </tr> */}
                <tr>
                  <td colspan="3" class="text-right">
                    <strong>Total:</strong>
                  </td>
                  <td class="text-right">
                    <strong>${order?.amount}</strong>
                  </td>
                </tr>
              </tbody>
               
              </table>
            </div>
          </div>
        </div>

      </div>

      {/* <ProductsListing data={products} /> */}
      <ToastContainer />
    </main>
  );
}
const styles = `

@media (max-width: 991px) {
  .order-card{
     margin-top: 100;
  }
 
  /* Your CSS rules for screens with a maximum width of 991px */
}
`;
export default OrderBasicInfo;
