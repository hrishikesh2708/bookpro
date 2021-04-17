import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
class Navbar extends Component {
  
  handleClick = () => {
    localStorage.clear();
    this.props.history.push("/");
    window.location.reload();
  };
  render() {

    return (
      <nav>
        <div>
          <Link to="/">BookPro</Link>
        </div>
        {this.props.current_user_status === "logged in" ? (
          <>
            <p>{this.props.name}</p>
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
