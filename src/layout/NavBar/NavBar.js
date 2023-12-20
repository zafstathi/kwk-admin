import React, { useState, useEffect } from "react";
import "./NavBar.scss";
import { authActions } from "../../slices/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
const NavigationBar = () => {
  const [user,setUser]=useState()
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const logout = () => {
    dispatch(authActions.logout());
    // navigation("/login");
  };
  useEffect(()=>{
    getUserInfo()
  },[])
  const getUserInfo=()=>{
    // access_token
    const user=localStorage.getItem('user');
    const userObject=JSON.parse(user)
    var decoded = jwt_decode(userObject.access_token);
    console.log(decoded)
    setUser(decoded)
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <a
        className="navbar-brand d-block d-sm-block d-md-block d-lg-none"
        href="#!"
      >
       <img
                  src="assets/img/kwk_logo.png"
                  width="200"
                  height="145"
                  alt="QuillPro"
                />
      </a>
      <button
        className="hamburger hamburger--slider"
        type="button"
        data-target=".sidebar"
        aria-controls="sidebar"
        aria-expanded="false"
        aria-label="Toggle Sidebar"
      >
        <span className="hamburger-box">
          <span className="hamburger-inner" />
        </span>
      </button>
      {/* <!-- Added Mobile-Only Menu --> */}
      <ul className="navbar-nav ml-auto mobile-only-control d-block d-sm-block d-md-block d-lg-none">
        <li className="nav-item dropdown">
          <a
            href="#!"
            className="nav-link dropdown-toggle"
            id="navbar-notification-search-mobile"
            data-toggle="dropdown"
            data-flip="false"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="batch-icon batch-icon-search" />
          </a>
          <ul
            className="dropdown-menu dropdown-menu-fullscreen"
            aria-labelledby="navbar-notification-search-mobile"
          >
            <li>
              <form className="form-inline my-2 my-lg-0 no-waves-effect">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search for..."
                    aria-label="Search for..."
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-primary btn-gradient waves-effect waves-light"
                      type="button"
                    >
                      <i className="batch-icon batch-icon-search" />
                    </button>
                  </div>
                </div>
              </form>
            </li>
            {/* <li>
                <a className="dropdown-item" onClick={logout}>
                  Logout
                </a>
              </li> */}
          </ul>
        </li>
        
      </ul>
      <ul className="navbar-nav ml-auto mobile-only-control d-block d-sm-block d-md-block d-lg-none">
          <li className="nav-item dropdown">
            <a
              href="#!"
              className="nav-link dropdown-toggle"
              id="navbar-dropdown-navbar-profile"
              data-toggle="dropdown"
              data-flip="false"
              aria-haspopup="true"
              aria-expanded="false"
            >
              
              <div className="profile-picture bg-gradient bg-primary has-message float-right">
                <img
                  src="assets/img/profile-pic.jpg"
                  width="44"
                  height="44"
                  alt="Profile"
                />
              </div>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="navbar-dropdown-navbar-profile"
            >
              
              <li>
                <a className="dropdown-item" onClick={logout}>
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      {/* <!-- .collapse added to the element --> */}
      <div className="collapse navbar-collapse" id="navbar-header-content">
        <ul className="navbar-nav navbar-language-translation mr-auto">
          {/* <li className="nav-item dropdown">
              <a
                href="#!"
                className="nav-link dropdown-toggle"
                id="navbar-dropdown-menu-link"
                data-toggle="dropdown"
                data-flip="false"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="batch-icon batch-icon-book-alt-" />
                English
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbar-dropdown-menu-link"
              >
                <li>
                  <a className="dropdown-item" href="#!">
                    Français
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#!">
                    Deutsche
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#!">
                    Español
                  </a>
                </li>
              </ul>
            </li> */}
        </ul>
        <ul className="navbar-nav ml-5 navbar-profile">
          <li className="nav-item dropdown">
            <a
              href="#!"
              className="nav-link dropdown-toggle"
              id="navbar-dropdown-navbar-profile"
              data-toggle="dropdown"
              data-flip="false"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div className="profile-name">{user&& user.first_name +" " +user.last_name}</div>
              <div className="profile-picture bg-gradient bg-primary has-message float-right">
                <img
                  src="assets/img/profile-pic.jpg"
                  width="44"
                  height="44"
                  alt="Profile"
                />
              </div>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="navbar-dropdown-navbar-profile"
            >
              {/* <li>
                <a
                  className="dropdown-item"
                  href="profiles-member-profile.html"
                >
                  Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="mail-inbox.html">
                  Messages
                  <span className="badge badge-danger badge-pill float-right">
                    3
                  </span>
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="profiles-member-profile.html"
                >
                  Settings
                </a>
              </li> */}
              <li>
                <a className="dropdown-item" onClick={logout}>
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
