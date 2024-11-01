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
import ProfileAll from "../pages/ProfileAll/ProfileAll";
import Appointment from "../pages/customer/Appointment/Appointment";
import Contact from "../pages/Contact";
import Branch from "../pages/Branch";
import ManagerAppoimentStylish from "../pages/Stylish/ManagerAppoinmentStylish";
import ManagerMoney from "../pages/Stylish/ManagerMoney";
import profileCustomer from "../pages/customer/profileCustomer";
import LayoutSA from "../layout/LayoutSA";
import BookSucssess from "../pages/customer/BookSucssess";
import ManagerService from "../pages/admin/ManagerService";
import ManagerBranch from "../pages/admin/ManagerBranch";
import CategogySM from "../pages/StaffManager/CategogySM";
import LayoutSM from "../layout/LayoutSM";
import LayoutSL from "../layout/LayoutSL";
import CategogySL from "../pages/StaffStylish/CategogySL";

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
          <Route path="/homePage" element={<HomePage />} />
          {/* <Route
            path="/homePage"
            element={<PrivateRoute element={HomePage} allowedRoles={["MB"]} />}
          /> */}
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
            path="/profile"
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
        {/* StaffManager có layout */}
        <Route element={<LayoutSM />}>
          <Route
            path="/StaffManager"
            element={
              <PrivateRoute element={CategogySM} allowedRoles={["SM"]} />
            }
          />
        </Route>

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
        <Route element={<LayoutSL />}>
          <Route
            path="/StaffStylish"
            element={
              <PrivateRoute element={CategogySL} allowedRoles={["SL"]} />
            }
          />
        </Route>
        {/* ADMIN */}
        <Route element={<LayoutSA />}>
          <Route
            path="/manageService"
            element={
              <PrivateRoute element={ManagerService} allowedRoles={["SA"]} />
            }
          />
          <Route
            path="/ManagerBranch_AD"
            element={
              <PrivateRoute element={ManagerBranch} allowedRoles={["SA"]} />
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
