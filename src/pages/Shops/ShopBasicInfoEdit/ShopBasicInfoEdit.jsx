import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useLocation, useNavigate } from "react-router-dom";
import useReq from "../../../hooks/useReq";
//spinner
import Spinner from "../../../components/Spinner";
function ShopBasicInfoEdit() {
  const navigate = useNavigate();
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

  const validationSchema = Yup.object().shape({
    shop_name: Yup.string().required("Shop name is required"),
    phone_number: Yup.string()
      .min(10, "Phone number must be at least 10 characters")
      .required("Phone number is required"),
    address: Yup.string().required("Address is required"),
  });

  const handleSubmit = (data) => {
    const body={
      shopName: data.shop_name,
      phone: data.phone_number,
      address: data.address,
    }
    const shopId = location.pathname.split("/")[3];
    sendRequest(`shops/${shopId}`, "PATCH", body, onPostResponse);
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
          <h1>Shop's Basic Info</h1>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              {shop?.id && (
                <Formik
                  initialValues={{
                    shop_name: shop.shopName,
                    phone_number: shop.phone,
                    address: shop.address,
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

export default ShopBasicInfoEdit;
