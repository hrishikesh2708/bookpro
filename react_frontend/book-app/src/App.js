import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./component/layout/navbar";
import Home from "./component/layout/home/home";
import Auth from "./component/layout/auth/auth";
import Search from "./component/layout/search";
import Add from "./component/layout/add-book";
import Modify from "./component/layout/modify-book";
import Login from "./component/layout/auth/login";
import Ser from "./component/layout/ser";
import { user_details } from "./action/user_details";
import { book_details } from "./action/book_action";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(book_details());
    dispatch(user_details());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" excat component={Auth} />
        </Switch>
        <Route excat path="/search" component={Search} />
        <Route excat path="/ser" component={Ser} />
        <Route excat path="/add" component={Add} />
        <Route excat path="/modify" component={Modify} />
        <Route excat path="/login" component={Login} />
      </Container>
    </BrowserRouter>
  );
}
export default App;
