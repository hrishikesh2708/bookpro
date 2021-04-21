import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GoogleLogin from 'react-google-login';
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
  google = (e) => {
    if(e.tokenId !== null){
      console.log(e.tokenId)
    const token = e.tokenId;
    axios
      .post(`${process.env.REACT_APP_LOCALHOST}/api/users/googleLogin`, {id : token})
      .then(res => {
        console.log("Google login access", res)
        const { token } = res.data;
        localStorage.clear();
        localStorage.setItem("jwtToken", token);
        console.log("user logged in",res.data)
        this.props.history.push("/",{current : true});
        window.location.reload()
      })
    }
    else{
      alert("no account selected!!")
    }
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
              clientId = {process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText = "sign up with Google"
              onSuccess = {this.google}
              onFailure = {this.google}
              cookiePolicy = {'single_host_origin'}
            />
          </div>
        </form>
        <Link to="/">Back to home</Link>
        <ToastContainer/>
      </div>
    );
  }
}
export default withRouter(Auth);
