import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { getUser } from "../services/auth";
import "../stylesheets/navbar.css";

class Navbar extends Component {
  state = {};
  render() {
    const user = getUser();
    return (
      <React.Fragment>
        <nav id="navbar" className="navbar navbar-light bg-light">
          <NavLink className="navbar-brand" to="/">
            <img src="30.jpg" id="logo" alt="logo" />
            -Day Challenges
          </NavLink>
          <div className="navbar-nav navbar-expand-sm">
            {!user && (
              <React.Fragment>
                <NavLink className="nav-item nav-link " to="/register">
                  <i className="fa fa-user-plus m-2" />
                  Register
                </NavLink>
                <NavLink className="nav-item nav-link" to="/login">
                  <i className="fa fa-user-circle-o m-2" />
                  Sign in
                </NavLink>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <NavLink className="nav-item nav-link " to="/me">
                  {user.firstName}'s challenges
                  <i className="fa fa-line-chart m-2" />
                </NavLink>
                {user.isAdmin && (
                  <NavLink className="nav-item nav-link " to="/categories">
                    Categories
                  </NavLink>
                )}
                <NavLink className="nav-item nav-link " to="/logout">
                  Sign out
                  <i className="fa fa-sign-out m-2" />
                </NavLink>
              </React.Fragment>
            )}
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default Navbar;
