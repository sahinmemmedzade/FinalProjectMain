import React, { useState, useEffect } from 'react';
import './Xeberler.css';

const Xeberler = () => {
  const [showAddNewsForm, setShowAddNewsForm] = useState(false);
  const [showAllNews, setShowAllNews] = useState(true);
  const [newsItems, setNewsItems] = useState([]);
  
  const [selectedNews, setSelectedNews] = useState(null);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Aylar 0-dan başladığı üçün 1 əlavə edirik
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  const [formValues, setFormValues] = useState({
    title: '',
    categoryId: '', // Updated field name
    content: '',
    image: null
  });
  const [categories, setCategories] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(21);

  
  useEffect(() => {
    // Fetch all news items
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        const data = await response.json();
        if (Array.isArray(data)) {
          setNewsItems(data.reverse());
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
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = newsItems.slice(indexOfFirstNews, indexOfLastNews);

  const handleAddNewsClick = () => {
    setShowAddNewsForm(true);
    setShowAllNews(false);
    setSelectedNews(null);
    setFormValues({
      title: '',
      categoryId: '', // Updated field name
      content: '',
      image: null
    });
    setFormErrors({});
  };

  const handleAllNewsClick = () => {
    setShowAddNewsForm(false);
    setShowAllNews(true);
    setSelectedNews(null);
  };

  const handleEditNews = (news) => {
    setSelectedNews(news);
    setShowAddNewsForm(true);
    setShowAllNews(false);
    setFormValues({
      title: news.title,
      categoryId: news.categoryId, // Updated field name
      content: news.description,
      image: news.image // Mövcud şəkil URL-ni buraya əlavə edin
    });
    setFormErrors({});
  };

  const handleViewNews = (news) => {
    setSelectedNews(news);
    setShowAddNewsForm(false);
    setShowAllNews(false);
  };

  const handleDeleteNews = async (id) => {
    try {
      await fetch(`/api/news/${id}`, { method: 'DELETE' });
      setNewsItems(newsItems.filter(news => news._id !== id));
      if (selectedNews && selectedNews._id === id) {
        setSelectedNews(null);
        setShowAllNews(true);
      }
    } catch (error) {
      console.error('Xəbəri silərkən xəta baş verdi', error);
    }
  };

 const handleChange = (e) => {
  const { id, value } = e.target;
  setFormValues(prevValues => ({
    ...prevValues,
    [id]: value
  }));
};


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormValues(prevValues => ({
      ...prevValues,
      image: file
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formValues.title) errors.title = 'Başlıq tələb olunur';
    if (!formValues.categoryId) errors.categoryId = 'Kateqoriya tələb olunur'; // Updated field name
    if (!formValues.content) errors.content = 'Məzmun tələb olunur';
    if (!formValues.image) errors.image = 'Şəkil tələb olunur';
    return errors;
  };




 const handleSubmit = async (e) => {
  e.preventDefault();
  const errors = validateForm();
  if (Object.keys(errors).length > 0) {
    setFormErrors(errors);
    return;
  }

  const formData = new FormData();
  formData.append('title', formValues.title);
  formData.append('description', formValues.content);
  formData.append('categoryName', formValues.categoryId); // `categoryName` istifadə edin
  if (formValues.image) {
    formData.append('image', formValues.image);
  }

  try {
    const url = selectedNews ? `/api/news/${selectedNews._id}` : '/api/news';
    const method = selectedNews ? 'PATCH' : 'POST';
    const response = await fetch(url, {
      method,
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Server error: ${errorData.error || 'Unknown error'}`);
    }

    const data = await response.json();
    if (selectedNews) {
      setNewsItems(newsItems.map(news => (news._id === data._id ? data : news)));
    } else {
      setNewsItems([...newsItems, data]);
    }
    setShowAllNews(true);
    alert('Xəbər uğurla əlavə edildi!');
    setFormValues({
      title: '',
      categoryId: '', // `categoryId` ilə uyğunlaşdırın
      content: '',
      image: null
    });
  } catch (error) {
    console.error('Xəbəri göndərərkən xəta baş verdi:', error.message);
  }
};

  const handleNextPage = () => {
    if (currentPage < Math.ceil(newsItems.length / newsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div className="xeberler-xeberadmin">
      <h2>Xeberler</h2>
      <ul className="xeber-actions-xeberadmin">
        <li onClick={handleAddNewsClick}>Yeni Xeber Yarat</li>
        <li onClick={handleAllNewsClick}>Butun Xeberler</li>
      </ul>

      {showAddNewsForm && (
  <div className="xeber-form-xeberadmin">
    <h3>{selectedNews ? 'Xeberi Redakte Et' : 'Yeni Xeber Yarat'}</h3>
    <form onSubmit={handleSubmit}>
      <label htmlFor="news-image">Xeberin Sekili</label>
      <input 
        id="news-image" 
        type="file" 
        onChange={handleImageChange} 
      />
      <input 
        type="text" 
        value={selectedNews ?formValues.image:"" } // Faylın adını göstərir
        readOnly
        className="image-file-name-xeberadmin"
      />

      <label htmlFor="title">Xeberin Basligi</label>
      <input 
        id="title" 
        type="text" 
        value={formValues.title} 
        onChange={handleChange} 
      />
      {formErrors.title && <p className="form-error">{formErrors.title}</p>}
      
      <label htmlFor="categoryId">Xeberin Kateqoriyasi</label>
 <select 
  id="categoryId" 
  value={formValues.categoryId} 
  onChange={handleChange}
>
  <option value="">Kateqoriya Seçin</option>
  {categories.map((category) => (
    <option key={category._id}       value={selectedNews ? category._id : category.name}
>
      {category.name}
    </option>
  ))}
</select>

      {formErrors.categoryId && <p className="form-error">{formErrors.categoryId}</p>}
      
      <label htmlFor="content">Xeberin Məzmunu</label>
      <textarea 
        id="content" 
        value={formValues.content} 
        onChange={handleChange} 
      />
      {formErrors.content && <p className="form-error">{formErrors.content}</p>}
      
      {formErrors.image && <p className="form-error">{formErrors.image}</p>}
      
      <button type="submit" className="submit-button-xeberadmin">Göndər</button>
    </form>
  </div>
)}


{showAllNews && !selectedNews && (
        <div className="all-news-xeberadmin">
          {currentNews.map(news => {
            const categoryName = categories.find(c => c._id === news.categoryId);
            return (
              <div key={news._id} className="news-item-xeberadmin">
                <h4>{news.title}</h4>
                {news.image && <img src={news.image} alt={news.title} className="news-image-xeberadmin" />}
                <p><strong>Kateqoriya:</strong> {categoryName?.name}</p>
                <p><strong>Məzmun:</strong> {news.description}</p>
                <p><strong>Like:</strong> {news.likes}</p>
                <p><strong>Dislike:</strong> {news.dislikes}</p>
                <p><strong>Yaradılma Tarixi:</strong> {new Date(news.createdAt).toLocaleDateString()}</p>
                <p><strong>Views:</strong> {news.views}</p>
                <div className="news-reviews-xeberadmin">
                  <h5>Rəylər:</h5>
                  {news.reviews.length > 0 ? (
                    <ul>
                      {news.reviews.map((review) => (
                        <li key={review._id}>
                          <p><strong>İstifadəçi:</strong> {review.Username}</p>
                          <p><strong>Rəy:</strong> {review.comment}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Rəy yoxdur.</p>
                  )}
                </div>
                <div className="news-actions-xeberadmin">
                  <button onClick={() => handleEditNews(news)}>Redaktə Et</button>
                  <button onClick={() => handleDeleteNews(news._id)}>Sil</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Əvvəlki
        </button>
        {[...Array(Math.ceil(newsItems.length / newsPerPage))].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(newsItems.length / newsPerPage)}
        >
          Növbəti
        </button>
      </div>
    </div>
  );
};



export default Xeberler;
