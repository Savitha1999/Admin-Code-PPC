



import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Form, Button } from "react-bootstrap";

const PhotoRequests = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupAction, setPopupAction] = useState(null);

  
useEffect(() => {
  if (message) {
    const timer = setTimeout(() => setMessage(""), 5000); // Auto-close after 3 seconds
    return () => clearTimeout(timer); // Cleanup timer
  }
}, [message]);

  // Fetch photo requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/all-photo-requests`);
        setRequests(response.data);
        setFilteredRequests(response.data);
      } catch (error) {
        setMessage("Error fetching photo requests.");
      }
    };
    fetchRequests();
  }, []);

  // Handle deleting a request
  const handleDeleteRequest = (id) => {
    setShowPopup(true);
    setPopupAction(() => async () => {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/delete-photo-request/${id}`);
        setRequests((prev) => prev.filter((req) => req._id !== id));
        setFilteredRequests((prev) => prev.filter((req) => req._id !== id));
        setMessage("Photo request deleted successfully!");
      } catch (error) {
        setMessage("Failed to delete request.");
      }
      setShowPopup(false);
    });
  };

  // Handle dynamic search filter
  useEffect(() => {
    let filtered = requests.filter(
      (req) =>
        (req.ppcId && req.ppcId.toString().includes(searchQuery)) ||
        (req.propertyType && req.propertyType.toLowerCase().includes(searchQuery.toLowerCase())) 
      
    );

    if (fromDate) {
      filtered = filtered.filter((req) => new Date(req.createdAt) >= new Date(fromDate));
    }
    if (endDate) {
      filtered = filtered.filter((req) => new Date(req.createdAt) <= new Date(endDate));
    }

    setFilteredRequests(filtered);
  }, [searchQuery, fromDate, endDate, requests]);

  return (
    <div className="container mt-4">
     
      <h2>Photo Requests</h2>
      {/* Search Form */}
      <Form className="mb-3">
        <div className="row justify-content-center">
          <div className="col-8">
            <Form.Group>
              <Form.Label>Search (PPC ID, Property Type)</Form.Label>
              <Form.Control
                type="text"
                value={searchQuery}
                placeholder="Search Here"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="col-8">
            <Form.Group>
              <Form.Label>From Date</Form.Label>
              <Form.Control
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="col-8">
            <Form.Group>
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>
          </div>
        </div>
      </Form>

<div>
      {message && <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>}
      {showPopup && (
        <div style={{ 
          position: "fixed", 
          top: "50%", 
          left: "50%", 
          transform: "translate(-50%, -50%)", 
          backgroundColor: "white", 
          padding: "20px", 
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px", 
          textAlign: "center" 
        }}>
          <p style={{ marginBottom: "10px" }}>Are you sure you want to proceed?</p>
          <button 
            onClick={() => { popupAction(); }} 
            style={{ marginRight: "10px", padding: "5px 10px", backgroundColor: "green", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Yes
          </button>
          <button 
            onClick={() => setShowPopup(false)} 
            style={{ padding: "5px 10px", backgroundColor: "red", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            No
          </button>
        </div>
      )}
</div>

      <h3>Photo Request Datas</h3>
      {/* Table to Display Data */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Requester Phone</th>
            <th>Posted User Phone</th>
            <th>Property Type</th>
            <th>Created Date</th>
            <th>Status</th>
            <th>Photo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((request) => (
            <tr key={request._id}>
              <td>{request.ppcId}</td>
              <td>{request.requesterPhoneNumber}</td>
              <td>{request.postedUserPhoneNumber}</td>
              <td>{request.propertyType}</td>
              <td>{new Date(request.createdAt).toLocaleDateString()}</td>
              <td>{request.status}</td>
              <td>
                {request.photoURL ? (
                  <img src={request.photoURL} alt="Property" width="50" height="50" />
                ) : (
                  "No Photo"
                )}
              </td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDeleteRequest(request._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PhotoRequests;
