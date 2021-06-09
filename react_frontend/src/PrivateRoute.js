import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  let pri = "";
  let token = localStorage.getItem("jwtToken");
  React.useEffect(() => {
    
    if (token !== null) {
      pri = true
      console.log("if",token, pri);
    } else {
      pri = false
      console.log("else",token, pri);
    }
  }, [pri]);
  return (
    <Route
      {...rest}
      render={(props) =>
        pri ? (
          <>
          {console.log(token, pri)}
          <Component {...props} />
          </>
        ) : (
          <>
          {console.log(token, pri)}
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
          </>
 
        )
      }
    />
  );
};

export default PrivateRoute;
