import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Article.css';
import { FaFacebook, FaTwitter, FaTelegram, FaWhatsapp, FaInstagram, FaCopy, FaPrint } from 'react-icons/fa';
import { AiOutlineLike, AiTwotoneLike, AiOutlineDislike, AiTwotoneDislike } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';

const Sidebararticle = () => {
  const [currentUserName, setCurrentUserName] = useState('');
  const [article, setArticle] = useState(null);
  const [fontSize, setFontSize] = useState(getInitialFontSize());
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [comment, setComment] = useState('');

  const { id } = useParams();
  const handleMoreOptions = (reviewId) => {
    setEditingReviewId(reviewId); // Düyməyə basdıqda review ID-ni saxla
  };
  
  
  const handleEditComment = async (reviewId) => {
    const updatedComment = prompt("Yeni şərhinizi daxil edin:");
    if (updatedComment) {
      try {
        const response = await fetch(`/api/review/${reviewId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ comment: updatedComment }),
        });
  
        if (response.ok) {
          const updatedArticle = await fetch(`/api/newssidebar/sidebar-news/${id}`).then(res => res.json());
          setArticle(updatedArticle);
          setEditingReviewId(null); // Redaktə modunu bağla
        } else {
          console.error('Failed to update comment:', await response.text());
        }
      } catch (error) {
        console.error('Error updating comment:', error);
      }
    }
  };
  
  
  
  const handleDeleteComment = async (reviewId) => {
    try {
      const response = await fetch(`/api/review/${reviewId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        const updatedArticle = await fetch(`/api/newssidebar/sidebar-news/${id}`).then(res => res.json());
        setArticle(updatedArticle);
      } else {
        console.error('Failed to delete comment:', await response.text());
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  function getInitialFontSize() {
    if (window.innerWidth <= 700) {
      return 12;
    } else if (window.innerWidth <= 1000) {
      return 14;
    } else {
      return 16;
    }
  }

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    setCurrentUserName(userName);

    fetch(`/api/newssidebar/sidebar-news/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.error(data.error);
          return;
        }


        setArticle(data);
       
        if (data.reviews && userId) {
          data.reviews.forEach(review => {
            console.log(`Review ID: ${review._id}, CreatedBy: ${review.createdBy}, CurrentUserId: ${userId}`);
            if (review.createdBy.toString() === userId) {
              console.log(`Şərh sahibidir: ${review._id}`);
            }
          });
        }
        setLiked(data.isLiked || false);
        setDisliked(data.isDisliked || false);
        if (data && data.fontSize) {
          setFontSize(data.fontSize);
        }
      })
      .catch(error => console.error('Error fetching article:', error));

    const handleResize = () => {
      setFontSize(getInitialFontSize());
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [id]);

  const increaseFontSize = () => {
    setFontSize(prevSize => prevSize + 2);
  };
  const handleCommentSubmit = async () => {
    const userId = localStorage.getItem('userId'); // Local storage-dan userId-ni əldə et
  
    if (!userId) {
      alert('Qeydiyyatdan keçmək lazımdır!');
      return;
    }
  
    try {
      const response = await fetch(`/api/sidebarcomment/${id}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment, userId }), // userId-ni şərh ilə birlikdə göndər
      });
  
      if (response.ok) {
        const updatedArticle = await fetch(`/api/newssidebar/sidebar-news/${id}`).then(res => res.json());
        setArticle(updatedArticle);
        setComment('');
      } else {
        console.error('Failed to add comment');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  
  const decreaseFontSize = () => {
    setFontSize(prevSize => Math.max(12, prevSize - 2));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(articleUrl);
    alert("URL copied to clipboard!");
  };

  const handlePrint = () => {
    window.print();
  };

  const formatImageUrl = (url) => {
    if (!url) return '';
    let formattedUrl = url.replace(/\\/g, '/');
    if (formattedUrl.startsWith('Images/')) {
      formattedUrl = `/${formattedUrl}`;
    }
    return formattedUrl;
  };

  const handleLikeClick = async () => {
    try {
      const action = liked ? 'decrease' : 'increase';
      const response = await fetch(`/api/newssidebarlike/${id}/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setLiked(!liked);
        const updatedArticle = await fetch(`/api/newssidebar/sidebar-news/${id}`).then(res => res.json());
        setArticle(updatedArticle);
      } else {
        console.error('Failed to update like status');
      }
    } catch (error) {
      console.error('Error handling like click:', error);
    }
  };
  const handleDislikeClick = async () => {
    try {
      const action = disliked ? 'decrease' : 'increase';
      const response = await fetch(`/api/newssidebardislike/${id}/dislike/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        setDisliked(!disliked);
        const updatedArticle = await fetch(`/api/newssidebar/sidebar-news/${id}`).then(res => res.json());
        setArticle(updatedArticle);
      } else {
        console.error('Failed to update dislike status');
      }
    } catch (error) {
      console.error('Error handling dislike click:', error);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Formun təkrar yüklənməsinin qarşısını alın
      handleCommentSubmit();
    }
  };

  const articleUrl = `localhost:3000/api/newssidebar/sidebar-news/${id}`;

  return (
    <div className="article-container" style={{ fontSize: `${fontSize}px` }}>
      <div className="font-size-buttons">
        <button className="font-size-button" onClick={decreaseFontSize}>A-</button>
        <button className="font-size-button" onClick={increaseFontSize}>A+</button>
      </div>
      {article ? (
        <>
          <div className='ARTICLEDESCRIPTION'>
          <p>{formatDate(article.date)}</p>

            <h1>{article.title}</h1>
            <div className="reaction-section">
              <div className="like-dislike">
                <div className="like" onClick={handleLikeClick}>
                  {liked ? <AiTwotoneLike style={{ color: 'green' }} /> : <AiOutlineLike />}
                  <span>{article.likes}</span>
                </div>
                <div className="dislike" onClick={handleDislikeClick}>
                  {disliked ? <AiTwotoneDislike style={{ color: 'red' }} /> : <AiOutlineDislike />}
                  <span>{article.dislikes}</span>
                </div>
              </div>
            </div>
            <p>{article.description}</p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <div className="article-actions">
        <p>Xəbər xoşunuza gəlib? Sosial şəbəkələrdə paylaşın</p>
        <div className="social-buttons">
          <ul>
            <div className='socialmedia'>
              <div className='socialmediafooter'>
                <li className='facebook'><a href="https://www.facebook.com/oxu.azz" target="_blank" rel="noopener noreferrer"><FaFacebook /></a></li>
                <li className='twitter'><a href="https://x.com/oxuaz" target="_blank" rel="noopener noreferrer"><FaTwitter /></a></li>
                <li className='telegram'><a href="https://t.me/oxuaze" target="_blank" rel="noopener noreferrer"><FaTelegram /></a></li>
                <li className='whatsapp'><a href="https://wa.me/oxuaze" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a></li>
                <li className='instagram'><a href="https://www.instagram.com/oxuaz/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a></li>
              </div>
            </div>
          </ul>
          <button className="social-button copy" onClick={handleCopy}>
            <FaCopy />
          </button>
          <button className="social-button print" onClick={handlePrint}>
            <FaPrint />
          </button>
        </div>
        <a href={articleUrl} className="article-url">{articleUrl}</a>
      </div>
      <div className='comment-section'>
  <h2>Şərhlər</h2>
  <textarea
    value={comment}
    onChange={(e) => setComment(e.target.value)}
    onKeyDown={handleKeyDown}
    placeholder='Şərh yazın...'
  />
  <button onClick={handleCommentSubmit}>Göndər</button>
  <div className='allcomennts'>
    {article && article.reviews && article.reviews.length > 0 ? (
      <ul>
        {article.reviews.map((review) => {
          const isCurrentUser = currentUserName === review.Username; // İstifadəçi adının uyğunluğunu yoxlayın
          return (
            <li key={review._id}>
              <p className='comment'>
                <strong>İstifadəçi: {review.Username}</strong> Yorum: {review.comment}
                {isCurrentUser && (
                  <div className="more-options">
                    <BsThreeDots onClick={() => handleMoreOptions(review._id)} />
                    {editingReviewId === review._id && (
                      <div className="more-options-menu">
                        <button onClick={() => handleEditComment(review._id)}>Redaktə et</button>
                        <button onClick={() => handleDeleteComment(review._id)}>Sil</button>
                      </div>
                    )}
                  </div>
                )}
              </p>
            </li>
          );
        })}
      </ul>
    ) : (
      <p>Şərh yoxdur.</p>
    )}
  </div>
  </div>
    </div>
  );
};

export default Sidebararticle;
