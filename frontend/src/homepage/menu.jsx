import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./menu.css";
import { RiLiveFill, RiCloseFill } from "react-icons/ri";
import { FaApple, FaBars , FaFacebook, FaGooglePlay, FaInstagram, FaTelegram, FaTimes, FaTwitter, FaWhatsapp } from "react-icons/fa";
import NewsTicker from "./newsticker";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { BsMegaphone } from "react-icons/bs";
import { MdPerson } from "react-icons/md";
import axios from 'axios'; // Import axios

const Menu = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]); // State for categories
  const location = useLocation(); // Get the current location

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/category/categories'); // Fetch data from the backend
        setCategories(response.data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Determine top value based on the current path
  const topPosition = location.pathname === "/" ? "20px" : "0px";

  return (
    <>
      <div
        className={`menu-header ${sidebarOpen ? "opened" : ""}`}
        style={{ top: topPosition }} // Apply top value dynamically
      >
        <a href="/" className="logo">
          <img
            src="https://www.shutterstock.com/shutterstock/photos/1928997539/display_1500/stock-vector-breaking-news-template-with-d-red-and-blue-badge-breaking-news-text-on-dark-blue-with-earth-and-1928997539.jpg"
            alt="Logo"
          />
        </a>
        <div className="menu-icon" onClick={toggleSidebar}>
          <FaBars />
        </div>
        <div className="menu-content">
          <div className="close-icon" onClick={toggleSidebar}>
            <FaTimes />
          </div>
          {categories.map((category, i) => (
            <div key={i} onClick={toggleSidebar} className="menu-item">
              <div className="menu-item-inner">
                <Link to={`/category/${category._id}`} className="item-text">{category.name}</Link>
              </div>
            </div>
            
          ))}
          <div   className="menu-item">
              <div className="menu-item-inner item-text">
               <Link to='/videolar'> Videolar</Link>
              </div>
              </div>
          {sidebarOpen && (
            <div>
              <div className="camera-icon-bottom">
               Videolar
              </div>
              <div className="sidebar">
                <ul className="sidebar-icons">
                  <div className='announcement'>
                    <li><a href="/about" target="_self" rel="noopener noreferrer"><IoMdInformationCircleOutline /></a></li>
                    <li><a href="/anouncement" target="_self" rel="noopener noreferrer"><BsMegaphone /></a></li>
                    <li><a href="/signup" className='person' target="_blank" rel='noopener noreferrer'><MdPerson /></a></li>
                  </div>
                  <div className='socialmedia'>
                    <li className='facebook'><a href="https://www.facebook.com/oxu.azz" target="_blank" rel="noopener noreferrer"><FaFacebook /></a></li>
                    <li className='twitter'><a href="https://x.com/oxuaz" target="_blank" rel="noopener noreferrer"><FaTwitter /></a></li>
                    <li className='telegram'><a href="https://t.me/oxuaze" target="_blank" rel="noopener noreferrer"><FaTelegram /></a></li>
                    <li className='whatsapp'><a href="https://wa.mehttps://t.me/oxuaze" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a></li>
                    <li className='instagram'><a href="https://www.instagram.com/oxuaz/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a></li>
                    <li className='apple'><a href="https://apps.apple.com/us/app/oxu-az-azerbaycan-xeberleri/id634362981" target="_blank" rel="noopener noreferrer"><FaApple /></a></li>
                    <li className='https://play.google.com/store/apps/details?id=az.start.android.oxu&pli=1'><a href="https://play.google.com" target="_blank" rel="noopener noreferrer"><FaGooglePlay /></a></li>
                  </div>
                </ul>
              </div>
            </div>
          )}
          {!sidebarOpen && (
            <div className="camera-icon-near menu-item">
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Menu;
