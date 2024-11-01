import React, { useState } from "react";
import { FaUserFriends, FaBuilding, FaCut } from "react-icons/fa";
import ManagerStylish from "./ManagerStylish";
import ManagerAppoimentStaff from "./ManagerAppoimentStaff";
import ManagerSchedule from "./ManagerSchedule";

const CategogySL: React.FC = () => {
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
              onClick={() => handleComponentChange("manageStylish")}
            >
              <FaUserFriends className="mr-3" />
              <span>Manage Stylish</span>
            </li>
            <li
              className="flex items-center p-2 hover:bg-[#b78c39] cursor-pointer"
              onClick={() => handleComponentChange("manageAppoinment")}
            >
              <FaBuilding className="mr-3" />
              <span>Manage Appointment</span>
            </li>
            <li
              className="flex items-center p-2 hover:bg-[#b78c39] cursor-pointer"
              onClick={() => handleComponentChange("manageSchedule")}
            >
              <FaCut className="mr-3" />
              <span>Manage Schedule</span>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-grow p-10 flex flex-col ml-48">
        {showWelcome && (
          <h2 className="text-3xl font-bold mb-3">
            Welcome to the Staff Stylish
          </h2>
        )}
        <div className="flex-grow h-full overflow-hidden">
          {activeComponent === "manageStylish" && (
            <div>
              <ManagerStylish />
            </div>
          )}
          {activeComponent === "manageAppoinment" && <ManagerAppoimentStaff />}
          {activeComponent === "manageSchedule" && <ManagerSchedule />}
        </div>
      </main>
    </div>
  );
};

export default CategogySL;
