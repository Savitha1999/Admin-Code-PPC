// import React from 'react'

// export default function PucNumber() {
//   return (
//     <div>PucNumber</div>
//   )
// }


import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const PUCNumberForm = () => {
  const [pucNumber, setPucNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`PUC Number Updated: ${pucNumber}`);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <h1 className="text-center">PUC Number</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="pucNumber">
              <Form.Label>Enter PUC Number:</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter PUC Number"
                value={pucNumber}
                onChange={(e) => setPucNumber(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PUCNumberForm;
