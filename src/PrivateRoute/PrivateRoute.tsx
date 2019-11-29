import { Redirect, Route } from "react-router-dom";
import React from "react";

export const PrivateRoute = ({ children, auth, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={ ({ location }) =>
        auth.isAuthenticated ? children : <Redirect to={{ pathname: "/login", state: { from: location } }} />
      }
    />
  );
};
