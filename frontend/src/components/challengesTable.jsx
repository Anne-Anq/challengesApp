import React, { Component } from "react";
import { getChallenges, getUser, deleteChallenge } from "../services/db";

class ChallengesTable extends Component {
  state = {
    data: [{ _id: "", title: "", category: "" }],
    error: ""
  };
  async componentDidMount() {
    let { data } = await getChallenges();
    data = data.map(d => {
      d.category = d.category ? d.category.name : "";
      return d;
    });
    this.setState({ data });
  }
  handleDelete = async id => {
    const previousState = { ...this.state };
    let data = [...this.state.data];
    data = data.filter(d => d._id !== id);
    this.setState({ data });
    try {
      await deleteChallenge(id);
    } catch (ex) {
      console.log(ex);
      this.setState(previousState);
    }
  };
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
              <th scope="col">Description</th>
              <th scope="col">Category</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {challenges.map(challenge => (
              <tr key={challenge._id}>
                <td>{challenge.title}</td>
                <td>{challenge.description}</td>
                <td>{challenge.category}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.handleDelete(challenge._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ChallengesTable;
