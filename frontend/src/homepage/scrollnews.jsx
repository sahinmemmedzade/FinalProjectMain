import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import for navigation
import './ScrollingList.css';
import { FaCalendar, FaEye } from 'react-icons/fa';

// Tarixi oxunaqlı formata çevirən funksiya
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Aylar 0-dan başladığı üçün 1 əlavə edirik
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const ScrollingList = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [isNewsUpdated, setIsNewsUpdated] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/newssidebar/sidebar-news');
        const data = await response.json();
        if (Array.isArray(data)) {
          setNewsItems(data);
          setIsNewsUpdated(data.some(item => item.updated)); // `updated` flag used to indicate if news is updated
        } else {
          console.error('Gələn məlumat `Array` tipində deyil:', data);
        }
      } catch (error) {
        console.error('Xəbərlər çəkilərkən xəta baş verdi', error);
      }
    };

    fetchNews();
  }, []);

  const handleNewsClick = async (id) => {
    try {
      const userId = 'currentUserId'; // Replace with actual user ID if available
      await fetch(`/api/newssidebar/sidebar-news/views/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      // Navigate to the news detail page
      navigate(`/api/newssidebar/sidebar-news/${id}`);
    } catch (error) {
      console.error('Xəbərə kliklənərkən xəta baş verdi:', error);
    }
  };

  return (
    <div className="scrolling-list">
      {isNewsUpdated && (
        <p className="update-info">Yeniləndi</p>
      )}
      {newsItems.map((item, index) => (
        <div key={index} className="list-item" onClick={() => handleNewsClick(item._id)}>
          <div className="item-header">
      <div className='calendarscrol'>  <FaCalendar></FaCalendar>   <span className="time">{formatDate(item.date)}</span></div> 
      <div className='eyescroll'> <FaEye></FaEye> <span className="views">{item.views}</span></div> 
            <span className="icon">{item.icon}</span>
          </div>
          <div className="item-title">{item.title}</div>
          <div className="item-description">{item.description.split('.')[1] + '.'}</div>
          <div className="item-text">{item.text}</div>
        </div>
      ))}
    </div>
  );
};

export default ScrollingList;
