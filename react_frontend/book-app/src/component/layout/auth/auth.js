import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button, TextField} from "@material-ui/core"
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
        setTimeout(() => {
          this.props.history.push("/")
          window.location.reload()
        }, 1000);
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
            Already have an account? <Button to="/login" variant="contained" color="default" component={Link} size="small">Sign in</Button>
          </p>
        </div>
        <form noValidate onSubmit={this.onSubmit}>
          <div>
            {/* <label htmlFor="name">Name</label>
            <input
              onChange={this.onChange}
              value={this.state.name}
              error={errors.name}
              id="name"
              type="text"
            /> */}
            <TextField id="name" label="Name" variant="outlined" onChange={this.onChange}
              value={this.state.name}
              error={errors.name} />
          </div>
          <div>
            {/* <label htmlFor="email">Email</label>
            <input
              onChange={this.onChange}
              value={this.state.email}
              error={errors.email}
              id="email"
              type="email"
            /> */}
            <TextField id="email" label="Email" variant="outlined" onChange={this.onChange}
              value={this.state.email}
              error={errors.email}/>
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
            <TextField id="password" label="Password" variant="outlined" onChange={this.onChange} type="password"
              value={this.state.password}
              error={errors.password}/>
          </div>
          <div>
            {/* <label htmlFor="password2">Confirm Password</label>
            <input
              onChange={this.onChange}
              value={this.state.password2}
              error={errors.password2}
              id="password2"
              type="password"
            /> */}
            <TextField id="password2" label="Confirm Password" variant="outlined" onChange={this.onChange} type="password"
              value={this.state.password2}
              error={errors.password2}/>
          </div>
          <div>
            <Button
              type="submit"
              color="primary"
              variant="contained"
            >
              Sign up
            </Button>
          </div>
        </form>
        <Button variant="contained" component={Link} to="/" size="small">Back to home</Button>
        <ToastContainer/>
      </div>
    );
  }
}
export default withRouter(Auth);
