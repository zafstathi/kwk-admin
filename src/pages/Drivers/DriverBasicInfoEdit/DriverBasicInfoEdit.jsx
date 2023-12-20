import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
//hook
import useReq from "../../../hooks/useReq";
//spinner
import Spinner from "../../../components/Spinner";
function DriverBasicInfo() {
  const navigate = useNavigate();
  const [driver, setDriver] = useState(null);

  const location = useLocation();
  const { sendRequest } = useReq();
  useEffect(() => {
    const driverId = location.pathname.split("/")[3];
    sendRequest(`drivers/${driverId}`, "GET", null, onResponse);
  }, [location]);

  const onResponse = (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    setDriver(res.data);
  };

  const validationSchema = Yup.object({
    first_name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    middle_name: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    last_name: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().min(8, "Must be 8 characters or more"),
    role: Yup.string().required("Required"),
    phone_number: Yup.string()
      .min(10, "Must be 10 characters or more")
      .required("Required"),
    social_security_number: Yup.string()
      .min(9, "Must be 9 characters or more")
      .required("Required"),
    dob: Yup.date().required("Required"),
  });

  const onSubmit = (data) => {
    const body={
      firstName: data.first_name,
      middleName: data.middle_name,
      lastName: data.last_name,
      email: data.email,
      password: data.password,
      role: data.role,
      phone: data.phone_number,
      socialSecurityNumber: data.social_security_number,
      dob: data.dob,
    }
    const driverId = location.pathname.split("/")[3];
    sendRequest(`drivers/${driverId}`, "PATCH", body, onPostResponse);
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
          <h1>Edit Drivers Info</h1>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              {driver?.id && (
                <Formik
                  initialValues={{
                    first_name: driver.firstName,
                    middle_name: driver.middleName,
                    last_name: driver.lastName,
                    email: driver.email,
                    password: "",
                    role: driver.role,
                    phone_number: driver.phone,
                    social_security_number: driver.socialSecurityNumber,
                    dob: new Date(driver.dob),
                  }}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  <Form>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label for="first_name" className="active">
                          First Name
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          id="first_name"
                          name="first_name"
                        />
                        <ErrorMessage name="first_name" />
                      </div>
                      <div className="form-group col-md-6">
                        <label for="middle_name" className="active">
                          Middle Name
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          id="middle_name"
                          name="middle_name"
                        />
                        <ErrorMessage name="middle_name" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label for="last_name" className="active">
                          Last Name
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          id="last_name"
                          name="last_name"
                        />

                        <ErrorMessage name="last_name" />
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
                        />
                        <ErrorMessage name="email" />
                      </div>
                    </div>
                    <div className="row">
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
                      <div className="form-group col-md-6">
                        <label for="role" className="active">
                          Role
                        </label>
                        <Field
                          as="select"
                          className="form-control"
                          id="role"
                          name="role"
                        >
                          <option
                            value="delivery_driver"
                            selected={driver.role === "delivery_driver"}
                          >
                            Delivery Driver
                          </option>
                          <option
                            value="taxi_captain"
                            selected={driver.role === "taxi_captain"}
                          >
                            Taxi Captain
                          </option>
                          <option
                            value="both"
                            selected={driver.role === "both"}
                          >
                            Both
                          </option>
                        </Field>
                        <ErrorMessage name="role" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label for="phone_number" className="active">
                          Phone Number
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          id="phone_number"
                          name="phone_number"
                        />
                        <ErrorMessage name="phone_number" />
                      </div>
                      <div className="form-group col-md-6">
                        <label for="social_security_number" className="active">
                          Social Security Number
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          id="social_security_number"
                          name="social_security_number"
                        />
                        <ErrorMessage name="social_security_number" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label for="dob" className="active">
                          Date of Birth
                        </label>
                        <Field
                          type="date"
                          className="form-control"
                          id="dob"
                          name="dob"
                        />
                        <ErrorMessage name="dob" />
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
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DriverBasicInfo;
