import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = localStorage.getItem("jwtToken") === null ? false : true;
    // console.log(localStorage.getItem("jwtToken"))
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
