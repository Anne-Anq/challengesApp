import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import ChallengesTable from "./components/challengesTable";
import ChallengeForm from "./components/challengeForm";
import Categories from "./components/categories";
import MyProfile from "./components/myProfile";
import { getUser } from "./services/auth";
import "./App.css";

class App extends Component {
  state = {
    user: ""
  };
  componentWillMount() {
    const user = getUser();
    if (user) this.setState({ user });
  }
  render() {
    const user = this.state.user;
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route
            path="/me"
            render={props => <MyProfile {...props} user={user} />}
          />
          <Route path="/register" component={RegisterForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/challenges/new" component={ChallengeForm} />
          <Route path="/categories" component={Categories} />
          <Route path="/" component={ChallengesTable} />
        </Switch>
      </div>
    );
  }
}

export default App;
