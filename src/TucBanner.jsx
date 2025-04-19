


import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const TucBanner = () => {
  const [tucId, setTucId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`TUC ID Entered: ${tucId}`);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <h1 className="text-center">TUC Banner Ad</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="tucId">
              <Form.Label>Enter TUC ID:</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter TUC ID"
                value={tucId}
                onChange={(e) => setTucId(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              View
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default TucBanner;
