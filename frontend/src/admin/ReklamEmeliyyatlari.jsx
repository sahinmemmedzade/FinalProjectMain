import React, { useState, useEffect } from 'react';
import './ReklamOptions.css';

const ReklamOptions = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAllAds, setShowAllAds] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [ads, setAds] = useState([]);

  const handleAddReklamClick = () => {
    setShowAddForm(!showAddForm);
    setShowAllAds(false);
  };

  const handleAllAdsClick = async () => {
    setShowAllAds(!showAllAds);
    setShowAddForm(false);

    if (!showAllAds) { // Fetch ads only if showing all ads
      try {
        const response = await fetch('/api/advertisiment');
        if (response.ok) {
          const data = await response.json();
          setAds(data);
        } else {
          throw new Error('Failed to fetch advertisements');
        }
      } catch (error) {
        console.error('Error fetching advertisements:', error);
        alert('Reklamlar alınarkən bir xəta baş verdi: ' + error.message);
      }
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('productPic', selectedFile);

    try {
      const response = await fetch('/api/advertisiment', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Reklam uğurla əlavə edildi');
        setSelectedFile(null);
        // Refetch ads if needed
        if (showAllAds) {
          handleAllAdsClick();
        }
      } else {
        throw new Error('Failed to add advertisement');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Reklam əlavə edilərkən bir xəta baş verdi: ' + error.message);
    }
  };

  const handleDeleteAd = async (id) => {
    try {
      const response = await fetch(`/api/advertisiment/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Update the ads state without causing a page change
        setAds((prevAds) => prevAds.filter(ad => ad._id !== id));
        alert('Reklam uğurla silindi');
      } else {
        throw new Error('Failed to delete advertisement');
      }
    } catch (error) {
      console.error('Error deleting advertisement:', error);
      alert('Reklam silinərkən bir xəta baş verdi: ' + error.message);
    }
  };

  return (
    <div className="reklam-options">
      <h2>Reklam</h2>
      <ul>
        <li onClick={handleAddReklamClick}>Reklam əlavə et</li>
        <li onClick={handleAllAdsClick}>Butun reklamlar</li>
      </ul>
      
      {showAddForm && (
        <div className="reklam-form">
          <h3>Fayl əlavə et</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="file-upload" className="custom-file-upload">
              Fayl seçin
            </label>
            <input id="file-upload" type="file" onChange={handleFileChange} />
            <button type="submit" className="submit-button">Göndər</button>
          </form>
        </div>
      )}

      {showAllAds && (
        <div className="all-ads">
          {ads.length > 0 ? (
            ads.map(ad => (
              <div key={ad._id} className="ad-item">
                <img src={ad.productPic} alt={`Ad ${ad._id}`} className="ad-image" />
                <button className="delete-button" onClick={() => handleDeleteAd(ad._id)}>
                  Sil
                </button>
              </div>
            ))
          ) : (
            <p>Heç bir reklam tapılmadı.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ReklamOptions;
