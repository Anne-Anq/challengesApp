import React from "react";
import Form from "./commons/form";
import Joi from "joi-browser";
import { postChallenge } from "../services/challenges";
import { getCategories } from "../services/categories";

class ChallengeForm extends Form {
  state = {
    data: {
      input: {
        title: "",
        description: "",
        categoryId: ""
      },
      categories: []
    },
    error: ""
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    categoryId: Joi.string()
      .required()
      .label("Category"),
    description: Joi.string()
      .allow("")
      .label("Description")
  };
  componentDidMount = async () => {
    try {
      const data = { ...this.state.data };
      const { data: categories } = await getCategories();
      data.categories = categories;
      this.setState({ data });
    } catch (error) {
      this.setState({ error });
    }
  };
  doSubmit = async () => {
    try {
      await postChallenge(this.state.data.input);
      window.location = "/";
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    const { categories } = this.state.data;
    return (
      <div className="container">
        <h1>Add Challenge</h1>
        <form>
          {this.renderInput("title", "Title")}
          {this.renderInput("description", "Description")}
          {this.renderSelect("categoryId", "Category", categories)}
          {this.renderSubmitButton()}
        </form>
      </div>
    );
  }
}

export default ChallengeForm;
