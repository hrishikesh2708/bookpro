import React, {useEffect} from "react";
import { Container } from "@material-ui/core";
import { Switch, Route , HashRouter } from "react-router-dom";
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
import { book_details } from "./action/book_action";
import { useDispatch } from "react-redux";
import { main } from "./component/componentCSS";
import NewHome from "./component/layout/home/NewHome";


function App() {
  const classes = main();
  const dispatch = useDispatch();
  // dispatch(book_details());
  // let token = localStorage.getItem("jwtToken");
  // if(token !== null){
  //  dispatch(user_details());
  // }
  useEffect(() => {
    let token = localStorage.getItem("jwtToken");
    if(token !== null){
     dispatch(user_details());
     dispatch(book_details());
    }else{
     dispatch(book_details());
    }
  }, [dispatch])
  return (
    <HashRouter>
      <Container maxWidth="lg" className={classes.root}>
        <Navbar />
         <Switch>
        {/* <Route path="/" exact component={Navbar} /> */}
          <Route path="/home" excat component={NewHome} />
          <Route path="/auth" excat component={Auth} />
        </Switch>
        {/* <Route excat path="/page" component={NewHome} /> */}
        <Route excat path="/search" component={Search} />
        <Route excat path="/ser" component={Ser} />
        <Route excat path="/add" component={Add} />
        <Route excat path="/modify" component={Modify} />
        <Route excat path="/login" component={Login} />
      </Container>
      <Footer/>
    </HashRouter>
  );
}
export default App;
