import React, { Component } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { withRouter } from "react-router-dom";
class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      current_status: "Not loged in",
      userName: "",
      userId: "",
    };
  }
  componentDidMount() {
    console.log("hi");
    const token = localStorage.getItem("jwtToken");
    if (token != null) {
      var decode = jwt_decode(token);
      console.log(token);
      console.log(decode);
      this.setState({
        userId: decode.id,
        userName: decode.name,
        current_status: "logged in",
      });
      console.log(this.state.userName);
      console.log(this.props.location.state)
    }
  }

  handleClick = () => {
    this.setState({
      current_status: "Not loged in",
    });
    localStorage.clear();
    this.props.history.push("/");
  };
  render() {

    return (
      <nav>
        <div>
          <Link to="/">BookPro</Link>
        </div>
        {this.state.current_status === "logged in" ? (
          <>
            <p>{this.state.userName}</p>
            <div>
              <Link to="/search"> Serach </Link>
            </div>
            <div>
              <Link to="/add"> Add Book </Link>
            </div>
            <div>
              <Link to="/modify"> Update book </Link>
            </div>
            <div>
              <button onClick={this.handleClick}>Logout</button>
            </div>
          </>
        ) : (
          <div>
            <Link to="/auth">Signup</Link>
          </div>
        )}
      </nav>
    );
  }
}
export default withRouter(Navbar);
