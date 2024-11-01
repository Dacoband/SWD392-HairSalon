import React, { useState } from "react";
import {
  FaUserFriends,
  FaBuilding,
  FaCut,
  FaCalendarCheck,
} from "react-icons/fa";
import ManagerBranch from "./ManagerBranch";
import ManagerService from "../StaffManager/ManagerService"; // Import the ManagerService component

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
              onClick={() => handleComponentChange("manageStaff")}
            >
              <FaUserFriends className="mr-3" />
              <span>Manage Staff</span>
            </li>
            <li
              className="flex items-center p-2 hover:bg-[#b78c39] cursor-pointer"
              onClick={() => handleComponentChange("manageBranches")}
            >
              <FaBuilding className="mr-3" />
              <span>Manage Branches</span>
            </li>
            <li
              className="flex items-center p-2 hover:bg-[#b78c39] cursor-pointer"
              onClick={() => handleComponentChange("manageServices")}
            >
              <FaCut className="mr-3" />
              <span>Manage Services</span>
            </li>
            <li
              className="flex items-center p-2 hover:bg-[#b78c39] cursor-pointer"
              onClick={() => handleComponentChange("viewAppointments")}
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
          {activeComponent === "manageBranches" && <ManagerBranch />}
          {activeComponent === "manageStaff" && <div>Manage Staff Content</div>}
          {activeComponent === "manageServices" && <ManagerService />}
          {activeComponent === "viewAppointments" && (
            <div>View Appointments Content</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CategogySM;
