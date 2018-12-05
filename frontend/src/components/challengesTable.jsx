import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getChallenges, deleteChallenge } from "../services/challenges";
import Table from "./commons/table";

class ChallengesTable extends Table {
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
  doDelete = async id => {
    return await deleteChallenge(id);
  };
  // handleDelete = async id => {
  //   const previousState = { ...this.state };
  //   let data = [...this.state.data];
  //   data = data.filter(d => d._id !== id);
  //   this.setState({ data });
  //   try {
  //     await deleteChallenge(id);
  //   } catch (ex) {
  //     console.log(ex);
  //     this.setState(previousState);
  //   }
  // };
  render() {
    const challenges = this.state.data;
    const columns = [
      { header: "Title", path: "title" },
      { header: "Description", path: "description" },
      { header: "category", path: "category" },
      {
        header: "",
        content: id => this.renderDeleteButton(id)
      }
    ];
    return (
      <div className="container">
        <h1>Challenges</h1>
        <Table columns={columns} datas={challenges} />
        <Link className="btn btn-info" to="/challenges/new">
          Add Challenge
        </Link>
      </div>
    );
  }
}

export default ChallengesTable;
