import React, { Component } from "react";
import classNames from "classnames";
import Typography from "material-ui/Typography";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import Tooltip from "material-ui/Tooltip";
import { withStyles } from "material-ui/styles";
import styled from "styled-components";
import { lighten } from "material-ui/styles/colorManipulator";
import DeleteIcon from "material-ui-icons/Delete";
import AddIcon from "material-ui-icons/Add";

import NewForm from "./NewForm";

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});

class TableToolBar extends Component {
  constructor() {
    super();
    this.state = {
      openDialog: false
    };
  }

  handleOpenForm = () => {
    this.setState({ openDialog: true });
  };

  handleCloseForm = () => {
    this.setState({ openDialog: false });
  };

  render() {
    const { numSelected, classes, currentCat } = this.props;

    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subheading">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant="title">{currentCat}</Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Add Athlete">
              <IconButton
                aria-label="Add Athlete"
                onClick={this.handleOpenForm}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
        <NewForm
          openDialog={this.state.openDialog}
          handleCloseForm={this.handleCloseForm}
          handleOpenForm={this.handleOpenForm}
          updateData={this.props.updateData}
        />
      </Toolbar>
    );
  }
}

export default withStyles(toolbarStyles)(TableToolBar);
