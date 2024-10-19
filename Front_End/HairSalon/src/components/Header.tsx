import React from "react";
import { Input, Dropdown, Menu } from "antd";
import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();

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
          <a className="flex items-center">
            <img
              src="src/assets/logo-removebg-preview.png"
              className="h-20"
              alt="Logo"
            />
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
              {/* Dropdown for Service List
              <ul className="dropdown absolute hidden group-hover:block bg-white shadow-lg z-10">
                <li>
                  <a className="block px-4 py-2 font-bold">Danh Sách Dịch Vụ</a>
                </li>
                <li>
                  <a className="block px-4 py-2 font-bold">Chi Tiết Dịch Vụ</a>
                </li>
              </ul> */}
            </div>
            <a
              onClick={() => navigate("/branch")}
              className="hover:text-gray-500 font-bold cursor-pointer"
            >
              Chia Nhánh
            </a>
            <button
              className="font-bold px-6 py-2 bg-[#8e7424] text-white rounded-full hover:bg-[#74601d]"
              onClick={() => {
                const userData = JSON.parse(
                  localStorage.getItem("userData") || "{}"
                );

                if (userData && userData.role === "MB") {
                  navigate("/service");
                } else {
                  navigate("/login");
                }
              }}
            >
              Đặt Lịch Hẹn Ngay!
            </button>
            <Dropdown
              overlay={menu}
              trigger={["click"]}
              placement="bottomRight"
            >
              <a
                className="flex items-center cursor-pointer ml-4"
                onClick={(e) => e.preventDefault()}
              >
                <UserOutlined style={{ fontSize: "24px" }} />
              </a>
            </Dropdown>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
