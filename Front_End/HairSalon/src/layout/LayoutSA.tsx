import React from "react";
import { Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

import {
  PieChartOutlined,
  MenuUnfoldOutlined,
  ShoppingCartOutlined,
  BellOutlined,
} from "@ant-design/icons";

const { Content, Sider } = Layout;

// Dữ liệu Sidebar
const SidebarData = [
  {
    icon: PieChartOutlined,
    heading: "About",
    navigate: "/student/profile-student",
  },
  {
    icon: MenuUnfoldOutlined,
    heading: "Quản lí dịch vụ",
    navigate: "/manageService",
  },
  {
    icon: ShoppingCartOutlined,
    heading: "Quản lí khu vực",
    navigate: "/ManagerBranch_AD",
  },
  {
    icon: BellOutlined,
    heading: "Manager Subscription",
    navigate: "/student/profile-student/subscription-student",
  },
];

const LayoutSA: React.FC = () => {
  const navigate = useNavigate();

  // Tạo các items cho Menu với sự kiện onClick để điều hướng
  const items = SidebarData.map((item, index) => ({
    key: String(index + 1),
    icon: React.createElement(item.icon),
    label: item.heading,
    onClick: () => navigate(item.navigate), // Sử dụng navigate để điều hướng
  }));

  return (
    <Layout>
      <Sider
        className="h-screen"
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutSA;
