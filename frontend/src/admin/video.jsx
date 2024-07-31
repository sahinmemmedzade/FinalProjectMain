import React, { useState, useEffect } from 'react';
import './VideoManagement.css';

const VideoManagement = () => {
  const [showAddVideoForm, setShowAddVideoForm] = useState(false);
  const [showAllVideos, setShowAllVideos] = useState(true);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [formValues, setFormValues] = useState({
    title: '',
    videoUrl: '',
    description: '',
  });

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/video');
        const data = await response.json();
        setVideos(data.reverse());
      } catch (error) {
        console.error('Videolar çəkilərkən xəta baş verdi', error);
      }
    };

    fetchVideos();
  }, []);

  const handleAddVideoClick = () => {
    setShowAddVideoForm(true);
    setShowAllVideos(false);
    setSelectedVideo(null);
    setFormValues({
      title: '',
      videoUrl: '',
      description: '',
    });
  };

  const handleAllVideosClick = () => {
    setShowAddVideoForm(false);
    setShowAllVideos(true);
    setSelectedVideo(null);
  };

  const handleEditVideo = (video) => {
    setSelectedVideo(video);
    setShowAddVideoForm(true);
    setShowAllVideos(false);
    setFormValues({
      title: video.title,
      videoUrl: video.videoUrl,
      description: video.description,
    });
  };

  const handleViewVideo = (video) => {
    setSelectedVideo(video);
    setShowAddVideoForm(false);
    setShowAllVideos(false);
  };

  const handleDeleteVideo = async (id) => {
    try {
      await fetch(`/api/video/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      setVideos(videos.filter(video => video._id !== id));
      if (selectedVideo && selectedVideo._id === id) {
        setSelectedVideo(null); // Clear selected video if it was deleted
        setShowAllVideos(true); // Return to the list of all videos
      }
    } catch (error) {
      console.error('Video silərkən xəta baş verdi:', error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedVideo) {
        // Update existing video
        await fetch(`/api/video/${selectedVideo._id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formValues),
        });
        setVideos(videos.map(video =>
          video._id === selectedVideo._id ? { ...video, ...formValues } : video
        ));
      } else {
        // Add new video
        const response = await fetch('/api/video', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formValues),
        });
        const newVideo = await response.json();
        setVideos([
          ...videos,
          newVideo
        ]);
      }
      setShowAllVideos(true); // Return to the list of all videos
    } catch (error) {
      console.error('Video əlavə edərkən xəta baş verdi:', error);
    }
    setSelectedVideo(null); // Clear selected video after update
  };

  return (
    <div className="video-management-videoadmin">
      <div className='video-management-videoadmin-h2'>
        <h2>Videolar</h2>
      </div>
      <ul className="video-actions-videoadminbas">
        <li onClick={handleAddVideoClick}>Video Yarat</li>
        <li onClick={handleAllVideosClick}>Butun Videolar</li>
      </ul>

      {showAddVideoForm && (
        <div className="video-form-videoadmin">
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Video Başlığı</label>
            <input 
              id="title" 
              type="text" 
              value={ selectedVideo ? formValues.title :''} 
              onChange={handleChange} 
            />
            <label htmlFor="videoUrl">Video Linki</label>
            <input 
              id="videoUrl" 
              type="text" 
              value={selectedVideo ?formValues.videoUrl :''} 
              onChange={handleChange} 
            />
            <label htmlFor="description">Video Təsviri</label>
            <textarea 
              id="description" 
              value={selectedVideo? formValues.description :''} 
              onChange={handleChange} 
            />
            <button type="submit" className="submit-button-videoadmin">Göndər</button>
          </form>
        </div>
      )}

      {showAllVideos && !selectedVideo && (
        <div className="all-videos-videoadmin">
          {videos.map(video => (
            <div key={video._id} className="video-item-videoadmin">
              <h4>{video.title}</h4>
              <p><strong>Link:</strong> <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">{video.videoUrl}</a></p>
              <p><strong>Təsvir:</strong> {video.description}</p>
              <div className="video-actions-videoadmin">
                <button onClick={() => handleViewVideo(video)}>Videoya Ferdi Bax</button>
                <button onClick={() => handleEditVideo(video)}>Redakte Et</button>
                <button onClick={() => handleDeleteVideo(video._id)}>Sil</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedVideo && !showAddVideoForm && !showAllVideos && (
        <div className="selected-video-videoadmin">
          <h3>{selectedVideo.title}</h3>
          <p><strong>Link:</strong> <a href={selectedVideo.videoUrl} target="_blank" rel="noopener noreferrer">{selectedVideo.videoUrl}</a></p>
          <p><strong>Təsvir:</strong> {selectedVideo.description}</p>
          <div className="deleetandupdate-videoadmin">
            <button onClick={() => handleDeleteVideo(selectedVideo._id)} className="delete-button-videoadmin">Sil</button>
            <button onClick={() => setSelectedVideo(null)} className="back-button-videoadmin">Geri</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoManagement;
