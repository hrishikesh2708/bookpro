import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {
  render() {
    return (
      <div>
        <nav>
          <div>
            <Link to="/">
              BookPro
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;