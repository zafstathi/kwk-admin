import React, { useState, useEffect } from "react";
import { vehicle as vehicles } from "../../../constants/vehicles";
import { States } from "../../../constants/States";
import { vehicleTypes } from "../../../constants/vehicleTypes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useReq from "../../../hooks/useReq";
//spinner
import Spinner from "../../../components/Spinner";
function DriverVehicleInfo() {
  const [vehicle, setVehicle] = useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    vehicle_type: Yup.string().required("Required"),
    license_state: Yup.string().required("Required"),
    license_number: Yup.string().required("Required"),
    license_expiry_date: Yup.string().required("Required"),
    insurance_number: Yup.string().required("Required"),
    insurance_expiry_date: Yup.string().required("Required"),
    vehicle_make: Yup.string().required("Required"),
    vehicle_color: Yup.string().required("Required"),
    vehicle_number: Yup.string().required("Required"),
  });

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
    setVehicle(res.data.vehicle);
  };
  const onSubmit = (data) => {
    const body = {
      vehicletype: data.vehicle_type,
      licenseState: data.license_state,
      licenseNumber: data.license_number,
      licenseExpiryDate: data.license_expiry_date,
      autoInsuranceNumber: data.insurance_number,
      autoInsuranceExpiryDate: data.insurance_expiry_date,
      vehicleMake: data.vehicle_make,
      vehicleColor: data.vehicle_color,
      vehicleNumber: data.vehicle_number,
    };
    const driverId = location.pathname.split("/")[3];
    sendRequest(`drivers/${driverId}`, "Patch", { vehicle: body }, onPostResponse);
  };

  const onPostResponse = (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    navigate(-1);
  };
  return (
    <main className="main-content p-5" role="main">
      <div className="row">
        <div className="col-md-12">
          <h1>Driver's Vehicle Info</h1>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              {vehicle ? (
                <Formik
                  initialValues={{
                    vehicle_type: vehicle.vehicletype,
                    license_state: vehicle.licenseState,
                    license_number: vehicle.licenseNumber,
                    license_expiry_date: vehicle.licenseExpiryDate,
                    insurance_number: vehicle.autoInsuranceNumber,
                    insurance_expiry_date: vehicle.autoInsuranceExpiryDate,
                    vehicle_make: vehicle.vehicleMake,
                    vehicle_color: vehicle.vehicleColor,
                    vehicle_number: vehicle.vehicleNumber,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  <Form>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label for="vehicle_type" className="active">
                          Vehicle Type
                        </label>
                        <Field
                          className="form-control"
                          id="vehicle_type"
                          name="vehicle_type"
                          as="select"
                        >
                          {vehicleTypes.map((type, index) => {
                            return (
                              <option
                                key={index}
                                value={type.name}
                                selected={vehicle.vehicletype === type.name}
                              >
                                {type.name}
                              </option>
                            );
                          })}
                        </Field>
                        <ErrorMessage name="vehicle_type" />
                      </div>
                      <div className="form-group col-md-6">
                        <label for="license_state" className="active">
                          License State
                        </label>
                        <Field
                          className="form-control"
                          id="license_state"
                          name="license_state"
                          as="select"
                        >
                          {States.map((state, index) => {
                            return (
                              <option
                                key={index}
                                value={state.label}
                                selected={vehicle.licenseState === state.label}
                              >
                                {state.label}
                              </option>
                            );
                          })}
                        </Field>
                        <ErrorMessage name="license_state" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 form-group">
                        <label for="license_number" className="form-group">
                          License Number
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          id="license_number"
                          name="license_number"
                        />
                        <ErrorMessage name="license_number" />
                      </div>
                      <div className="form-group col-md-6">
                        <label for="license_expiry_date" className="active">
                          License Expiry Date
                        </label>
                        <Field
                          type="date"
                          className="form-control"
                          id="license_expiry_date"
                          name="license_expiry_date"
                        />
                        <ErrorMessage name="license_expiry_date" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label for="insurance_number" className="active">
                          Auto Insurance Number
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          id="insurance_number"
                          name="insurance_number"
                        />
                        <ErrorMessage name="insurance_number" />
                      </div>
                      <div className="form-group col-md-6">
                        <label for="insurance_expiry_date" className="active">
                          Auto Insurance Expiry Date
                        </label>
                        <Field
                          type="date"
                          className="form-control"
                          id="insurance_expiry_date"
                          name="insurance_expiry_date"
                        />
                        <ErrorMessage name="insurance_expiry_date" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label for="vehicle_make" className="active">
                          Vehicle Make
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          id="vehicle_make"
                          name="vehicle_make"
                        />
                        <ErrorMessage name="vehicle_make" />
                      </div>
                      <div className="form-group col-md-6">
                        <label for="vehicle_color" className="active">
                          Vehicle Color
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          id="vehicle_color"
                          name="vehicle_color"
                        />
                        <ErrorMessage name="vehicle_color" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label for="vehicle_number" className="active">
                          Vehicle Number
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          id="vehicle_number"
                          name="vehicle_number"
                        />
                        <ErrorMessage name="vehicle_number" />
                      </div>
                    </div>
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

export default DriverVehicleInfo;
