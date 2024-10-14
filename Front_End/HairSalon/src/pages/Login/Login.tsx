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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const foundUser = users.find(user => user.name === email && user.pass === password);

    if (foundUser) {
      localStorage.setItem('userData', JSON.stringify(foundUser));
      navigate(`/${foundUser.role}`);
    } else {
      alert('Incorrect email or password!');
    }
  };

  const handleForgotPassword = () => {
    alert('Forgot password functionality not implemented yet.');
  };

  const handleGoogleLogin = () => {
    alert('Login with Google functionality not implemented yet.');
  };
  const handleSignUp = () => {
    navigate('/SignUp');
  };

  return (
    <form className="sign-in-form" onSubmit={handleLogin}>
      <h1 className="greeting">Hello</h1>
      <p className="prompt"> Don’t have an account?  <span onClick={handleSignUp} className="sign-up-link">
            Sign Up
          </span></p>
      <InputField
        label="email"
        type="text"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
//   const [email, setemail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // Tìm kiếm người dùng dựa trên email và password
//     const foundUser = users.find(
//       (user) => user.name === email && user.pass === password
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
//             id="email"
//             type="text"
//             value={email}
//             onChange={(e) => setemail(e.target.value)}
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
