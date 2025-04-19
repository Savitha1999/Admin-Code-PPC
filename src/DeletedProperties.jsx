


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';  // Import delete icon from react-icons

const DeletedProperties = () => {
  const [deletedProperties, setDeletedProperties] = useState([]);

  const fetchDeletedProperties = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-deleted-properties-datas`);
      setDeletedProperties(response.data.deleted || []);
    } catch (error) {
      console.error("Error fetching deleted properties:", error);
    }
  };

  const handleDelete = async (ppcId) => {
    const confirmDelete = window.confirm("Are you sure you want to permanently delete this property?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/delete-permenent-data`, {
        params: { ppcId },
      });
      if (response.status === 200) {
        alert("Property permanently deleted!");
        setDeletedProperties((prevProperties) =>
          prevProperties.filter((property) => property.ppcId !== ppcId)
        );
      } else {
        alert(response.data.message || "Failed to delete property.");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("An error occurred while deleting.");
    }
  };

  useEffect(() => {
    fetchDeletedProperties();
  }, []);

  return (
    <div className="container mt-4">
      <h4>Permanently Deleted Properties</h4>
      {deletedProperties.length === 0 ? (
        <p>No deleted properties found.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>PPC ID</th>
              <th>Phone Number</th>
              <th>Property Mode</th>
              <th>Property Type</th>
              <th>Price</th>
              <th>Status</th>
              <th>Deleted At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {deletedProperties.map((property) => (
              <tr key={property.ppcId}>
                <td>{property.ppcId}</td>
                <td>{property.phoneNumber}</td>
                <td>{property.propertyMode}</td>
                <td>{property.propertyType}</td>
                <td>₹ {property.price}</td>
                <td>{property.status || 'N/A'}</td>
                <td>{property.deletedAt || '—'}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(property.ppcId)} 
                  >
                    <FaTrash /> {/* Add the trash icon */}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default DeletedProperties;
