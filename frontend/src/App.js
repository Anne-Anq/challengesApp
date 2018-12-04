import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import ChallengesTable from "./components/challengesTable";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={ChallengesTable} />
        </Switch>
      </div>
    );
  }
}

export default App;
