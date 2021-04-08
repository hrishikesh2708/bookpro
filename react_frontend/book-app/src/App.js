import './App.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import Button from '@material-ui/core/Button';
import Register from "./component/auth/register";
import Login from "./component/auth/login";
import Navbar from "./component/layout/navbar";
import Landing from "./component/layout/landing";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}
export default App;
