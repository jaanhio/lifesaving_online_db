import React, { Component } from "react";
import { FormControl, FormHelperText } from "material-ui/Form";
import Input, { InputAdornment, InputLabel } from "material-ui/Input";
import IconButton from "material-ui/IconButton";
import Button from "material-ui/Button";
import Visibility from "material-ui-icons/Visibility";
import VisibilityOff from "material-ui-icons/VisibilityOff";

import styled from "styled-components";
import axios from "axios";

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  font-family: "Roboto", sans-serif;
`;

const LoginHeaderWrapper = styled.h1`
  font-weight: 300;
`;

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailError: false,
      emailEmpty: false,
      password: "",
      passwordError: false,
      passwordEmpty: false,
      loading: false,
      submitSuccess: false,
      showPassword: false
    };
  }

  handleChange = props => event => {
    this.setState({ [props]: event.target.value });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleSubmit = e => {
    e.preventDefault();
    let emailInputLength = this.state.email.length;
    console.log(emailInputLength);
    let passwordInputLength = this.state.password.length;
    if (emailInputLength === 0) {
      this.setState({
        emailEmpty: !this.state.emailEmpty
      });
    }
    if (passwordInputLength === 0) {
      this.setState({
        passwordEmpty: !this.state.passwordEmpty
      });
    } else {
      axios
        .post("http://localhost:5000/login", {
          email: this.state.email,
          password: this.state.password
        })
        .then(res => {
          if (res.data.token) {
            // if authentication successful, set jwt and redirect to home page
            localStorage.setItem("jwtToken", res.data.token);
            // this.props.userHasAuthenticated(true);
            this.props.history.push("/");
          } else {
            if (res.data.error === "email") {
              this.setState({ emailError: !this.state.emailError });
            } else {
              if (this.state.emailError) {
                this.setState({ emailError: !this.state.emailError });
              }
              this.setState({ passwordError: !this.state.passwordError });
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    const { emailError, passwordError } = this.state;

    // conditional rendering of email and password input field depending on status of input
    const emailInputField = emailError ? (
      <FormControl error>
        <InputLabel htmlFor="email-input">Email</InputLabel>
        <Input
          id="email-input"
          value={this.state.email}
          style={{ width: 350 }}
          onChange={this.handleChange("email")}
        />
        <FormHelperText>Email does not exist</FormHelperText>
      </FormControl>
    ) : (
      <FormControl>
        <InputLabel htmlFor="email-input">Email</InputLabel>
        <Input
          id="email-input"
          value={this.state.email}
          style={{ width: 350 }}
          onChange={this.handleChange("email")}
        />
      </FormControl>
    );

    const passwordInputField = passwordError ? (
      <FormControl error>
        <InputLabel htmlFor="adornment-password">Password</InputLabel>
        <Input
          id="adornment-password"
          type={this.state.showPassword ? "type" : "password"}
          value={this.state.password}
          style={{ width: 350 }}
          onChange={this.handleChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle Password visibility"
                onClick={this.handleClickShowPassword}
                onMouseDown={this.handleMouseDownPassword}
              >
                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText>Incorrect Password</FormHelperText>
      </FormControl>
    ) : (
      <FormControl>
        <InputLabel htmlFor="adornment-password">Password</InputLabel>
        <Input
          id="adornment-password"
          type={this.state.showPassword ? "type" : "password"}
          value={this.state.password}
          style={{ width: 350 }}
          onChange={this.handleChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle Password visibility"
                onClick={this.handleClickShowPassword}
                onMouseDown={this.handleMouseDownPassword}
              >
                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    );

    return (
      <LoginWrapper>
        <LoginHeaderWrapper>
          Singapore Lifesaving Online Database
        </LoginHeaderWrapper>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          {emailInputField}
          {passwordInputField}
          <Button
            variant="raised"
            style={{
              backgroundColor: "#62CA99",
              color: "#FFFFFF",
              fontSize: "0.9rem",
              marginTop: 22
            }}
            type="submit"
            value="submit"
          >
            Log In
          </Button>
        </form>
      </LoginWrapper>
    );
  }
}

export default LoginPage;
