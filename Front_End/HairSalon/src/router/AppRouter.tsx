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
import StaffManager from "../pages/StaffManager";
import Logout from "../components/Logout";
import LayoutMain from "../layout/LayoutMain";
import BookingPage from "../pages/customer/BookPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PriveRouter";
import HomePage from "../pages/Home/HomePage";
import ServicesPage from "../pages/ServicesPage";
import ProfileAll from "../pages/ProfileAll";
import Appointment from "../pages/customer/Appointment/Appointment";
import Contact from "../pages/Contact";
import Branch from "../pages/Branch";
import ManagerAppoimentStylish from "../pages/Stylish/ManagerAppoinmentStylish";
import ManagerMoney from "../pages/Stylish/ManagerMoney";
import ManagerAppoimentStaff from "../pages/StaffStylish/ManagerAppoimentStaff";
import ManagerStylish from "../pages/StaffStylish/ManagerStylish";
import profileCustomer from "../pages/customer/profileCustomer";
import BookSucssess from "../pages/customer/BookSucssess";
import ManagerService from "../pages/admin/ManagerService";
const AppRouter = () => {
  return (
    <Router>
      {/* GUEST */}
      <Routes>
        <Route path="/" element={<Navigate to="/homePage" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/logout" element={<Logout />} />
        {/* GUEST có layout */}
        <Route element={<LayoutMain />}>
          <Route path="/" element={<Navigate to="/homePage" />} />
          <Route path="/homePage" element={<HomePage />} />
          <Route path="/servicePage" element={<ServicesPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/branch" element={<Branch />} />
        </Route>
        {/* CUSTOMER */}
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
          <Route
            path="/bookSucssess"
            element={
              <PrivateRoute element={BookSucssess} allowedRoles={["MB"]} />
            }
          />

          <Route
            path="/servicePage"
            element={
              <PrivateRoute element={ServicesPage} allowedRoles={["MB"]} />
            }
          />
          <Route
            path="/manage-appointments"
            element={
              <PrivateRoute element={Appointment} allowedRoles={["MB"]} />
            }
          />
          <Route
            path="/profile-customer"
            element={
              <PrivateRoute element={profileCustomer} allowedRoles={["MB"]} />
            }
          />
        </Route>
        {/* ADMIN */}
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
        {/* STYLISH */}
        <Route element={<LayoutMain />}>
          <Route
            path="/profile"
            element={
              <PrivateRoute element={ProfileAll} allowedRoles={["ST"]} />
            }
          />
          <Route
            path="/Appoiment-Stylish"
            element={
              <PrivateRoute
                element={ManagerAppoimentStylish}
                allowedRoles={["ST"]}
              />
            }
          />

          <Route
            path="/manager-money"
            element={
              <PrivateRoute element={ManagerMoney} allowedRoles={["ST"]} />
            }
          />
          <Route path="/manage-appointments" element={<Appointment />} />
        </Route>
        {/* StaffStylish */}
        <Route element={<LayoutMain />}>
          <Route
            path="/profile"
            element={
              <PrivateRoute element={ProfileAll} allowedRoles={["SL"]} />
            }
          />
          <Route
            path="/Appoiment-Staff"
            element={
              <PrivateRoute
                element={ManagerAppoimentStaff}
                allowedRoles={["SL"]}
              />
            }
          />
          <Route
            path="/Manager-stylish"
            element={
              <PrivateRoute element={ManagerStylish} allowedRoles={["SL"]} />
            }
          />
        </Route>
        {/* ADMIN */}
        <Route element={<LayoutMain />}>
          <Route
            path="/manageService"
            element={
              <PrivateRoute element={ManagerService} allowedRoles={["AD"]} />
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
