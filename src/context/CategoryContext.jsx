/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';


const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  // Fetch categories function
  const fetchCategories = async (limit = 10, offset = 0) => {
    try {
      setLoading(true); 
      const response = await axios.get('http://localhost:5000/api/categories', {
        params: { limit, offset },
      });
      setCategories(response.data.rows);
      setLoading(false);
    } catch (err) {
      setError(err.message); 
      setLoading(false);
    }
  };

  // Automatically fetch categories on component mount
  useEffect(() => {
    fetchCategories(); 
  }, []); 

  return (
    <CategoryContext.Provider value={{ categories, loading, error, fetchCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;