import React, { Component } from "react";
import {
  FormControl,
  FormHelperText,
  FormControlLabel,
  FormLabel
} from "material-ui/Form";
import Input, { InputLabel } from "material-ui/Input";
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";
import Radio, { RadioGroup } from "material-ui/Radio";
import Button from "material-ui/Button";
import axios from "axios";

class Form extends Component {
  constructor() {
    super();

    this.state = {
      firstName: "",
      lastName: "",
      dob: "",
      gender: ""
    };
  }

  handleChange = prop => e => {
    this.setState({ [prop]: e.target.value });
  };

  handleSubmit = e => {
    console.log("submitting form");
    e.preventDefault();
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
        this.props.history.push("/athletes");
      });
  };

  render() {
    return (
      <div style={{ position: "absolute", top: "10%", left: "30%" }}>
        <Paper
          style={{
            width: 500,
            height: 350,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <form
            onSubmit={this.handleSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <FormControl
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
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
              />
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                value={this.state.gender}
                onChange={this.handleChange("gender")}
                style={{ flexDirection: "row" }}
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
            <Button variant="raised" type="submit" value="submit">
              Submit
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

export default Form;
