import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsThreeDots } from 'react-icons/bs';
import './SonXeberOptions.css';

const SonXeberOptions = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAllNews, setShowAllNews] = useState(false);
  const [editNewsId, setEditNewsId] = useState(null);
  const [newsContent, setNewsContent] = useState('');
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    fetchAllNews();
  }, []);

  // Fetch all news from the API
  const fetchAllNews = async () => {
    try {
      const response = await axios.get('/api/breakingnews');
      setNewsList(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleAddNewsClick = () => {
    setShowAddForm(true);
    setShowAllNews(false);
    setEditNewsId(null);
  };

  const handleAllNewsClick = () => {
    setShowAllNews(true);
    setShowAddForm(false);
    setEditNewsId(null);
  };

  const handleDeleteNews = async (id) => {
    try {
      await axios.delete(`/api/breakingnews/${id}`);
      alert('Xəbər uğurla silindi!');
      fetchAllNews(); // Refresh the news list
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  const handleEditClick = (id, content) => {
    setEditNewsId(id);
    setNewsContent(content);
    setShowAddForm(true);
    setShowAllNews(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editNewsId !== null) {
        // Update existing news
        await axios.patch(`/api/breakingnews/${editNewsId}`, { news: newsContent });
        alert('Xəbər uğurla yeniləndi!');
      } else {
        // Add new news
        await axios.post('/api/breakingnews', { news: newsContent });
        alert('Yeni xəbər uğurla əlavə edildi!');
      }
      setNewsContent('');
      setShowAddForm(false);
      fetchAllNews(); // Refresh the news list
    } catch (error) {
      console.error('Error adding/updating news:', error);
    }
  };

  const toggleOptionsMenu = (id) => {
    const element = document.getElementById(`optionssonxeber-${id}`);
    if (element) {
      element.classList.toggle('visible');
    }
  };

  return (
    <div className="son-xeber-options">
      <h2>Son Xeberler</h2>
      <ul>
        <li onClick={handleAddNewsClick}>Son xəbər əlavə et</li>
        <li onClick={handleAllNewsClick}>Butun son xəbərlər</li>
      </ul>

      {showAddForm && (
        <div className="son-xeber-form">
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="news-content" className="news-label">Xəbər</label>
            <textarea
              id="news-content"
              className="news-input"
              rows="6"
              value={newsContent}
              onChange={(e) => setNewsContent(e.target.value)}
            />
            <button type="submit" className="submit-button">Göndər</button>
          </form>
        </div>
      )}

      {showAllNews && !showAddForm && (
        <div className="all-news">
          {newsList.length > 0 ? (
            newsList.map(news => (
              <div key={news._id} className="news-itemadmin">
                <p className="news-content">
                  {news.news.length > 100 ? `${news.news.substring(0, 100)}...` : news.news}
                </p>
                <div className="news-actions">
                  <BsThreeDots
                    className="more-options"
                    onClick={() => toggleOptionsMenu(news._id)}
                  />
                  <div id={`optionssonxeber-${news._id}`} className="options-menusonxeber">
                    <button onClick={() => handleEditClick(news._id, news.news)}>Edit</button>
                    <button onClick={() => handleDeleteNews(news._id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No news available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SonXeberOptions;
