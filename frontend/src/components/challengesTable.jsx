import React from "react";
import { Link } from "react-router-dom";
import {
  getChallenges,
  deleteChallenge,
  takeChallenge
} from "../services/challenges";
import { getUser } from "../services/auth";
import { getUserData } from "../services/users";
import Table from "./commons/table";
import Hover from "./commons/hover";
import Intro from "./intro";
import mobileSize from "./../services/constant";
import "../stylesheets/challengesTable.css";

class ChallengesTable extends Table {
  state = {
    data: [{ _id: "", title: "", category: "", followers: [], hide: "" }],
    user: "",
    error: "",
    firstTime: true
  };
  componentDidMount = async () => {
    let { data } = await getChallenges();
    data = data.map(d => {
      d.category = d.category ? d.category.name : "";
      d.followers = d.followers.length;
      d.hide = true;
      return d;
    });
    this.setState({ data });
    const userAuth = getUser();
    if (userAuth) {
      const { data: user } = await getUserData(userAuth._id);
      this.setState({ user });
    }
    const firstTime = true;
    this.setState({ firstTime });
  };

  doDelete = async id => {
    return await deleteChallenge(id);
  };

  doAdd = async id => {
    const { user } = this.state;
    if (!user) {
      return (window.location.pathname = "/login");
    }
    try {
      const { data } = await takeChallenge(id);
      window.location.pathname = "/me";
      return data;
    } catch (error) {
      if (error.response.status === 401) console.log(error.response.data);
    }
  };
  renderFollowers = num => {
    return num !== 0 ? (
      this.props.width < mobileSize ? (
        <span>{num}</span>
      ) : num > 1 ? (
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
  renderTitleLink = data => {
    return <div onClick={() => this.toggleHide(data._id)}>{data.title}</div>;
  };

  toggleHide = id => {
    let { data } = { ...this.state };
    data = data.map(d => {
      if (d._id === id) {
        d.hide = !d.hide;
      }
      return d;
    });
    this.setState({ data });
  };
  renderDescription = description => {
    const descriptionPopup = () => (
      <div>
        <div className="arrow" />
        <div className="arrowBorder" />
        <div className="popup">{description}</div>
      </div>
    );
    if (this.props.width < mobileSize) {
      return <div>{description}</div>;
    } else {
      return (
        <div className="wrapper">
          {description && (
            <Hover
              on={descriptionPopup()}
              out={<i className="fa fa-info-circle" />}
            />
          )}
        </div>
      );
    }
  };
  isChallengeTaken = challengeId => {
    const { challengesTaken } = this.state.user;
    let result = false;
    if (challengesTaken)
      challengesTaken.forEach(c => {
        if (c.challenge._id === challengeId) result = true;
      });

    return result;
  };
  hideDiv = () => {
    const firstTime = false;
    this.setState({ firstTime });
  };
  render() {
    const challenges = this.state.data;

    const columns = [
      {
        header: "Title",
        hasClass: "shownElement title",
        content: data => this.renderTitleLink(data)
      },
      {
        header: "",
        content: ({ description }) => this.renderDescription(description),
        hasClass: "hidden"
      },
      { header: "Category", path: "category", hasClass: "hidden" },
      {
        header: "Followers",
        content: ({ followers }) => this.renderFollowers(followers),
        hasClass: "hidden"
      },
      {
        header: "Taken",
        content: ({ _id }) =>
          this.renderAddButton(_id, this.isChallengeTaken(_id)),
        hasClass: `shownElement ${
          this.props.width <= mobileSize ? "text-right m-2" : ""
        }`
      }
    ];
    const deleteColumn = {
      header: "",
      content: ({ _id }) => this.renderDeleteButton(_id),
      hasClass: "hidden"
    };

    if (this.state.user && this.state.user.isAdmin) columns.push(deleteColumn);

    return (
      <div className="container challenges">
        {!this.state.user && this.state.firstTime && (
          <Intro onClick={() => this.hideDiv()} />
        )}
        <div className="content">
          <h1>Challenges</h1>

          <table className="table">
            {this.renderTableHeader(columns, challenges, this.props.width)}
            {this.renderTableBodyChallenges(
              columns,
              challenges,
              this.props.width
            )}
          </table>
          {this.state.user && (
            <Link className="btn btn-info" to="/challenges/new">
              Add Challenge
            </Link>
          )}
          {!this.state.user && (
            <Link className="btn btn-info" to="/login">
              Add Challenge
            </Link>
          )}
        </div>
      </div>
    );
  }
}

export default ChallengesTable;
