import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Carousel.css';
import { FaAngleLeft, FaAngleRight, FaCalendarAlt, FaEye, FaRegEye } from 'react-icons/fa';

const CarouselHome = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  // Fetch latest 5 news items
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch('/api/news'); // Update with your actual endpoint
        const data = await response.json();
        // Reverse the order of data and get the latest 5 items
        setSlides(data.reverse().slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch slides:', error);
      }
    };

    fetchSlides();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [slides]);

  const handleSlideClick = async (id) => {
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
    <div className="carousel-container">
      <div className="carousel-slide">
        {slides.length > 0 && (
          <>
            <img
              src={slides[currentIndex].image}
              alt={`News headline: ${slides[currentIndex].title}`}
              onClick={() => handleSlideClick(slides[currentIndex]._id)} // Pass the ID on click
            />
            <div className="carousel-caption">
              <div className="info">
                <div className="details">
                  <div className='dateandviews'>
                    {/* Add any additional info here */}
                  </div>
                </div>
              </div>
              <div className='dateandviews'>
                    <div className='eyescroll'><FaCalendarAlt />
                  <span> {formatDate(slides[currentIndex].createdAt)}</span> </div>
                    

                 <div className='eyescroll'> <FaEye></FaEye>  <span >{slides[currentIndex].views}</span></div> 
                  </div>
              <div className="title">
                {slides[currentIndex].title}
              </div>
             
              <div className="icon-buttons">
                <div className="icon-button icon-button-left" onClick={prevSlide}>
                  <FaAngleLeft />
                </div>
                <div className="icon-button icon-button-right" onClick={nextSlide}>
                  <FaAngleRight />
                </div>
              </div>
            </div>
            <div className="carousel-dots">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CarouselHome;
