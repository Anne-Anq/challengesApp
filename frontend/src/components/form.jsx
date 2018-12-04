import React, { Component } from "react";
class Form extends Component {
  handleChange = event => {
    const { id: path, value } = event.target;
    const data = { ...this.state.data };
    data.input[path] = value;
    this.setState({ data });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.doSubmit();
  };
  renderInput = (path, label) => {
    return (
      <div className="form-group">
        <label htmlFor={path}>{label}</label>
        <input
          value={this.state.data[path]}
          type={path}
          className="form-control"
          id={path}
          placeholder={`Enter ${label}`}
          onChange={this.handleChange}
        />
        <div>{this.state.error[path] && <p>there is an error</p>}</div>
      </div>
    );
  };
  renderSubmitButton = () => {
    return (
      <button className="btn btn-primary" onClick={this.handleSubmit}>
        Submit
      </button>
    );
  };
}

export default Form;
