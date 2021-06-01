import React, { useEffect } from "react";
import { Container, CssBaseline } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
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
import { withTheme } from "./component/Theme/theme";
import {
  add_book_commit,
  modify_book_commit,
  delete_book_commit,
} from "./action/book_action";
import toasting from "./toast/toast";
import { EventSourcePolyfill } from "event-source-polyfill";

function App(props) {
  const { darkmode, setDarkmode } = props;
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
  // useEffect(() => {
  //   // console.log("props" , props.event)
  //   let eventSource = new EventSourcePolyfill(
  //     `${process.env.REACT_APP_LOCALHOST}/api/stream`,
  //     {
  //       headers: {
  //         Authorization: localStorage.getItem("jwtToken"),
  //       },
  //     }
  //   );
  //   eventSource.onopen = (e) => {
  //     console.log("client name ", e);
  //   };
  //   eventSource.onmessage = (e) => {
  //     let res = JSON.parse(e.data);
  //     console.log("data sent by server  ", Object.keys(res)[0]);
  //     switch (Object.keys(res)[0]) {
  //       case "book_added":
  //         console.log(res.book_added, "book_added");
  //         dispatch(add_book_commit(res.book_added));
  //         toasting("success", " New book added by different user!!");
  //         break;
  //       case "book_edited":
  //         console.log(res.book_edited, "book_edited");
  //         dispatch(modify_book_commit(res.book_edited));
  //         toasting("success", "Book was recently updated by different user");
  //         break;
  //       case "book_deleted":
  //         console.log(res.book_deleted, "book_deleted");
  //         dispatch(delete_book_commit(res.book_deleted));
  //         toasting("success", "Book was deleted by different user");
  //         break;
  //       case "private_book":
  //         console.log(res.private_book, "private_book");
  //         break;
  //       default:
  //         break;
  //     }
  //   };
  //   eventSource.onerror = (e) => {
  //     console.log("no response from server");
  //   };
  //   return() => {
  //     eventSource.close()
  //   }
  // }, []);
  return (
    <>
    <BrowserRouter>
      <div className={classes.root}>
        <Navbar darkmode={darkmode} setDarkmode={setDarkmode} />
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
      </div>

      {/* <Route excat path="/search" component={Search} />
      <Route excat path="/ser" component={Ser} />
      <Route excat path="/add" component={Add} /> */}
      {/* <Route excat path="/mybooks" component={MyBook} /> */}
      {/* <Route excat path="/modify" component={Modify} /> */}
    </BrowserRouter>
    <ToastContainer/>
    </>
  );
}
export default withTheme(App);
