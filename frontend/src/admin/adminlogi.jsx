import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { MdOutlineRefresh } from "react-icons/md";
import '../auth/login.css';
const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    identifier: '',
    password: '',
  });

  const [errors, setErrors] = React.useState({
    identifier: '',
    password: '',
  });

  const [passwordType, setPasswordType] = React.useState('password');

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setErrors({
      ...errors,
      [event.target.name]: '',
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.userName === 'xeberadmin' && data.password === 'admin12A') {
          
          navigate('/adminim');
        } else {
          localStorage.setItem('isAuthenticated', JSON.stringify(true));
          localStorage.setItem('userId', data._id);
          localStorage.setItem('userName', data.userName);
          localStorage.setItem('isAdmin', data.isAdmin);
          navigate('/'); // Redirect to the home page or other appropriate page
        }
      } else {
        const errorData = await response.json();
        if (errorData.error.includes('User not found') || errorData.error.includes('Invalid password')) {
          alert('Email, username or password is wrong');
        }
        if (errorData.error.includes('Email') || errorData.error.includes('Password')) {
          setErrors({ identifier: errorData.error, password: '' });
        }
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-form"> 


        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Email or Username"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              required
            />
            {errors.identifier && <div className="error">{errors.identifier}</div>}
          </div>
          <div className="form-group password-group">
            <input
              type={passwordType}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="toggle-visibility" onClick={togglePasswordVisibility}>
              {passwordType === 'password' ? <FaEye /> : <FaEyeSlash />}
            </span>
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          <div className="createbutton">
            <button type="submit" className="login-btn">
              Login
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
