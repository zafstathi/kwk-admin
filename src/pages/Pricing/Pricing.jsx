import React, { useState, useEffect } from "react";
import useReq from "../../hooks/useReq";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import "./Pricing.css";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import Rules from "./Rules";

function Pricing() {
  const [types, setTypes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rulesToggle, setRulesToggle] = useState(false);
  const { sendRequest } = useReq();
  useEffect(() => {
    sendRequest("admin/product/prices", "GET", null, onResponse);
  }, []);

  const validationSchema = () =>
    Yup.object().shape({
      delivery_type: Yup.string().required("Delivery type  is required!"),
      product_type: Yup.string().required("Product type  is required!"),
      price: Yup.number().required("Price  is required!"),
    });

  const onResponse = (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    setTypes(res.data.data);
  };

  const handleSubmit = (formValue) => {
    console.log(formValue);
    setLoading(true);
    sendRequest("admin/product/prices", "PUT", formValue, onUpdate);
  };

  const onUpdate = (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    setLoading(false);
    toast(res.data.message);
    setTypes(res.data.data);
  };

  const toggleRule = () => {
    setRulesToggle(!rulesToggle);
  };

  return (
    <>
      <main className="main-content p-5" role="main">
        {rulesToggle && <Rules />}

        {!rulesToggle && (
          <div className="pricing-container">
            <h2>Propane Pricing</h2>
            <div className="row mb-5">
              <div className="col-md-5">
                <div className="card mb-5">
                  <div className="card-body">
                    <div className="mailbox-mail-list table-responsive">
                      <div className="card mb-12" id="basic_info_edit">
                        <div className="card-body">
                          <Formik
                            initialValues={{
                              delivery_type: "",
                              product_type: "",
                              price: "",
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                          >
                            <Form className="form-input">
                              <div className="row">
                                <div className="col-md-8">
                                  <label htmlFor="delivery_type">
                                    Delivery Type
                                  </label>
                                  {/* <select  name="delivery_type"   value={formik.values.delivery_type}  onChange={formik.handleChange} className="form-control">
                                        <option value="Dispose" label="Dispose" />
                                      <option value="Exchange" label="Exchange" />
                                  </select> */}
                                  <Field
                                    as="select"
                                    name="delivery_type"
                                    className="form-control"
                                  >
                                    <option
                                      value=""
                                      label="Select Delivery Type"
                                    />
                                    <option
                                      value="Self Pickup"
                                      label="Self Pickup"
                                    />
                                    <option value="Delivery" label="Delivery" />
                                  </Field>
                                  <ErrorMessage
                                    className="error"
                                    name="delivery_type"
                                    component="div"
                                  />
                                </div>
                                <div className="col-md-8">
                                  <label htmlFor="product_type">
                                    Product Type
                                  </label>
                                  <Field
                                    as="select"
                                    name="product_type"
                                    className="form-control"
                                  >
                                    <option
                                      value=""
                                      label="Select Product Type"
                                    />
                                    <option value="New" label="New" />
                                    <option value="Exchange" label="Exchange" />
                                    <option value="Upgrade" label="Upgrade" />
                                    <option value="Dispose" label="Dispose" />
                                  </Field>
                                  <ErrorMessage
                                    className="error"
                                    name="product_type"
                                    component="div"
                                  />
                                </div>
                                <div className="col-md-8">
                                  <label htmlFor="price">Price</label>
                                  <Field
                                    name="price"
                                    className="form-control"
                                    type="number"
                                  />
                                  <ErrorMessage
                                    className="error"
                                    name="price"
                                    component="div"
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-8 ">
                                  <button
                                    type="submit"
                                    className="btn btn-primary btn-gradient btn-block"
                                    disabled={loading}
                                  >
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </Form>
                          </Formik>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="card">
                  <div className="card-body">
                    <table
                      id="datatable-1"
                      className="table table-datatable  table-striped table-hover"
                    >
                      <thead>
                        <tr>
                          <th>Delivery Type</th>
                          <th>Product Type</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {types && !loading ? (
                          types.map((type) => (
                            <tr key={type.id}>
                              <td>{type.delivery_type}</td>
                              <td>{type.product_type}</td>
                              <td>{type.price}</td>
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
                </div>
              </div>
            </div>
          </div>
        )}
        {rulesToggle && (
          <button className="btn btn-primary rules-btn " onClick={toggleRule}>
            Pricing
          </button>
        )}
        {!rulesToggle && (
          <button className="btn rules-btn button-accpet " onClick={toggleRule}>
            Rules
          </button>
        )}

        <div className="row mb-4">
          <div className="col-md-12">
            <footer>Powered by - DevJunction</footer>
          </div>
        </div>
        <ToastContainer />
      </main>
    </>
  );
}

export default Pricing;
