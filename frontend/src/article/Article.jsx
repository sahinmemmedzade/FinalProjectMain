import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Article.css';
import { FaFacebook, FaTwitter, FaTelegram, FaWhatsapp, FaInstagram, FaCopy, FaPrint } from 'react-icons/fa';
import { AiOutlineLike, AiTwotoneLike, AiOutlineDislike, AiTwotoneDislike, AiOutlineEye } from 'react-icons/ai';
import { BsThreeDots } from "react-icons/bs";

const Article = () => {
  const navigate = useNavigate(); // Updated usage
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [article, setArticle] = useState(null);
  const [fontSize, setFontSize] = useState(getInitialFontSize());
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [currentUserName, setCurrentUserName] = useState('');
  const [allArticles, setAllArticles] = useState([]); // Bu state-i əlavə edin
  const [categories, setCategories] = useState([]);

  const [comment, setComment] = useState('');
  const { id } = useParams();
  // Əlavə edilməsi lazım olan yeni state dəyişəni
const [editingReviewId, setEditingReviewId] = useState(null);
const [updatedComment, setUpdatedComment] = useState('');
const [currentUserId, setCurrentUserId] = useState(null);

// Şərh yeniləmə funksiyası
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
        const updatedArticle = await fetch(`http://localhost:7777/api/news/${id}`).then(res => res.json());
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
      const updatedArticle = await fetch(`http://localhost:7777/api/news/${id}`).then(res => res.json());
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
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/category/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories()
    // Lokal istifadəçi ID-sini əldə et
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    setCurrentUserId(userId);
    setCurrentUserName(userName);
  
    fetch(`http://localhost:7777/api/news/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setArticle(data);
       
        if (data.reviews && userId) {
          data.reviews.forEach(review => {
            console.log(`Review ID: ${review._id}, CreatedBy: ${review.createdBy}, CurrentUserId: ${userId}`);
            if (review.createdBy.toString() === userId) {
              console.log(`Şərh sahibidir: ${review._id}`);
            }
          });
        }



      })



      .catch(error => {
        console.error('Error fetching article:', error);
      });
  }, [id]);
  useEffect(() => {
    const fetchAllArticles = async (categoryId) => {
      try {
        const response = await fetch('/api/news');
        if (!response.ok) throw new Error('Failed to fetch articles');
        const data = await response.json();
        
        // Filtrləmə və son 8 xəbəri əldə etmə
        const filteredData = data.filter(article => article.categoryId === categoryId);
        const reversedData = filteredData.reverse().slice(0, 8); // Reverse edib son 8 elementi seçirik

        setAllArticles(reversedData);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (article?.categoryId) {
      fetchAllArticles(article.categoryId);
    }
  }, [article?.categoryId]);

  const increaseFontSize = () => {
    setFontSize(prevSize => prevSize + 2);
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
 const handleCardClick = async (id) => {
    try {
      const userId = 'currentUserId'; // Replace with actual user ID if available
      await fetch(`/api/newsview/views/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      // Navigate to the news detail page
      navigate(`/news/${id}`);
    } catch (error) {
      console.error('Error handling slide click:', error);
    }
  };

  const handleLikeClick = async () => {
    setClickCount(prevCount => prevCount + 1);

    if (clickCount % 2 === 1) {
      try {
        const response = await fetch(`/api/like/${id}/${liked ? 'decrease' : 'increase'}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          setLiked(!liked);
          const updatedArticle = await fetch(`http://localhost:7777/api/news/${id}`).then(res => res.json());
          setArticle(updatedArticle);
        } else {
          console.error('Failed to update like status');
        }
      } catch (error) {
        console.error('Error handling like click:', error);
      }
    }
  };

  const handleDislikeClick = async () => {
    try {
      const action = disliked ? 'decrease' : 'increase';
      const response = await fetch(`/api/dislike/${id}/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setDisliked(prevDisliked => !prevDisliked);
        const updatedArticle = await fetch(`http://localhost:7777/api/news/${id}`).then(res => res.json());
        setArticle(updatedArticle);
      } else {
        console.error('Failed to update dislike status');
      }
    } catch (error) {
      console.error('Error handling dislike click:', error);
    }
  };

  const handleCommentSubmit = async () => {
    const userId = localStorage.getItem('userId'); // Local storage-dan userId-ni əldə et

    if (!userId) {
      alert('Qeydiyyatdan keçmək lazımdır!');
      return;
    }

    try {
      const response = await fetch(`/api/review/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment, userId }), // userId-ni şərh ilə birlikdə göndər
      });

      if (response.ok) {
        const updatedArticle = await fetch(`http://localhost:7777/api/news/${id}`).then(res => res.json());
        setArticle(updatedArticle);
        setComment('');
      } else {
        console.error('Failed to add comment');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Formun təkrar yüklənməsinin qarşısını alın
      handleCommentSubmit();
    }
  };

  const articleUrl = `http://localhost:3000/news/${id}`;

  return (
    <div className="article-container" style={{ fontSize: `${fontSize}px` }}>
      <div className="font-size-buttons">
        <button className="font-size-button" onClick={decreaseFontSize}>A-</button>
        <button className="font-size-button" onClick={increaseFontSize}>A+</button>
      </div>
      {article ? (
        <>
          <div className='articleimg'>
            {article.image ? (
              <img src={formatImageUrl(article.image)} alt={article.title} className='articleimg' />
            ) : (
              <p>No image available</p>
            )}
          </div>
          <div className='ARTICLEDESCRIPTION'>
            <p>{formatDate(article.createdAt)}</p>
            <h1 className='categorycard'>{categories.find(c => c._id === article.categoryId)?.name || 'Unknown Category' }</h1>
            <h1>{article.title}</h1>
            <div className="reaction-section">
              <div className="like-dislike">
                <div className="like" onClick={handleLikeClick}>
                  {liked ? <AiTwotoneLike style={{ color: clickCount % 2 === 0 ? 'green' : 'white' }} /> : <AiOutlineLike />}
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
        <p className='doeslike'>Xəbər xoşunuza gəlib? Sosial şəbəkələrdə paylaşın</p>
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
  <div className="all-articles-section">
  <h2>Elaqeli Xəbərlər</h2>
  <div className="articles-list">
  {allArticles.map(a => {
  const category = categories.find(c => c._id === a.categoryId);

  return (
    <div key={a._id} className="article-card" onClick={() => handleCardClick(a._id)}>
      <div className="card">
        <img src={`/${a.image}`} alt={a.title} className="news-image-xeberadmin" />
        <div className="card-content">
          <div className="card-header">
            <span className="cardcategory">{category?.name}</span>

          </div>
          <h3 className='descriptioncard'>{a.title}</h3>
          <p>{formatDate(a.createdAt)}</p>
          <p>{a.description.split('.')[0] + '.'}</p>
          <div className="like-dislike">
            <div className="like">
              <AiOutlineLike /><span>{a.likes || 0}</span>
            </div>
            <div className="dislike">
              <AiOutlineDislike />
              <span>{a.dislikes || 0}</span>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="views">
            <AiOutlineEye /> <span>{a.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
})}

  </div>
</div>


</div>

    </div>
  );
};

export default Article;
