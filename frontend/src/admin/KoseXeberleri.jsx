import React, { useState, useEffect } from 'react';
import './Xeberler.css';

const KoseXeberleri = () => {
  const [showAddNewsForm, setShowAddNewsForm] = useState(false);
  const [showAllNews, setShowAllNews] = useState(true);
  const [newsItems, setNewsItems] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isNewsUpdated, setIsNewsUpdated] = useState(false);

  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    views: 0, // Default baxış sayı
  });
  const [categories, setCategories] = useState([]);
  const [formErrors, setFormErrors] = useState({});
// Tarixi oxunaqlı formata çevirən funksiya
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Aylar 0-dan başladığı üçün 1 əlavə edirik
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Tarix formatını göstərmək üçün əlavə edin

useEffect(() => {
  // Fetch all news items
  const fetchNews = async () => {
    try {
      const response = await fetch('/api/newssidebar/sidebar-news');
      const data = await response.json();
      if (Array.isArray(data)) {
        setNewsItems(data);
        setIsNewsUpdated(data.some(item => item.updated)); // `updated` statusunu yoxlayın
      } else {
        console.error('Gələn məlumat `Array` tipində deyil:', data);
      }
    } catch (error) {
      console.error('Xəbərlər çəkilərkən xəta baş verdi', error);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/category/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Kategoriyalar çəkilərkən xəta baş verdi', error);
    }
  };

  fetchNews();
  fetchCategories();
}, []);

  const handleAddNewsClick = () => {
    setShowAddNewsForm(true);
    setShowAllNews(false);
    setSelectedNews(null);
    setFormValues({
      title: '',
      description: '',
      views: 0, // Default baxış sayı
    });
    setFormErrors({});
  };

  const handleAllNewsClick = () => {
    setShowAddNewsForm(false);
    setShowAllNews(true);
    setSelectedNews(null);
  };

  const handleEditNews = (news) => {
    setShowAddNewsForm(true);
    setShowAllNews(false);
    setFormValues({
      title: news.title,
      description: news.description,
      views: news.views,
      images:news.image // Varsayılan baxış sayı
    });
    setFormErrors({});
  };

  const handleViewNews = (news) => {
    setSelectedNews(news);
    setShowAddNewsForm(false);
    setShowAllNews(false);
  };

  const handleDeleteNews = async (id) => {
    if (!id) {
      console.error('Silinəcək xəbər ID-si təmin edilmədi');
      alert('Silinəcək xəbər ID-si təmin edilmədi');
      return;
    }
  
    try {
      console.log('Deleting news with ID:', id); // ID-nin konsolda yazılması
  
      // Serverə DELETE istəyi göndərilir
      const response = await fetch(`/api/newssidebar/sidebar-news/${id}`, { method: 'DELETE' });
  
      // Serverdən gələn cavabı yoxlayın
      if (response.ok) {
        console.log(`Xəbər ID ${id} müvəffəqiyyətlə silindi`);
  
        // Silinmiş xəbəri müştəri tərəfdən silirik
        setNewsItems(newsItems.filter(news => news._id !== id)); // _id ilə yoxlayın
  
        // Seçilmiş xəbəri də silinmişsə yeniləyin
        if (selectedNews && selectedNews._id === id) { // _id ilə yoxlayın
          setSelectedNews(null);
          setShowAllNews(true);
        }
        alert('Xəbər uğurla silindi');
      } else {
        // Xətanı konsolda və istifadəçiyə göstəririk
        console.error('Xəbəri silərkən xəta baş verdi:', await response.text());
        alert('Xəbəri silərkən xəta baş verdi');
      }
    } catch (error) {
      // Şəbəkə xətası baş verərsə istifadəçiyə göstəririk
      console.error('Şəbəkə xəta baş verdi:', error);
      alert('Şəbəkə xəta baş verdi: ' + error.message);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [id]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formValues.title) errors.title = 'Başlıq tələb olunur';
    if (!formValues.description) errors.description = 'Təsvir tələb olunur';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = selectedNews
        ? await fetch(`/api/newssidebar/sidebar-news/${selectedNews._id}`, { // _id istifadə edin
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...formValues }),
          })
        : await fetch('/api/newssidebar/sidebar-news', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...formValues, date: new Date().toISOString() }), // İndiki tarixi əlavə edin
          });

      if (response.ok) {
        const updatedNews = await response.json();
        setIsNewsUpdated(true); // Yeniləndi işarələyin

        if (selectedNews) {
          setNewsItems(newsItems.map(news =>
            news._id === updatedNews._id ? updatedNews : news // _id ilə yoxlayın
          ));
          alert('Xəbər müvəffəqiyyətlə yeniləndi');
        } else {
          setNewsItems([
            ...newsItems,
            { _id: updatedNews._id, ...formValues, date: new Date().toISOString() } // İndiki tarixi əlavə edin
          ]);
          alert('Yeni xəbər müvəffəqiyyətlə əlavə olundu');
        }
        setSelectedNews(null);
        setShowAllNews(true);
      } else {
        alert('Xəbəri yeniləyərkən və ya əlavə edərkən xəta baş verdi');
      }
    } catch (error) {
      alert('Şəbəkə xəta baş verdi: ' + error.message);
    }
  };

  return (
    <div className="xeberler-xeberadmin">
      <h2>Köşə Xəbərləri</h2>
      <ul className="xeber-actions-xeberadmin">
        <li onClick={handleAddNewsClick}>Yeni Xəbər Yarat</li>
        <li onClick={handleAllNewsClick}>Bütün Xəbərlər</li>
      </ul>

      {showAddNewsForm && (
        <div className="xeber-form-xeberadmin">
          <h3>{selectedNews ? 'Xəbəri Redaktə Et' : 'Yeni Xəbər Yarat'}</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Xəbərin Başlığı</label>
            <input 
              id="title" 
              type="text" 
              value={selectedNews ?formValues.title:''} 
              onChange={handleChange} 
            />
            {formErrors.title && <p className="form-error">{formErrors.title}</p>}
            
            <label htmlFor="description">Xəbərin Təsviri</label>
            <textarea 
              id="description" 
              value={selectedNews ? formValues.description :''} 
              onChange={handleChange} 
            />
            {formErrors.description && <p className="form-error">{formErrors.description}</p>}
            
            <button type="submit" className="submit-button-xeberadmin">Göndər</button>
          </form>
        </div>
      )}

      {showAllNews && !selectedNews && (
        <div className="all-news-xeberadmin">
        {newsItems.map(news => (
  <div key={news._id} className="news-item-xeberadmin"> {/* _id istifadə edin */}
    <h4>{news.title}</h4>
    <p><strong>Məzmun:</strong> {news.description}</p>
    <p><strong>Baxış Sayı:</strong> {news.views}</p>
    <p><strong>Tarix:</strong> {formatDate(news.date)}</p>

    <div className="news-actions-xeberadmin">
      <button onClick={() => handleEditNews(news)}>Redaktə Et</button>
      <button onClick={() => handleDeleteNews(news._id)}>Sil</button> {/* _id istifadə edin */}
    </div>
    {news.updated && <p className="updated-status">Yeniləndi</p>} {/* Yenilənmiş statusu göstər */}
  </div>
))}

        </div>
      )}

      {selectedNews && (
        <div className="selected-news-xeberadmin">
          <h3>Seçilmiş Xəbər</h3>
          <h4>{selectedNews.title}</h4>
          <p>{selectedNews.description}</p>
          <p><strong>Baxış Sayı:</strong> {selectedNews.views}</p>
          <button onClick={() => setSelectedNews(null)}>Geri</button>
        </div>
      )}
    </div>
  );
};

export default KoseXeberleri;
