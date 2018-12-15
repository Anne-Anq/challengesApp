import React from "react";
import Form from "./commons/form";
import Joi from "joi-browser";

class CategoryForm extends Form {
  schema = {
    _id: Joi.string(),
    name: Joi.string()
      .required()
      .label("Name")
  };

  render() {
    const { input, submit } = this.props;
    return (
      <div className="container">
        <h2>Add Category</h2>
        <form>
          {input}
          {submit}
        </form>
      </div>
    );
  }
}

export default CategoryForm;
