import React, { useState } from "react";
import {
  FaUserFriends,
  FaBuilding,
  FaCut,
  FaCalendarCheck,
} from "react-icons/fa";
import Dashboard from "./Dashboard";
import ManagerStaff from "./ManagerStaff";
import ManagerStylish from "./ManagerStylish";
import ManagerAppointments from "./ManagerAppointments";

const CategogySM: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>("");
  const [showWelcome, setShowWelcome] = useState<boolean>(true);

  const handleComponentChange = (component: string) => {
    setActiveComponent(component);
    setShowWelcome(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-48 bg-[#c89c47] text-white shadow-lg fixed h-screen">
        <div className="p-5 text-2xl font-bold">Hair Salon Management</div>
        <nav className="mt-10">
          <ul>
            <li
              className="flex items-center p-2 hover:bg-[#b78c39] cursor-pointer"
              onClick={() => handleComponentChange("dashboard")}
            >
              <FaBuilding className="mr-3" />
              <span>Dashboard</span>
            </li>
            <li
              className="flex items-center p-2 hover:bg-[#b78c39] cursor-pointer"
              onClick={() => handleComponentChange("managerStaffStylish")}
            >
              <FaCut className="mr-3" />
              <span>Manager Staff</span>
            </li>
            <li
              className="flex items-center p-2 hover:bg-[#b78c39] cursor-pointer"
              onClick={() => handleComponentChange("managerStylish")}
            >
              <FaCut className="mr-3" />
              <span>Manager Stylish</span>
            </li>
            <li
              className="flex items-center p-2 hover:bg-[#b78c39] cursor-pointer"
              onClick={() => handleComponentChange("appointments")}
            >
              <FaCalendarCheck className="mr-3" />
              <span>View Appointments</span>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-grow p-10 flex flex-col ml-48">
        {showWelcome && (
          <h2 className="text-3xl font-bold mb-3">
            Welcome to the Staff Management
          </h2>
        )}
        <div className="flex-grow h-full overflow-hidden">
          {activeComponent === "dashboard" && <Dashboard />}
          {activeComponent === "managerStaffStylish" && <ManagerStaff />}
          {activeComponent === "managerStylish" && <ManagerStylish />}
          {activeComponent === "appointments" && <ManagerAppointments />}
        </div>
      </main>
    </div>
  );
};

export default CategogySM;
