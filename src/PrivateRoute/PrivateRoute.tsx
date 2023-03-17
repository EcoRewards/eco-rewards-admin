import { Navigate, useLocation } from "react-router-dom";
import React from "react";

export const PrivateRoute = ({ auth, children }: any) => {
  const location = useLocation();
  return (
      auth.isAuthenticated ? children : <Navigate to= "/login" state={ location } />
  );
};
