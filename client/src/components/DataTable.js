import React, { Component } from "react";
import TableToolBar from "./TableToolBar";
import TableHeader from "./TableHeader";
import Paper from "material-ui/Paper";
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow
} from "material-ui/Table";
import Checkbox from "material-ui/Checkbox";
// import FormDialog from "./FormDialog";
import { withStyles } from "material-ui/styles";
import axios from "axios";
import IconButton from "material-ui/IconButton";
import SnackBar from "material-ui/Snackbar";
import EditIcon from "material-ui-icons/ModeEdit";
import EditForm from "./EditForm";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 800
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

class DataTable extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      order: "asc",
      orderBy: "calories",
      selected: [],
      data: [],
      page: 0,
      rowsPerPage: 5,
      currentEdit: null,
      openDeleteSnack: false
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/athlete").then(res => {
      this.setState({ data: res.data });
    });
    // axios.get("http://10.193.240.199:8080/d/tasks").then(res => {
    //   console.log(res);
    //   this.setState({ data: res.data });
    // });
  }

  updateData = () => {
    axios.get("http://localhost:5000/athlete").then(res => {
      this.setState({ data: res.data });
    });
  };

  handleOpenEdit = (event, id) => {
    this.setState({
      currentEdit: id
    });
  };

  handleCloseEdit = () => {
    this.setState({
      currentEdit: null
    });
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    const data =
      order === "desc"
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = id => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleCloseDeleteSnack = () => {
    this.setState({
      openDeleteSnack: false
    });
  };

  handleDelete = () => {
    // e.preventDefault();
    console.log("delete button clicked");
    axios
      .post("http://localhost:5000/athlete/delete", {
        selected: this.state.selected
      })
      .then(res => {
        console.log(res);
        this.setState({
          selected: [],
          openDeleteSnack: true
        });
        this.updateData();
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { classes, currentCat } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    const OpenEditForm = Boolean(this.state.currentEdit) ? null : (
      <EditForm
        currentEdit={this.state.currentEdit}
        handleCloseEdit={this.handleCloseEdit}
      />
    );

    return (
      <div
        style={{
          position: "absolute",
          top: 44,
          left: 199,
          width: "calc(100vw - 199px)"
        }}
      >
        <Paper className={classes.root}>
          <TableToolBar
            numSelected={selected.length}
            currentCat={currentCat}
            updateData={this.updateData}
            handleDelete={this.handleDelete}
          />
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <TableHeader
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const isSelected = this.isSelected(n.id);
                    return (
                      <TableRow
                        hover
                        // onClick={event => this.handleClick(event, n.id)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.id}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isSelected}
                            onChange={() => this.handleClick(n.id)}
                          />
                        </TableCell>
                        <TableCell padding="none">{n.id}</TableCell>
                        <TableCell numeric>{n.firstname}</TableCell>
                        <TableCell numeric>{n.lastname}</TableCell>
                        <TableCell numeric>{n.dob}</TableCell>
                        <TableCell numeric>{n.gender}</TableCell>
                        <TableCell numeric>
                          <IconButton
                            onClick={event => this.handleOpenEdit(event, n.id)}
                          >
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    colSpan={7}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                      "aria-label": "Previous Page"
                    }}
                    nextIconButtonProps={{
                      "aria-label": "Next Page"
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </Paper>
        <EditForm
          currentEdit={this.state.currentEdit}
          handleCloseEdit={this.handleCloseEdit}
          updateData={this.updateData}
        />
        <SnackBar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={2500}
          open={this.state.openDeleteSnack}
          onClose={this.handleCloseDeleteSnack}
          SnackbarContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Deletion successful!</span>}
          style={{
            zIndex: 1202
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(DataTable);
