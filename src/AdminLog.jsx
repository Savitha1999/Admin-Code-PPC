import React from "react";
import { Container, Row, Col, Table, Form, Button, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const AdminLog = () => {
  const data = [
    { sl: 1, name: "balarks", office: "AUROBINDO", page: "Admin Log", date: "2024-12-26 09:57:58" },
    { sl: 2, name: "balarks", office: "AUROBINDO", page: "Car Make", date: "2024-12-26 09:57:49" },
    { sl: 3, name: "balarks", office: "AUROBINDO", page: "Statistics", date: "2024-12-26 09:57:42" },
    { sl: 4, name: "balarks", office: "AUROBINDO", page: "Limits", date: "2024-12-26 09:55:43" },
    { sl: 5, name: "balarks", office: "AUROBINDO", page: "Insurance Lead", date: "2024-12-26 09:35:59" },
    { sl: 6, name: "balarks", office: "AUROBINDO", page: "Need Help Loan Lead", date: "2024-12-26 09:35:59" },
    { sl: 7, name: "balarks", office: "AUROBINDO", page: "New Car Lead", date: "2024-12-26 09:35:59" },
    { sl: 8, name: "balarks", office: "AUROBINDO", page: "Buyer Assistant Loan Lead", date: "2024-12-26 09:35:59" },
  ];

  return (
    <Container className="mt-5">
      <h1 className="text-center">Admin Log Report</h1>
      <h3 className="text-success">Admin Logs</h3>
      <Row className="mb-4">
        <Col md={6}>
          <InputGroup>
            <Form.Control type="text" placeholder="Search..." />
            <Button variant="outline-secondary"><FaSearch /></Button>
          </InputGroup>
        </Col>
        <Col md={6}>
          <Row>
            <Col>
              <Form.Control type="date" />
            </Col>
            <Col>
              <Form.Control type="date" />
            </Col>
            <Col>
              <Button variant="danger">Search By Date</Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Table bordered hover>
        <thead>
          <tr>
            <th>SL</th>
            <th>STAFF NAME</th>
            <th>OFFICE</th>
            <th>PAGE NAME</th>
            <th>DATE</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.sl}>
              <td>{item.sl}</td>
              <td>{item.name}</td>
              <td>{item.office}</td>
              <td>{item.page}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminLog;
