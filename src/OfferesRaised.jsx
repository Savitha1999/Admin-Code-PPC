



import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const OfferesRaised = () => {
  const [offers, setOffers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupAction, setPopupAction] = useState(null);

  
useEffect(() => {
  if (message) {
    const timer = setTimeout(() => setMessage(""), 5000); // Auto-close after 3 seconds
    return () => clearTimeout(timer); // Cleanup timer
  }
}, [message]);
  
  // New Offer Form State
  const [newOffer, setNewOffer] = useState({
    ppcId: "",
    phoneNumber: "",
    postedUserPhoneNumber: "",
    originalPrice: "",
    price: "",
    status: "pending",
  });

  // Fetch Offers
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/all-offers`);
        setOffers(response.data.offers);
      } catch (error) {
        setMessage("Failed to fetch offers.");
      }
    };
    fetchOffers();
  }, []);

  // Handle Input Change in Form
  const handleInputChange = (e) => {
    setNewOffer({ ...newOffer, [e.target.name]: e.target.value });
  };

  // Submit New Offer
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/offer`, newOffer);
      setOffers([...offers, response.data.offer]);
      setMessage("Offer added successfully!");
      setNewOffer({ ppcId: "", phoneNumber: "", postedUserPhoneNumber: "", originalPrice: "", price: "", status: "pending" });
    } catch (error) {
      setMessage("Failed to add the offer.");
    }
  };

  // Update Offer Price
  const handleEdit = (offer) => {
    setSelectedOffer(offer);
    setUpdatedPrice(offer.price);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (!updatedPrice) {
      setMessage("Please enter a valid price.");
      return;
    }
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/update-offer/${selectedOffer._id}`, {
        price: updatedPrice,
      });
      setOffers((prevOffers) =>
        prevOffers.map((offer) =>
          offer._id === selectedOffer._id ? { ...offer, price: updatedPrice } : offer
        )
      );
      setShowModal(false);
      setMessage("Offer updated successfully!");
    } catch (error) {
      setMessage("Failed to update the offer.");
    }
  };

  // Update Offer Status
  const handleUpdateStatus = async (offer, newStatus) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/update-offer/${offer._id}`, { status: newStatus });
      setOffers((prevOffers) =>
        prevOffers.map((o) => (o._id === offer._id ? { ...o, status: newStatus } : o))
      );
      setMessage(`Offer updated to ${newStatus.toUpperCase()}!`);
    } catch (error) {
      setMessage(`Failed to update status to ${newStatus}.`);
    }
  };

  // Delete Offer with Popup Confirmation
  const handleDelete = (id) => {
    setShowPopup(true);
    setPopupAction(() => async () => {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/delete-offer/${id}`);
        setOffers((prevOffers) => prevOffers.filter((offer) => offer._id !== id));
        setMessage("Offer deleted successfully!");
      } catch (error) {
        setMessage("Failed to delete the offer.");
      }
      setShowPopup(false);
    });
  };


  return (
    <Container>


      <h2 className="mt-4">Offer Form</h2>

      {/* New Offer Form */}
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group className="mb-2">
          <Form.Label>PPC ID</Form.Label>
          <Form.Control type="text" name="ppcId" placeholder="Enter Property PPCID" value={newOffer.ppcId} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Offer Request Phone</Form.Label>
          <Form.Control type="text" name="phoneNumber" placeholder="Enter Offer Request User Phonenumber" value={newOffer.phoneNumber} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Posted User Phone</Form.Label>
          <Form.Control type="text" name="postedUserPhoneNumber" placeholder="Enter Property Posted User PhoneNumber" value={newOffer.postedUserPhoneNumber} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Original Price</Form.Label>
          <Form.Control type="number" placeholder="Enter Property Original Price" name="originalPrice" value={newOffer.originalPrice} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Offer Price</Form.Label>
          <Form.Control type="number" name="price" placeholder="Enter Property Offer Price" value={newOffer.price} onChange={handleInputChange} required />
        </Form.Group>

        <Button type="submit" variant="primary">Submit Offer</Button>
      </Form>

      {/* Offers Table */}
      <h2>All Offers</h2>
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>PPC ID</th>
            <th>Offer Request Phone</th>
            <th>Posted User Phone</th>
            <th>Original Price</th>
            <th>Offered Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <tr key={offer._id}>
              <td>{offer.ppcId}</td>
              <td>{offer.phoneNumber}</td>
              <td>{offer.postedUserPhoneNumber}</td>
              <td>{offer.originalPrice}</td>
              <td>{offer.price}</td>
              <td>{offer.status}</td>
              {/* <td>
                <Button variant="primary" size="sm" onClick={() => handleEdit(offer)}>Edit</Button>{" "}
                <Button variant="danger" size="sm" onClick={() => handleDelete(offer._id)}>Delete</Button>
              </td> */}
                       
<td>
  {offer.status === "pending" && (
    <>
      <Button
        variant="success"
        size="sm"
        className="me-2"
        onClick={() => handleUpdateStatus(offer, "accept")}
      >
        Accept
      </Button>
      <Button
        variant="danger"
        size="sm"
        onClick={() => handleUpdateStatus(offer, "reject")}
      >
        Reject
      </Button>
    </>
  )}

  {offer.status === "accept" && (
    <>
      <Button
        variant="warning"
        size="sm"
        className="me-2"
        onClick={() => handleUpdateStatus(offer, "pending")}
      >
        Pending
      </Button>
      <Button
        variant="danger"
        size="sm"
        onClick={() => handleUpdateStatus(offer, "reject")}
      >
        Reject
      </Button>
    </>
  )}

  {offer.status === "reject" && (
    <>
      <Button
        variant="secondary"
        size="sm"
        className="me-2"
        onClick={() => handleUpdateStatus(offer, "pending")}
      >
        Pending
      </Button>
      <Button
        variant="success"
        size="sm"
        onClick={() => handleUpdateStatus(offer, "accept")}
      >
        Accept
      </Button>
    </>
  )}
</td>


                <td>{new Date(offer.createdAt).toLocaleString()}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(offer)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(offer._id)}
                  >
                    Delete
                  </Button>
                </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Offer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Updated Price</Form.Label>
              <Form.Control type="number" value={updatedPrice} onChange={(e) => setUpdatedPrice(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {message && <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>}
      {showPopup && (
        <div style={{ 
          position: "fixed", 
          top: "60%", 
          left: "60%", 
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

    </Container>
  );
};

export default OfferesRaised;
