import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// import Role1 from "../pages/Role1";
import Dashboard from "../pages/StaffManager/Dashboard";
import ManagerStaff from "../pages/StaffManager/ManagerStaff";
import ManagerStylish from "../pages/StaffManager/ManagerStylish";
import ManagerAppointments from "../pages/StaffManager/ManagerAppointments";
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
import LayoutSA from "../layout/LayoutSA";
import BookSucssess from "../pages/customer/BookSucssess";
import ManagerService from "../pages/Admin/ManagerService";
import ManagerBranch from "../pages/Admin/ManagerBranch";

// import CategogySM from "../pages/StaffManager/CategogySM";
import LayoutSM from "../layout/LayoutSM";
import LayoutST from "../layout/LayoutST";
import LayoutSL from "../layout/LayoutSL";
import ManagerStylish_staff from "../pages/StaffStylish/ManagerStylish_staff.tsx";
import ManagerAppoimentStaff from "../pages/StaffStylish//ManagerAppoimentStaff";
import ManagerSchedule from "../pages/StaffStylish/ManagerSchedule";
// import CategogySL from "../pages/StaffStylish/CategogySL";
import ManagerStaff_AD from "../pages/Admin/ManagerStaffManger.tsx";
import ManagerAppointment_AD from "../pages/Admin/ManagerAppointment.tsx";
import ManagerStylist from "../pages/Admin/ManagetStylist.tsx";
import ManagerChart from "../pages/Admin/ManagerChart.tsx";
import ManagerStaffStylist_AD from "../pages/Admin/ManagerStaffStylist.tsx";
const AppRouter = () => {
  return (
    <Router>
      {/* GUEST */}
      <Routes>
        <Route path="/" element={<Navigate to="/homePage" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/logout" element={<Logout />} />
        {/* GUEST cÃ³ layout */}
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

          <Route
            path="/bookAppoiment"
            element={
              <PrivateRoute element={BookingPage} allowedRoles={["MB"]} />
            }
          />
          <Route
            path="/bookStatus"
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
              <PrivateRoute element={ProfileAll} allowedRoles={["MB"]} />
            }
          />
        </Route>
        {/* StaffManager route */}
        <Route element={<LayoutSM />}>
          <Route
            path="/StaffManager"
            element={<PrivateRoute element={Dashboard} allowedRoles={["SM"]} />}
          />
          <Route
            path="/managerstaff-staff"
            element={
              <PrivateRoute element={ManagerStaff} allowedRoles={["SM"]} />
            }
          />
          <Route
            path="/managerstaff-stylish"
            element={
              <PrivateRoute element={ManagerStylish} allowedRoles={["SM"]} />
            }
          />
          <Route
            path="/managerstaff-appoinment"
            element={
              <PrivateRoute
                element={ManagerAppointments}
                allowedRoles={["SM"]}
              />
            }
          />
        </Route>
        <Route element={<LayoutSM />}>
          <Route
            path="/profile-StaffManager"
            element={
              <PrivateRoute element={ProfileAll} allowedRoles={["SM"]} />
            }
          />
        </Route>
        <Route element={<LayoutMain />}>
          <Route path="/manage-appointments" element={<Appointment />} />
        </Route>
        {/* STYLISH */}
        <Route element={<LayoutSL />}>
          <Route
            path="/profile-Stylist"
            element={
              <PrivateRoute element={ProfileAll} allowedRoles={["SL"]} />
            }
          />
          <Route
            path="/Appoiment-Stylish"
            element={
              <PrivateRoute
                element={ManagerAppoimentStylish}
                allowedRoles={["SL"]}
              />
            }
          />

          <Route
            path="/manager-money"
            element={
              <PrivateRoute element={ManagerMoney} allowedRoles={["SL"]} />
            }
          />
        </Route>
        {/* StaffStylish */}
        <Route element={<LayoutST />}>
          <Route
            path="/StaffStylish"
            element={
              <PrivateRoute
                element={ManagerAppoimentStaff}
                allowedRoles={["ST"]}
              />
            }
          />
          <Route
            path="/staff-stylish"
            element={
              <PrivateRoute
                element={ManagerStylish_staff}
                allowedRoles={["ST"]}
              />
            }
          />
          <Route
            path="/managerSchedule"
            element={
              <PrivateRoute element={ManagerSchedule} allowedRoles={["ST"]} />
            }
          />
        </Route>
        <Route element={<LayoutST />}>
          <Route
            path="/profile-StaffStylist"
            element={
              <PrivateRoute element={ProfileAll} allowedRoles={["ST"]} />
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
          <Route
            path="/ManagerStaff_AD"
            element={
              <PrivateRoute element={ManagerStaff_AD} allowedRoles={["SA"]} />
            }
          />
          <Route
            path="/ManagerAppointment_AD"
            element={
              <PrivateRoute
                element={ManagerAppointment_AD}
                allowedRoles={["SA"]}
              />
            }
          />
          <Route
            path="/ManagerStylist_AD"
            element={
              <PrivateRoute element={ManagerStylist} allowedRoles={["SA"]} />
            }
          />
          <Route
            path="/ManagerChart_AD"
            element={
              <PrivateRoute element={ManagerChart} allowedRoles={["SA"]} />
            }
          />
          <Route
            path="/ManagerStaffStylist_AD"
            element={
              <PrivateRoute
                element={ManagerStaffStylist_AD}
                allowedRoles={["SA"]}
              />
            }
          />
        </Route>
        <Route element={<LayoutSA />}>
          <Route
            path="/profile-StaffAdmin"
            element={
              <PrivateRoute element={ProfileAll} allowedRoles={["SA"]} />
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
