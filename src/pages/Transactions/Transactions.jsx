import React, { useState, useEffect } from "react";
//hook
import useReq from "../../hooks/useReq";
import { Link, useLocation } from "react-router-dom";
//spinner
import Spinner from "../../components/Spinner";
import { TRANSACTION_TYPE } from "../../constants/Constants";
import ReactPaginate from "react-paginate";
import Paginations from "../../components/Paginations";
function Transactions() {
  const [qry, setQry] = useState({
    start: 0,
    limit: 10,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [transactions, setTransactions] = useState();
  const [loading, setLoading] = useState(false);
  const { sendRequest } = useReq();

  useEffect(() => {
    setLoading(true);
    sendRequest(
      `admin/transactions/${qry.start}/${qry.limit}`,
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
    console.log("Transaction",res.data.data.list);
    setTotalPages(Math.ceil(res.data.data.pages));
    setTransactions(res.data.data.list);
  };

  const calculateUserRole = (payment_intent, payment_intent_meta) => {
    if (payment_intent.startsWith("re_")) {
      return "buyer";
    }
    if (payment_intent_meta.includes("Seller Amount")) {
      return "seller";
    }
    if (payment_intent_meta.includes("Driver Fee")) {
      return "driver";
    }
  };

  //pagination
  const handlePageClick = (data) => {
    let start = data.selected * qry.limit;
    setLoading(true);
    sendRequest(
      `admin/transactions/${start}/${qry.limit}`,
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
                <div className="row">
                  <div className="col-md-12 ">
                    <h1>Transactions</h1>
                  </div>
                </div>
                <div className="table-responsive">
                <table
                  id="datatable-1"
                  className="table table-datatable  table-striped table-hover"
                >
                  <thead>
                    <tr>
                      <th>Transaction Id</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Sender</th>
                      <th>Receiver</th>
                      <th>Method</th>
                      <th>Type</th>
                      <th>order</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody className="w-100">
                    {transactions && !loading ? (
                      transactions.map((transaction, index) => {
                        let navigationKey;
                        switch (transaction.transaction_type) {
                          case TRANSACTION_TYPE.PRODUCT_PRICE:
                            navigationKey = "buyer";
                            break;
                          case TRANSACTION_TYPE.SELLER_SHARE:
                            navigationKey = "seller";
                            break;
                          case TRANSACTION_TYPE.DRIVER_SHARE:
                            navigationKey = "driver";
                            break;
                          case TRANSACTION_TYPE.CHECKR_FEE:
                            navigationKey = "driver";
                            break;
                          case TRANSACTION_TYPE.REFUND:
                            navigationKey = calculateUserRole(
                              transaction.payment_intent,
                              transaction.payment_intent_meta
                            );
                            break;
                          default:
                            break;
                        }
                        return (
                          <tr id={index}>
                            <td>{transaction._id}</td>
                            <td>
                              {new Intl.DateTimeFormat("en-US", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "numeric",
                                hour12: true,
                                minute: "2-digit",
                                second: "2-digit",
                              }).format(Date.parse(transaction.created_at))}
                            </td>
                            <td>${transaction.amount}</td>
                            <td>
                              {transaction?.from === "KWK" ? (
                                "KWK"
                              ) : (
                                <Link
                                  target="_blank"
                                  to={`/${navigationKey}/detail/${transaction?.from}`}
                                >
                                  View User
                                </Link>
                              )}
                            </td>
                            <td>
                              {transaction?.to === "KWK" ? (
                                "KWK"
                              ) : (
                                <Link
                                  target="_blank"
                                  to={`/${navigationKey}/detail/${transaction?.to}`}
                                >
                                  View User
                                </Link>
                              )}
                            </td>
                            <td>{transaction.payment_method}</td>
                            <td>{transaction.transaction_type}</td>
                            <td>
                              <Link
                                target="_blank"
                                to={`/order/detail/${transaction?.ref_id}`}
                              >

                            
                                View Order
                              </Link>
                            </td>
                            <td className="text-capitalize">
                              {transaction.transaction_state ===
                                "Completed" && (
                                <span class="badge badge-success">
                                  Completed
                                </span>
                              )}
                              {transaction.transaction_state === "Waiting" && (
                                <span class="badge badge-secondary">
                                  Waiting
                                </span>
                              )}
                              {transaction.transaction_state === "Waiting" && (
                                <span class="badge badge-secondary">
                                  Waiting
                                </span>
                              )}
                              {transaction.transaction_state ===
                                "Processing" && (
                                <span class="badge badge-primary">
                                  Processing
                                </span>
                              )}
                              {transaction.transaction_state ===
                                "Confirmed" && (
                                <span class="badge badge-success">
                                  Confirmed
                                </span>
                              )}
                              {transaction.transaction_state === "Rejected" && (
                                <span class="badge badge-danger">Rejected</span>
                              )}
                              {transaction.transaction_state === "Expired" && (
                                <span class="badge badge-danger">Expired</span>
                              )}
                              {transaction.transaction_state === "Aborted" && (
                                <span class="badge badge-danger">Aborted</span>
                              )}
                            </td>
                          </tr>
                        );
                      })
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
                  totalPages={totalPages}
                  handlePageClick={handlePageClick}
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

export default Transactions;
