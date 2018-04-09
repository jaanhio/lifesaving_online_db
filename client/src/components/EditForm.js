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
import axios from "axios";
import SnackBar from "material-ui/Snackbar";
import { LinearProgress, CircularProgress } from "material-ui/Progress";

class EditForm extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      id: null,
      openEditSnack: false,
      loading: false,
      isPopulatingForm: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isPopulatingForm: true
    });
    if (nextProps.currentEdit !== this.props.currentEdit) {
      let params = nextProps.currentEdit;
      axios.get(`http://localhost:5000/athlete/${params}`).then(res => {
        console.log(res.data[0]);
        this.setState({
          user: res.data[0],
          firstName: res.data[0].firstname,
          lastName: res.data[0].lastname,
          dob: res.data[0].dob,
          gender: res.data[0].gender,
          id: res.data[0].id,
          isPopulatingForm: false
        });
      });
    }
  }

  handleCloseEditSnack = () => {
    this.setState({
      openEditSnack: false
    });
  };

  handleChange = prop => e => {
    this.setState({ [prop]: e.target.value });
  };

  handleUpdate = e => {
    console.log("updating athlete's particulars");
    e.preventDefault();
    this.setState({
      loading: true
    });
    let { firstName, lastName, dob, gender, id } = this.state;
    axios
      .post(`http://localhost:5000/athlete/${id}/update`, {
        firstname: firstName,
        lastname: lastName,
        dob: dob,
        gender: gender
      })
      .then(res => {
        this.setState({
          openEditSnack: true,
          loading: false
        });
        this.props.updateData();
        this.props.handleCloseEdit();
      });
  };

  render() {
    const open = Boolean(this.props.currentEdit);
    console.log("currently editing");
    console.log(this.props.currentEdit);
    return (
      <div>
        <Dialog
          open={open}
          onClose={this.props.handleCloseEdit}
          aria-labelledby="form-dialog-title"
        >
          {this.state.isPopulatingForm && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
                backgroundColor: "rgba(0,0,0,0.5)"
              }}
            >
              <CircularProgress size={68} />
            </div>
          )}
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
                value={this.state.dob}
                type="date"
                InputLabelProps={{ shrink: true }}
                onChange={this.handleChange("dob")}
                style={{ width: 350 }}
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
            <Button type="submit" value="submit" onClick={this.handleUpdate}>
              Update
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
          open={this.state.openEditSnack}
          onClose={this.handleCloseEditSnack}
          SnackbarContentProps={{ "aria-describedby": "message-id" }}
          message={
            <span id="message-id">
              {this.state.firstName}'s profile updated!
            </span>
          }
          style={{ zIndex: 1202 }}
        />
      </div>
    );
  }
}

export default EditForm;
