import React, { Component } from "react";
import { FormControl, FormControlLabel, FormLabel } from "material-ui/Form";
import TextField from "material-ui/TextField";
import Radio, { RadioGroup } from "material-ui/Radio";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog";
import Button from "material-ui/Button";
import SnackBar from "material-ui/Snackbar";
import { LinearProgress } from "material-ui/Progress";
import axios from "axios";

class NewForm extends Component {
  constructor() {
    super();

    this.state = {
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      openAddSnack: false,
      loading: false
    };
  }

  handleChange = prop => e => {
    console.log(e.target.value);
    this.setState({ [prop]: e.target.value });
  };

  handleCloseAddSnack = () => {
    this.setState({
      openAddSnack: false
    });
  };

  handleSubmit = e => {
    console.log("submitting form");
    e.preventDefault();
    this.setState({
      loading: true
    });
    let { firstName, lastName, dob, gender } = this.state;
    axios
      .post("http://localhost:5000/athlete", {
        firstname: firstName,
        lastname: lastName,
        dob: dob,
        gender: gender
      })
      .then(res => {
        console.log(res);
        this.props.updateData();
        this.props.handleCloseForm();
        this.setState({
          firstName: "",
          lastName: "",
          dob: "",
          gender: "",
          openAddSnack: true,
          loading: false
        });
      });
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.props.openDialog}
          onClose={this.props.handleCloseForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Insert New Athlete</DialogTitle>
          <DialogContent>
            <FormControl>
              <TextField
                label="First Name"
                value={this.state.firstName}
                onChange={this.handleChange("firstName")}
                style={{ width: 350 }}
              />
              <TextField
                label="Last Name"
                value={this.state.lastName}
                onChange={this.handleChange("lastName")}
                style={{ width: 350 }}
              />
              <TextField
                id="date"
                label="Date of birth"
                type="date"
                InputLabelProps={{ shrink: true }}
                onChange={this.handleChange("dob")}
                style={{ width: 350 }}
                value={this.state.dob}
              />
              <FormLabel component="legend" style={{ margin: "10px 0" }}>
                Gender
              </FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                value={this.state.gender}
                onChange={this.handleChange("gender")}
                style={{ flexDirection: "row", marginTop: -15 }}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button type="submit" value="submit" onClick={this.handleSubmit}>
              Submit
            </Button>
          </DialogActions>
          <div
            style={{
              flexGrow: 1,
              bottom: "0%",
              position: "absolute",
              width: "30vw"
            }}
          >
            {this.state.loading && <LinearProgress value={0} />}
          </div>
        </Dialog>
        <SnackBar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={1800}
          open={this.state.openAddSnack}
          onClose={this.handleCloseAddSnack}
          SnackbarContentProps={{ "aria-describedby": "message-id" }}
          message={<span id="message-id">Athlete successfully added!</span>}
          style={{ zIndex: 1202 }}
        />
      </div>
    );
  }
}

export default NewForm;
