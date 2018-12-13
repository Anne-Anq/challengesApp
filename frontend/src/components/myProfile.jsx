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
      c.isLoggedToday = false;
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
      if (d.challengeId === id) {
        d.remainingDays--;
        d.isLoggedToday = true;
        if (d.remainingDays === 0) d.isCompleted = true;
      }
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
    const notCompletedColumns = [
      { header: "Title", path: "challengeTitle" },
      {
        header: "Remaining Days",
        path: "remainingDays"
      },
      {
        header: "Log Today's",
        content: ({ challengeId, isLoggedToday }) =>
          this.renderAddButton(challengeId, isLoggedToday, "Did it!")
      },
      {
        header: "",
        content: ({ challengeId }) =>
          this.renderDeleteButton(challengeId, "Quit?")
      }
    ];
    const notCompleted = [...this.state.data].filter(
      d => d.isCompleted === false
    );
    const completed = [...this.state.data].filter(d => d.isCompleted === true);

    return (
      <div className="container">
        <h2>My achievements</h2>
        <React.Fragment>
          {completed.length >= 1 && (
            <React.Fragment>
              <h6>
                Congrats, you have already completed the following challenge
                {completed.length > 1 && `s`}:
              </h6>
              {completed.map(c => (
                <li key={c._id}>{c.challengeTitle}</li>
              ))}
            </React.Fragment>
          )}
          {completed.length < 1 && (
            <React.Fragment>
              <h6>Looks like you haven't completed any challenge yet</h6>
            </React.Fragment>
          )}
        </React.Fragment>

        <h2>My current challenges</h2>
        <React.Fragment>
          {notCompleted.length >= 1 && (
            <Table columns={notCompletedColumns} datas={notCompleted} />
          )}
          {notCompleted.length < 1 && (
            <React.Fragment>
              <h6>Looks like you aren't taking any challenge at the moment</h6>
            </React.Fragment>
          )}
        </React.Fragment>

        <Link className="btn btn-info" to="/challenges">
          Go Back to the Challenges
        </Link>
      </div>
    );
  }
}

export default MyProfile;
