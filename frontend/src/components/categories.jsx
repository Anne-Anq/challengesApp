import React from "react";
import CategoryForm from "./categoryForm";
import CategoryTable from "./categoryTable";
import { addCategory } from "../services/categories";

class Categories extends CategoryForm {
  state = {
    data: {
      input: {
        name: ""
      }
    },
    error: ""
  };

  doSubmit = async () => {
    let { name } = { ...this.state.data.input };
    name = name.toLowerCase();

    try {
      await addCategory({ name: name });
      window.location = "/categories";
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <div className="container">
        <div className="m-5">
          <CategoryForm
            submit={this.renderSubmitButton()}
            input={this.renderInput("name", "Category", false)}
          />
        </div>
        <div className="m-5">
          <CategoryTable />
        </div>
      </div>
    );
  }
}

export default Categories;
