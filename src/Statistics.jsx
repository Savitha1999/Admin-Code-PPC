



import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaCar, FaCheckCircle, FaTrashAlt, FaClock, FaHandsHelping, FaUsers, FaGlobe, FaMobileAlt, FaEye, FaPhone, FaHeart, FaMobile, FaEyeSlash } from 'react-icons/fa';
import { GiWorld } from "react-icons/gi";


const Statistics = () => {
  const iconStyle = {
    position: 'absolute',
    bottom: '85px',
    left: '0',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    color: '#000',
    zIndex: 10,
    padding:"20px"
  };

  const [propertyCount, setPropertyCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [deletedCount, setDeletedCount] = useState(null);
  const [pendingCount, setPendingCount] = useState(null);
  const [loginUserCount, setLoginUserCount] = useState(null);
  const [zeroViewCount, setZeroViewCount] = useState(null);
  const [totalContactCount, setTotalContactCount] = useState(0);

  const [totalInterestCount, setTotalInterestCount] = useState(0);

  const [webLoginCount, setWebLoginCount] = useState(0);
const [appLoginCount, setAppLoginCount] = useState(0);

useEffect(() => {
  const fetchLoginModeCount = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/login-mode-counts`);
      setWebLoginCount(res.data.webLoginCount);
      setAppLoginCount(res.data.appLoginCount);
    } catch (error) {
      console.error("Error fetching login mode count", error);
    }
  };

  fetchLoginModeCount();
}, []);


  useEffect(() => {
    // Fetch the total interest count from the backend
    const fetchTotalInterestCount = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/total-interest-count`); // Your API endpoint
        setTotalInterestCount(response.data.totalInterestCount);
      } catch (error) {
        console.error("Error fetching total interest count", error);
      }
    };

    fetchTotalInterestCount();
  }, []);
  useEffect(() => {
    // Fetch the total contact count from the backend
    const fetchTotalContactCount = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/total-contact-count`); // API endpoint
        setTotalContactCount(response.data.totalContactCount);
      } catch (error) {
        console.error("Error fetching total contact count", error);
      }
    };

    fetchTotalContactCount();
  }, []);


useEffect(() => {
  const fetchZeroViewedCount = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/zero-view-properties`);
      
      // Ensure res.data.properties is an array
      if (Array.isArray(res.data.properties)) {
        setZeroViewCount(res.data.properties.length);
      } else {
        setZeroViewCount(0);
      }
    } catch (err) {
      console.error("Failed to fetch zero viewed properties", err);
      setZeroViewCount(0);
    }
  };

  fetchZeroViewedCount();
}, []);

  const [viewsCount, setViewsCount] = useState(null);

  useEffect(() => {
    const fetchViewsCount = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/user-views-count`);
        setViewsCount(res.data.count);
      } catch (err) {
        console.error("Failed to fetch user views count", err);
      }
    };

    fetchViewsCount();
  }, []);

  const [buyerAssistanceCount, setBuyerAssistanceCount] = useState(null);

useEffect(() => {
  const fetchBuyerAssistanceCount = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/buyer-assistance-count`);
      setBuyerAssistanceCount(res.data.count);
    } catch (err) {
      console.error("Failed to fetch buyer assistance count", err);
    }
  };

  fetchBuyerAssistanceCount();
}, []);


  useEffect(() => {
    const fetchLoginUserCount = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/login-count`);
        setLoginUserCount(res.data.count);
      } catch (err) {
        console.error("Failed to fetch login user count", err);
      }
    };
  
    fetchLoginUserCount();
  }, []);
  
  
  // Fetch the pending properties count
  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/pending-properties-count`);
        setPendingCount(res.data.pendingProperties);
      } catch (err) {
        console.error("Failed to fetch pending properties count", err);
      }
    };

    fetchPendingCount();
  }, []);


  // Fetch the deleted properties count
  useEffect(() => {
    const fetchDeletedCount = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/deleted-properties-count`);
        setDeletedCount(res.data.deletedProperties);
      } catch (err) {
        console.error("Failed to fetch deleted properties count", err);
      }
    };

    fetchDeletedCount();
  }, []);

  useEffect(() => {
    const fetchApprovedCount = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/approved-properties-count`);
        setApprovedCount(res.data.approvedProperties);
      } catch (err) {
        console.error("Failed to fetch approved properties count", err);
      }
    };

    fetchApprovedCount();
  }, []);


  useEffect(() => {
    const fetchPropertyCount = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/all-properties-count`);
        setPropertyCount(response.data.totalProperties);
      } catch (error) {
        console.error("Error fetching property count:", error);
      }
    };

    fetchPropertyCount();
  }, []);

  return (
    <Container fluid>
     
          {/* First Row of Cards */}
          <Row className='mt-5'>
            <Col md={4}>
              <Card className="shadow position-relative" style={{ backgroundColor: '#FFB74D', color: '#fff' }}>
                <Card.Body>
                  <div style={{ ...iconStyle, color: '#FFA726', backgroundColor: '#fff' }}>
                    <FaCar size={30} />
                  </div>
                  <Row>
                    <Col xs="auto"></Col>
                    <Col className='text-center' >
                      <Card.Title>Total Property</Card.Title>
                      <h2>{propertyCount}</h2>        

                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow position-relative" style={{ backgroundColor: '#1E88E5', color: '#fff' }}>
                <Card.Body>
                  <div style={{ ...iconStyle, color: '#1976D2', backgroundColor: '#fff' }}>
                    <FaCheckCircle size={30} />
                  </div>
                  <Row>
                    <Col xs="auto"></Col>
                    <Col className='text-center' >
                      <Card.Title>Total Property Approved</Card.Title>
                      <h2>{approvedCount}</h2>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow position-relative" style={{ backgroundColor: '#8BC34A', color: '#fff' }}>
                <Card.Body>
                  <div style={{ ...iconStyle, color: '#7CB342', backgroundColor: '#fff' }}>
                    <FaTrashAlt size={30} />
                  </div>
                  <Row>
                    <Col xs="auto"></Col>
                    <Col className='text-center' >
                      <Card.Title>Total Cars Deleted</Card.Title>
                      <h2>{deletedCount}</h2>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Second Row of Cards */}
          <Row className="mt-5">
            <Col md={4}>
              <Card className="shadow position-relative" style={{ backgroundColor: '#D32F2F', color: '#fff' }}>
                <Card.Body>
                  <div style={{ ...iconStyle, color: '#C62828', backgroundColor: '#fff' }}>
                    <FaClock size={30} />
                  </div>
                  <Row>
                    <Col xs="auto"></Col>
                    <Col className='text-center' >
                      <Card.Title>Total Cars Pending</Card.Title>
                      <h2>{pendingCount}</h2>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow position-relative" style={{ backgroundColor: '#009688', color: '#fff' }}>
                <Card.Body>
                  <div style={{ ...iconStyle, color: '#00796B', backgroundColor: '#fff' }}>
                    <FaHandsHelping size={30} />
                  </div>
                  <Row>
                    <Col xs="auto"></Col>
                    <Col className='text-center' >
                      <Card.Title>Total Assistance</Card.Title>
                      <h2>{buyerAssistanceCount}</h2>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="shadow position-relative" style={{ backgroundColor: '#3F51B5', color: '#fff' }}>
                <Card.Body>
                  <div style={{ ...iconStyle, color: '#303F9F', backgroundColor: '#fff' }}>
                    <FaUsers size={30} />
                  </div>
                  <Row>
                    <Col xs="auto"></Col>
                    <Col className='text-center' >
                      <Card.Title>Total Users</Card.Title>
                      <h2>{loginUserCount}</h2>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Third Row of Cards */}
          <Row className="mt-5">
            <Col md={4}>
              <Card className="shadow position-relative" style={{ backgroundColor: '#00BCD4', color: '#fff' }}>
                <Card.Body>
                  <div style={{ ...iconStyle, color: '#0097A7', backgroundColor: '#fff' }}>
                    <FaGlobe size={30} />
                  </div>
                  <Row>
                    <Col xs="auto"></Col>
                    <Col className='text-center' >
                      <Card.Title>Total Web Visits</Card.Title>
                      <h2>{webLoginCount}</h2>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow position-relative" style={{ backgroundColor: '#4CAF50', color: '#fff' }}>
                <Card.Body>
                  <div style={{ ...iconStyle, color: '#388E3C', backgroundColor: '#fff' }}>
                    <FaMobileAlt size={30} />
                  </div>
                  <Row>
                    <Col xs="auto"></Col>
                    <Col className='text-center' >
                      <Card.Title>Total App Visits</Card.Title>
                      <h2>{appLoginCount}</h2>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card className="shadow position-relative" style={{ backgroundColor: '#9C27B0', color: '#fff' }}>
                <Card.Body>
                  <div style={{ ...iconStyle, color: '#7B1FA2', backgroundColor: '#fff' }}>
                    <FaEye size={30} />
                  </div>
                  <Row>
                    <Col xs="auto"></Col>
                    <Col className='text-center' >
                      <Card.Title>Total Property Viewed</Card.Title>
                      <h2>{viewsCount}</h2>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          {/* Additional Cards */}
          <Row className="mt-5">
            <Col md={4}>
              <Card className="shadow position-relative" style={{ backgroundColor: '#3F51B5', color: '#fff' }}>
                <Card.Body>
                  <div style={{ ...iconStyle, color: '#303F9F', backgroundColor: '#fff' }}>
                    <FaEyeSlash size={30} />
                  </div>
                  <Row>
                    <Col xs="auto"></Col>
                    <Col className='text-center' >
                      <Card.Title>Zero Viewed Property</Card.Title>
                      <h2>{zeroViewCount}</h2>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow position-relative" style={{ backgroundColor: '#E91E63', color: '#fff' }}>
                <Card.Body>
                  <div style={{ ...iconStyle, color: '#C2185B', backgroundColor: '#fff' }}>
                    <FaPhone size={30} />
                  </div>
                  <Row>
                    <Col xs="auto"></Col>
                    <Col className='text-center' >
                      <Card.Title>Total Contact User</Card.Title>
                      <h2>{totalContactCount}</h2>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow position-relative" style={{ backgroundColor: '#03A9F4', color: '#fff' }}>
                <Card.Body>
                  <div style={{ ...iconStyle, color: '#0288D1', backgroundColor: '#fff' }}>
                    <FaHeart size={30} />
                  </div>
                  <Row>
                    <Col xs="auto"></Col>
                    <Col className='text-center' >
                      <Card.Title>Total Interest Sent</Card.Title>
                      <h2>{totalInterestCount}</h2>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col md={4}>
              <Card className="shadow position-relative" style={{ backgroundColor: '#9C27B0', color: '#fff' }}>
                <Card.Body>
                  <div style={{ ...iconStyle, color: '#7B1FA2', backgroundColor: '#fff' }}>
                    <FaMobile size={30} />
                  </div>
                  <Row>
                    <Col xs="auto"></Col>
                    <Col className='text-center' >
                      <Card.Title>Total App Login</Card.Title>
                      <h2>{appLoginCount}</h2>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow position-relative" style={{ backgroundColor: '#e36014', color: '#fff' }}>
                <Card.Body>
                  <div style={{ ...iconStyle, color: '#ed691c', backgroundColor: '#fff' }}>
                    <GiWorld size={30} />
                  </div>
                  <Row>
                    <Col xs="auto"></Col>
                    <Col className='text-center' >
                      <Card.Title>Total Web Login</Card.Title>
                      <h2>{webLoginCount}</h2>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            {/* <Col md={4}>
              <Card className="shadow position-relative" style={{ backgroundColor: '#9C27B0', color: '#fff' }}>
                <Card.Body>
                  <div style={{ ...iconStyle, color: '#7B1FA2', backgroundColor: '#fff' }}>
                    <FaEyeSlash  size={30} />
                  </div>
                  <Row>
                    <Col xs="auto"></Col>
                    <Col className='text-center' >
                      <Card.Title>Zero Viewed Property </Card.Title>
                      <h2>{zeroViewCount}</h2>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col> */}
           
      </Row>
    </Container>
  );
};

export default Statistics;

          



















