import React, { Component } from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

class Table extends Component {
  renderDeleteButton = (id, label = "Delete") => {
    return (
      <button className="btn btn-danger" onClick={() => this.handleDelete(id)}>
        {label}
      </button>
    );
  };
  renderAddButton = (id, label = "Take it!") => {
    return (
      <button className="btn btn-primary" onClick={() => this.handleAdd(id)}>
        {label}
      </button>
    );
  };

  handleDelete = async id => {
    const previousState = { ...this.state };
    let data = [...this.state.data];
    data = data.filter(d => d._id !== id);
    this.setState({ data });
    try {
      await this.doDelete(id);
    } catch (ex) {
      console.log(ex);
      this.setState(previousState);
    }
  };

  handleAdd = async id => {
    const user = await this.doAdd(id);
    //window.location = "/me";
  };

  render() {
    const { columns, datas } = this.props;
    return (
      <table className="table">
        <TableHeader columns={columns} />
        <TableBody datas={datas} columns={columns} />
      </table>
    );
  }
}

export default Table;
