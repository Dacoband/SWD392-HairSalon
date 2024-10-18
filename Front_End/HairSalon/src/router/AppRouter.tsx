// src/AppRouter.jsx
// import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// import Role1 from "../pages/Role1";
import Role2 from "../pages/Role2";
import Logout from "../components/Logout";
import LayoutMain from "../layout/LayoutMain";
import BookingPage from "../pages/customer/BookPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PriveRouter";
import HomePage from "../pages/Home/HomePage";
import ServicesPage from "../pages/ServicesPage";
import Service from "../components/Service/Service";
import Contact from "../pages/Contact";
const AppRouter = () => {
  return (
    <Router>
      {/* GUEST */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/logout" element={<Logout />} />
        <Route element={<LayoutMain />}>
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route element={<LayoutMain />}>
          <Route
            path="/homePage"
            element={<PrivateRoute element={HomePage} allowedRoles={["MB"]} />}
          />
          <Route
            path="/bookAppoiment"
            element={
              <PrivateRoute element={BookingPage} allowedRoles={["MB"]} />
            }
          />
          <Route path="/service" element={<Service />} />
          <Route
            path="/servicePage"
            element={
              <PrivateRoute element={ServicesPage} allowedRoles={["MB"]} />
            }
          />
          <Route path="/service" element={<Service />} />
        </Route>

        <Route
          path="/SystemAdmin"
          element={<PrivateRoute element={Role2} allowedRoles={["SA"]} />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
