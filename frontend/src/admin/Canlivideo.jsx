import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import './CanliVideoAdmin.css';

const socket = io(); // WebSocket serverinə qoşulun

const CanliVideoAdmin = () => {
  const [liveVideo, setLiveVideo] = useState(null);
  const [viewersCount, setViewersCount] = useState(0);
  const videoRef = useRef(null);

  const handleStartStream = () => {
    axios.post('/api/live-stream/start')
      .then(response => {
        alert('Canlı video yayını başladı!');
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
              videoRef.current.play();
            }
          })
          .catch(error => {
            console.error('Media cihazlarına daxil olmaqda problem:', error);
          });
      })
      .catch(error => {
        console.error('Canlı yayını başlatmaqda problem:', error);
        alert('Canlı video yayını başlatmaqda problem yaşandı.');
      });
  };

  const handleStopStream = () => {
    axios.get('/api/live-stream/stop')
      .then(response => {
        alert('Canlı video yayını dayandırıldı!');
        if (videoRef.current) {
          videoRef.current.srcObject = null; // Videonu dayandırın
        }
      })
      .catch(error => {
        console.error('Canlı yayını dayandırmaqda problem:', error);
        alert('Canlı video yayını dayandırmaqda problem yaşandı.');
      });
  };

  useEffect(() => {
    socket.on('liveVideoUpdate', (data) => {
      setLiveVideo(data.liveVideo);
      setViewersCount(data.viewersCount);
    });

    // Live video tələb edin
    socket.emit('requestLiveVideo');

    return () => {
      socket.off('liveVideoUpdate');
    };
  }, []);

  return (
    <div className="canli-video-admin">
      <button className="canli-video-button" onClick={handleStartStream}>
        Canlı videoya keçmək istəyirsiniz?
      </button>
      <button className="canli-video-button" onClick={handleStopStream}>
        Canlı videonu dayandırın
      </button>
      {liveVideo && (
        <div>
          <h2>{liveVideo.streamName}</h2>
          <p>{liveVideo.description}</p>
          <p>İzləyici sayı: {viewersCount}</p>
          <video ref={videoRef} controls autoPlay></video>
        </div>
      )}
    </div>
  );
};

export default CanliVideoAdmin;
