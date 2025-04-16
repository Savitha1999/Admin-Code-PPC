import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container } from "react-bootstrap";

const BuyerAssistance = () => {
  const [buyerRequests, setBuyerRequests] = useState([]);

  useEffect(() => {
    const fetchBuyerAssistance = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-buyerAssistance`);
        setBuyerRequests(response.data.data);
      } catch (error) {
        console.error("Error fetching Buyer Assistance requests:", error);
      }
    };

    fetchBuyerAssistance(); // Fetch data when component mounts
  }, []);

  return (
    <Container>
      <h2 className="mt-4">Buyer Assistance Requests</h2>
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Phone Number</th>
            {/* <th>Alternate Phone</th> */}
            <th>City</th>
            <th>Area</th>
            <th>Min Price</th>
            <th>Max Price</th>
            <th>Area Unit</th>
            <th>Property Mode</th>
            <th>Payment Type</th>
            <th>Description</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {buyerRequests.length > 0 ? (
            buyerRequests.map((request) => (
              <tr key={request._id}>
                 <td>{request.ba_id}</td>
                 <td>{request.phoneNumber}</td>
                {/* <td>{request.altPhoneNumber || "N/A"}</td> */}
                <td>{request.city}</td>
                <td>{request.area}</td>
                <td>{request.minPrice}</td>
                <td>{request.maxPrice}</td>
                <td>{request.areaUnit}</td>
                <td>{request.propertyMode}</td>
                <td>{request.paymentType}</td>
                <td>{request.description}</td>
                <td>{new Date(request.createdAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" className="text-center">
                No Buyer Assistance Requests Found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default BuyerAssistance;
