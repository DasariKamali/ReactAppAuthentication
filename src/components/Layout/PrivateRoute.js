// src/components/Layout/PrivateRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useIsAuthenticated } from "@azure/msal-react";
import { GlobalStateContext } from "../../contexts/GlobalStateContext";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();
  const { stateObj } = useContext(GlobalStateContext);

  if (!isAuthenticated || !stateObj || Object.keys(stateObj).length === 0) {
    return <Navigate to="/authentication/sign-in" />;
  }

  return children;
};
export default PrivateRoute;
