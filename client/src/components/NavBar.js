import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import Menu, { MenuItem } from "material-ui/Menu";
import { Link, withRouter } from "react-router-dom";
// Icons
import AccountCircle from "material-ui-icons/AccountCircle";
import Settings from "material-ui-icons/Settings";
import PowerSettingsNew from "material-ui-icons/PowerSettingsNew";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      user: this.props.user
    };
  }

  handleMenu = e => {
    this.setState({
      anchorEl: e.currentTarget
    });
  };

  handleClose = e => {
    this.setState({
      anchorEl: null
    });
  };

  handleLogout = e => {
    localStorage.clear();
    this.props.history.push("/login");
  };

  render() {
    const { anchorEl, user } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <AppBar position="fixed" style={{ backgroundColor: "white" }}>
          <Toolbar>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="title"
                style={{ fontWeight: 100, width: 300 }}
                align="left"
                children="SINGAPORE LIFESAVING ONLINE DATABASE"
              />
            </Link>
            <Typography
              variant="subheading"
              style={{ fontWeight: 100, width: "100vw" }}
              align="right"
            >
              Welcome, {user}
            </Typography>
            <div>
              <IconButton aria-haspopup="true" onClick={this.handleMenu}>
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>
                  <Settings style={{ marginRight: 5 }} />
                  Account Settings
                </MenuItem>
                <MenuItem onClick={this.handleLogout}>
                  <PowerSettingsNew style={{ marginRight: 5 }} />
                  Log Out
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withRouter(NavBar);
