import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock data người dùng
const users = [
  { name: "user", pass: "123", role: 1 },
  { name: "admin", pass: "123", role: 2 },
];

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Tìm kiếm người dùng dựa trên username và password
    const foundUser = users.find(
      (user) => user.name === username && user.pass === password
    );

    if (foundUser) {
      // Lưu dữ liệu người dùng vào localStorage
      localStorage.setItem("userData", JSON.stringify(foundUser));

      // Điều hướng dựa trên role
      if (foundUser.role === 1) {
        navigate("/role1");
      } else if (foundUser.role === 2) {
        navigate("/role2");
      }
    } else {
      alert("Sai tên người dùng hoặc mật khẩu!");
    }
  };

  return (
    <div>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Tên người dùng: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Mật khẩu: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};

export default Login;
