import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route ,Redirect } from "react-router-dom";
import Navbar from "./component/layout/navbar";
import Home from "./component/layout/home/home";
import Auth from "./component/layout/auth/auth";
import Search from "./component/layout/search";
import Add from "./component/layout/add-book";
import Modify from "./component/layout/modify-book";
import Login from "./component/layout/auth/login";
import Ser from "./component/layout/ser";
import Footer from "./component/layout/footer";
import { user_details } from "./action/user_details";
import { book_details } from "./action/book_action";
import { useDispatch } from "react-redux";
import { main } from "./component/componentCSS";


function App() {
  const classes = main();
  const dispatch = useDispatch();
  useEffect(() => {
    let token = localStorage.getItem("jwtToken");
     if(token !== null){
      dispatch(user_details());
    }
    else{
    dispatch(book_details());
    }

  }, [dispatch]);
  return (
    <BrowserRouter>
      <Container maxWidth="lg" className={classes.root}>
        <Navbar />
        {}
        <Redirect from="/" to="/home"/>
        <Switch>
        {/* <Redirect from="/" to="/home"/> */}
        {/* <Route path="/" exact component={Navbar} /> */}
          <Route path="/home" excat component={Home} />
          <Route path="/auth" excat component={Auth} />
        </Switch>
        <Route excat path="/search" component={Search} />
        <Route excat path="/ser" component={Ser} />
        <Route excat path="/add" component={Add} />
        <Route excat path="/modify" component={Modify} />
        <Route excat path="/login" component={Login} />
      </Container>
      <Footer/>
    </BrowserRouter>
  );
}
export default App;
