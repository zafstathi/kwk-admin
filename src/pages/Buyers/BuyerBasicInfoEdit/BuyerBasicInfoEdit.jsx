import React, { useEffect, useState } from "react";
//hook
import useReq from "../../../hooks/useReq";
//spinner
import Spinner from "../../../components/Spinner";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
function BuyerBasicInfoEdit() {
  const navigate = useNavigate();
  const [buyer, setBuyer] = useState(null);
  const location = useLocation();
  const { sendRequest } = useReq();
  useEffect(() => {
    const buyerId = location.pathname.split("/")[3];
    sendRequest(`buyers/${buyerId}`, "GET", null, onResponse);
  }, [location]);

  const onResponse = (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    setBuyer(res.data);
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().min(8, "Must be 8 characters or more"),
    phone: Yup.string()
      .min(10, "Must be 10 characters or more")
      .required("Required"),
    address: Yup.string().required("Required"),
  });

  const onSubmit = (data) => {
    const buyerId = location.pathname.split("/")[3];
    sendRequest(`buyers/${buyerId}`, "PATCH", data, onPostResponse);
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
          <h1>Edit Buyer's Info</h1>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              {buyer ? (
                <Formik
                  initialValues={{
                    email: buyer.email,
                    password: "",
                    phone: buyer.phone,
                    address: buyer.address,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  <Form>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label for="email" className="active">
                          Email Address
                        </label>
                        <Field
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                        />
                        <ErrorMessage name="email" />
                      </div>
                      <div className="form-group col-md-6">
                        <label for="password" className="active">
                          Password
                        </label>
                        <Field
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                        />
                        <ErrorMessage name="password" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label for="phone" className="active">
                          Phone Number
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          id="phone"
                          name="phone"
                        />
                        <ErrorMessage name="phone" />
                      </div>
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

export default BuyerBasicInfoEdit;
