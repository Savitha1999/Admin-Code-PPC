
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Roll = () => {
  const [rolls, setRolls] = useState([]);
  const [rollType, setRollType] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [editingRoll, setEditingRoll] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchRolls();
  }, []);

  const fetchRolls = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/roll-all`);
      setRolls(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createRoll = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/roll-create`, { rollType, createdDate: createDate });
      setRolls([...rolls, response.data]);
      setRollType('');
      setCreateDate('');
    } catch (err) {
      console.error(err);
    }
  };

  const updateRoll = async () => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/roll-update/${editingRoll._id}`, { rollType, createdDate: createDate });
      setRolls(rolls.map(roll => (roll._id === editingRoll._id ? response.data : roll)));
      setRollType('');
      setCreateDate('');
      setEditingRoll(null);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteRoll = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/roll-delete/${id}`);
      setRolls(rolls.filter(roll => roll._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const editRoll = (roll) => {
    setEditingRoll(roll);
    setRollType(roll.rollType);
    setCreateDate(roll.createdDate);
  };

  const filteredRolls = rolls.filter(roll =>
    roll.rollType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-5">
      <h1 className="text-center">Rolls</h1>

      <h3 className="text-success">{editingRoll ? 'Update Roll' : 'Create Roll'}</h3>
      <Row className="mb-4">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Roll Type:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Roll Type"
              value={rollType}
              onChange={(e) => setRollType(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Created Date:</Form.Label>
            <Form.Control
              type="date"
              value={createDate}
              onChange={(e) => setCreateDate(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={4} className="d-flex align-items-end">
          <Button 
            className="me-2" 
            variant="danger" 
            onClick={editingRoll ? updateRoll : createRoll}>
            {editingRoll ? 'Update' : 'Create'}
          </Button>
        </Col>
      </Row>

      <h4 className="text-danger">Roll Details</h4>
      <p>
        <a href="#export">Export All to Excel</a> | <a href="#print">Print All to Print</a>
      </p>

      <div className="table-container">
      <h2>Rolls</h2>

      <table>
        <thead>
          <tr>
            <th>SL</th>
            <th>Roll Type</th>
            <th>Created Date</th>
            <th>Edit / Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredRolls.map((roll, index) => (
            <tr key={roll._id}>
              <td>{index + 1}</td>
              <td>{roll.rollType}</td>
              <td>{new Date(roll.createdDate).toLocaleDateString()}</td>
             
               <td>
                <span className="edit text-primary" onClick={() => editRoll(roll)}> <FaEdit /></span>
                <span className="delete text-danger fs-5" onClick={() => deleteRoll(roll._id)}><MdDeleteForever /></span>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </Container>
  );
};

export default Roll;
