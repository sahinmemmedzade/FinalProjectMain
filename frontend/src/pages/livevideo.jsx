import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LiveVideo = () => {
  const [liveVideo, setLiveVideo] = useState(null);
  const [viewersCount, setViewersCount] = useState(0);

  const fetchLiveVideo = async () => {
    try {
      const response = await axios.get('/api/live-stream'); // Canlı video məlumatlarını əldə edin
      const { liveVideo, viewersCount } = response.data;
      setLiveVideo(liveVideo);
      setViewersCount(viewersCount);
    } catch (error) {
      console.error('Canlı video məlumatlarını əldə etməkdə problem:', error);
    }
  };

  useEffect(() => {
    fetchLiveVideo(); // Komponent yüklənərkən canlı video məlumatlarını əldə edin

    // Mütəmadi olaraq yeniləmək üçün interval əlavə edin
    const intervalId = setInterval(fetchLiveVideo, 5000); // 5 saniyədə bir yeniləyir

    return () => clearInterval(intervalId); // Komponent unmont edilərkən intervalı təmizləyir
  }, []);

  return (
    <div className="live-video">
      {liveVideo ? (
        <div>
          <h2>{liveVideo.streamName}</h2>
          <p>{liveVideo.description}</p>
          <p>İzləyici sayı: {viewersCount}</p>
          <video src={liveVideo.myStream} controls autoPlay></video>
        </div>
      ) : (
        <p>Canlı video mövcud deyil.</p>
      )}
    </div>
  );
};

export default LiveVideo;
