import React from "react";
import {
  FaUserFriends,
  FaBuilding,
  FaCut,
  FaCalendarCheck,
} from "react-icons/fa";

const StaffManager = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#c89c47] text-white shadow-lg">
        <div className="p-5 text-2xl font-bold">Hair Salon Management</div>
        <nav className="mt-10">
          <ul>
            <li className="flex items-center p-2 hover:bg-[#b78c39] cursor-pointer">
              <FaUserFriends className="mr-3" />
              <span>Manage Staff</span>
            </li>
            <li className="flex items-center p-2 hover:bg-[#b78c39] cursor-pointer">
              <FaBuilding className="mr-3" />
              <span>Manage Branches</span>
            </li>
            <li className="flex items-center p-2 hover:bg-[#b78c39] cursor-pointer">
              <FaCut className="mr-3" />
              <span>Manage Services</span>
            </li>
            <li className="flex items-center p-2 hover:bg-[#b78c39] cursor-pointer">
              <FaCalendarCheck className="mr-3" />
              <span>View Appointments</span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-10">
        <h2 className="text-3xl font-bold mb-6">
          Welcome to the Staff Management
        </h2>
      </main>
    </div>
  );
};

export default StaffManager;
