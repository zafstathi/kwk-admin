import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useNavigate } from "react-router-dom";
//hook
import useReq from "../../../hooks/useReq";
//spinner
import Spinner from "../../../components/Spinner";
function EditContact() {
  const navigate = useNavigate();
  const [contactInfo, setContactInfo] = useState([
    {
      "email": "johndoe@example.com",
      "phone": "+1-202-555-0192"
    }
  ]);
  const { sendRequest } = useReq();

  useEffect(() => {
    //sendRequest("settings", "GET", null, onResponse);
  }, []);

  const onResponse = (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    setContactInfo(res.data.contactInfo);
  };
  const onSubmit = (data) => {
    const body={
      contactInfo:data
    }
    sendRequest("settings", "PATCH", body, onPostResponse);
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
          <h1>Contact Info</h1>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              {/* <form
                action="#"
                method="POST"
                id="update-form"
                enctype="multipart/form-data"
              >
                <div className="row">
                  <div className="col-md-6 form-group">
                    <label for="account_type" className="form-group">
                      Email
                    </label>
                    <input
                      id="Email"
                      name="Email"
                      className="form-control"
                      type="email"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label for="phone_number" className="active">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="phone_number"
                      name="phone_number"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                    <a className="btn btn-outline-light" href="setting.html">
                      Cancel
                    </a>
                  </div>
                </div>
              </form> */}
              {contactInfo ? (
                <Formik
                  initialValues={{
                    email: contactInfo.email,
                    phone: contactInfo.phone,
                  }}
                  validationSchema={Yup.object({
                    email: Yup.string().required("Required"),
                    phone: Yup.string().required("Required"),
                  })}
                  onSubmit={onSubmit}
                >
                  <Form>
                    <div className="row">
                      <div className="col-md-6 form-group">
                        <label for="account_type" className="form-group">
                          Email
                        </label>
                        <Field
                          id="email"
                          name="email"
                          className="form-control"
                          type="email"
                        />
                        <ErrorMessage name="email" />
                      </div>
                      <div className="form-group col-md-6">
                        <label for="phone_number" className="active">
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

export default EditContact;
