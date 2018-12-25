import React from "react";
import Form from "./commons/form";
import { login } from "../services/sign";
import Joi from "joi-browser";

class LoginForm extends Form {
  state = {
    data: {
      input: {
        email: "",
        password: ""
      }
    },
    error: ""
  };
  schema = {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  };
  doSubmit = async () => {
    try {
      await login(this.state.data.input);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (err) {
      const error = { ...this.state.error };
      if (err.response.status === 401) {
        error["password"] = err.response.data;
      } else {
        error["email"] = err.response.data;
      }
      this.setState({ error });
    }
  };
  render() {
    return (
      <div className="container">
        <h1>Login</h1>
        <div className="inLine">
          <h4 className="tips">No account yet?</h4>
          <a className="btn btn-primary registerBtn" href="/register">
            Register
          </a>
        </div>

        <form>
          {this.renderInput("email", "Email Address")}
          {this.renderInput("password", "Password")}
          {this.renderSubmitButton()}
        </form>
      </div>
    );
  }
}

export default LoginForm;
