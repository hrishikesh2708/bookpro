import './App.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./component/auth/register";
import Login from "./component/auth/login";
import Navbar from "./component/layout/navbar";
import Landing from "./component/layout/landing";
import Bookspage from "./component/layout/bookspage";
import Search from './component/layout/search';
class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route excat path="/bookspage" component={Bookspage}/>
            <Route excat path="/search" component={Search}/>
          </div>
        </Router>
    );
  }
}
export default App;
