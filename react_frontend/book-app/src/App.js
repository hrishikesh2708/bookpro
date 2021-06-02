import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./component/layout/navbar";
import Auth from "./component/layout/auth/auth";
// import Search from "./component/layout/search";
import Login from "./component/layout/auth/login";
// import Ser from "./component/layout/ser";
import Footer from "./component/layout/footer";
import { user_details } from "./action/user_details";
import { book_details } from "./action/book_action";
import { useDispatch } from "react-redux";
import { main } from "./component/componentCSS";
import NewHome from "./component/layout/home/NewHome";
import MyBook from "./component/layout/mybook";
import { withTheme } from "./component/Theme/theme";

function App(props) {
  const { darkmode, setDarkmode } = props;
  const classes = main();
  const dispatch = useDispatch();
  useEffect(() => {
    let token = localStorage.getItem("jwtToken");
    if (token !== null) {
      dispatch(user_details());
      dispatch(book_details());
    } else {
      dispatch(book_details());
    }
  }, [dispatch]);
  return (
    <>
      <BrowserRouter>
        <div className={classes.root}>
          <Navbar darkmode={darkmode} setDarkmode={setDarkmode} />
          <div className={classes.content}>
            <div className={classes.toolbar}>
              <Switch>
                <Route excat path="/mybooks" component={MyBook} />
                <Route excat path="/login" component={Login} />
                <Route excat path="/signup" component={Auth} />
                <Route excat path="/" component={NewHome} />
              </Switch>
            </div>
            <Footer />
          </div>
        </div>
        {/* 
       <Route excat path="/search" component={Search} />
      <Route excat path="/ser" component={Ser} /> */}
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}
export default withTheme(App);
