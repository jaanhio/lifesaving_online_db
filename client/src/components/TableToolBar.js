import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Typography from "material-ui/Typography";
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from "material-ui/Table";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import Tooltip from "material-ui/Tooltip";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";
import styled from "styled-components";
import { lighten } from "material-ui/styles/colorManipulator";

import DeleteIcon from "material-ui-icons/Delete";
import FilterListIcon from "material-ui-icons/FilterList";
import AddIcon from "material-ui-icons/Add";

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

let TableToolBar = props => {
  const { numSelected, classes, currentCat } = props;

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
            <Link to="/add">
              <IconButton aria-label="Add Athlete">
                <AddIcon />
              </IconButton>
            </Link>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

export default withStyles(toolbarStyles)(TableToolBar);
