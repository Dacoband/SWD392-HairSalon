import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserInfoData } from '../../models/type';
import axios from "axios";
import { FaUserAlt, FaLock, FaEnvelope, FaPhone, FaCalendarAlt, FaHome } from 'react-icons/fa';
import './SignUp.scss';
import logo from "../../assets/logo-removebg-preview.png";


const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState<UserInfoData>({
    email: '',
    password: '',
    memberName: '',
    dateOfBirth: '',
    phoneNumber: '',
    address: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [apiErrors, setApiErrors] = useState<Record<string, string[]>>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleBackToHome = () => {
    navigate("/"); 
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiErrors({});

    if (formData.password !== confirmPassword) {
      setApiErrors({ confirmPassword: ['Passwords do not match'] });
      return;
    }

    const submissionData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submissionData.append(key, value as string);
    });

    try {
      const response = await axios.post('https://api.vol-ka.studio/api/v1/member/add', submissionData, {
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
            value={formData.memberName}
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
            value={formData.email}
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
            value={formData.phoneNumber}
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
            value={formData.password}
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
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            value={formData.dateOfBirth}
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
            value={formData.address}
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
