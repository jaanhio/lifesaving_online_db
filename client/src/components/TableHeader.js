import React, { Component } from "react";
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from "material-ui/Table";
import Checkbox from "material-ui/Checkbox";
import Tooltip from "material-ui/Tooltip";

const columnData = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "ID"
  },
  {
    id: "firstname",
    numeric: true,
    disablePadding: false,
    label: "First Name"
  },
  { id: "lastname", numeric: true, disablePadding: false, label: "Last Name" },
  { id: "dob", numeric: true, disablePadding: false, label: "Date of birth" },
  { id: "gender", numeric: true, disablePadding: false, label: "Gender" },
  { id: "blank", numeric: true, disablePadding: false, label: "" }
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
