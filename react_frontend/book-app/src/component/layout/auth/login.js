import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import GoogleLogin from "react-google-login";
import { withRouter } from "react-router-dom";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      // history : useHistory(),
      // status :'',
    };
  }
  // google = (e) => {
  //   if(e.tokenId == null){
  //     alert("no account selected")
  //   }
  //   else{
  //     console.log(e.tokenId);
  //   const token = e.tokenId;
  //   axios
  //     .post("http://localhost:4201/api/users/googleLogin", { id: token })
  //     .then((res) => {
  //       console.log("Google login access", res);
  //       const { token } = res.data;
  //       localStorage.clear();
  //       localStorage.setItem("jwtToken", token);
  //       console.log("user logged in");
  //       this.props.history.push("/", { current: true });
  //       window.location.reload()
  //     });      
  //   }
  // };
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
      .post("http://localhost:4201/api/users/login", userData)
      .then((res) => {
        const { token } = res.data;
        localStorage.clear();
        localStorage.setItem("jwtToken", token);
        toast("Login successfull");
        console.log("Login successfull");
        this.props.history.push("/", { current: true });
        window.location.reload()
      })
      .catch((err) => {
        toast.error("Email and password did not match!", { autoClose: 2000,hideProgressBar: true,});
      });
  };
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div style={{ paddingLeft: "11.250px" }}>
          <h4>
            <b>Login</b> below
          </h4>
          <p>
            Don't have an account? <Link to="/auth">Register</Link>
          </p>
        </div>
        <form noValidate onSubmit={this.onSubmit}>
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
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
              }}
              type="submit"
            >
              Login
            </button>
            {/* <GoogleLogin
              clientId="602089965179-79c3o58rlsbla0m2en0qmpgos87k28hf.apps.googleusercontent.com"
              buttonText="login with Google"
              onSuccess={this.google}
              onFailure={this.google}
              cookiePolicy={"single_host_origin"}
            /> */}
          </div>
        </form>
        <Link to="/">Back to home</Link>
        <ToastContainer/>
      </div>
    );
  }
}
export default withRouter(Login);
