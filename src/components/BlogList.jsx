/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { Col, Card, Row } from 'react-bootstrap';
import { format } from 'date-fns';
import Pagination from '@mui/material/Pagination';
import BlogContext from '../context/BlogContext';
import { useNavigate } from 'react-router-dom';
import { b } from '../images';
import { PaginationItem } from '@mui/material';
import CategoryContext from '../context/CategoryContext';

function BlogList() {
    const navigate=useNavigate()
    const { blogs, fetchBlogs, loading, error,setSelectedCategory } = useContext(BlogContext);
    const { categories } = useContext(CategoryContext);
    useEffect(() => {
      fetchBlogs();
    }, []);
   
  
    const handleCardClick=(blog) => {
      navigate(`/blog/${blog.id}`, { state: { blog } });
    }
  // State to track current page
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 8;

  // Calculate total number of pages
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  // Get the blogs for the current page
  const currentBlogs = blogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  let categoryName;
  blogs.map((blog) =>{
    categoryName = categories.find(cat => cat.id === blog.categoryId)?.name || 'Unknown Category';
  })
  return (
    <Row className='g-3'>
      {blogs.length > 0 ? (
        <>
          {currentBlogs.map((blog) => (
             <Col md="3" key={blog.id}>
             <Card className="border-0 h-100 shadow-lg rounded-4" style={{ cursor: "pointer" }} onClick={() => handleCardClick(blog)}>
              <div style={{ position: 'relative' }}>
                <span className={`rounded-3 p-2 text-white category-badge ${categories.find(cat => cat.id === blog.categoryId)?.name === "Sports" ? "bg-red" : categories.find(cat => cat.id === blog.categoryId)?.name === "Adventure" ? "bg-blue" : categories.find(cat => cat.id === blog.categoryId)?.name === "Software" ? "bg-orange" :""}`}>
                   {categories.find(cat => cat.id === blog.categoryId)?.name || 'Unknown Category'}
                 </span>
                 <Card.Img variant="top" src={blog.image} alt={"Blog Image"} className="img-fluid" style={{height:"280px"}} />
              </div>
              <Card.Body className="px-2">
                <small className="text-muted">{format(new Date(blog.createdAt), 'MMMM dd, yyyy')}</small>
                <p>{blog.name}</p>
                <Card.Title>{blog.description}</Card.Title>
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
          ))}

          <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" style={{ marginTop: '20px', justifyContent: 'center', display: 'flex' }} renderItem={(item) => (
            <PaginationItem {...item} components={{ next: () => <span>{currentPage + 1 <= totalPages ? currentPage + 1 : currentPage}</span>, previous: () => <span>{currentPage - 1 > 0 ? currentPage - 1 : currentPage}</span> }}/>
      )}
    />
        </>
      ) : (
        <p>No blogs found</p>
      )}
    </Row>
  );
}

export default BlogList;
