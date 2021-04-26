import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GoogleLogin from "react-google-login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withRouter } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }
  google = (e) => {
    console.log(e.tokenId);
    if (typeof e.tokenId !== "undefined") {
      const token = e.tokenId;
      axios
        .post(`${process.env.REACT_APP_LOCALHOST}/api/users/googleLogin`, {
          id: token,
        })
        .then((res) => {
          console.log("Google login access", res);
          const { token } = res.data;
          localStorage.clear();
          localStorage.setItem("jwtToken", token);
          toast.success("Login successfull");
          setTimeout(() => {
            this.props.history.push("/");
            window.location.reload();
          }, 1000);
        })
        .catch((err) => {
          toast.error(err.response.data.message, {
            autoClose: 3000,
            hideProgressBar: true,
          });
        });
    } else {
      toast.warn("No account selected!!", {
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(userData);
    axios
      .post(`${process.env.REACT_APP_LOCALHOST}/api/users/login`, userData)
      .then((res) => {
        const { token } = res.data;
        localStorage.clear();
        localStorage.setItem("jwtToken", token);
        toast.success("Login successfull");
        console.log("Login successfull");
        setTimeout(() => {
          this.props.history.push("/");
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        toast.error(err.response.data.message, {
          autoClose: 2000,
          hideProgressBar: true,
        });
      });
  };
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div style={{ paddingLeft: "11.250px" }}>
          <h4>
            <b>Sign In</b> below
          </h4>
          <p>
            Don't have an account?<Button variant="contained" component={Link} to="/auth" size="small">Create new</Button>
          </p>
        </div>
        <form noValidate onSubmit={this.onSubmit}>
          <div>
            {/* <label htmlFor="email">Email</label>
            <input
              onChange={this.onChange}
              value={this.state.email}
              error={errors.email}
              id="email"
              type="email"
            /> */}
            <TextField
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              onChange={this.onChange}
              value={this.state.email}
              error={errors.email}
            />
          </div>
          <div>
            {/* <label htmlFor="password">Password</label>
            <input
              onChange={this.onChange}
              value={this.state.password}
              error={errors.password}
              id="password"
              type="password"
            /> */}
            <TextField
              id="password"
              type="password"
              label="Password"
              variant="outlined"
              onChange={this.onChange}
              value={this.state.password}
              error={errors.password}
            />
          </div>
          <div>
            <Button variant="contained" color="primary" type="submit">
              Sign in
            </Button>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Continue with Google"
              onSuccess={this.google}
              onFailure={this.google}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </form>
        <Button variant="contained" component={Link} to="/" size="small">Back to home</Button>
        <ToastContainer />
      </div>
    );
  }
}
export default withRouter(Login);
