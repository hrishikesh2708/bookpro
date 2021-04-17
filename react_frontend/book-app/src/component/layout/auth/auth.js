import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GoogleLogin from 'react-google-login';
class Auth extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
  }
  google = (e) => {
    console.log(e.tokenId)
    const token = e.tokenId;
    axios
      .post("http://localhost:4201/api/users/googleLogin", {id : token})
      .then(res => {
        console.log("Google login access", res)
        const { token } = res.data;
        localStorage.clear();
        localStorage.setItem("jwtToken", token);
        console.log("user logged in")
        this.props.history.push("/",{current : true});
      })
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    console.log(newUser);

    axios
      .post("http://localhost:4201/api/users/register", newUser)
      .then((res) => {
        console.log("register",res.data);
        axios
        .post("http://localhost:4201/api/users/login", newUser) 
        .then((res) => {
        console.log("login",res.data);
        const { token } = res.data;
        localStorage.clear();
        localStorage.setItem("jwtToken", token);
        console.log("user logged in")
        this.props.history.push("/",{current : true});
      });
      })
      .catch((error) => {
        if (error.response.status === 404) alert(error.response.data.email);
        else {
          alert("form data not valid");
        }
      });

  };
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div>
          <h4>Register below</h4>
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
        <form noValidate onSubmit={this.onSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              onChange={this.onChange}
              value={this.state.name}
              error={errors.name}
              id="name"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={this.onChange}
              value={this.state.email}
              error={errors.email}
              id="email"
              type="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={this.onChange}
              value={this.state.password}
              error={errors.password}
              id="password"
              type="password"
            />
          </div>
          <div>
            <label htmlFor="password2">Confirm Password</label>
            <input
              onChange={this.onChange}
              value={this.state.password2}
              error={errors.password2}
              id="password2"
              type="password"
            />
          </div>
          <div>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
              }}
              type="submit"
            >
              Sign up
            </button>
            <GoogleLogin
              clientId = "602089965179-79c3o58rlsbla0m2en0qmpgos87k28hf.apps.googleusercontent.com"
              buttonText = "sign up with Google"
              onSuccess = {this.google}
              onFailure = {this.google}
              cookiePolicy = {'single_host_origin'}
            />
          </div>
        </form>
        <Link to="/">Back to home</Link>
      </div>
    );
  }
}
export default withRouter(Auth);
