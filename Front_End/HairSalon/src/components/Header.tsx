import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex  p-4 border-b-2 border-gray-300 ">
      <Link to="/services">
        <div className="text-base font-bold mr-4">Services</div>
      </Link>
      <Link to="/bookAppoiment">
        <div className="text-base font-bold mr-4">Booking</div>
      </Link>
      <div
        className="text-base font-bold cursor-pointer"
        onClick={() => navigate("/logout")}
      >
        Logout
      </div>
    </div>
  );
};

export default Header;
