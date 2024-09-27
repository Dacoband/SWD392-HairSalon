import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock data người dùng
const users = [
  { name: "user", pass: "123", role: "MB" },
  { name: "admin", pass: "123", role: "SA" },
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

      if (foundUser.role === "SA") {
        navigate("/SystemAdmin");
      } else if (foundUser.role === "SM") {
        navigate("/StaffManager");
      } else if (foundUser.role === "SL") {
        navigate("/StaffStylelist");
      } else if (foundUser.role === "ST") {
        navigate("/Stylelist");
      } else if (foundUser.role === "MB") {
        navigate("/Member");
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
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-80"
            required
          />
        </div>
        <div>
          <label>Mật khẩu: </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-80"
            required
          />
        </div>
        <button className="w-80 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
          {" "}
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default Login;
