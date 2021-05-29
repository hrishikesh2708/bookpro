import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./component/layout/navbar";
// import Home from "./component/layout/home/home";
import Auth from "./component/layout/auth/auth";
import Search from "./component/layout/search";
import Add from "./component/layout/add-book";
import Modify from "./component/layout/modify-book";
import Login from "./component/layout/auth/login";
import Ser from "./component/layout/ser";
import Footer from "./component/layout/footer";
import { user_details } from "./action/user_details";
import {
  book_details,
  //  private_books
} from "./action/book_action";
import { useDispatch } from "react-redux";
import { main } from "./component/componentCSS";
import NewHome from "./component/layout/home/NewHome";
import MyBook from "./component/layout/mybook";

function App() {
  const classes = main();
  const dispatch = useDispatch();
  useEffect(() => {
    let token = localStorage.getItem("jwtToken");
    if (token !== null) {
      dispatch(user_details());
      dispatch(book_details());
      //  dispatch(private_books(token))
    } else {
      dispatch(book_details());
    }
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Navbar />
      <div className={classes.content}>
        <div className={classes.toolbar}>
          <Switch>
            <Route path="/home" excat component={NewHome} />
            <Route path="/auth" excat component={Auth} />
          </Switch>
          <Route excat path="/mybooks" component={MyBook} />
          <Route excat path="/login" component={Login} />
        </div>
        <Footer />
      </div>

      {/* <Route excat path="/search" component={Search} />
      <Route excat path="/ser" component={Ser} />
      <Route excat path="/add" component={Add} /> */}
      {/* <Route excat path="/mybooks" component={MyBook} /> */}
      {/* <Route excat path="/modify" component={Modify} /> */}
      
    </BrowserRouter>
  );
}
export default App;
