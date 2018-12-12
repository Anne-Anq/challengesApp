import React from "react";
import { Link } from "react-router-dom";
import {
  getChallenges,
  deleteChallenge,
  takeChallenge
} from "../services/challenges";
import { getUser } from "../services/auth";
import Table from "./commons/table";
import Hover from "./commons/hover";

class ChallengesTable extends Table {
  state = {
    data: [{ _id: "", title: "", category: "", followers: [] }],
    error: ""
  };
  async componentDidMount() {
    let { data } = await getChallenges();
    data = data.map(d => {
      d.category = d.category ? d.category.name : "";
      d.followers = d.followers.length;

      return d;
    });
    this.setState({ data });
  }
  doDelete = async id => {
    return await deleteChallenge(id);
  };

  doAdd = async id => {
    const user = getUser();
    if (!user) {
      return (window.location = "/login");
    }
    try {
      const { data } = await takeChallenge(id);
      window.location = "/me";
      return data;
    } catch (error) {
      if (error.response.status === 401) console.log(error.response.data);
    }
  };
  renderFollowers = num => {
    return num !== 0 ? (
      num > 1 ? (
        <span>
          Already <br /> {`${num} followers`}
        </span>
      ) : (
        <span>
          Already <br /> {`${num} follower`}
        </span>
      )
    ) : (
      <span className="badge badge-pill badge-info">New</span>
    );
  };
  renderDescription = description => {
    return (
      <React.Fragment>
        {description && (
          <Hover on={description} out={<i className="fa fa-info-circle" />} />
        )}
      </React.Fragment>
    );
  };
  render() {
    const challenges = this.state.data;
    const columns = [
      { header: "Title", path: "title" },
      {
        header: "",
        content: ({ description }) => this.renderDescription(description)
      },
      { header: "Category", path: "category" },
      {
        header: "",
        content: ({ followers }) => this.renderFollowers(followers)
      },
      {
        header: "",
        content: ({ _id }) => this.renderAddButton(_id)
      }
    ];
    const deleteColumn = {
      header: "",
      content: ({ _id }) => this.renderDeleteButton(_id)
    };

    const user = getUser();
    if (user && user.isAdmin) columns.push(deleteColumn);

    return (
      <div className="container">
        <h1>Challenges</h1>
        <Table columns={columns} datas={challenges} />
        {user && (
          <Link className="btn btn-info" to="/challenges/new">
            Add Challenge
          </Link>
        )}
      </div>
    );
  }
}

export default ChallengesTable;
