import React, { Component } from "react";
import TableBodyChallenges from "./tableBodyChallenges";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";
import("../../stylesheets/table.css");

class Table extends Component {
  renderDeleteButton = (id, label = "Delete") => {
    return (
      <button
        className="btn btn-danger btn-size"
        onClick={() => this.handleDelete(id)}
      >
        {label}
      </button>
    );
  };
  renderAddButton = (
    id,
    disabled = false,
    label1 = "Take it!",
    label2 = "Taken"
  ) => {
    return (
      <button
        className="btn btn-primary btn-size"
        disabled={disabled}
        onClick={() => this.handleAdd(id)}
      >
        {(disabled && label2) || (!disabled && label1)}
      </button>
    );
  };
  renderLogButton = (id, disabled = false, failed) => {
    return (
      <button
        className={`btn btn-size btn-${failed ? "danger" : "primary"}`}
        disabled={disabled || failed}
        onClick={() => this.handleAdd(id)}
      >
        {(failed && `Failed`) ||
          (disabled && `Done`) ||
          (!disabled && `Log it!`)}
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
    await this.doAdd(id);
    //window.location = "/me";
  };
  renderTableHeader = (columns, datas, width) => {
    return <TableHeader columns={columns} datas={datas} width={width} />;
  };
  renderTableBody = (columns, datas, width) => {
    return <TableBody columns={columns} datas={datas} width={width} />;
  };
  renderTableBodyChallenges = (columns, datas, width) => {
    return (
      <TableBodyChallenges columns={columns} datas={datas} width={width} />
    );
  };
}

export default Table;
