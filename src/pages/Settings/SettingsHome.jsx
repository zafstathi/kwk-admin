import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useReq from "../../hooks/useReq";
import Spinner from "../../components/Spinner";

import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import {
  SHARE_DISTRIBUTION_CONFIG,
  PAYMENTS_CONFIG,
  DELIVERY_CONFIG,
} from "./configs";
const VIEW_TYPE = {
  SHARE_DISTRIBUTION: "share distribution",
  PAYMENTS: "payments",
  DELIVERY: "delivery",
};
function SettingsHome() {
  const [type, setType] = useState(VIEW_TYPE.SHARE_DISTRIBUTION);
  const [appInfo, setAppInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const { sendRequest } = useReq();

  useEffect(() => {
    sendRequest("admin/dashboard/configs", "GET", null, onResponse);
  }, []);

  const onResponse = (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    setAppInfo(res.data.data);
  };

  const validationSchema = () =>
    Yup.object().shape({
      key: Yup.string().required("key is required!"),
      value: Yup.string().required("Value  is required!"),
    });

  const handleSubmit = (formValue) => {
    console.log(formValue, "formValue");
    setLoading(true);
    sendRequest("admin/dashboard/configs", "PUT", formValue, onUpdate);
  };
  const onUpdate = (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    setLoading(false);
    toast(res.data.message);
    if (res.data.data) setAppInfo(res.data.data);
  };

  return (
    <div className="main-content p-5" role="main">
      <h2>App Settings</h2>
      <div className="row mb-5">
        <div className="col-md-5">
          <div className="card mb-5 p-3">
            <div className="card-body ">
              <ViewTypeButton type={type} setType={setType} />
              <hr />
              {type === VIEW_TYPE.SHARE_DISTRIBUTION &&
                SHARE_DISTRIBUTION_CONFIG.map((config) => (
                  <FormView
                    handleSubmit={handleSubmit}
                    loading={loading}
                    validationSchema={validationSchema}
                    label={config.label}
                    keyValue={config.key}
                    unit={config.unit}
                    description={config.description}
                  />
                ))}
              {type === VIEW_TYPE.PAYMENTS &&
                PAYMENTS_CONFIG.map((config) => (
                  <FormView
                    handleSubmit={handleSubmit}
                    loading={loading}
                    validationSchema={validationSchema}
                    label={config.label}
                    keyValue={config.key}
                    unit={config.unit}
                    description={config.description}
                  />
                ))}
              {type === VIEW_TYPE.DELIVERY &&
                DELIVERY_CONFIG.map((config) => (
                  <FormView
                    handleSubmit={handleSubmit}
                    loading={loading}
                    validationSchema={validationSchema}
                    label={config.label}
                    keyValue={config.key}
                    unit={config.unit}
                    description={config.description}
                  />
                ))}
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
                    <th>Key</th>
                    <th>Value</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {appInfo && !loading ? (
                    appInfo.map((info) => (
                      <tr key={info.id}>
                        <td>{info.key}</td>
                        <td>{info.value}</td>
                        <td>{info.description}</td>
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
      <ToastContainer />
      <div className="row mb-4">
        <div className="col-md-12">
          <footer>Powered by - DevJunction</footer>
        </div>
      </div>
    </div>
  );
}

export default SettingsHome;

const ViewTypeButton = ({ type, setType }) => {
  return Object.values(VIEW_TYPE).map((value) => (
    <button
      className={`btn btn-gradient ${
        type === value ? "btn-primary" : "btn-light"
      } mr-2`}
      onClick={() => setType(value)}
    >
      {value}
    </button>
  ));
};

const FormView = (props) => {
  const {
    handleSubmit,
    loading,
    validationSchema,
    label,
    keyValue,
    unit,
    description,
  } = props;
  console.log(props, "props");
  return (
    <Formik
      initialValues={{ key: keyValue, value: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      <Form className="form-input w-100 d-flex flex-column align-items-center justify-content-center">
        <div className="w-100">
          <h5 className="ml-4">
            {label} ( {unit} )
          </h5>
          <Field name="key" value={keyValue} type="text" hidden />
          <ErrorMessage className="error" name="key" component="div" />
        </div>
        <p className="text-center">{description}</p>
        <div className="row w-100 d-flex align-items-center justify-content-center">
          <div className="w-50 mt-0">
            {/* <label htmlFor="driver_share">Value</label> */}
            <Field name="value" className="form-control m-0" type="number" />
            <ErrorMessage className="error" name="value" component="div" />
          </div>
          <div className="ml-4">
            <button
              type="submit"
              className="btn btn-primary btn-gradient btn-block mt-0"
              disabled={loading}
            >
              Update
            </button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};
