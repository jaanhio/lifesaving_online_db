import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

/*---Component imports---*/
import AuthenticatedRoute from "./components/AuthenticatedRoute";
/*---Component imports---*/

/*---Routes---*/
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
      user: {}
    };
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  getUser = user => {
    this.setState({ user: user });
  };

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      <div className="App">
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
