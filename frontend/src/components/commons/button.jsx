import React from "react";

const Button = (label = "press me", type = "primary", { ...rest }) => {
  return (
    <button className={`btn btn-${type}`} {...rest}>
      {label}
    </button>
  );
};

export default Button;
