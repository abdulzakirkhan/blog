/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useContext } from 'react';
import BlogContext from '../context/BlogContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Col, Container, Form, Row, Button, Dropdown } from 'react-bootstrap';
import CategoryContext from '../context/CategoryContext';
import ClipLoader from 'react-spinners/ClipLoader';
const AddBlogForm = () => {
  const { addBlog } = useContext(BlogContext);
  const { categories, loading, error } = useContext(CategoryContext);

  if (loading) return <div><ClipLoader color={"#123abc"} loading={loading} size={50} /></div>;
  if (error) return <div>Error: {error}</div>;

  const [blogData, setBlogData] = useState({
    name: '',
    description: '',
    readtime: '',
    tags: '',
    blog_content: '',
    categoryId: '',
  });

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleQuillChange = (value) => {
    setBlogData({ ...blogData, blog_content: value });
  };

  const handleCategorySelect = (categoryId) => {
    setBlogData({ ...blogData, categoryId: Number(categoryId) });
    console.log('Selected Category ID:', categoryId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (blogData.name && blogData.description && blogData.blog_content) {
      const formattedData = {
        ...blogData,
        tags: blogData.tags.split(',').map(tag => tag.trim()),
      };
      await addBlog(formattedData);
      setBlogData({
        name: '',
        description: '',
        readtime: '',
        tags: '',
        blog_content: '',
        categoryId: '',
      });
    }
  };

  const selectedCategory = categories.find(cat => cat.id === blogData.categoryId);
  const selectedCategoryName = selectedCategory ? selectedCategory.name : 'Select Category';

  return (
    <Container className='py-4'>
      <Row className='my-5'>
        <Col md="12">
          <Form onSubmit={handleSubmit}>
            {/* Blog Name */}
            <Form.Group as={Row} className="my-2" controlId="formBlogName">
              <Form.Label column sm={2}>Blog Name:</Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="name"
                  value={blogData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter blog name"
                />
              </Col>
            </Form.Group>

            {/* Description */}
            <Form.Group as={Row} className="my-2" controlId="formDescription">
              <Form.Label column sm={2}>Description:</Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="textarea"
                  rows={1}
                  name="description"
                  value={blogData.description}
                  onChange={handleChange}
                  required
                  placeholder="Enter a brief description"
                />
              </Col>
            </Form.Group>

            {/* Read Time */}
            <Form.Group as={Row} className='my-2' controlId="formReadTime">
              <Form.Label column sm={2}>Read Time:</Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="readtime"
                  value={blogData.readtime}
                  onChange={handleChange}
                  placeholder="Enter estimated read time"
                />
              </Col>
            </Form.Group>

            {/* Tags */}
            <Form.Group as={Row} className='my-2' controlId="formTags">
              <Form.Label column sm={2}>Tags (comma separated):</Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="tags"
                  value={blogData.tags}
                  onChange={handleChange}
                  placeholder="Enter tags"
                />
              </Col>
            </Form.Group>

            {/* Content */}
            <Form.Group as={Row} className='my-2' controlId="formContent">
              <Form.Label column sm={2}>Content:</Form.Label>
              <Col sm={10}>
                <ReactQuill
                  value={blogData.blog_content}
                  onChange={handleQuillChange}
                  theme="snow"
                />
              </Col>
            </Form.Group>

            {/* Category Dropdown */}
            <Form.Group as={Row} className='my-2' controlId="formCategoryId">
              <Form.Label column sm={2}>Category:</Form.Label>
              <Col sm={10}>
                <Dropdown onSelect={handleCategorySelect}>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {selectedCategoryName}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {categories.map((category) => (
                      <Dropdown.Item 
                        key={category.id} 
                        eventKey={category.id}
                      >
                        {category.name} 
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Form.Group>

            {/* Submit Button */}
            <Form.Group as={Row}>
              <Col sm={{ span: 10, offset: 2 }}>
                <Button variant="primary" type="submit">
                  Add Blog
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddBlogForm;