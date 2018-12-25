import React, { Component } from "react";

class Hover extends Component {
  state = {
    hover: false
  };

  hoverOn = () => {
    this.setState({ hover: true });
  };
  hoverOff = () => {
    this.setState({ hover: false });
  };
  render = () => {
    const { on, out } = this.props;
    return (
      <i onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff}>
        {out}
        {this.state.hover ? on : ""}
      </i>
    );
  };
}

export default Hover;
