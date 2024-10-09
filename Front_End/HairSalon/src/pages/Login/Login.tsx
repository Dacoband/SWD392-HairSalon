import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import { FaUserAlt, FaLock, FaGoogle } from "react-icons/fa";

// Mock users for demo purposes
const users = [
  { name: "user", pass: "123", role: "MB" },
  { name: "admin", pass: "123", role: "SA" },
];

const InputField = ({ label, type, value, onChange, icon: Icon }: any) => (
  <div className="form-group modern-input">
    <Icon className="input-icon" />
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={label}
      className="input-style"
      required
    />
  </div>
);

const SignInForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const foundUser = users.find(user => user.name === username && user.pass === password);

    if (foundUser) {
      localStorage.setItem('userData', JSON.stringify(foundUser));
      navigate(`/${foundUser.role}`);
    } else {
      alert('Incorrect username or password!');
    }
  };

  const handleForgotPassword = () => {
    alert('Forgot password functionality not implemented yet.');
  };

  const handleGoogleLogin = () => {
    alert('Login with Google functionality not implemented yet.');
  };

  return (
    <form className="sign-in-form" onSubmit={handleLogin}>
      <h1 className="greeting">Hello</h1>
      <p className="prompt">Sign in to Hair salon or <a href="#" className="sign-up-link">create an account</a></p>
      <InputField
        label="Username"
        type="text"
        value={username}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
        icon={FaUserAlt}
      />
      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        icon={FaLock}
      />
      <a onClick={handleForgotPassword} className="forgot-password">FORGOT PASSWORD</a>
      <button type="submit" className="sign-in-button">Sign In</button>

      <div className="divider">
        <hr className="divider-line" />
        <span>Or continue</span>
        <hr className="divider-line" />
      </div>

      <button type="button" className="google-login-button" onClick={handleGoogleLogin}>
      <FaGoogle className="google-icon" /> Log in with Google
      </button>
    </form>
  );
};

const Footer = () => (
  <footer className="footer">
    <div className="social-links">
      <a href="#">Facebook</a>
      <a href="#">Twitter</a>
      <a href="#">Instagram</a>
      <a href="#">Pinterest</a>
    </div>
    <div className="footer-infor">
    <div className="footer-section">
      <h2 className="salon-name">HAIR SALON</h2>
    </div>
    <div className="footer-section">
      <p className="salon-description">
        Welcome to Hair Salon, A Premier Destination For Men's Grooming, Where Style Meets Sophistication. Whether You're Looking For A Classic Cut, Modern Trend, Or A Clean Shave, We Provide A Comfortable And Relaxing Environment To Ensure You Leave Feeling Confident And Refreshed.
      </p>
    </div>
    </div>
  </footer>
);


const SignInPage = () => {
  return (
    <div className="sign-in-page" >
      <SignInForm />
      {/* <Footer /> */}
    </div>
  );
};

export default SignInPage;





// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// // Mock data người dùng
// const users = [
//   { name: "user", pass: "123", role: "MB" },
//   { name: "admin", pass: "123", role: "SA" },
// ];

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // Tìm kiếm người dùng dựa trên username và password
//     const foundUser = users.find(
//       (user) => user.name === username && user.pass === password
//     );

//     if (foundUser) {
//       // Lưu dữ liệu người dùng vào localStorage
//       localStorage.setItem("userData", JSON.stringify(foundUser));

//       if (foundUser.role === "SA") {
//         navigate("/SystemAdmin");
//       } else if (foundUser.role === "SM") {
//         navigate("/StaffManager");
//       } else if (foundUser.role === "SL") {
//         navigate("/StaffStylelist");
//       } else if (foundUser.role === "ST") {
//         navigate("/Stylelist");
//       } else if (foundUser.role === "MB") {
//         navigate("/Member");
//       }
//     } else {
//       alert("Sai tên người dùng hoặc mật khẩu!");
//     }
//   };

//   return (
//     <div>
//       <h2>Đăng nhập</h2>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Tên người dùng: </label>
//           <input
//             id="username"
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="mt-1 p-2 border border-gray-300 rounded-md w-80"
//             required
//           />
//         </div>
//         <div>
//           <label>Mật khẩu: </label>
//           <input
//             id="password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="mt-1 p-2 border border-gray-300 rounded-md w-80"
//             required
//           />
//         </div>
//         <button className="w-80 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
//           {" "}
//           Đăng nhập
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
