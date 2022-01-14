import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./helpers/clientAuth";

const AdminRoute = ({ component: Component, ...rest }) => {
  console.log(isAuthenticated());
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAuthenticated().role === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin"/>
        )
      }
    />
  );
};

export default AdminRoute;
