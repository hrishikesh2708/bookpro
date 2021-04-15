import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
class Auth extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
    const newUser = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          password2: this.state.password2
        };
    console.log(newUser);
    
    axios.post('http://localhost:4201/api/users/register', newUser)
    .then((res) => {
        console.log(res.data)
        this.props.history.push("/login");
    }).catch((error) => {
      if(error.response.status === 404)
        alert(error.response.data.email);
      else{
        alert("form data not valid")
      }
    });


};
render() {
    const { errors } = this.state;
return (

  <div>
  
  <div>
    <h4>
      Register below
    </h4>
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
          marginTop: "1rem"
        }}
        type="submit"
      >
        Sign up
      </button>
    </div>
  </form>
  <Link to="/">Back to home</Link>
</div>
    );
  }
}
export default withRouter(Auth);
