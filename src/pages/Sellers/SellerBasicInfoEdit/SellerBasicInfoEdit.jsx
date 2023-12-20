import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useLocation, useNavigate } from "react-router-dom";
import useReq from "../../../hooks/useReq";
//spinner
import Spinner from "../../../components/Spinner";
function SellerBasicInfoEdit() {
  const navigate = useNavigate();
  const [seller, setSeller] = useState(null);

  const location = useLocation();
  const { sendRequest } = useReq();
  useEffect(() => {
    const sellerId = location.pathname.split("/")[3];
    sendRequest(`sellers/${sellerId}`, "GET", null, onResponse);
  }, [location]);

  const onResponse = (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    setSeller(res.data);
  };

  const validationSchema = Yup.object().shape({
    shop_name: Yup.string().required("Shop name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters"),
    phone_number: Yup.string()
      .min(10, "Phone number must be at least 10 characters")
      .required("Phone number is required"),
    address: Yup.string().required("Address is required"),
  });

  const handleSubmit = (data) => {
    const body={
      shopName: data.shop_name,
      email: data.email,
      password: data.password,
      phone: data.phone_number,
      address: data.address,
    }
    const sellerId = location.pathname.split("/")[3];
    sendRequest(`sellers/${sellerId}`, "PATCH", body, onPostResponse);
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
          <h1>Seller's Basic Info</h1>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              {seller?.id && (
                <Formik
                  initialValues={{
                    shop_name: seller.shopName,
                    email: seller.email,
                    password: "",
                    phone_number: seller.phone,
                    address: seller.address,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ values}) => (
                    <Form>
                      <div className="row">
                        <div className="form-group col-md-6">
                          <label for="shop_name" className="active">
                            Shop Name
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            id="shop_name"
                            name="shop_name"
                            value={values.shop_name}
                          />
                          <ErrorMessage name="shop_name" />
                        </div>
                        <div className="form-group col-md-6">
                          <label for="email" className="active">
                            Email
                          </label>
                          <Field
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={values.email}
                          />
                          <ErrorMessage name="email" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 form-group">
                          <label for="password" className="form-group">
                            Password
                          </label>
                          <Field
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={values.password}
                          />
                          <ErrorMessage name="password" />
                        </div>
                        <div className="form-group col-md-6">
                          <label for="phone_number" className="active">
                            Phone Number
                          </label>
                          <Field
                            type="phone"
                            className="form-control"
                            id="phone_number"
                            name="phone_number"
                            value={values.phone_number}
                          />
                          <ErrorMessage name="phone_number" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-md-6">
                          <label for="address" className="active">
                            Address or Zip Code
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            value={values.address}
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
                  )}
                </Formik>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SellerBasicInfoEdit;
