import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";

const UserLeadStatsTable = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusProperties, setStatusProperties] = useState({});

  
  const handlePermanentDelete = async (ppcId) => {
    const confirmDelete = window.confirm("Are you sure you want to permanently delete this record?");
    if (!confirmDelete) return;
  
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/delete-ppcId-data`, {
        params: { ppcId },
      });
  
      if (response.status === 200) {
        alert("User Permenent deleted successfully!");
  
        // Remove from UI list
        setProperties((prevProperties) =>
          prevProperties.filter((property) => property.ppcId !== ppcId)
        );
  
        // Also update localStorage if status is stored
        const updatedStatus = { ...statusProperties };
        delete updatedStatus[ppcId];
        setStatusProperties(updatedStatus);
        localStorage.setItem("statusProperties", JSON.stringify(updatedStatus));
      } else {
        alert(response.data.message || "Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting.");
    }
  };
  

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user-lead-stats`)
      .then((res) => {
        // Flatten all properties from all users
        const allProperties = res.data.data.flatMap(user =>
          user.properties.map(prop => ({
            ...prop,
            ownerPhone: user.phoneNumber
          }))
        );
        setProperties(allProperties);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch property stats:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">All User Properties Overview</h2>
      {loading ? (
        <p>Loading property data...</p>
      ) : properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <table className="table table-sm table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>S.No</th>
              <th>Owner Phone</th>
              <th>PPC ID</th>
              <th>Mode</th>
              <th>Type</th>
              <th>City</th>
              <th>Area</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Interest</th>
              <th>Contact</th>
              <th>Favorite</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((prop, index) => (
              <tr key={`${prop.ppcId}-${index}`}>
                <td>{index + 1}</td>
                <td>{prop.ownerPhone}</td>
                <td>{prop.ppcId}</td>
                <td>{prop.propertyMode}</td>
                <td>{prop.propertyType}</td>
                <td>{prop.city}</td>
                <td>{prop.area}</td>
                <td>{new Date(prop.createdAt).toLocaleDateString()}</td>
                <td>{new Date(prop.updatedAt).toLocaleDateString()}</td>
                <td>{prop.interestCount}</td>
                <td>{prop.contactCount}</td>
                <td>{prop.favoriteCount}</td>
                                     <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handlePermanentDelete(prop.ppcId)}
                  >
                    <MdDeleteForever />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserLeadStatsTable;











