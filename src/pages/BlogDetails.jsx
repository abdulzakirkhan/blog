/* eslint-disable no-unused-vars */
// import { format } from 'date-fns';
import { useLocation, useParams } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import { format } from 'date-fns';
// import ClipLoader from 'react-spinners/ClipLoader';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
import PopularBlogs from '../components/PopularBlogs';
const BlogDetails = () => {
  const location = useLocation();
  const { blog } = location.state || {}; 

const id =blog.id


// const [blogDetails, setBlogDetails] = useState([])
// useEffect(() => {
//   const fetchBlogDetails = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/blog/${id}`);
//       setBlogDetails(response.data);
//     } catch (err) {
//       console.log(err)
//     }
//   };

//   fetchBlogDetails();
// }, [id])


  
  return (
    <>
    <section id="heroq" style={{backgroundImage:`url(${blog.image})`}}>
        <Row>
          <Col md="12" className="text-center">
            <div className=" me-5">
              <span
                className={`rounded-3 p-2 text-white ${blog.Category.name === "Software" ? "bg-orange" : ""}`}
              >
                {blog.Category.name}
              </span>
              <p className="text-white fs-20">{blog.description}</p>
              <div className="d-flex gap-3">
                <p className="text-white">{blog.blog_content.replace(/<\/?[^>]+(>|$)/g, "")}</p>
              </div>
            </div>
          </Col>
        </Row>
      </section>
      <Card className="border-0 shadow">
        <Card.Body className="border-0">
            <Row>
                <Col md="2">
                <span>{format(new Date(blog.createdAt), 'MMMM dd, yyyy')}</span>{" "}<span>--</span>{" "}<span>{blog.readtime}</span>
                </Col>
                <Col md="8">
                <Card.Text>{blog.blog_content.replace(/<\/?[^>]+(>|$)/g, "")}</Card.Text>
                </Col>
            </Row>
        </Card.Body>
      </Card>

      <PopularBlogs />
    </>
  );
};

export default BlogDetails;