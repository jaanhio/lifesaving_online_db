import React, { Component } from "react";
import Drawer from "material-ui/Drawer";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import { Link } from "react-router-dom";

import FaceIcon from "material-ui-icons/Face";
import GroupIcon from "material-ui-icons/Group";
import DateRangeIcon from "material-ui-icons/DateRange";
import PoolIcon from "material-ui-icons/Pool";
import AssignmentIcon from "material-ui-icons/Assignment";

class FixedDrawer extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Drawer variant="permanent">
        <List component="nav" style={{ top: 65 }}>
          <ListItem button>
            <ListItemIcon>
              <FaceIcon />
            </ListItemIcon>
            <Link to="/athletes" style={{ textDecoration: "none" }}>
              <ListItemText primary="Athletes" />
            </Link>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <Link to="/teams" style={{ textDecoration: "none" }}>
              <ListItemText primary="Teams" />
            </Link>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DateRangeIcon />
            </ListItemIcon>
            <Link to="/meets" style={{ textDecoration: "none" }}>
              <ListItemText primary="Meets" />
            </Link>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PoolIcon />
            </ListItemIcon>
            <Link to="/races" style={{ textDecoration: "none" }}>
              <ListItemText primary="Races" />
            </Link>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <Link to="/results" style={{ textDecoration: "none" }}>
              <ListItemText primary="Race Results" />
            </Link>
          </ListItem>
        </List>
      </Drawer>
    );
  }
}

export default FixedDrawer;
