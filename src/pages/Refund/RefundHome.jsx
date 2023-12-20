import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
//hook
import useReq from "../../hooks/useReq";
//spinner
import Spinner from "../../components/Spinner";
import { toast, ToastContainer } from "react-toastify";
import Paginations from "../../components/Paginations";
const REFUND_STATE = {
  PENDING: "Created/Pending",
  SELLER_ACCEPTED: "Seller Accepted",
  SELLER_REJECTED: "Seller Rejected",
  ADMIN_ACCEPTED: "Admin Accepted",
  ADMIN_REJECTED: "Admin Rejected",
};

const ACTION_TYPE = {
  ACCEPT: "Accept",
  REJECT: "Reject",
};
function RefundHome() {
  const [qry, setQry] = useState({
    start: 0,
    limit: 10,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refund, setRefund] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalAction, setModalAction] = useState(null);
  const [refund_id, setRefund_id] = useState(null);
  const [order_id, setOrder_id] = useState(null);
  const [adminRemark, setAdminRemark] = useState(null);
  const [rerender, setRerender] = useState(false);
  const [accepted,setaccepted]=useState(false);
  const { sendRequest } = useReq();
  let state = null;

  useEffect(() => {
    setLoading(true);
    sendRequest(
      `admin/order/refunds/${qry.start}/${qry.limit}`,
      "GET",
      null,
      onResponse
    );
    bindModal();
  }, [rerender]);

  const bindModal = () => {
    setTimeout(() => {
      Modal.setAppElement(document.querySelector("#MAINCOMP"));
    }, 2000);
  };

  const onResponse = (err, res) => {
    setLoading(false);
    if (err) {
      console.log(err);
      return;
    }
    console.log(res.data.data);
    setTotalPages(Math.ceil(res.data.data.pages));
    setRefund(res.data.data.list);
  };

  const formateDate = (date) => {
    let d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  const openModal = (type, order_id, refund_id) => {
    if (type === ACTION_TYPE.ACCEPT) {
      setModalTitle("Are you Sure you want to Accept Refund");
    } else {
      setModalTitle("Are you Sure you want to Reject Refund");
    }
    setOrder_id(order_id);
    setRefund_id(refund_id);
    setModalAction(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setModalAction(null);
    setModalTitle(null);
    setOrder_id(null);
    setShowModal(false);
  };

  const handleAction = () => {
   
    if (modalAction === ACTION_TYPE.ACCEPT) {
      console.log("Accept");
      state = REFUND_STATE.ADMIN_ACCEPTED;
      setaccepted(state);
    } else {
      console.log("Reject");
      state = REFUND_STATE.ADMIN_REJECTED;
    }
    let body = {
      order_id,
      state,
      admin_remark: adminRemark,
    };
    console.log(body);
    sendRequest(`admin/order/refund/${refund_id}`, "PUT", body, statusUdate);
  };
  

  
  const statusUdate = (err, res) => {
    // if (err) {
    //   console.log(err);
    //   if (err?.response?.data?.message) {
    //     console.log('get error',err.response);
    //     toast.error(err.response.data.message);
    //   }
    //   closeModal();
    //   return;
    // }
    setRerender(!rerender);
    console.log(res.data.message);
    toast.success(res.data.message);
    closeModal();
  };

  const handlePageClick = (data) => {
    let start = data.selected * qry.limit;
    setLoading(true);
    sendRequest(
      `admin/order/refunds/${start}/${qry.limit}`,
      "GET",
      null,
      onResponse
    );
  };
  return (
    <>
      <main className="main-content p-5" role="main" id="MAINCOMP">
        <div className="row mb-5">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="row ">
                  <div className="col-md-12">
                    <h1>refund</h1>
                  </div>
                </div>
                <div className="table-responsive">

                <table
                  id="datatable-1"
                  className="table table-datatable  table-striped table-hover"
                >
                  <thead>
                    <tr>
                      <th>Refund Id</th>
                      <th>Reason</th>
                      <th>Seller Remark</th>
                      <th>Requested at</th>
                      <th>State</th>
                      <th>Transaction State</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {refund ? (
                      refund.map((refund) => (
                        <tr id={refund._id}>
                          <td>{refund._id}</td>
                          <td>{refund.reason}</td>
                          <th>
                            {refund?.seller_remark
                              ? refund?.seller_remark
                              : "Not Given"}
                          </th>
                          <td>{formateDate(refund.created_at)}</td>
                          <td>
                            {refund.state === REFUND_STATE.SELLER_ACCEPTED && (
                              <span class="badge badge-primary">
                                Accepted By Seller
                              </span>
                            )}
                            {refund.state === REFUND_STATE.ADMIN_ACCEPTED && (
                              <span class="badge badge-primary">
                                Accepted By Admin
                              </span>
                            )}
                            {refund.state === REFUND_STATE.PENDING && (
                              <span class="badge badge-warning">PENDING</span>
                            )}
                            {refund.state === REFUND_STATE.SELLER_REJECTED && (
                              <span class="badge badge-danger">
                                Rejected By Seller
                              </span>
                            )}
                            {refund.state === REFUND_STATE.ADMIN_REJECTED && (
                              <span class="badge badge-danger">
                                Rejected By Admin
                              </span>
                            )}
                          </td>
                          <td>
                            {refund?.transaction_state &&
                              refund?.transaction_state === "None" && (
                                <span class="badge badge-primary">
                                  Not Issued
                                </span>
                              )}
                            {refund?.transaction_state &&
                              refund.transaction_state === "Pending" && (
                                <span class="badge badge-warning">PENDING</span>
                              )}
                            {refund?.transaction_state &&
                              refund.transaction_state === "Completed" && (
                                <span class="badge badge-danger">
                                  Completed
                                </span>
                              )}
                          </td>
                          <td className="text-center">
                            <Link to={`/order/detail/${refund.order_id}`}>
                              <button style={customStyles.button}>
                                View Order
                              </button>
                            </Link>
                            {refund.state === REFUND_STATE.SELLER_REJECTED ? (
                              <>
                                <button
                                  onClick={() =>
                                    openModal(
                                      ACTION_TYPE.ACCEPT,
                                      refund.order_id,
                                      refund._id
                                    )
                                  }
                                  style={customStyles.buttonAccpet}
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() =>
                                    openModal(
                                      ACTION_TYPE.REJECT,
                                      refund.order_id,
                                      refund._id
                                    )
                                  }
                                  style={customStyles.buttonReject}
                                >
                                  Reject
                                </button>
                              </>
                            ) : null}
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
        <Modal
          isOpen={showModal}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 className="text-center text-uppercase font-weight-bold mb-4  text-dark">
            {modalTitle}
          </h2>
          <h5 className="text-center text-uppercase font-weight-bold mb-4  text-dark font-size-1">
            Order id: {order_id}
          </h5>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Remark:</label>
            <textarea
              onChange={(e) => setAdminRemark(e.target.value)}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          <div className="row">
            <div className="col-md-6">
              <button
                onClick={() => closeModal()}
                style={{
                  background: "#ff0000",
                }}
                className="btn btn-block py-4 text-uppercase font-weight-bold text-center font-size-3"
              >
                Cancel
              </button>
            </div>
            <div className="col-md-6">
              <button
                onClick={() => handleAction()}
                style={{
                  background: "#0ad251",
                }}
                className="btn btn-block py-4 text-uppercase font-weight-bold text-white text-center font-size-3"
              >
                {modalAction}
              </button>
            </div>
          </div>
        </Modal>
        <div className="row mb-4">
          <div className="col-md-12">
            <footer>Powered by - DevJuction</footer>
          </div>
        </div>
        <ToastContainer />
      </main>
    </>
  );
}

export default RefundHome;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    borderRadius: "1.167rem",
  },
  button: {
    border: "none",
    color: "#000",
    cursor: "pointer",
    margin: "6px 3px",
    padding: "0.5rem 1.6rem",
    fontSize: "0.8rem",
    borderRadius: " 0.4167rem",
    fontWeight: 500,
    background: "#e0e0e0",
  },
  buttonAccpet: {
    border: "none",
    cursor: "pointer",
    margin: "6px 3px",
    padding: "0.5rem 1.6rem",
    fontSize: "0.8rem",
    borderRadius: " 0.4167rem",
    fontWeight: 500,
    background: "#0ad251",
    color: "#fff",
  },
  buttonReject: {
    border: "none",
    cursor: "pointer",
    margin: "6px 3px",
    padding: "0.5rem 1.6rem",
    fontSize: "0.8rem",
    borderRadius: " 0.4167rem",
    fontWeight: 500,
    color: "#fff",
    background: "#ff0000",
  },
};
