import React from "react";
import Form from "./form";
import { register } from "../services/db";

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
  doSubmit = async () => {
    try {
      await register(this.state.data.input);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <div className="container">
        <h1>Register</h1>
        <form>
          {this.renderInput("firstName", "First Name")}
          {this.renderInput("email", "Email address")}
          {this.renderInput("password", "Password")}
          {this.renderSubmitButton()}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
