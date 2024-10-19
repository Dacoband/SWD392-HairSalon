// src/AppRouter.jsx
// import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Role1 from "../pages/Role1";
import Role2 from "../pages/Role2";
import StaffManager from "../pages/StaffManager";
import Logout from "../components/Logout";
import LayoutMain from "../layout/LayoutMain";

import Login from "../pages/Login/Login";
import PrivateRoute from "./PriveRouter";
import HomePage from "../pages/Home/HomePage";
import Service from "../components/Service/Service";
import Contact from "../pages/Contact";
const AppRouter = () => {
  return (
    <Router>
      {/* GUEST */}
      <Routes>
        <Route path="/" element={<Navigate to="/homePage" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        <Route element={<LayoutMain />}>
          <Route
            path="/homePage"
            element={<PrivateRoute element={HomePage} allowedRoles={["MB"]} />}
          />
          <Route path="/homePage" element={<HomePage />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* ... */}

        <Route
          path="/SystemAdmin"
          element={<PrivateRoute element={Role2} allowedRoles={["SA"]} />}
        />
        {/* StaffManager route */}
        <Route
          path="/StaffManager"
          element={
            <PrivateRoute element={StaffManager} allowedRoles={["SM"]} />
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
