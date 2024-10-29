/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import BlogContext from '../context/BlogContext';
import CategoryContext from '../context/CategoryContext';

const BlogFilter = () => {
  const navigate = useNavigate();
  const { fetchBlogs, fetchByCategoryBlogs, searchBlogs,allBlogs } = useContext(BlogContext);
  const { categories, loading, error } = useContext(CategoryContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategoryState] = useState('');

  useEffect(() => {
    if (selectedCategory) {
      fetchByCategoryBlogs(selectedCategory);
    } else {
      fetchBlogs();
    }
  }, [selectedCategory]);


  useEffect(() => {
    if (searchQuery) {
      searchBlogs(searchQuery, selectedCategory);
    } else {
      fetchBlogs();
    }
  }, [searchQuery]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryState(categoryId);
  };

  const handleViewAll = () => {
    setSelectedCategoryState('');
    navigate('/all-blogs');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

const viewAll =async () => {
  allBlogs();
};

  return (
    <Row className="d-flex align-items-center justify-content-between py-4">
      <Col md="8">
        <div className="d-flex gap-2 flex-sm-wrap py-sm-2">
          <Button onClick={viewAll}>All</Button>
          {categories.map((category) => (
            <Button 
            className={selectedCategory === category.id ? 'btn btn-primary active' : 'btn btn-primary'}
              onClick={() => handleCategoryClick(category.id)} 
              key={category.id}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </Col>
      <Col md="4" className="d-flex justify-content-end px-md-4">
      <div className="d-flex gap-2 align-items-center">
        <Form.Control 
          type="text" 
          placeholder="Search blogs..." 
          onChange={(e) => handleSearch(e.target.value)}
          value={searchQuery}
          style={{ maxWidth: '200px' }}
        />
        <Button className="btn btn-primary" onClick={handleViewAll}>View All</Button>
      </div>
      </Col>
    </Row>
  );
};

export default BlogFilter;