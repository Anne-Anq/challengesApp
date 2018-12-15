import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import SubmitButton from "./submitButton";

class Form extends Component {
  handleChange = event => {
    const { id: path, value } = event.target;
    const data = { ...this.state.data };
    const error = { ...this.state.error };
    data.input[path] = value;
    const errorMessage = this.validateProperty(path, value);
    if (errorMessage) error[path] = errorMessage;
    else delete error[path];
    this.setState({ data, error });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.doSubmit();
  };
  validateProperty = (path, value) => {
    const obj = { [path]: value };
    const schema = { [path]: this.schema[path] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  validate() {
    const { error } = Joi.validate(this.state.data.input, this.schema);
    return !!this.state.error && !error;
  }

  renderInput = (path, name, label = true) => {
    return (
      <Input
        path={path}
        label={label && name}
        value={this.state.data[path]}
        onChange={this.handleChange}
        placeholder={`Enter ${name}`}
        error={this.state.error[path]}
      />
    );
  };
  renderSelect = (path, label, options) => {
    return (
      <Select
        path={path}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={this.state.error[path]}
      />
    );
  };
  renderSubmitButton = () => {
    return (
      <SubmitButton disabled={!this.validate()} onClick={this.handleSubmit} />
    );
  };
}

export default Form;
