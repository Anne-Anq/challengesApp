import React from "react";
import Table from "./commons/table";
import { Link } from "react-router-dom";
import { quitChallenge, logChallenge } from "../services/users";
import { getUserData } from "../services/users";

class MyProfile extends Table {
  state = {
    data: [],
    error: ""
  };
  async componentDidMount() {
    const {
      data: { challengesTaken }
    } = await getUserData(this.props.user._id);

    const data = challengesTaken.map(c => {
      c.challengeTitle = c.challenge.title;
      c.challengeId = c.challenge._id;
      return c;
    });
    this.setState({ data });
  }
  doDelete = async id => {
    const previousState = { ...this.state };
    let data = [...this.state.data];
    data = data.filter(d => {
      return d.challengeId !== id;
    });
    this.setState({ data });
    try {
      return await quitChallenge(id);
    } catch (error) {
      this.setState(previousState);
      console.log(error.response);
    }
  };
  doAdd = async id => {
    const previousState = { ...this.state };
    let data = [...this.state.data];
    data = data.map(d => {
      if (d.challengeId === id) d.remainingDays--;
      return d;
    });
    this.setState({ data });
    try {
      return await logChallenge(id);
    } catch (error) {
      this.setState(previousState);
      console.log(error.response);
    }
  };
  render() {
    const columns = [
      { header: "Title", path: "challengeTitle" },
      { header: "Remaining Days", path: "remainingDays" },
      {
        header: "Log Today's",
        content: ({ challengeId }) =>
          this.renderAddButton(challengeId, "Did it!")
      },
      {
        header: "",
        content: ({ challengeId }) =>
          this.renderDeleteButton(challengeId, "Quit?")
      }
    ];

    return (
      <div className="container">
        <h2>My achievements</h2>
        <h2>My current challenges</h2>
        <Table columns={columns} datas={this.state.data} />
        <Link className="btn btn-info" to="/challenges">
          Go Back to the Challenges
        </Link>
      </div>
    );
  }
}

export default MyProfile;
