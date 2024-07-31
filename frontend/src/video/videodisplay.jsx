import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './VideoDisplay.css';

const VIDEOS_PER_PAGE = 21;

const VideoDisplay = () => {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/video');
        const data = await response.json();
        setVideos(data.reverse());
      } catch (error) {
        console.error('Videoları çəkilərkən xəta baş verdi', error);
      }
    };

    fetchVideos();
  }, []);

  const getYouTubeVideoId = (url) => {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    const pathname = urlObj.pathname;
    const searchParams = new URLSearchParams(urlObj.search);

    let videoId = null;

    if (hostname === 'youtu.be') {
      videoId = pathname.split('/')[1];
    } else if (hostname === 'www.youtube.com' || hostname === 'youtube.com') {
      videoId = searchParams.get('v');
    }

    return videoId;
  };

  // Total pages calculation
  const totalPages = Math.ceil(videos.length / VIDEOS_PER_PAGE);
  const startIndex = (currentPage - 1) * VIDEOS_PER_PAGE;
  const endIndex = startIndex + VIDEOS_PER_PAGE;
  const currentVideos = videos.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="video-display">
      <h2>Videolar</h2>
      <div className="video-grid">
        {currentVideos.length > 0 ? (
          currentVideos.map(video => {
            const videoId = getYouTubeVideoId(video.videoUrl);
            const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : '';

            return (
              <div key={video._id} className="video-item">
                <h4>{video.title}</h4>
                <div className="video-player">
                  {videoId ? (
                    <iframe
                      src={embedUrl}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <p>Video URL düzgün deyil.</p>
                  )}
                </div>
                <p>{video.description}</p>
                
              </div>
            );
          })
        ) : (
          <p>Heç bir video mövcud deyil.</p>
        )}
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Əvvəlki
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={index + 1 === currentPage ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Növbəti
        </button>
      </div>
    </div>
  );
};

export default VideoDisplay;
