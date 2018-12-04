import React, { Component } from "react";
import { getChallenges } from "../services/db";
import { getUser } from "../services/db";

class ChallengesTable extends Component {
  state = {
    data: [{ _id: "", title: "" }],
    error: ""
  };
  async componentDidMount() {
    const { data } = await getChallenges();
    this.setState({ data });
  }
  render() {
    const challenges = this.state.data;
    const user = getUser();
    return (
      <div className="container">
        <h1>Hi {user && user.firstName}</h1>
        <h1>Challenges</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
            </tr>
          </thead>
          <tbody>
            {challenges.map(challenge => (
              <tr key={challenge._id}>
                <td>{challenge.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ChallengesTable;
