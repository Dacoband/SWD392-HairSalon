import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserAlt, FaLock, FaEnvelope, FaPhone, FaCalendarAlt, FaHome } from 'react-icons/fa';
import './SignUp.scss';
import logo from "../../assets/logo-removebg-preview.png";


const SignUpPage: React.FC = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [MemberName, setMemberName] = useState("");
  const [DateOfBirth, setDateOfBirth] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Address, setAddress] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [apiErrors, setApiErrors] = useState<Record<string, string[]>>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case 'MemberName':
        setMemberName(value);
        break;
      case 'Email':
        setEmail(value);
        break;
      case 'PhoneNumber':
        setPhoneNumber(value);
        break;
      case 'Password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      case 'DateOfBirth':
        setDateOfBirth(value);
        break;
      case 'Address':
        setAddress(value);
        break;
      default:
        break;
    }
  };
  const handleBackToHome = () => {
    navigate("/"); 
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiErrors({});

    if (Password !== confirmPassword) {
      setApiErrors({ confirmPassword: ['Passwords do not match'] });
      return;
    }

    const formData = new FormData();
    formData.append('Email', Email);
    formData.append('Password', Password);
    formData.append('MemberName', MemberName);
    formData.append('PhoneNumber', PhoneNumber);
    formData.append('DateOfBirth', DateOfBirth);
    formData.append('Address', Address);

    try {
      const response = await axios.post('https://api.vol-ka.studio/api/v1/member/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        alert('Sign-up successful!');
        navigate('/login');
      } else {
        throw new Error('An unexpected response occurred.');
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        const validationErrors = error.response.data.errors;
        if (validationErrors) {
          const formattedErrors: Record<string, string[]> = {};
          for (const field in validationErrors) {
            formattedErrors[field] = validationErrors[field];
          }
          setApiErrors(formattedErrors);
        }
      } else {
        console.error('An unexpected error occurred:', error.message);
        alert('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="sign-up-page">
      <form className="sign-up-form" onSubmit={handleSubmit}>
      <div className="upper-part">
      <img 
          src={logo} 
          alt="Logo" 
          className="back-to-home-logo" 
          onClick={handleBackToHome} 
        />
        <h1 className="greeting">Đăng Ký</h1>
        <h1 className="greeting-title">Chào mừng bạn đến với Hair Salon</h1>

        <div className="form-group">
          <FaUserAlt className="input-icon" />
          <input
            type="text"
            name="MemberName"
            value={MemberName}
            onChange={handleChange}
            placeholder="Tên đầy đủ"
            required
            className="input-style"
          />
          {apiErrors.MemberName && <span className="error-message">{apiErrors.MemberName[0]}</span>}
        </div>

        <div className="form-group">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            name="Email"
            value={Email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="input-style"
          />
          {apiErrors.Email && <span className="error-message">{apiErrors.Email[0]}</span>}
        </div>

        <div className="form-group">
          <FaPhone className="input-icon" />
          <input
            type="text"
            name="PhoneNumber"
            value={PhoneNumber}
            onChange={handleChange}
            placeholder="Số điện thoại"
            required
            className="input-style"
          />
          {apiErrors.PhoneNumber && <span className="error-message">{apiErrors.PhoneNumber[0]}</span>}
        </div>

        <div className="form-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            name="Password"
            value={Password}
            onChange={handleChange}
            placeholder="Mật khẩu"
            required
            className="input-style"
          />
          {apiErrors.Password && <span className="error-message">{apiErrors.Password[0]}</span>}
        </div>

        <div className="form-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            placeholder="Nhập lại mật khẩu"
            required
            className="input-style"
          />
          {apiErrors.confirmPassword && <span className="error-message">{apiErrors.confirmPassword[0]}</span>}
        </div>

        <div className="form-group">
          <FaCalendarAlt className="input-icon" />
          <input
            type="date"
            name="DateOfBirth"
            value={DateOfBirth}
            onChange={handleChange}
            required
            className="input-style"
          />
          {apiErrors.DateOfBirth && <span className="error-message">{apiErrors.DateOfBirth[0]}</span>}
        </div>

        <div className="form-group">
          <FaHome className="input-icon" />
          <input
            type="text"
            name="Address"
            value={Address}
            onChange={handleChange}
            placeholder="Địa chỉ"
            required
            className="input-style"
          />
          {apiErrors.Address && <span className="error-message">{apiErrors.Address[0]}</span>}
        </div>

        <button type="submit" className="sign-up-button">Đăng ký</button>
        <p className="switch-page">
          Bạn đã có tài khoản?{' '}
          <span onClick={() => navigate('/login')} className="login-link">
            Đăng nhập
          </span>
        </p>
        </div>
      </form>
      </div>

  );
};

export default SignUpPage;
