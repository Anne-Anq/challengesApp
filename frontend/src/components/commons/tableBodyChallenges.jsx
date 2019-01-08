import React, { Component } from "react";
import "../../stylesheets/tableBodyChallenges.css";
import mobileSize from "./../../services/constant";

class TableBodyChallenges extends Component {
  renderRow = data => {
    if (this.props.width > mobileSize) {
      return this.renderRowBig(data);
    } else {
      return this.renderRowSmall(data);
    }
  };

  renderRowBig = data => {
    const { columns } = this.props;

    return (
      <tr key={data._id}>
        {columns.map((c, i) => (
          <td key={`${data._id}_${i}`} className={c.hasClass ? c.hasClass : ""}>
            {c.content ? c.content(data) : data[c.path]}
          </td>
        ))}
      </tr>
    );
  };
  renderRowSmall = data => {
    const { columns } = this.props;
    const shownElements = columns.filter(c => c.hasClass !== "hidden");
    const hiddenElements = columns.filter(c => c.hasClass === "hidden");
    return (
      <React.Fragment>
        <tr key={`${data._id}_shown`} className="shownElements">
          <td colSpan="2">
            <div>
              {shownElements.map((c, i) => (
                <div key={`${data._id}_${i}_shown`}>
                  {c.content ? c.content(data) : data[c.path]}
                </div>
              ))}
            </div>
          </td>
        </tr>

        {!data.hide && (
          <tr className="hiddenElements" key={`${data._id}_hidden`}>
            <td colSpan="2">
              <div>
                {hiddenElements.map((c, i) => (
                  <div key={`${data._id}_${i}_hidden`}>
                    {c.header && (
                      <span className="font-weight-bold">{c.header} : </span>
                    )}
                    {c.content ? c.content(data) : data[c.path]}
                  </div>
                ))}
              </div>
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  };

  render() {
    const { datas } = this.props;
    return <tbody>{datas.map(data => this.renderRow(data))}</tbody>;
  }
}

export default TableBodyChallenges;
