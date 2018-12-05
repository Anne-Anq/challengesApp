import React from "react";

const Select = ({ path, label, error, options, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={path}>{label}</label>
      <select {...rest} className="custom-select" id={path}>
        <option defaultValue value="">
          Choose...
        </option>
        {options.map(o => (
          <option key={o._id} value={o._id}>
            {o.name}
          </option>
        ))}
      </select>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default Select;
