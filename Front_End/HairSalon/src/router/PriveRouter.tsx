import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  element: React.ComponentType;
  allowedRoles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element: Component,
  allowedRoles,
}) => {
  const userData = localStorage.getItem("userData");
  const userRole = userData ? JSON.parse(userData).roleName : null;

  if (userRole && allowedRoles.includes(userRole)) {
    return <Component />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
