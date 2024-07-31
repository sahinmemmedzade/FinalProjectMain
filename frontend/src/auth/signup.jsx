import React, { useState } from 'react';
import './signup.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { auth, provider, signInWithPopup } from '../firebase'; // Import Firebase functions

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [passwordType, setPasswordType] = useState('password');
  const [confirmPasswordType, setConfirmPasswordType] = useState('password');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '', // Clear error for the changed field
    });
  };

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordType(confirmPasswordType === 'password' ? 'text' : 'password');
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log('Signup response data:', data);

        if (response.ok) {
            if (data.userId && data.userName) {
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('userName', data.userName);

                navigate('/');
            } else {
                console.error('User ID or User Name not received');
                console.error('Response data:', data); // Debug information
            }
        } else {
            setErrors(data.errors || {});
        }
    } catch (error) {
        console.error('Signup error:', error);
        alert('Signup failed. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken(); // Get the Firebase ID token

      const response = await fetch('/api/auth/google-signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('userId', data._id);
        localStorage.setItem('userName', data.userName);
        localStorage.setItem('isAdmin', data.isAdmin);
        navigate('/');
      } else {
        console.error('Error in Google sign-in response:', data);
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Create Account</h2>
        <form onSubmit={handleSignup}>
          {/* Existing signup form fields */}
          <div className="form-group">
            <input
              type="text"
              placeholder="Full Name"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
            />
            {errors.userName && <div className="error-message">{errors.userName}</div>}
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
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
            <span
              className="toggle-visibilitysignup"
              onClick={togglePasswordVisibility}
            >
              {passwordType === 'password' ? <FaEye /> : <FaEyeSlash />}
            </span>
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>
          <div className="form-group password-group">
            <input
              type={confirmPasswordType}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <span
              className="toggle-visibilitysignup"
              onClick={toggleConfirmPasswordVisibility}
            >
              {confirmPasswordType === 'password' ? <FaEye /> : <FaEyeSlash />}
            </span>
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </div>
          <div className="createbutton">
            <button type="submit" className="create-account-btn">
              Create Account
            </button>
          </div>
        </form>
        <div className="social-signup">
         
          <span className='passlogin'>
            <Link to="/login">Already have an account? Log In</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
