import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Switch, Route, BrowserRouter, HashRouter } from "react-router-dom";
import Navbar from "./component/layout/navbar";
import Auth from "./component/layout/auth/auth";
// import Search from "./component/layout/search";
import Login from "./component/layout/auth/login";
// import Ser from "./component/layout/ser";
// import PrivateRoute from './PrivateRoute'
import Footer from "./component/layout/footer";
import { user_details } from "./action/user_details";
import { book_details } from "./action/book_action";
import { useDispatch } from "react-redux";
import NewHome from "./component/layout/home/NewHome";
import MyBook from "./component/layout/mybook";
import { withTheme } from "./component/Theme/theme";
import { makeStyles } from "@material-ui/core/styles";
const main = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "row",
    backgroundColor: theme.palette.background.default,
  },
  content: {
    flexGrow: 1,
    margin: theme.spacing(8, 0, 8, 0),
    padding: theme.spacing(0, 1, 1, 0),
    // marginLeft: -drawerWidth,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    // padding: theme.spacing(0, 0, 0, 6),
    ...theme.mixins.toolbar,
  },
}));

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
      <HashRouter>
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
      </HashRouter>
      <ToastContainer />
    </>
  );
}
export default withTheme(App);
