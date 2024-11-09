import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { FaUserAlt, FaLock, FaGoogle } from "react-icons/fa";
import { login } from "../../services/authSalon";
import logo from "../../assets/logo-removebg-preview.png";

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
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await login(email, password);
      const userDatas = response?.userDatas; // Access 'userDatas' instead of 'userData'

      if (userDatas) {
        // Navigate based on 'roleName' inside 'userDatas'
        switch (userDatas.roleName) {
          case "SA":
            navigate("/manageService");
            break;
          case "SM":
            navigate("/StaffManager");
            break;
          case "SL":
            navigate("/Appoiment-Stylish");
            break;
          case "ST":
            navigate("/StaffStylish");
            break;
          case "MB":
            navigate("/HomePage");
            break;
          default:
            navigate("/unknown-role");
            break;
        }
      } else {
        setError("Sai tên người dùng hoặc mật khẩu!");
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        setError(err.response.data.error);
      } else {
        setError("Sai tên người dùng hoặc mật khẩu!");
      }
    }
  };

  // const handleForgotPassword = () => {
  //   alert("Forgot password functionality not implemented yet.");
  // };

  // const handleGoogleLogin = () => {
  //   alert("Login with Google functionality not implemented yet.");
  // };
  const handleSignUp = () => {
    navigate("/SignUp");
  };
  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <form className="sign-in-form" onSubmit={handleLogin}>
      <div className="upper-part">
        <img
          src={logo}
          alt="Logo"
          className="back-to-home-logo"
          onClick={handleBackToHome}
        />
        <div className="greeting">Đăng Nhập</div>
        <InputField
          className="input-style"
          label="email"
          type="text"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          icon={FaUserAlt}
        />
        <InputField
          className="input-style"
          label="Mật khẩu"
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          icon={FaLock}
        />
        {error && <div className="error-message">{error}</div>}
        {/* {/* <a onClick={handleForgotPassword} className="forgot-password">
          Quên mật khẩu
        </a> */ }
      </div>
      <button type="submit" className="sign-in-button">
        Đăng nhập
      </button>

      {/* <div className="divider">
        <hr className="divider-line" />
        <span>hoặc tiếp tục với</span>
        <hr className="divider-line" />
      </div> */}

      {/* <button
        type="button"
        className="google-login-button"
        onClick={handleGoogleLogin}
      >
        <FaGoogle className="google-icon" /> Đăng nhập bằng Google
      </button> */}
      <p className="prompt">
        Chưa có tài khoản?
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
