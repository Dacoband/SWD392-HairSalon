import React, { useState } from "react";
import { Input, Dropdown, Menu } from "antd";
import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token"); // Check if token exists in localStorage
  const [searchTerm, setSearchTerm] = useState<string>(""); // Thêm trạng thái cho từ khóa tìm kiếm

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // Thực hiện hành động tìm kiếm ở đây, ví dụ: navigate đến trang kết quả tìm kiếm
  };

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
        <Col span={6}>
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
        <Col span={12}>
          <div className="flex justify-evenly items-center pr-10">
            <div className="items-center text-center">
              <a
                onClick={() => navigate("/homePage")}
                className="hover:text-[#8e7424] font-bold cursor-pointer pr-20 pl-20"
              >
                Trang Chủ
              </a>
              <a
                className="hover:text-[#8e7424] font-bold cursor-pointer pr-20"
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
            </div>
          </div>
        </Col>
        <Col span={6} className="flex items-center">
          <Input
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={handleSearchChange}
            prefix={<SearchOutlined style={{ fontSize: "20px", marginRight: "15px" }} />}
            className="search-input"
          />
          <button
            className="book-button"
            onClick={() => navigate("/bookAppoiment")}
          >
            Đặt Lịch
          </button>
          {isLoggedIn ? (
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
            <a
              onClick={() => navigate("/login")}
              className="font-bold px-6 py-2 bg-[#000] hover:text-[#ffff] text-white rounded-full hover:bg-[#74601d]"
            >
              Login
            </a>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Header;
