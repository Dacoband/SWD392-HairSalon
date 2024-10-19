import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { FaUserAlt, FaLock, FaGoogle } from "react-icons/fa";
import { login } from "../../services/authSalon";


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
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { userData } = await login(email, password);

if(userData){
      if (userData.roleName === 'SA') {
        navigate('/SystemAdmin');
      } else if (userData.roleName === 'SM') {
        navigate('/StaffManager');
      } else if (userData.roleName === 'SL') {
        navigate('/StaffStylelist');
      } else if (userData.roleName === 'ST') {
        navigate('/Stylelist');
      } else if (userData.roleName === 'MB') {
        navigate('/HomePage');
      } else {
        navigate('/unknown-role'); 
      }
    } else {
      alert("Sai tên người dùng hoặc mật khẩu!");
    }
  };
  const handleForgotPassword = () => {
    alert("Forgot password functionality not implemented yet.");
  };

  const handleGoogleLogin = () => {
    alert("Login with Google functionality not implemented yet.");
  };
  const handleSignUp = () => {
    navigate("/SignUp");
  };

  return (
    <form className="sign-in-form" onSubmit={handleLogin}>
      <div className="upper-part" >
      <h1 className="greeting">Đăng Nhập</h1>
     
      <InputField
      className="input-style"
        label="email"
        type="text"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
        icon={FaUserAlt}
      />      <InputField
      className="input-style"
        label="Mật khẩu"
        type="password"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
        icon={FaLock}
      />

      <a onClick={handleForgotPassword} className="forgot-password">
        Quên mật khẩu
      </a>

      </div>
      <button type="submit" className="sign-in-button">
       Đăng nhập
      </button>

      <div className="divider">
        <hr className="divider-line" />
        <span>hoặc tiếp tục với</span>
        <hr className="divider-line" />
      </div>

      <button
        type="button"
        className="google-login-button"
        onClick={handleGoogleLogin}
      >
        <FaGoogle className="google-icon" /> Đăng nhập bằng Google
      </button>
      <p className="prompt">
        {" "}
        Chưa có tài khoản? {""}
        <a onClick={handleSignUp} className="sign-up-link">
          Đăng ký
        </a>
      </p>
    </form>
  );
};

const SignInPage = () => {
  return (
    <div className="sign-in-page">
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
