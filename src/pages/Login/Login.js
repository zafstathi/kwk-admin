import React, { Component, useState } from "react";
import "./Login.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../slices/auth";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigate();

  const validationSchema = () =>
    Yup.object().shape({
      username: Yup.string().required("Username  is required!"),
      password: Yup.string().required("Password  is required!"),
    });
  const dispatch = useDispatch();
  const handleLogin = (formValue) => {
    const { username, password } = formValue;
    authService.login(username, password).then((response) => {
      if (response.statusCode === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch(authActions.login());
        navigation("/");
      } else {
        toast("Unable to login with the provided details");
      }
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="right-column sisu LH">
          <div className="row mx-0">
            <div className="col-md-7 order-md-2 signin-right-column px-5 bg-dark">
              <div className="signin-logo d-sm-block d-md-none">
                <img
                  src="assets/img/kwk_logo.png"
                  width="200"
                  height="145"
                  alt="QuillPro"
                />
              </div>
              <h1 className="display-4">Sign In To get Started</h1>
              <p className="lead mb-5 slug">
                Big data latte SpaceTeam unicorn cortado hacker physical
                computing paradigm.
              </p>
            </div>
            <div className="col-md-5 order-md-1 signin-left-column bg-white px-5">
              <div className="signin-logo d-sm-none d-md-block">
                <img
                  src="assets/img/kwk_logo.png"
                  width="200"
                  height="145"
                  alt="QuillPro"
                />
              </div>
              <Formik
                initialValues={{ username: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
              >
                <Form className="form-input">
                  <div className="form-control-parent">
                    <label htmlFor="username">Username</label>
                    <Field
                      name="username"
                      className="form-control"
                      type="text"
                    />
                    <ErrorMessage
                      className="error"
                      name="username"
                      component="div"
                    />
                  </div>

                  <div className="form-control-parent">
                    <label htmlFor="password">Password</label>
                    <Field
                      className="form-control"
                      name="password"
                      type="password"
                    />
                    <ErrorMessage
                      className="error"
                      name="password"
                      component="div"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-gradient btn-block"
                      disabled={loading}
                    >
                      <i className="batch-icon batch-icon-key" /> Login
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
