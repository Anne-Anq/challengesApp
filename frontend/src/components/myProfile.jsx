import React from "react";
import Table from "./commons/table";
import { quitChallenge } from "../services/users";
import { getUserData } from "../services/users";

class MyProfile extends Table {
  state = {
    data: [],
    error: ""
  };
  async componentDidMount() {
    const {
      data: { challengesTaken: data }
    } = await getUserData(this.props.user._id);
    this.setState({ data });
  }
  doDelete = async id => {
    try {
      return await quitChallenge(id);
    } catch (error) {
      console.log(error.response);
    }
  };
  render() {
    const columns = [
      { header: "Title", path: "title" },
      {
        header: "",
        content: ({ _id }) => this.renderDeleteButton(_id)
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
