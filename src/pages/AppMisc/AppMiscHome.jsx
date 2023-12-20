import React, { useState } from "react";
import { APPMISC_TYPE } from "./configs";
import { toast, ToastContainer } from "react-toastify";
import AppMiscGeneric from "./AppMiscGeneric";
function ProductCompaniesHome() {
  const [type, setType] = useState("Propane Tank Companies");
  return (
    <div className="main-content p-5" role="main">
      <div className="row mb-5">
        <div className="col-md-12">
          <div className="ml-5 p-3">
            <ViewTypeButton type={type} setType={setType} />
          </div>
          {type === APPMISC_TYPE.PROPANE_TANK_COMPANIES && (
            <AppMiscGeneric type={APPMISC_TYPE.PROPANE_TANK_COMPANIES} />
          )}
          {type === APPMISC_TYPE.VECHICLE_TYPE && (
            <AppMiscGeneric type={APPMISC_TYPE.VECHICLE_TYPE} />
          )}
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

const ViewTypeButton = ({ type, setType }) => {
  return Object.values(APPMISC_TYPE).map((value) => (
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
