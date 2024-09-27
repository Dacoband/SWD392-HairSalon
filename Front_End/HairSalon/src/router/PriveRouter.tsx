import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  element: React.ComponentType; // Thành phần cần hiển thị nếu role hợp lệ
  allowedRoles: number[]; // Các role được phép truy cập
}

// Component PrivateRoute kiểm tra role trước khi hiển thị trang
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element: Component,
  allowedRoles,
}) => {
  const userData = localStorage.getItem("userData"); // Lấy thông tin người dùng từ localStorage
  const userRole = userData ? JSON.parse(userData).role : null; // Kiểm tra role của người dùng

  // Kiểm tra nếu user có role và role đó nằm trong danh sách allowedRoles
  if (userRole && allowedRoles.includes(userRole)) {
    return <Component />; // Hiển thị component nếu role hợp lệ
  } else {
    return <Navigate to="/login" />; // Điều hướng nếu không có quyền
  }
};

export default PrivateRoute;
