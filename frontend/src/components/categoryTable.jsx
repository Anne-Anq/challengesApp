import React from "react";
import { getCategories, deleteCategory } from "../services/categories";
import { getUser } from "../services/auth";
import { getUserData } from "../services/users";
import Table from "./commons/table";

class CategoryTable extends Table {
  state = {
    data: [],
    user: "",
    error: ""
  };
  async componentDidMount() {
    let { data } = await getCategories();

    this.setState({ data });
    const userAuth = getUser();
    if (userAuth) {
      const { data: user } = await getUserData(userAuth._id);
      this.setState({ user });
    }
  }
  doDelete = async id => {
    return await deleteCategory(id);
  };

  render() {
    const categories = this.state.data;

    const columns = [{ header: "Categories", path: "name" }];
    const deleteColumn = {
      header: "",
      content: ({ _id }) => this.renderDeleteButton(_id)
    };

    if (this.state.user && this.state.user.isAdmin) columns.push(deleteColumn);

    return (
      <div className="container">
        <Table columns={columns} datas={categories} />
      </div>
    );
  }
}

export default CategoryTable;
