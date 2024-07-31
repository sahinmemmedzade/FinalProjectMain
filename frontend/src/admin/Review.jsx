import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Review.css'; // CSS tərzləri əlavə olunmalıdır

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Bütün review-ları gətirmək
    axios.get('/api/news')
      .then(response => setReviews(response.data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, []);

  const handleDelete = (reviewId) => {
    // Review silmək
    axios.delete(`/api/review/${reviewId}`)
      .then(response => {
        setReviews(reviews.map(newsItem => ({
          ...newsItem,
          reviews: newsItem.reviews.filter(review => review._id !== reviewId)
        })));
      })
      .catch(error => console.error('Error deleting review:', error));
  };

  return (
    <div className="reviewadmin">
      <div className="reviewadmin-header">
        <div className="reviewadmin-title">Review Title</div>
        <div className="reviewadmin-news-title"><p>News Title</p></div>
        <div className="reviewadmin-delete"><p>Delete</p></div>
      </div>
      {reviews.map(newsItem => (
        newsItem.reviews.map(review => (
          <div key={review._id} className="reviewadmin-item">
            <div className="reviewadmin-title">{review.comment}</div>
            <div className="reviewadmin-news-title">{newsItem.title}</div>
            <div className="reviewadmin-actions">
              <button className="reviewadmin-delete-button" onClick={() => handleDelete(review._id)}>Delete</button>
            </div>
          </div>
        ))
      ))}
    </div>
  );
};

export default ReviewSection;
