import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useReq from "../../hooks/useReq";
import Spinner from "../../components/Spinner";
import { APPMISC } from "./configs";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
function ProductCompaniesHome({ type }) {
  const miscType = APPMISC.filter((item) => item.title === type)[0].path;
  const [appInfo, setAppInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const { sendRequest } = useReq();

  useEffect(() => {
    const path = APPMISC.filter((item) => item.title === type)[0].path;
    sendRequest(`admin/app-misc/${path}`, "GET", null, onResponse);
  }, [type]);

  const onResponse = (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    setAppInfo(res.data.data);
  };

  const validationSchema = () =>
    Yup.object().shape({
      type: Yup.string().required("type is required!"),
      title: Yup.string().required("Value  is required!"),
    });

  const handleSubmit = (formValue) => {
    console.log(formValue, "formValue");
    setLoading(true);
    sendRequest(
      "admin/app-misc",
      "PUT",
      { type: formValue.type, title: formValue.title },
      onUpdate
    );
  };
  const onUpdate = (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    setLoading(false);
    toast(res.data.message);
    setAppInfo(res.data.data);
  };

  const deleteItem = (id) => {
    setLoading(true);
    sendRequest(`admin/app-misc/${id}`, "DELETE", {}, onDelete);
  };
  const onDelete = (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    setLoading(false);
    toast(res.data.message);
    setAppInfo(res.data.data);
  };

  return (
    <div className="main-content p-5" role="main">
      <h2>{type}</h2>
      <div className="row mb-5">
        <div className="col-md-5">
          <div className="card mb-5">
            <div className="card-body">
              <div className="mailbox-mail-list table-responsive">
                <div className="card mb-12" id="basic_info_edit">
                  <div className="card-body">
                    <Formik
                      initialValues={{ type: miscType, title: "" }}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      <Form className="form-input">
                        <div className="row">
                          <div className="col-md-8">
                            <Field
                              name="type"
                              value={miscType}
                              type="text"
                              hidden
                            />
                            <ErrorMessage
                              className="error"
                              name="type"
                              component="div"
                            />
                          </div>
                          <div className="col-md-8">
                            <label htmlFor="driver_share">Name:</label>
                            <Field
                              name="title"
                              className="form-control"
                              type="text"
                            />
                            <ErrorMessage
                              className="error"
                              name="title"
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
                              Update
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
                    <th>Title</th>
                    {/* <th>Type</th> */}
                    <th>Created At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appInfo && !loading ? (
                    appInfo.map((info) => (
                      <tr key={info.id}>
                        <td>{info?.title}</td>
                        {/* <td>{(info?.type).replaceAll("_", " ")}</td> */}
                        {/* formate date */}
                        <td> {formateDate(info?.created_at)}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteItem(info?._id)}
                          >
                            Delete
                          </button>
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

export default ProductCompaniesHome;

const formateDate = (date) => {
  const d = new Date(date);
  return `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
};
