import React from "react";
import { Dropdown, Menu } from "antd";
import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

const HeaderSM: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token"); // Check if user is logged in

  const menu = (
    <Menu>
      <Menu.Item key="profile" onClick={() => navigate("/profile-Staff")}>
        Thông Tin Cá Nhân
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
    <div className="bg-white shadow-md h-16 flex items-center">
      <Row align="middle" className="w-full">
        <Col span={6} className="flex items-center">
          <a onClick={() => navigate("/homePage")}>
            <img
              src="src\assets\logo_mini-removebg-preview.png" // Make sure the path is correct
              className="h-12 ml-10" // Adjust height for a smaller header
              alt="Logo"
            />
          </a>
        </Col>
        <Col span={18}>
          <div className="flex justify-end items-center pr-12 h-full">
            {isLoggedIn ? ( // Show the dropdown if the user is logged in
              <Dropdown
                overlay={menu}
                trigger={["click"]}
                placement="bottomRight"
              >
                <a
                  className="flex hover:text-[#8e7424] items-center cursor-pointer ml-2"
                  onClick={(e) => e.preventDefault()}
                >
                  <UserOutlined style={{ fontSize: "24px" }} />
                </a>
              </Dropdown>
            ) : (
              // Show login link if the user is not logged in
              <a
                onClick={() => navigate("/login")}
                className="font-bold px-6 py-2 bg-[#000] hover:text-[#ffff] text-white rounded-full hover:bg-[#74601d]"
              >
                Login
              </a>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HeaderSM;
