import React, { Component } from "react";
import { Link } from "react-router-dom";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
const userData = {
      email: this.state.email,
      password: this.state.password
    };
console.log(userData);
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
      Don't have an account? <Link to="/register">Register</Link>
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
          marginTop: "1rem"
        }}
        type="submit"
      >
        Login
      </button>
    </div>
  </form>
  <Link to="/">Back to home</Link>
</div>
    );
  }
}
export default Login;