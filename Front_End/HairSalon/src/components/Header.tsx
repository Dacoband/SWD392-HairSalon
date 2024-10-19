import React from "react";
import { Input } from "antd";
import type { GetProps } from "antd";
import "./Header.scss";
type SearchProps = GetProps<typeof Input.Search>;
import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
// const { Search } = Input;

// const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
//   console.log(info?.source, value);

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-md p-1">
      <Row align="middle">
        <Col span={8}>
          <a className="flex items-center">
            <img src="src\assets\logo-removebg-preview.png" className="h-20 " />
          </a>
        </Col>
        <Col span={16}>
          <div className="flex justify-evenly items-center pr-10">
            <a
              onClick={() => navigate("/homePage")}
              className="hover:text-gray-500 font-bold cursor-pointer"
            >
              Trang Chủ
            </a>
            <div className="relative group">
              <a className="Service hover:text-gray-500 font-bold cursor-pointer">
                Danh Sách Dịch Vụ
              </a>
              {/* Dropdown for Service List */}
              <ul className="dropdown absolute hidden group-hover:block bg-white shadow-lg z-10">
                <li>
                  <a className="block px-4 py-2 font-bold">Danh Sách Dịch Vụ</a>
                </li>
                <li>
                  <a className="block px-4 py-2 font-bold">Chi Tiết Dịch Vụ</a>
                </li>
              </ul>
            </div>
            <a
              onClick={() => navigate("/contact")}
              className="hover:text-gray-500 font-bold cursor-pointer"
            >
              Liên Hệ
            </a>
            <button
              className="font-bold px-6 py-2 bg-[#8e7424] text-white rounded-full hover:bg-[#74601d]"
              onClick={() => {
                // Get the user data from localStorage
                const userData = JSON.parse(
                  localStorage.getItem("userData") || "{}"
                );
    
                // Check if the user is logged in and has the role "MB"
                if (userData && userData.role === "MB") {
                  navigate("/service");
                } else {
                  // If not logged in or not an "MB" role, navigate to /login
                  navigate("/login");
                }
              }}
            >
              Đặt Lịch Hẹn Ngay!
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
