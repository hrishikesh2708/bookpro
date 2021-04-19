import React, { Component } from 'react'
import {Container} from '@material-ui/core';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./component/layout/navbar";
import {Home} from "./component/layout/home/home";
import Auth from "./component/layout/auth/auth";
import Search from './component/layout/search';
import Add from './component/layout/add-book';
import Modify from './component/layout/modify-book';
import Login from './component/layout/auth/login'
import jwt_decode from "jwt-decode";
import Ser from "./component/layout/ser"

export default class App extends Component {
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
    }
  }

  render() {
    return (
<BrowserRouter>
      <Container maxWidth = "lg">
        <Navbar current_user_status={this.state.current_status} name = {this.state.userName} id ={this.state.userId}/>
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/auth' excat component={Auth}/>
          </Switch>
          <Route excat path="/search" component={Search}/>
          <Route excat path="/ser" component={Ser}/>
            <Route excat path="/add" component={Add}/>
            <Route excat path="/modify" component={Modify}/>
            <Route excat path="/login" component={Login}/>
      </Container>
    </BrowserRouter>
    )
  }
}
