import React from "react";
import { Dropdown, Menu } from "antd";
import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

const HeaderSM: React.FC = () => {
  const navigate = useNavigate();

  const userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")!) : null;

  const menu = (
    <Menu>
      
      {userData?.roleName && (
        <Menu.Item
        
          key="profile"
          onClick={() => { 
            if (userData.roleName === "ST") {
              navigate("/profile-StaffStylist");
            } else if (userData.roleName === "SL") {
              navigate("/profile-Stylist");
            } else if (userData.roleName === "SM") {
              navigate("/profile-StaffManager")
            } else if (userData.roleName === "SA") {
              navigate("/profile-StaffAdmin");
            }
          }}
        >
          Thông Tin Cá Nhân
        </Menu.Item>
      )}
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
        <Col span={4} className="flex items-center">
          <a>
            <img
              src="src\assets\logo_mini-removebg-preview.png" // Make sure the path is correct
              className="h-12 ml-16" // Adjust height for a smaller header
              alt="Logo"
            />
          </a>
        </Col>
        <Col span={20}>
          <div className="flex justify-end items-center pr-12 h-full">
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
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HeaderSM;
