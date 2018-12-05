import React from "react";
import Form from "./commons/form";
import Joi from "joi-browser";
import { register } from "../services/user";

class RegisterForm extends Form {
  state = {
    data: {
      input: {
        firstName: "",
        email: "",
        password: ""
      }
    },
    error: ""
  };
  schema = {
    firstName: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  };
  doSubmit = async () => {
    try {
      await register(this.state.data.input);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (err) {
      const error = { ...this.state.error };
      error["email"] = err.response.data.errmsg;
      this.setState({ error });
    }
  };
  render() {
    return (
      <div className="container">
        <h1>Register</h1>
        <form>
          {this.renderInput("firstName", "First Name")}
          {this.renderInput("email", "Email Address")}
          {this.renderInput("password", "Password")}
          {this.renderSubmitButton()}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
