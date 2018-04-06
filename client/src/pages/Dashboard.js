import React, { Component } from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";

/*---import components---*/
import NavBar from "../components/NavBar";
import SideMenu from "../components/SideMenu";
import DataTable from "../components/DataTable";
import Form from "../components/Form";

const DataTableWrapper = styled.div`
  position: absolute;
  top: 7%;
  left: 19%;
  width: 70vw;
`;

const AthleteTable = props => {
  return <DataTable />;
};

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
        <SideMenu />
        <Switch>
          <Route
            path="/athletes"
            render={() => <DataTable currentCat={this.state.currentCategory} />}
          />
          <Route path="/add" component={Form} />
        </Switch>
      </div>
    );
  }
}

export default Dashboard;
