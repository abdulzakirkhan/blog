/* eslint-disable no-unused-vars */
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          <Col md={3}>
            <h5>Contact the Publisher</h5>
            <ul className="list-unstyled">
              <li><a href="#home" className="text-light text-decoration-none">mike@runo.com</a></li>
              <li><a href="#services" className="text-light text-decoration-none">+944 450 904 505</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Explorate</h5>
            <ul className="list-unstyled">
              <li><a href="#faq" className="text-light text-decoration-none">About </a></li>
              <li><a href="#support" className="text-light text-decoration-none">Partners</a></li>
              <li><a href="#privacy" className="text-light text-decoration-none">Job Opportuities</a></li>
              <li><a href="#terms" className="text-light text-decoration-none">Advertise</a></li>
              <li><a href="#terms" className="text-light text-decoration-none">Membership</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Headquarter</h5>
            <ul className="list-unstyled">
              <li><a href="#blog" className="text-light text-decoration-none">191 Middleville Road,</a></li>
              <li><a href="#news" className="text-light text-decoration-none">NY 1001, Sydney</a></li>
              <li><a href="#careers" className="text-light text-decoration-none">Australia</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Connections</h5>
            <ul className="list-unstyled">
              <li><a href="#facebook" className="text-light text-decoration-none">Facebook</a></li>
              <li><a href="#twitter" className="text-light text-decoration-none">Twitter</a></li>
              <li><a href="#instagram" className="text-light text-decoration-none">Instagram</a></li>
              <li><a href="#linkedin" className="text-light text-decoration-none">LinkedIn</a></li>
            </ul>
          </Col>
        </Row>
        <div className="text-center mt-4">
          <p>© 2024 Your Company. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
