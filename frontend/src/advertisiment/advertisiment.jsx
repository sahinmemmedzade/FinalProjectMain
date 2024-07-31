import React, { useState, useEffect } from 'react';
import './Advertisiment.css'; // CSS faylını import edin

function Advertisiment() {
  const [ads, setAds] = useState([]);

  // Bütün reklamları çəkmək
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch('/api/advertisiment');
        if (response.ok) {
          const data = await response.json();
          setAds(data);
        } else {
          console.error('Reklamları çəkməkdə xəta baş verdi');
        }
      } catch (error) {
        console.error('Reklamları çəkməkdə xəta baş verdi:', error);
      }
    };

    fetchAds();
  }, []);

  return (
    <div className="advertisiment-container">
      {ads.map(ad => (
        <div key={ad._id} className="ad-items">
          <img
            src={`/${ad.productPic}`} // Şəkil URL-sini düzəldin
            alt={`Ad ${ad._id}`}
            className="ad-images"
          />
        </div>
      ))}
    </div>
  );
}

export default Advertisiment;
