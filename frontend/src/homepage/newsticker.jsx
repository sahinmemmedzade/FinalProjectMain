import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewsTicker.css';
import { IoIosFlash } from 'react-icons/io';

const NewsTicker = () => {
  const [newsItems, setNewsItems] = useState([]);

  // Fetch news from API
  const fetchNews = async () => {
    try {
      const response = await axios.get('/api/breakingnews');
      setNewsItems(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="news-ticker">
      <div className='flash'><div className='flashicon'><IoIosFlash /></div>
      </div>
      <div className="news-items">
        {newsItems.length > 0 ? (
          newsItems.map((item) => (
            <div key={item._id} className="news-item">
             <span className='ulduz'> *** </span> <span>{item.news}</span><span className='ulduz'> ***</span>
            </div>
          ))
        ) : (
          <div className="news-item">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default NewsTicker;
