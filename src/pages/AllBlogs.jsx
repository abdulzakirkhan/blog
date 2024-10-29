/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import BlogContext from '../context/BlogContext';
import { format } from 'date-fns';
import { b } from '../images';
import Hero from '../components/Hero';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import ClipLoader from 'react-spinners/ClipLoader';
import { PaginationItem } from '@mui/material';
import CategoryContext from '../context/CategoryContext';
const AllBlogs = () => {
    const navigate=useNavigate()
    const { categories } = useContext(CategoryContext);
    const { blogs, fetchBlogs, loading, error,setSelectedCategory } = useContext(BlogContext);
    useEffect(() => {
      fetchBlogs();
    }, []);
   
  
    const handleCardClick=(blog) => {
      console.log(blog.id)
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

  return (
    <>
    <Hero span={"ADVENTURE"} title={"Richird Norton photorealistic rendering as real photos"} time={"08.08.2021"} content={` Progressively incentivize cooperative systems through
                  technically sound functionalities. The credibly productivate
                  seamless data.`} />
    <Container className="py-5">
    <Row>
      {blogs.length > 0 ? (
        <>
          {currentBlogs.map((blog) => (
             <Col md="3" key={blog.id}>
             <Card className="border-0" style={{ cursor: 'pointer' }} onClick={() => handleCardClick(blog)}>
               <div style={{ position: 'relative' }}>
                  <span className={`rounded-3 p-2 text-white category-badge ${categories.find(cat => cat.id === blog.categoryId)?.name === "Sports" ? "bg-red" : categories.find(cat => cat.id === blog.categoryId)?.name === "Adventure" ? "bg-blue" : categories.find(cat => cat.id === blog.categoryId)?.name === "Software" ? "bg-orange" :""}`}>
                   {categories.find(cat => cat.id === blog.categoryId)?.name || 'Unknown Category'}
                 </span>
                 <Card.Img variant="top" src={b} />
               </div>
               <Card.Body className="p-0">
                 {format(new Date(blog.createdAt), 'MMMM dd, yyyy')}
                 <Card.Title>{blog.description}</Card.Title>
                 <Card.Text>{(() => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(blog.blog_content || '', 'text/html');
                const plainText = doc.body.textContent || "";  
                const words = plainText.trim().split(/\s+/); 
                const truncatedText = words.slice(0, 6).join(" ");
                
                return words.length > 6 ? `${truncatedText}...` : truncatedText; 
              })()}</Card.Text>
               </Card.Body>
             </Card>
           </Col>
          ))}
          {/* MUI Pagination Component */}
          <Pagination
      count={totalPages}
      page={currentPage}
      onChange={handlePageChange}
      color="primary"
      style={{ marginTop: '20px', justifyContent: 'center', display: 'flex' }}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          // Customizing the 'next' button to show the next page number
          components={{
            next: () => <span>{currentPage + 1 <= totalPages ? currentPage + 1 : currentPage}</span>,
            previous: () => <span>{currentPage - 1 > 0 ? currentPage - 1 : currentPage}</span>
          }}
        />
      )}
    />
        </>
      ) : (
        <p>No blogs found</p>
      )}
    </Row>
    </Container>
    </>
  )
}

export default AllBlogs;