import React, { Component } from "react";
import "../../stylesheets/tableBody.css";

class TableBody extends Component {
  renderRow = data => {
    return this.renderRowBig(data);
  };

  renderRowBig = data => {
    const { columns } = this.props;

    return (
      <tr key={data._id}>
        {columns.map((c, i) => (
          <td key={`${data._id}_${i}`} className={c.hasClass}>
            {c.content ? c.content(data) : data[c.path]}
          </td>
        ))}
      </tr>
    );
  };

  render() {
    const { datas } = this.props;
    return <tbody>{datas.map(data => this.renderRow(data))}</tbody>;
  }
}

export default TableBody;
