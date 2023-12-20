import React, { useState, useEffect } from "react";
import useReq from "../../hooks/useReq";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik";
import "./Pricing.css";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";

function Rules() {
  const [rules, setRules] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ruleObject, setRuleObject] = useState(null);
  const { sendRequest } = useReq();
  useEffect(() => {
    sendRequest("admin/product/rules", "GET", null, onResponse);
  }, []);

  const validationSchema = () =>
    Yup.object().shape({
      impact_on: Yup.string().required("Impact  is required!"),
      impact: Yup.string().required("Impact  is required!"),
      value: Yup.string().required("Value  is required!"),
      rule: Yup.object().shape({
        key: Yup.string().required("Rule key is required!"),
        operator: Yup.string().required("Rule operator  is required!"),
        value: Yup.string().required("Rule value  is required!"),
      }),
    });

  const onResponse = (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    setRules(res.data.data);
  };

  const handleRuleSubmit = (formValue) => {
    console.log(formValue);
    setLoading(true);
    sendRequest("admin/product/rules", "POST", formValue, onUpdate);
  };

  const onUpdate = (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    setLoading(false);
    toast(res.data.message);
    setRules(res.data.data);
  };
  const onFromUpdate = (obj) => {
    console.log(obj);
  };

  const deleteRule = (id) => {
    sendRequest(`admin/product/rules/${id}`, "DELETE", {}, onDelete);
  };

  const onDelete = (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    toast(res.data.message);
    setRules(res.data.data);
  };

  return (
    <>
      <h2>Pricing Rules</h2>
      <div className="row mb-5">
        <div className="col-md-5">
          <div className="card mb-5">
            <div className="card-body">
              <div className="mailbox-mail-list table-responsive">
                <div className="card mb-12" id="basic_info_edit">
                  <div className="card-body">
                    <Formik
                      initialValues={{
                        impact_on: "",
                        impact: "",
                        value: "",
                        rule: { key: "", operator: "", value: "" },
                      }}
                      // initialValues={{ impact_on: "", impact: "", value: '' }}
                      validationSchema={validationSchema}
                      onSubmit={handleRuleSubmit}
                    >
                      <Form onChange={onFromUpdate} className="form-input">
                        <FormObserver />
                        <div className="row">
                          <div className="col-md-6">
                            <label htmlFor="impact_on">Impact on</label>
                            <Field
                              as="select"
                              name="impact_on"
                              className="form-control"
                            >
                              <option value="" label="Select Impact On" />
                              <option value="Delivery" label="Delivery Fee" />
                              <option value="Amount" label="Order Amount" />
                            </Field>
                            <ErrorMessage
                              className="error"
                              name="impact_on"
                              component="div"
                            />
                          </div>

                          <div className="col-md-6">
                            <label htmlFor="impact">Impact</label>

                            <Field
                              as="select"
                              name="impact"
                              className="form-control"
                            >
                              <option value="" label="Select Impact" />
                              <option value="Absolute" label="Absolute" />
                              <option value="Percentage" label="Percentage" />
                            </Field>
                            <ErrorMessage
                              className="error"
                              name="impact"
                              component="div"
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="value">value</label>
                            <Field
                              name="value"
                              className="form-control  mb-0"
                              type="number"
                            />
                            <span className="form-text">
                              use (-)ve for discounts
                            </span>
                            <ErrorMessage
                              className="error"
                              name="value"
                              component="div"
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="ruleKey">Rule key</label>
                            <Field
                              as="select"
                              name="rule.key"
                              className="form-control"
                            >
                              <option value="" label="Select Product Type" />
                              <option value="Distance" label="Distance" />
                              <option value="Amount" label="Amount" />
                              <option value="Quantity" label="Quantity" />
                            </Field>
                            <ErrorMessage
                              className="error"
                              name="rule.key"
                              component="div"
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="ruleOperator">Rule operator</label>
                            <Field
                              as="select"
                              name="rule.operator"
                              className="form-control"
                            >
                              <option value="" label="Select Rule Operator" />
                              <option value=">" label="Greater than" />
                              <option value="<" label="Less than" />
                            </Field>
                            <ErrorMessage
                              className="error"
                              name="rule.operator"
                              component="div"
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="ruleValue">Rule value</label>
                            <Field
                              name="rule.value"
                              className="form-control"
                              type="number"
                            />
                            <ErrorMessage
                              className="error"
                              name="rule.value"
                              component="div"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 ">
                            <button
                              type="submit"
                              className="btn btn-primary btn-gradient btn-block"
                              disabled={loading}
                            >
                              Submit
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
                    <th>Impact on</th>
                    <th>Impact</th>
                    <th>Value</th>
                    <th>Rule key</th>
                    <th>Rule operator</th>
                    <th>Rule value</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rules && !loading ? (
                    rules.map((rule) => (
                      <tr key={rule._id}>
                        <td>{rule.impact_on}</td>
                        <td>{rule.impact}</td>
                        <td>{rule.value}</td>
                        <td>{rule.rule[0].key}</td>
                        <td>{rule.rule[0].operator}</td>
                        <td>{rule.rule[0].value}</td>
                        <button
                          onClick={() => {
                            deleteRule(rule._id);
                          }}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
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
    </>
  );
}

export default Rules;

const FormObserver = () => {
  const { values } = useFormikContext();

  useEffect(() => {
    console.log("FormObserver::values", values);
  }, [values]);

  const signTrsnform = (value) => {
    if (!value) return "<selected value>";
    if (value === ">") {
      return "greater than";
    } else if (value === "<") {
      return "less than";
    }
  };
  const action = (value) => {
    if (values.value === 0) {
      return "<selected value>";
    }
    if (values.value < 0) {
      return "subtract " + Math.abs(value);
    } else {
      return "add " + value;
    }
  };

  const impactValue = (value) => {
    if (value === "Absolute") {
      return " USD ";
    } else if (value === "Percentage") {
      return " Percent ";
    }
  };

  const actionType = (value) => {
    if (values.value < 0) {
      return " from ";
    } else {
      return " to ";
    }
  };
  return (
    <div>
      <p>
        If {values.rule.key || "<selected Rule key>"} is{" "}
        {signTrsnform(values.rule.operator)}{" "}
        {values.rule.value || "<selected value>"}
        <strong> then, </strong>
        {action(values.value) || "<selected value>"}
        {impactValue(values.impact) || "<selected impact>"}
        {actionType(values.value) || "<selected value>"}
        {values.impact_on || "<selected impact_on>"}
      </p>
    </div>
  );
};
