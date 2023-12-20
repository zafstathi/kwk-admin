import React, { useEffect, useState } from "react";
//hook
import useReq from "../../../hooks/useReq";
//spinner
import Spinner from "../../../components/Spinner";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
function OrderBasicInfoEdit() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  const location = useLocation();
  const { sendRequest } = useReq();
  useEffect(() => {
    const orderId = location.pathname.split("/")[3];
    sendRequest(`admin/orders/${orderId}`, "GET", null, onResponse);
  }, [location]);

  const onResponse = (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    setOrder(res.data);
  };

  const validationSchema = Yup.object({
    buyer: Yup.string().required("Required"),
    driver: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    const body = {
      buyer: values.buyer,
      driver: values.driver,
      address: values.address,
    };
    const orderId = location.pathname.split("/")[3];
    sendRequest(`orders/${orderId}`, "PATCH", body, onPostResponse);
  };
  const onPostResponse = (err, res) => {
    if (err) {
      alert("Error", err);
      return;
    }
    navigate(-1);
  };
  return (
    <main className="main-content p-5" role="main">
      <div className="row">
        <div className="col-md-12">
          <h1>Order's Details Edit</h1>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              {order ? (
                <Formik
                  initialValues={{
                    buyer: order.buyer,
                    driver: order.driver,
                    address: order.address,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  <Form>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label for="buyer" className="active">
                          Buyer
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          id="buyer"
                          name="buyer"
                        />
                        <ErrorMessage name="buyer" />
                      </div>
                      <div className="form-group col-md-6">
                        <label for="driver" className="active">
                          Driver
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          id="driver"
                          name="driver"
                        />
                        <ErrorMessage name="driver" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label for="address" className="active">
                          Address
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          id="address"
                          name="address"
                        />
                        <ErrorMessage name="address" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                        <button
                          className="btn btn-outline-light"
                          type="button"
                          onClick={() => {
                            navigate(-1);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </Form>
                </Formik>
              ) : (
                <Spinner />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default OrderBasicInfoEdit;
