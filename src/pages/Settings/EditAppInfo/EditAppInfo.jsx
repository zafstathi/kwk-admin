import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useNavigate } from "react-router-dom";
//hook
import useReq from "../../../hooks/useReq";
//spinner
import Spinner from "../../../components/Spinner";
function EditAppInfo() {
  const [appInfo, setAppInfo] = useState(null);

  const navigate = useNavigate();
  const { sendRequest } = useReq();

  useEffect(() => {
    sendRequest("settings", "GET", null, onResponse);
  }, []);

  const onResponse = (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    setAppInfo(res.data.appInfo);
  };
  
  const onSubmit = (data) => {
    const body={
      appInfo:data
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
              {appInfo ? (
                <Formik
                  initialValues={{
                    title: appInfo.title,
                    slug: appInfo.slug,
                  }}
                  validationSchema={Yup.object({
                    title: Yup.string().required("Required"),
                    slug: Yup.string().required("Required"),
                  })}
                  onSubmit={onSubmit}
                >
                  <Form>
                    <div className="row">
                      <div className="col-md-6 form-group">
                        <label for="account_type" className="form-group">
                          App Title
                        </label>
                        <Field
                          id="title"
                          name="title"
                          className="form-control"
                          type="text"
                        />
                        <ErrorMessage name="title" />
                      </div>
                      <div className="form-group col-md-6">
                        <label for="phone_number" className="active">
                          Slug
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          id="slug"
                          name="slug"
                        />
                        <ErrorMessage name="slug" />
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

export default EditAppInfo;
