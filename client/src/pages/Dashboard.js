import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

/*---import components---*/
import NavBar from "../components/NavBar";
import FixedDrawer from "../components/FixedDrawer";
import DataTable from "../components/DataTable";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "admin",
      currentCategory: "Athletes"
    };
  }

  componentWillMount() {
    let token = localStorage.getItem("jwtToken");
    if (!token) {
      console.log("not logged in");
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <div>
        <NavBar user={this.state.user} />
        <FixedDrawer />
        <Switch>
          <Route
            path="/athletes"
            render={() => <DataTable currentCat={this.state.currentCategory} />}
          />
        </Switch>
      </div>
    );
  }
}

export default Dashboard;
