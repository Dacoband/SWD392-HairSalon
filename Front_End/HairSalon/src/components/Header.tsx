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
          <ul className="flex space-x-20 text-black text-sm ">
            <li onClick={() => navigate("/homePage")}>
              <a className="hover:text-gray-500">Trang Chủ</a>
            </li>
            <li className="group relative">
              <a className="Service hover:text-gray-500">Danh Sách Dịch Vụ</a>
              {/* Dropdown for Service List */}
              <ul className="dropdown absolute flex justify-center text-center hidden group-hover:block bg-white shadow-lg z-10">
                <li className="">
                  <a className="block px-4 py-2 ">Danh Sách Dịch Vụ</a>
                </li>
                <li>
                  <a className="block px-4 py-2 ">Chi Tiết Dịch Vụ</a>
                </li>
              </ul>
            </li>
            <li onClick={() => navigate("/contact")}>
              <a className="hover:text-gray-500">Liên Hệ</a>
            </li>
            <li>
              <button
                className=" middle pb-3 px-6 py-3 bg-[#8e7424] text-white rounded rounded-full hover:bg-[#74601d] "
                onClick={() => navigate("/service")}
              >
                Đặt Lịch Hẹn Ngay!
              </button>
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
