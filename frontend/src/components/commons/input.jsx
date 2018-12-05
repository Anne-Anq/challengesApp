import React from "react";

const Input = ({ path, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={path}>{label}</label>
      <input type={path} className="form-control" id={path} {...rest} />

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;
