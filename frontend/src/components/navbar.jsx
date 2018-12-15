import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { getUser } from "../services/auth";

class Navbar extends Component {
  state = {};
  render() {
    const user = getUser();
    return (
      <nav className="navbar navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          ChallengeApp
        </NavLink>
        <div className="navbar-nav navbar-expand-sm">
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link m-2" to="/register">
                <i className="fa fa-user-plus m-2" />
                Register
              </NavLink>
              <NavLink className="nav-item nav-link m-2" to="/login">
                <i className="fa fa-user-circle-o m-2" />
                Sign in
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link m-2" to="/me">
                {user.firstName}'s profile
              </NavLink>
              {user.isAdmin && (
                <NavLink className="nav-item nav-link m-2" to="/categories">
                  Categories
                </NavLink>
              )}
              <NavLink className="nav-item nav-link m-2" to="/logout">
                Sign out
                <i className="fa fa-sign-out m-2" />
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </nav>
    );
  }
}

export default Navbar;
