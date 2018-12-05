import React from "react";

const SubmitButton = ({ ...rest }) => {
  return (
    <button className="btn btn-primary" {...rest}>
      Submit
    </button>
  );
};

export default SubmitButton;
