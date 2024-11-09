import React from "react";
import { Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import "../App.css";
import {
  MenuUnfoldOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  LineChartOutlined,
  TeamOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import HeaderSM from "../components/HeaderSM";
import { FaCircleUser } from "react-icons/fa6";

const { Content, Sider } = Layout;

// Dữ liệu Sidebar
const SidebarData = [
  {
    icon: LineChartOutlined,
    heading: "Bảng thống kê",
    navigate: "/ManagerChart_AD",
  },
  {
    icon: ScheduleOutlined,
    heading: "Quản lí lịch hẹn",
    navigate: "/ManagerAppointment_AD",
  },
  {
    icon: MenuUnfoldOutlined,
    heading: "Quản lí dịch vụ",
    navigate: "/manageService",
  },
  {
    icon: ShopOutlined,
    heading: "Quản lí chi nhánh",
    navigate: "/ManagerBranch_AD",
  },
  {
    icon: UserOutlined,
    heading: "Nhân viên quản lí ",
    navigate: "/ManagerStaff_AD",
  },

  {
    icon: TeamOutlined,
    heading: "Nhân viên",
    navigate: "/ManagerStaffStylist_AD",
  },
  {
    icon: UsergroupAddOutlined,
    heading: "Stylish",
    navigate: "/ManagerStylist_AD",
  },
];

const LayoutSA: React.FC = () => {
  const navigate = useNavigate();

  const items = SidebarData.map((item, index) => ({
    key: String(index + 1),
    icon: React.createElement(item.icon),
    label: item.heading,
    onClick: () => navigate(item.navigate),
  }));

  return (
    <Layout className="w-full h-screen flex flex-col ">
      <HeaderSM />
      <Layout className="flex flex-1 ">
        <Sider
          className="h-full bg-[#c89c47]"
          breakpoint="lg"
          collapsedWidth="0"
          // onBreakpoint={(broken) => {
          //   console.log(broken);
          // }}
          // onCollapse={(collapsed, type) => {
          //   console.log(collapsed, type);
          // }}
        >
          <div className="mt-10">
            <FaCircleUser className="text-white mx-auto " size={70} />
            <div className="text-white font-bold text-center text-lg">
              Admin
            </div>
          </div>
          <Menu
            className="bg-[#c89c47] text-white font-medium  mt-5 custom-menu"
            theme="dark"
            defaultSelectedKeys={["1"]}
            items={items}
          />
        </Sider>
        <Layout>
          <Content className="p-6 bg-gray-100 overflow-y-auto h-full">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutSA;
