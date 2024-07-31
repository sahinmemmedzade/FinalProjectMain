import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import
import './card.css'; // Ensure this file contains the necessary CSS
import { AiOutlineEye, AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { FaSearch } from 'react-icons/fa';

const CardComponent = () => {
  const [cards, setCards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBoxOpen, setSearchBoxOpen] = useState(false);
  const searchBoxRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate(); // Updated usage
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  // Fetch cards and categories from backend
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('/api/news'); // Backend API endpoint
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error('Failed to fetch cards:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/category/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCards();
    fetchCategories();
  }, []);

  // Filter cards based on search query and reverse the order
  const filteredCards = cards
    .filter(card => card.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .reverse(); // Reverse the order of the filtered cards

  // Calculate cards for the current page
  const indexOfLastCard = currentPage * 12;
  const indexOfFirstCard = indexOfLastCard - 12;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  // Calculate total pages
  const totalPages = Math.ceil(filteredCards.length / 12);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle search box toggle
  const handleSearchBoxToggle = () => {
    setSearchBoxOpen(prev => !prev);
  };

  // Handle input change
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle input focus and blur
  const handleInputFocus = () => {
    setSearchBoxOpen(true);
  };

  const handleInputBlur = () => {
    setSearchBoxOpen(false);
  };

  // Handle click outside to close the search box
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setSearchBoxOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle click on card
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

  return (
    <div className='cardsandanounce cardanouncehome'>
      <div className="card-pagination">
        <div className='serachinandname'>
          <div className='categoryname'>
            Son Xeberler
          </div>
          <div
            className={`search-boxcategory ${searchBoxOpen ? 'open' : ''}`}
            ref={searchBoxRef}
          >
            <button
              className={`btn-search ${searchBoxOpen ? 'hidden' : ''}`}
              onClick={handleSearchBoxToggle}
            >
              <div className='fasearsh'>
              <FaSearch /></div>
            </button>
            <input
              type="text"
              className={`input-search ${searchBoxOpen ? 'open' : ''}`}
              placeholder="Type to Search..."
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              ref={inputRef}
            />
          </div>
        </div>
        <div className="containercategoryhome">
          {currentCards.map((card) => {
            const category = categories.find(c => c._id === card.categoryId);
            return (
              <div className="card" key={card._id} onClick={() => handleCardClick(card._id)}>
                <img src={card.image} alt={card.title} className="news-image-xeberadmin" />
                <div className="card-content">
                  <div className="card-header">
                    <span className="cardcategory">{category?.name}</span>
                  </div>
                  <h3>{card.title}</h3>
                  <p>{formatDate(card.createdAt)}</p>
<p>{card.description.split('.')[0] + '.'}</p>
                  <div className="like-dislike">
                    <div className="like">
                      <AiOutlineLike /><span>{card.likes || 0}</span>
                    </div>
                    <div className="dislike">
                      <AiOutlineDislike />
                      <span>{card.dislikes || 0}</span>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <div className="views">
                    <AiOutlineEye /> <span>{card.views}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={number === currentPage ? 'active' : ''}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
