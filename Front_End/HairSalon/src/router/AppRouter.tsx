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

import Login from "../pages/Login/Login";
import PrivateRoute from "./PriveRouter";
import ServicesPage from "../pages/ServicesPage";
import BookPage from "../pages/customer/BookPage";
const AppRouter = () => {
  return (
    <Router>
      {/* GUEST */}
      <Routes>
        <Route element={<LayoutMain />}>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          {/* <Route path="/services" element={<ServicesPage />} /> */}
          {/* <Route path="/bookAppoiment" element={<BookPage />} /> */}
        </Route>

        {/* Guest có header-footer */}
        <Route element={<LayoutMain />}>
          <Route path="/home" element={<Role1 />} />
        </Route>

        <Route element={<LayoutMain />}>
          <Route
            path="/home"
            element={<PrivateRoute element={Role1} allowedRoles={["MB"]} />}
          />
          <Route
            path="/services"
            element={
              <PrivateRoute element={ServicesPage} allowedRoles={["MB"]} />
            }
          />
          <Route
            path="/bookAppoiment"
            element={<PrivateRoute element={BookPage} allowedRoles={["MB"]} />}
          />
        </Route>

        {/* ... */}

        <Route
          path="/SystemAdmin"
          element={<PrivateRoute element={Role2} allowedRoles={["SA"]} />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
