/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import BlogContext from '../context/BlogContext';
import { Card, Col, Container, Row } from 'react-bootstrap';
import CategoryContext from '../context/CategoryContext';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const PopularBlogs = () => {
  const { topBlogs, fetchTopBlogs, loading, error } = useContext(BlogContext);
  const { categories } = useContext(CategoryContext); 
  const navigate=useNavigate()
  useEffect(() => {
    fetchTopBlogs();
  }, []);
  const handleCardClick = (blog) => {};
  

  return (
    <Container fluid className="py-5 my-3">
        <Row className='g-3 px-0'>
        <h2>Top 3 Popular Blogs</h2>
        {topBlogs.length > 0 ? (
            topBlogs.map((blog) => (
            <Col md="3" key={blog.id}>
                <Card className="border-0 h-100 shadow-lg" style={{ cursor: "pointer" }} onClick={() => handleCardClick(blog)}>
                    <div style={{ position: 'relative' }}>
                    <span className={`rounded-3 p-2 text-white category-badge ${categories.find(cat => cat.id === blog.categoryId)?.name === "Sports" ? "bg-red" : categories.find(cat => cat.id === blog.categoryId)?.name === "Adventure" ? "bg-blue" : categories.find(cat => cat.id === blog.categoryId)?.name === "Software" ? "bg-orange" :""}`}>
                      {categories.find(cat => cat.id === blog.categoryId)?.name || 'Unknown Category'}
                    </span>
                        <Card.Img variant="top" src={blog.image} alt="Blog Image" className="img-fluid" style={{height:"300px"}} />
                    </div>
                    <Card.Body className="px-2">
                        {/* Date Formatting */}
                        <small className="text-muted">{format(new Date(blog.createdAt), 'MMMM dd, yyyy')}</small>
                    
                        {/* Blog Description */}
                        <p>{blog.name}</p>
                        <Card.Title>{blog.description}</Card.Title>
                        
                        {/* Blog Content with 6-word Limit */}
                        <Card.Text>
                            {(() => {
                                const parser = new DOMParser();
                                const doc = parser.parseFromString(blog.blog_content || '', 'text/html');
                                const plainText = doc.body.textContent || ""; 
                                
                                const words = plainText.trim().split(/\s+/);
                                const truncatedText = words.slice(0, 6).join(" ");
                                
                                return words.length > 6 ? `${truncatedText}...` : truncatedText; 
                            })()}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            ))
        ) : (
            <p>No popular blogs found.</p>
        )}
        </Row>
    </Container>
  );
};

export default PopularBlogs;
