


import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Details = () => {
  const { ppcId } = useParams();
  const location = useLocation();
  const { phoneNumber } = location.state || {}; 

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ppcId || !phoneNumber) {
      setError("Missing PPC ID or Phone Number");
      return;
    }

    const fetchPropertyDetails = async () => {
      try {
        console.log("Fetching property details for:", { ppcId, phoneNumber });

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-data?${ppcId}`, {
          params: { ppcId, phoneNumber },
        });

        console.log("API Response:", response.data);

        if (response.data.property) {
          setProperty(response.data.property);
        } else {
          setError("No property found.");
        }
      } catch (error) {
        console.error("Error fetching property details:", error);
        setError("Failed to fetch property details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [ppcId, phoneNumber]);

  return (
    <Container className="mt-5">
      <Button variant="secondary" onClick={() => window.history.back()} className="mb-3">
        ⬅ Back
      </Button>

      {loading ? (
        <p>Loading property details...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : property ? (
        <Card className="p-4 shadow">
          <h2>{property.propertyType} in {property.city}</h2>
          <p><strong>Owner:</strong> {property.ownerName}</p>
          <p><strong>Phone:</strong> {property.phoneNumber}</p>
          <p><strong>Price:</strong> ₹{property.price}</p>
          <p><strong>Address:</strong> {property.totalArea}, {property.city}, {property.state}</p>

          {property.photos && property.photos.length > 0 ? (
            <img 
              src={`http://localhost:5000/${property.photos[0]}`} 
              alt="Property" 
              style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "10px" }}
            />
          ) : (
            <p>No property images available.</p>
          )}
        </Card>
      ) : (
        <p>No property details found.</p>
      )}
    </Container>
  );
};

export default Details;

