import React, { Component } from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

class Table extends Component {
  renderDeleteButton = id => {
    return (
      <button className="btn btn-danger" onClick={() => this.handleDelete(id)}>
        Delete
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
