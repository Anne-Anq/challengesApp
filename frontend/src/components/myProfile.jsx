import React, { Component } from "react";
import Table from "./commons/table";
import { getUser } from "../services/auth";
import { getChallenge, quitChallenge } from "../services/challenges";

class MyProfile extends Table {
  state = {
    data: [],
    error: ""
  };
  async componentDidMount() {
    const { challengesTaken } = await getUser();

    const data = await Promise.all(
      challengesTaken.map(async c => {
        const { data: challenge } = await getChallenge(c);
        return challenge;
      })
    );
    this.setState({ data });
  }
  doDelete = async id => {
    console.log("what happens when deleting from taken challenges");
    return quitChallenge(id);
  };
  render() {
    const columns = [
      { header: "Title", path: "title" },
      {
        header: "",
        content: id => this.renderDeleteButton(id)
      }
    ];
    return (
      <React.Fragment>
        <h1>My Profile</h1>
        <h2>Mychallenges</h2>
        <Table columns={columns} datas={this.state.data} />
      </React.Fragment>
    );
  }
}

export default MyProfile;
