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
      console.log(err);
    }
  };
  render() {
    return (
      <div className="container">
        <h1>Login</h1>
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
