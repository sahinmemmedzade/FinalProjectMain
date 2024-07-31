import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './KateqoriyaOptions.css';

const KateqoriyaOptions = () => {
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (showAllCategories) {
      fetchAllCategories();
    }
  }, [showAllCategories]);

  const fetchAllCategories = async () => {
    try {
      const response = await axios.get('/api/category/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddCategoryClick = () => {
    setShowAddCategoryForm(!showAddCategoryForm);
    setShowAllCategories(false);
  };

  const handleAllCategoriesClick = () => {
    setShowAllCategories(!showAllCategories);
    setShowAddCategoryForm(false);
  };

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/category/categories', { name: categoryName });
      alert('Kateqoriya uğurla əlavə edildi!');
      setCategoryName('');
      setShowAddCategoryForm(false);
      fetchAllCategories();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!id) {
      alert('Kateqoriya ID-si mövcud deyil.');
      return;
    }
    try {
      await axios.delete(`/api/category/categories/${id}`);
      alert('Kateqoriya uğurla silindi!');
      fetchAllCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Kateqoriya silinərkən xəta baş verdi.');
    }
  };

  return (
    <div className="kateqoriya-options">
      <h2>Kateqoriyalar</h2>
      <ul>
        <li onClick={handleAddCategoryClick}>Kateqoriya əlavə et</li>
        <li onClick={handleAllCategoriesClick}>Butun kateqoriyalar</li>
      </ul>

      {showAddCategoryForm && (
        <div className="kateqoriya-form">
          <h3>Kateqoriya əlavə et</h3>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="category-name">Kateqoriya adı</label>
            <input
              id="category-name"
              type="text"
              value={categoryName}
              onChange={handleCategoryNameChange}
            />
            <button type="submit" className="submit-button">Göndər</button>
          </form>
        </div>
      )}

      {showAllCategories && (
        <div className="all-categories">
          {categories.length > 0 ? (
            categories.map(category => (
              <div key={category._id} className="category-item">
                <h4>{category.name}</h4>
                <div className="delete-containercategory">
                  <button
                    className="delete-buttoncategory"
                    onClick={() => handleDeleteCategory(category._id)}
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Kateqoriya mövcud deyil</p>
          )}
        </div>
      )}
    </div>
  );
};

export default KateqoriyaOptions;
