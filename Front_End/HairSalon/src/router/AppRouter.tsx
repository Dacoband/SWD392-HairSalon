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

import Login from "../pages/Login";
import PrivateRoute from "./PriveRouter";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        {/* Chỉ cho phép role 1 truy cập Role1 */}
        <Route
          path="/role1"
          element={<PrivateRoute element={Role1} allowedRoles={[1]} />}
        />

        {/* Chỉ cho phép role 2 truy cập Role2 */}
        <Route
          path="/role2"
          element={<PrivateRoute element={Role2} allowedRoles={[2]} />}
        />

        {/* Nếu không có quyền, người dùng sẽ bị điều hướng về trang chủ */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
