import React, { Component } from "react";
import Typography from "material-ui/Typography";
import { Link } from "react-router-dom";
import styled from "styled-components";

// import icons
import DashboardIcon from "material-ui-icons/Dashboard";
import FaceIcon from "material-ui-icons/Face";
import GroupIcon from "material-ui-icons/Group";
import DateRangeIcon from "material-ui-icons/DateRange";
import PoolIcon from "material-ui-icons/Pool";
import AssignmentIcon from "material-ui-icons/Assignment";

const SideMenuWrapper = styled.div`
  position: absolute;
  top: 9%;
  left: calc(50px + 7vw);
  display: flex;
  flex-direction: column;
`;

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SideMenuWrapper>
        <Typography
          variant="title"
          style={{ textDecoration: "none", marginBottom: 10 }}
        >
          <DashboardIcon />Dashboard
        </Typography>
        <Link
          to="/athletes"
          style={{ textDecoration: "none", marginBottom: 10, color: "black" }}
        >
          <FaceIcon />Athletes
        </Link>
        <Link
          to="/teams"
          style={{ textDecoration: "none", marginBottom: 10, color: "black" }}
        >
          <GroupIcon />Teams
        </Link>
        <Link
          to="/meets"
          style={{ textDecoration: "none", marginBottom: 10, color: "black" }}
        >
          <DateRangeIcon />Meets
        </Link>
        <Link
          to="/races"
          style={{ textDecoration: "none", marginBottom: 10, color: "black" }}
        >
          <PoolIcon />Races
        </Link>
        <Link
          to="/results"
          style={{ textDecoration: "none", marginBottom: 10, color: "black" }}
        >
          <AssignmentIcon />Results
        </Link>
      </SideMenuWrapper>
    );
  }
}

export default SideMenu;
