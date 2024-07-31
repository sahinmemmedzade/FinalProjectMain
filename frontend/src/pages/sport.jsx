import React, { useState, useEffect, useRef } from 'react';
import '../homepage/card.css'; // CardComponent-də istifadə olunan CSS sinifləri burada da olacaq
import { AiOutlineEye, AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { FaSearch } from 'react-icons/fa';
import Advertisiment from '../advertisiment/advertisiment';
import { Navigate, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Updated import

const CardPagination = ({ cards = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBoxOpen, setSearchBoxOpen] = useState(false); // Track search box visibility
  const searchBoxRef = useRef(null); // Ref for the search box
  const inputRef = useRef(null); // Ref for the input
  const{id} = useParams();
  const[ news , setNews] = useState([]);
  const[category, setCategory] = useState({});
  const navigate = useNavigate(); // Updated usage

  useEffect(()=>{
    fetch('http://localhost:7777/api/news').then((resp=>resp.json()))
    .then((data)=>{
      const categoryNews = data.filter((x)=>x.categoryId===id);
      setNews(categoryNews.reverse());
    });
    fetch('http://localhost:7777/api/category/categories')
    .then((res)=>res.json())
    .then(data=>{
      setCategory({...data.find((x)=>x._id===id)})
    })
  },[id]);
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
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  // Filter cards based on search query
  const filteredCards = cards.filter(card =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate cards for the current page
  const indexOfLastCard = currentPage * 30;
  const indexOfFirstCard = indexOfLastCard - 30;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  // Calculate total pages
  const totalPages = Math.ceil(filteredCards.length / 30);
  const formatImageUrl = (url) => {
    if (!url) return '';
    let formattedUrl = url.replace(/\\/g, '/');
    if (formattedUrl.startsWith('Images/')) {
      formattedUrl = `/${formattedUrl}`;
    }
    return formattedUrl;
  };
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

  return (
    <div className='cardsandanounce'>
       <div className='advertisiment'>
        <Advertisiment />
      </div>
      <div className="card-pagination">
        <div className='serachinandname'>
          <div className='categorynamecategory'>
            {category.name}
          </div>
          <div
            className={`search-boxcategory ${searchBoxOpen ? 'open' : ''}`}
            ref={searchBoxRef} // Attach the ref to the search box container
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
              onFocus={handleInputFocus} // Show search box on focus
              onBlur={handleInputBlur} // Hide search box on blur
              ref={inputRef}
            />
          </div>
        </div>
        <div className="containercategory">
          {news.map((card, index) => (
            <div className="card cardcategory" key={index} onClick={() => handleCardClick(card._id)}>
              <img src={formatImageUrl(card.image)} alt={card.title} />
              <div className="card-content">
                <div className="card-header">
                <span className="cardcategory">{category?.name}</span>
                </div>
                <h3>{card.title}</h3>
                <p>{formatDate(card.createdAt)}</p>

                <p>{card.description.split('.')[0] + '.'}</p>
                <div className="like-dislike">
                  <div className="like">
                    <AiOutlineLike />
                    <span>{card.likes}</span>
                  </div>
                  <div className="dislike">
                    <AiOutlineDislike />
                    <span>{card.dislikes || 0}</span>
                  </div>
                </div>
              </div>
              <div className="card-footer">
              
                <div className="views">
                  <AiOutlineEye />
                  <span>{card.views}</span>
                </div>
              </div>
            </div>
          ))}
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

CardPagination.defaultProps = {
  cards: [],
};

export default CardPagination;
