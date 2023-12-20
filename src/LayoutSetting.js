import React from "react";
import SideBar from "./layout/SideBar/SideBar";
import NavigationBar from "./layout/NavBar/NavBar";
import { Route, Routes,Outlet} from "react-router-dom";

function User() {
  return (
    <div className="container-fluid">
      <div className="row">
        <SideBar />
        <div className="right-column">
          <NavigationBar />
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
