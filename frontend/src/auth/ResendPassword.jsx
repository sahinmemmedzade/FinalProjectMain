import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './resendpassword.css';

const ResendPassword = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [resendFormData, setResendFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordTypes, setPasswordTypes] = React.useState({
    oldPassword: 'password',
    newPassword: 'password',
    confirmPassword: 'password',
  });

  const togglePasswordVisibility = (field) => {
    setPasswordTypes({
      ...passwordTypes,
      [field]: passwordTypes[field] === 'password' ? 'text' : 'password',
    });
  };

  useEffect(() => {
    const loggedInUserId = localStorage.getItem('userId');
    if (loggedInUserId) {
      setUserId(loggedInUserId);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (event) => {
    setResendFormData({
      ...resendFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleResend = async (event) => {
    event.preventDefault();

    try {
      const loggedInUserId = localStorage.getItem('userId');
      if (!loggedInUserId) {
        throw new Error('User ID not found in local storage');
      }

      const response = await fetch(`/api/auth/update-password/${loggedInUserId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: resendFormData.oldPassword,
          newPassword: resendFormData.newPassword,
          confirmNewPassword: resendFormData.confirmPassword,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        alert(responseData.message);
        navigate('/login');
      } else {
        const errorData = await response.json();
        console.error('Password reset error:', errorData);
        alert(`Password reset failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Password reset error:', error);
      alert('Password reset failed. Please try again.');
    }
  };

  return (
    <div className="resend-password-container">
     
      <form onSubmit={handleResend} className="resend-form">
      <h2>Resend Password</h2>

        <div className="form-group">
          <input
            type={passwordTypes.oldPassword}
            placeholder="Old Password"
            name="oldPassword"
            value={resendFormData.oldPassword}
            onChange={handleChange}
            required
          />
          <span className="toggle-visibility" onClick={() => togglePasswordVisibility('oldPassword')}>
            {passwordTypes.oldPassword === 'password' ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <div className="form-group">
          <input
            type={passwordTypes.newPassword}
            placeholder="New Password"
            name="newPassword"
            value={resendFormData.newPassword}
            onChange={handleChange}
            required
          />
          <span className="toggle-visibility" onClick={() => togglePasswordVisibility('newPassword')}>
            {passwordTypes.newPassword === 'password' ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <div className="form-group">
          <input
            type={passwordTypes.confirmPassword}
            placeholder="Confirm New Password"
            name="confirmPassword"
            value={resendFormData.confirmPassword}
            onChange={handleChange}
            required
          />
          <span className="toggle-visibility" onClick={() => togglePasswordVisibility('confirmPassword')}>
            {passwordTypes.confirmPassword === 'password' ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
       <div className='resend-password'> <button type="submit" className="resend-password-btn" disabled={isLoading}>
          {isLoading ? 'Resending...' : 'Resend Password'}
        </button></div>
        <span className="back-to-login">
          <a href="/login">Back to Login</a>
        </span>
      </form>
    </div>
  );
};

export default ResendPassword;
