import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import ChallengesTable from "./components/challengesTable";
import ChallengeForm from "./components/challengeForm";
import MyProfile from "./components/myProfile";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/me" component={MyProfile} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/challenges/new" component={ChallengeForm} />
          <Route path="/" component={ChallengesTable} />
        </Switch>
      </div>
    );
  }
}

export default App;
