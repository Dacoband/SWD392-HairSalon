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
      <h1 className="greeting">Sign Up</h1>
        <div className="form-group">
          <FaUserAlt className="input-icon" />
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
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
            placeholder="Last Name"
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
            placeholder="Phone"
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
            placeholder="Password"
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
            placeholder="Confirm Password"
            required
            className="input-style"
          />
        </div>

        <button type="submit" className="sign-up-button">Sign Up</button>
        <p className="switch-page">
          Already have an account?{' '}
          <span onClick={handleLoginRedirect} className="login-link">
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
