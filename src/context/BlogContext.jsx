/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
import axios from 'axios';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [blogViews, setBlogViews] = useState()
  const [topBlogs, setTopBlogs] = useState([]);


  const fetchBlogs = async (category = '', limit = 10, offset = 0) => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/blogs', {
        params: { category, limit, offset },
      });
      setBlogs(response.data.rows); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const allBlogs = async (category = '', limit = 10, offset = 0) => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/blogs', {
        params: { category, limit, offset },
      });
      setBlogs(response.data.rows); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchByCategoryBlogs = async (category='', limit = 10, offset = 0) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/blogs/category/${category}`, {
        params: {category, limit, offset },
      });
  
      if (response.data && response.data.rows && response.data.rows.length > 0) {
        // Blogs found, update the blogs state
        setBlogs(response.data.rows); 
        setError(null); // Clear the error state
      } else {
        // No blogs found, clear the blogs and set an error message
        setBlogs([]); 
        setError('No blogs found'); 
      }
    } catch (err) {
      setError(err.message); // Handle any API errors
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  

  const addBlog = async (newBlog) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/blog', newBlog);
      setBlogs([...blogs, response.data]); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const searchBlogs = async (q = '', category = '', limit = 10, offset = 0) => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/blogs/search', {
        params: { q, category, limit, offset },
      });

      if (response.data && response.data.length > 0) {
        setBlogs(response.data); 
        setError(null); 
      } else {
        setBlogs([]); 
        setError('No blogs found matching your search');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  

  const fetchTopBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/blogs/top');
      setTopBlogs(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <BlogContext.Provider value={{ blogs, fetchBlogs,allBlogs,topBlogs,fetchTopBlogs, addBlog,searchBlogs, loading, error, setSelectedCategory, fetchByCategoryBlogs }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContext;