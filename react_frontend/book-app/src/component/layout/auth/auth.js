import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      .post(`${process.env.REACT_APP_LOCALHOST}/api/users/register`, newUser)
      .then((res) => {
        console.log("register",res.data);
        axios
        .post(`${process.env.REACT_APP_LOCALHOST}/api/users/login`, newUser) 
        .then((res) => {
        console.log("login",res.data);
        const { token } = res.data;
        localStorage.clear();
        localStorage.setItem("jwtToken", token);
        console.log("user logged in")
        toast.success("Login Successfull",{autoClose: 2000,hideProgressBar: true,})
        this.props.history.push("/",{current : true})
        window.location.reload()
      });
      })
      .catch((error) => {
        if (error.response.status === 404){
          toast.error(error.response.data.email,{autoClose: 2000,hideProgressBar: true,});
        } 
        else {
          toast.error("Input data not valid",{ autoClose: 2000,hideProgressBar: true,});
        }
      });

  };
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div>
          <h4>Sign up below</h4>
          <p>
            Already have an account? <Link to="/login">Sign in</Link>
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
          </div>
        </form>
        <Link to="/">Back to home</Link>
        <ToastContainer/>
      </div>
    );
  }
}
export default withRouter(Auth);
