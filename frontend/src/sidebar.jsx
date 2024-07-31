import React, { useEffect, useState } from 'react';
import { FaFacebook, FaTwitter, FaTelegram, FaWhatsapp, FaInstagram, FaApple, FaGooglePlay } from 'react-icons/fa';
import { IoMdInformationCircleOutline, IoMdVolumeHigh } from 'react-icons/io';
import './Sidebar.css';
import { MdPerson } from 'react-icons/md';
import { BsMegaphone } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { Navigate } from 'react-router-dom';

const Sidebar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Check if userId is present in localStorage
    const userId = localStorage.getItem('userId');
    setIsLoggedIn(!!userId);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('isAdmin');
        setIsLoggedIn(false);
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  return (
    <div className="sidebar" id='sidebar'>
      <ul className="sidebar-icons">
        <div className='announcement'>
          <li><a href="/about" target="_self" rel="noopener noreferrer"><IoMdInformationCircleOutline /></a></li>
          <li> <a href="/anouncement" target="_self" rel="noopener noreferrer"><BsMegaphone /></a>
          </li>
          <li> <a href="/signup"  className='person '  target="_self" rel='noopener noreferrer'><MdPerson></MdPerson></a></li>
          <li> {isLoggedIn && (
            <li onClick={handleLogout}><CiLogout /></li>
          )}
          </li>
        </div>
        <div className='socialmedia'>
          <li className='facebook'><a href="https://www.facebook.com/oxu.azz" target="_blank" rel="noopener noreferrer"><FaFacebook /></a></li>
          <li className='twitter'><a href="https://x.com/oxuaz" target="_blank" rel="noopener noreferrer"><FaTwitter /></a></li>
          <li className='telegram'><a href="https://t.me/oxuaze" target="_blank" rel="noopener noreferrer"><FaTelegram /></a></li>
          <li className='whatsapp'><a href="https://wa.mehttps://t.me/oxuaze" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a></li>
          <li className='instagram'><a href="https://www.instagram.com/oxuaz/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a></li>
          <li className='apple'><a href="https://apps.apple.com/us/app/oxu-az-azerbaycan-xeberleri/id634362981" target="_blank" rel="noopener noreferrer"><FaApple /></a></li>
        
        </div>
      </ul>
    </div>
  );
}

export default Sidebar;
