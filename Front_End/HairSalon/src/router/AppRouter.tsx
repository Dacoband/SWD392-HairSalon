// src/AppRouter.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Role1 from "../pages/Role1";
import Role2 from "../pages/Role2";
import Logout from "../components/Logout";
import LayoutMain from "../layout/LayoutMain";

import Login from "../pages/Login";
import PrivateRoute from "./PriveRouter";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route element={<LayoutMain />}>
          <Route
            path="/Member"
            element={<PrivateRoute element={Role1} allowedRoles={["MB"]} />}
          />
        </Route>

        <Route
          path="/SystemAdmin"
          element={<PrivateRoute element={Role2} allowedRoles={["AD"]} />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
