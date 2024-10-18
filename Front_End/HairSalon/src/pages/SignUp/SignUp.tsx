import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.scss';
import { FaUserAlt, FaLock, FaEnvelope, FaPhone } from "react-icons/fa"; 

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
   
    alert('Sign-up successful!');
    navigate('/login');
  };
  const handleLoginRedirect = () => {
    navigate('/login');
  };


  return (
    <div className="sign-up-page">
      <form className="sign-up-form" onSubmit={handleSubmit}>
      <h1 className="greeting">Đăng Ký</h1>

      <h1 className="greeting-title" >Chào mừng bạn đến với Hair Salon</h1>
        <div className="form-group">
          <FaUserAlt className="input-icon" />
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Tên"
            required
            className="input-style"
          />
        </div>

        <div className="form-group">
          <FaUserAlt className="input-icon" />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Họ"
            required
            className="input-style"
          />
        </div>
        
        <div className="form-group">
          <FaPhone className="input-icon" />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Số điện thoại"
            required
            className="input-style"
          />
        </div>


        <div className="form-group">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="input-style"
          />
        </div>

        <div className="form-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mật khẩu"
            required
            className="input-style"
          />
        </div>

        <div className="form-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Nhập lại mật khẩu"
            required
            className="input-style"
          />
        </div>

        <button type="submit" className="sign-up-button">Đăng ký</button>
        <p className="switch-page">
        Bạn đã có tài khoản?{' '}
          <span onClick={handleLoginRedirect} className="login-link">
          Đăng nhập
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
