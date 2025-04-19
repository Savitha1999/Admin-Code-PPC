



// src/Admin.jsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Admin.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAdminData } from './redux/adminSlice';
import moment from 'moment';

const Admin = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    role: '',
    userType: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adminName = useSelector((state) => state.admin.name);
  

  // ✅ Record view on mount
useEffect(() => {
 const recordDashboardView = async () => {
   try {
     await axios.post(`${process.env.REACT_APP_API_URL}/record-view`, {
       userName: adminName,
       viewedFile: "Admin",
       viewTime: moment().format("YYYY-MM-DD HH:mm:ss"), // optional, backend already handles it


     });
     console.log("Dashboard view recorded");
   } catch (err) {
     console.error("Failed to record dashboard view:", err);
   }
 };

 if (adminName) {
   recordDashboardView();
 }
}, [adminName]);


  const DEFAULT_CREDENTIALS = {
    name: '',
    password: '',
    role: '',
    userType: '',
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isDefaultLogin = (
      formData.name === DEFAULT_CREDENTIALS.name &&
      formData.password === DEFAULT_CREDENTIALS.password &&
      formData.role === DEFAULT_CREDENTIALS.role &&
      formData.userType === DEFAULT_CREDENTIALS.userType
    );

    if (isDefaultLogin) {
      dispatch(setAdminData({
        name: formData.name,
        role: formData.role,
        userType: formData.userType,
        isVerified: true,
      }));
      localStorage.setItem('name', formData.name);

      toast.success('Default Admin Login successful!');
      navigate('/dashboard/statistics');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/adminlogin`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      dispatch(setAdminData({
        name: formData.name,
        role: formData.role,
        userType: formData.userType,
        isVerified: true,
      }));

      const savedName = localStorage.getItem('name');

      toast.success('Admin Login successful!');
      navigate('/dashboard/statistics');
      setFormData({ name: '', password: '', role: '', userType: '' });
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data.errors) {
        toast.error(`Error: ${err.response.data.errors.join(', ')}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <Container fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <Row className="w-100">
          <Col md={7} className="d-none d-md-block">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              alt="Illustration"
              className="img-fluid"
            />
          </Col>
          <Col md={5} lg={4} className="d-flex flex-column align-items-left">
            <div className="p-4 rounded text-center">
              <Form onSubmit={handleSubmit} className="w-100">
                <Form.Group controlId="name" className="mb-3">
                  <Form.Label className='text-start'>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="password" className="mb-3">
                  <Form.Label className='text-start'>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="role" className="mb-3">
                  <Form.Label className='text-start'>Role</Form.Label>
                  <Form.Control
                    as="select"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                    <option value="accountant">Accountant</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="userType" className="mb-3">
                  <Form.Label className='text-start'>User Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="userType"
                    value={formData.userType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select User Type</option>
                    <option value="all">ALL</option>
                    <option value="PUC">PUC</option>
                    <option value="TUC">TUC</option>
                  </Form.Control>
                </Form.Group>
                <Button type="submit" className="w-100 mt-3" disabled={loading}>
                  {loading ? 'Login...' : 'LOGIN'}
                </Button>
              </Form>
              <p className="mt-3">
                Don't have an account? <Link to={'/admin-no'} className="text-primary">Register</Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Admin;
