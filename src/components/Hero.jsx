/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import CategoryContext from '../context/CategoryContext';
import BlogContext from '../context/BlogContext';

const Hero = () => {
  const { blogs, fetchBlogs } = useContext(BlogContext);
  const { categories, loading, error } = useContext(CategoryContext);
  

  useEffect(() => {
    fetchBlogs();
  }, []);


  const firstBlog = blogs[0] ;
  const firstBlogCategory = firstBlog 
    ? categories.find(cat => cat.id === firstBlog.categoryId) || { name: 'Unknown Category' }
    : { name: 'Loading...' };

  return (
      <section id="hero" style={{ backgroundImage: `url(${firstBlog?.image})`,objectFit: "cover"}}>
        <Container>

        <Row className="text-center justify-content-center">
          <Col md="8">
            <div className="">
              <span className={`rounded-3 p-2 text-white ${firstBlogCategory.name === 'Software' ? 'bg-orange' :firstBlogCategory.name === 'Sports' ? 'bg-red' : firstBlogCategory.name === 'Adventure' ? 'bg-blue' : ''}`}>
                {firstBlogCategory.name}
              </span>
              {firstBlog ? (
              <>
                <p className="text-white fs-20">{firstBlog.title}</p>
                <div className="d-flex gap-3">
                  <span className="time text-white">{new Date(firstBlog.createdAt).toLocaleDateString()}</span>
                  <span className="line bg-white"></span>
                  <p className="text-white" dangerouslySetInnerHTML={{ __html: firstBlog.blog_content }} />
                </div>
              </>
            ) : (
              <p className="text-white">Loading first blog...</p>
            )}
            </div>
          </Col>
        </Row>
        </Container>
      </section>
  )
}

export default Hero;
