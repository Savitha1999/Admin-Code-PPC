// import React from 'react'

// export default function PucBanner() {
//   return (
//     <div>PucBanner</div>
//   )
// }


import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const PUCForm = () => {
  const [pucId, setPucId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`PUC ID Entered: ${pucId}`);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <h1 className="text-center">PUC Banner Ad</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="pucId">
              <Form.Label>Enter PUC ID:</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter PUC ID"
                value={pucId}
                onChange={(e) => setPucId(e.target.value)}
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

export default PUCForm;
