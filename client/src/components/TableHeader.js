import React, { Component } from "react";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
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
import Checkbox from "material-ui/Checkbox";
import IconButton from "material-ui/IconButton";
import Tooltip from "material-ui/Tooltip";
import Paper from "material-ui/Paper";
import styled from "styled-components";

// import icons
import DeleteIcon from "material-ui-icons/Delete";
import FilterListIcon from "material-ui-icons/FilterList";
import AddIcon from "material-ui-icons/Add";

import TableToolBar from "./TableToolBar";

const MainConsoleWrapper = styled.div`
  position: absolute;
  top: 20%;
  left: 23%;
  width: 65vw;
  max-width: 1400px;
  height: 100vh;
`;

const columnData = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "ID"
  },
  { id: "calories", numeric: true, disablePadding: false, label: "First Name" },
  { id: "fat", numeric: true, disablePadding: false, label: "Last Name" },
  { id: "carbs", numeric: true, disablePadding: false, label: "Date of birth" },
  { id: "protein", numeric: true, disablePadding: false, label: "Gender" }
];

class TableHeader extends Component {
  constructor(props) {
    super(props);
  }

  createSortHandler = property => e => {
    this.props.onRequestSort(e, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? "none" : "default"}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

export default TableHeader;
