/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { b, img } from "../images";
import BlogContext from "../context/BlogContext";
import CategoryContext from "../context/CategoryContext";
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import { Button } from "react-bootstrap";
import BlogFilter from "../components/BlogFilter";
import { Carousel } from "react-bootstrap";
import BlogList from "../components/BlogList";
import DOMPurify from 'dompurify';
import { ClipLoader } from "react-spinners";
const Home = () => {
  const navigate = useNavigate();
  const { blogs, fetchBlogs } = useContext(BlogContext);
  const { categories, loading, error } = useContext(CategoryContext);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleCardClick = (blog) => {
    navigate(`/blog/${blog.id}`, { state: { blog } });
  };
  const firstBlogCategory = loading
  ? { name: 'Loading...', createdAt: null }
  : categories.find(cat => cat.id === blogs[0]?.categoryId) || { name: 'Unknown Category', createdAt: null };

const firstBlogCategoryName = firstBlogCategory.name;
const firstBlogCategoryCreatedAt = firstBlogCategory.createdAt
  ? new Date(firstBlogCategory.createdAt).toLocaleDateString()
  : 'No Date Available';
  const firstBlogImage=firstBlogCategory.image;

  let categoryName;
  blogs.map((blog) =>{
    categoryName = categories.find(cat => cat.id === blog.categoryId)?.name || 'Unknown Category';
  })
  return (
    <>
      <Hero />
      <section id="popular-topics">
        <Container className="py-4">
          <h3 className="fw-bold">Popular Topics</h3>
          <BlogFilter />
          <Row className="g-3">
            <BlogList />
          </Row>
        </Container>
      </section>

      {/* Big Post OR Card */}
      <section className="py-5">

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', height: '30vh' }}>
          <ClipLoader color={"black"} loading={loading} size={100} />
        </div>
) : (
  blogs.length > 0 ? (
    blogs.slice(0, 1).map((blog) => (
      <Carousel controls={false} indicators={false} key={blog.id}>
        <Carousel.Item>
          <img 
            src={blog.image}
            alt="First slide"
            className="d-block w-100" style={{height:"90vh",objectFit: "cover"}} 
          />
          <Carousel.Caption className="d-flex flex-column justify-content-center align-items-center" style={captionStyle}>
                  <span className={`rounded-3 p-2 text-white ${categories.find(cat => cat.id === blog.categoryId)?.name === "Sports" ? "bg-red" : categories.find(cat => cat.id === blog.categoryId)?.name === "Adventure" ? "bg-blue" : categories.find(cat => cat.id === blog.categoryId)?.name === "Software" ? "bg-orange" :""}`}>
                   {categories.find(cat => cat.id === blog.categoryId)?.name || 'Unknown Category'}
                 </span>
                <h3>{blog.description}</h3>
                <div>
                  {(() => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(blog.blog_content || '', 'text/html'); 
                    const plainText = doc.body.textContent || ""; 
                    const words = plainText.trim().split(/\s+/);
                    const truncatedText = words.slice(0, 6).join(" ");
                    
                    return words.length > 6 ? `${truncatedText}...` : truncatedText;
                  })()}
                </div>
                <p>
                  <span>{format(new Date(blog.createdAt), 'MMMM dd, yyyy')}</span>
                </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    ))
  ) : (
    ""
  )
)}
      </section>

      <section className="editor-picks py-5">
        <Container>
          <h1 className="h1">Editor’s Pick</h1>
          <Row className="g-3">
            {blogs.length > 0 ? (
              blogs.slice(0, 4).map((blog) => (
                <Col md="3" key={blog.id}>
                  <Card className="border-0 shadow-lg rounded-4" style={{ cursor: "pointer" }} onClick={() => handleCardClick(blog)}>
                    <div style={{ position: 'relative' }}> {/* Relative positioning for the card */}
                    <span className={`rounded-3 p-2 text-white category-badge ${categories.find(cat => cat.id === blog.categoryId)?.name === "Sports" ? "bg-red" : categories.find(cat => cat.id === blog.categoryId)?.name === "Adventure" ? "bg-blue" : categories.find(cat => cat.id === blog.categoryId)?.name === "Software" ? "bg-orange" :""}`}>
                      {categories.find(cat => cat.id === blog.categoryId)?.name || 'Unknown Category'}
                    </span>
                      <Card.Img variant="top" src={blog.image} alt="Blog Image" className="img-fluid" style={{height:"300px"}} />
                    </div>
                    <Card.Body className="px-2">
                      {/* Date Formatting */}
                      <small className="text-muted">{format(new Date(blog.createdAt), 'MMMM dd, yyyy')}</small>
                      
                      {/* Blog Description */}
                      <Card.Title>{blog.description}</Card.Title>
                      
                      {/* Blog Content with 6-word Limit */}
                      <Card.Text>
                        {(() => {
                          const parser = new DOMParser();
                          const doc = parser.parseFromString(blog.blog_content || '', 'text/html'); // Ensure blog_content isn't null
                          const plainText = doc.body.textContent || "";  // Extract plain text from HTML
                          
                          const words = plainText.trim().split(/\s+/);   // Split into words by spaces
                          const truncatedText = words.slice(0, 6).join(" "); // Take first 6 words
                          
                          return words.length > 6 ? `${truncatedText}...` : truncatedText; // Add "..." if more than 6 words
                        })()}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p>No blogs found</p>
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};

const captionStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  color: 'white',
};

export default Home;