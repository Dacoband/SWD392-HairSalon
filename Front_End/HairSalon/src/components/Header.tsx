import React from "react";
import { Input, Dropdown, Menu } from "antd";
import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token"); // Check if user is logged in

  const menu = (
    <Menu>
      <Menu.Item key="profile" onClick={() => navigate("/profile")}>
        Thông Tin Cá Nhân
      </Menu.Item>
      <Menu.Item
        key="manageAppointments"
        onClick={() => navigate("/manage-appointments")}
      >
        Đơn Đặt Lịch Hẹn
      </Menu.Item>
      <Menu.Item
        key="logout"
        onClick={() => {
          localStorage.removeItem("userData");
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        Đăng Xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="bg-white shadow-md p-1">
      <Row align="middle">
        <Col span={8}>
          <a
            className="flex items-center"
            onClick={() => navigate("/homePage")}
          >
            <img
              src="src/assets/logo_mini-removebg-preview.png"
              className="h-20 ml-10"
              alt="Logo"
            />
          </a>
        </Col>
        <Col span={16}>
          <div className="flex justify-evenly items-center pr-10">
            <a
              onClick={() => navigate("/homePage")}
              className="hover:text-[#8e7424] font-bold cursor-pointer"
            >
              Trang Chủ
            </a>
            <a
              className="Service hover:text-[#8e7424] font-bold cursor-pointer"
              onClick={() => navigate("/servicePage")}
            >
              Danh Sách Dịch Vụ
            </a>
            <a
              onClick={() => navigate("/branch")}
              className="hover:text-[#8e7424] font-bold cursor-pointer"
            >
              Chi Nhánh
            </a>
            <button
              className="font-bold px-6 py-2 bg-[#8e7424] text-white rounded-full hover:bg-[#74601d]"
              onClick={() => {
                navigate("/bookAppoiment");
              }}
            >
              Đặt Lịch Hẹn Ngay!
            </button>
            {isLoggedIn && ( // Show the dropdown only if the user is logged in
              <Dropdown
                overlay={menu}
                trigger={["click"]}
                placement="bottomRight"
              >
                <a
                  className="flex hover:text-[#8e7424] items-center cursor-pointer ml-4"
                  onClick={(e) => e.preventDefault()}
                >
                  <UserOutlined style={{ fontSize: "24px" }} />
                </a>
              </Dropdown>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
