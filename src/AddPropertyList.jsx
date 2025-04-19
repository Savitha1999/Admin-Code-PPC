


import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";

const AddPropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [statusProperties, setStatusProperties] = useState({});
  const [previousStatuses, setPreviousStatuses] = useState({}); // Store previous statuses before delete
  const navigate = useNavigate();

//   const [message,setMessage]=useState('');

//   const [excelFile, setExcelFile] = useState(null);

// const handleExcelChange = (e) => {
//   setExcelFile(e.target.files[0]);
// };

// const handleExcelUpload = async () => {
//   if (!excelFile) {
//     alert("Please select an Excel file to upload.");
//     return;
//   }

//   const formData = new FormData();
//   formData.append("excelFile", excelFile);

//   try {
//     const response = await axios.post(
//       `${process.env.REACT_APP_API_URL}/update-property-upload`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     alert(response.data.message);
//     fetchProperties(); // Refresh the property list
//   } catch (error) {
//     console.error("Error uploading Excel file:", error);
//     alert(error.response?.data?.message || "Excel upload failed.");
//   }
// };

const [excelFile, setExcelFile] = useState(null);
  const [message, setMessage] = useState('');

  const adminName = useSelector((state) => state.admin.name);
  

  // ✅ Record view on mount
useEffect(() => {
 const recordDashboardView = async () => {
   try {
     await axios.post(`${process.env.REACT_APP_API_URL}/record-view`, {
       userName: adminName,
       viewedFile: "Manage Property",
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


  // Handle Excel file selection
  const handleExcelChange = (e) => {
    setExcelFile(e.target.files[0]);
  };

  // Handle Excel file upload
  const handleExcelUpload = async () => {
    if (!excelFile) {
      setMessage('Please select an Excel file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('excelFile', excelFile);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/update-property-upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setMessage(response.data.message);  // Display success message
      // Optionally, fetch updated property data here
      // fetchProperties(); // You could add a function to refresh properties after upload
    } catch (error) {
      console.error('Error uploading Excel file:', error);
      setMessage(error.response?.data?.message || 'Excel upload failed.');
    }
  };


  useEffect(() => {
    fetchProperties();
  }, []);



  const fetchProperties = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-all-datas`);
  
      console.log("Fetched properties:", response.data.users);
      setProperties(response.data.users);
  
      // Set statuses
      const initialStatuses = response.data.users.reduce((acc, property) => {
        acc[property.ppcId] = property.status || "incomplete";
        return acc;
      }, {});
      
      setStatusProperties(initialStatuses);
      localStorage.setItem("statusProperties", JSON.stringify(initialStatuses));
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };
  


  const handleFeatureStatusChange = async (ppcId, currentStatus) => {
    const newStatus = currentStatus === "yes" ? "no" : "yes"; // Toggle status
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/update-feature-status`, {
        ppcId,
        featureStatus: newStatus,
      });

      setProperties((prevProperties) =>
        prevProperties.map((property) =>
          property.ppcId === ppcId ? { ...property, featureStatus: newStatus } : property
        )
      );
    } catch (error) {
      console.error("Error updating feature status:", error);
    }
  };

 
  const handleDeleteAll = async () => {
    if (window.confirm('Are you sure you want to delete all properties?')) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-all-properties`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const data = await response.json();
        if (response.ok) {
          setMessage(data.message); // optional: show a success message
          console.log('Deleted Count:', data.deletedCount);
          // Optionally refresh property list here
        } else {
          setMessage(data.message || 'Failed to delete properties.');
        }
      } catch (error) {
        console.error('Error:', error);
        setMessage('Server error while deleting properties.');
      }
    }
  };
  
  

  useEffect(() => {
    const storedStatusProperties = localStorage.getItem("statusProperties");
    if (storedStatusProperties) {
      setStatusProperties(JSON.parse(storedStatusProperties));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("statusProperties", JSON.stringify(statusProperties));
  }, [statusProperties]);



  const handleDelete = async (ppcId, phoneNumber) => {
    // Show confirmation alert
    const isConfirmed = window.confirm("Are you sure you want to delete this property?");
    
    if (!isConfirmed) {
      return; // Stop execution if user cancels
    }
  
    // Store previous status before deleting
    setPreviousStatuses((prev) => ({ ...prev, [ppcId]: statusProperties[ppcId] }));
  
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/delete-datas`, 
        null, // No request body, as we are using query parameters
        {
          params: {
            ppcId,
            phoneNumber,
          }
        }
      );
  
      if (response.status === 200) {
        setStatusProperties((prev) => ({
          ...prev,
          [ppcId]: "delete",
        }));
        console.log(`Property ${ppcId} marked as deleted.`);
      }
    } catch (error) {
      console.error("Error deleting property:", error.response?.data || error.message);
      alert("Failed to delete property.");
    }
  };

  const handleActivateAll = async () => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/activate-all-properties`);
      
      if (response.status === 200) {
        // Update all local statuses to 'active'
        const updatedStatuses = { ...statusProperties };
        Object.keys(updatedStatuses).forEach(ppcId => {
          updatedStatuses[ppcId] = "active";
        });
        setStatusProperties(updatedStatuses);
  
        alert("All properties activated successfully!");
      } else {
        alert("Failed to activate all properties.");
      }
    } catch (error) {
      console.error("Error activating all properties:", error);
      alert("An error occurred while activating all properties.");
    }
  };
  
  
  // **Handle Undo Functionality**
  const handleUndo = async (ppcId) => {
    const restoredStatus = previousStatuses[ppcId] || "active"; // Restore previous status or default to 'active'

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/update-property-status`, {
        ppcId,
        status: restoredStatus,
      });

      setStatusProperties((prev) => ({
        ...prev,
        [ppcId]: restoredStatus,
      }));

      // Remove previous status tracking
      setPreviousStatuses((prev) => {
        const updated = { ...prev };
        delete updated[ppcId];
        return updated;
      });
    } catch (error) {
      console.error("Error undoing delete:", error);
      alert("Failed to undo delete.");
    }
  };

  // **Handle Status Change**
  const handleStatusChange = async (ppcId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "pending" : "active";

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/update-property-status`, {
        ppcId,
        status: newStatus,
      });

      setStatusProperties((prev) => ({
        ...prev,
        [ppcId]: newStatus,
      }));
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
  };




  
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
  

  return (
    <Container fluid className="p-3">
      <Helmet>
        <title>Pondy Property | Properties</title>
      </Helmet>

      <Row className="mb-3">
  {/* <Col md={4}>
    <input
      type="file"
      accept=".xlsx, .xls"
      onChange={handleExcelChange}
      className="form-control"
    />
  </Col> */}

<div className="col-md-6">
  <label className="form-label">Upload Excel File:</label>

  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      border: "2px dashed rgba(10, 90, 129, 0.72)",
      padding: "15px",
      borderRadius: "10px",
      backgroundColor: "#CCFFFF",
      cursor: "pointer",
      justifyContent: "center",
      flexDirection: "column",
      textAlign: "center",
    }}
    onClick={() => document.getElementById("excelFile").click()}  // Triggers file input
    aria-label="Click to upload Excel file"
  >
    <i
      className="bi bi-file-earmark-arrow-up"
      style={{ fontSize: "2rem", color: "#007bff" }}
    ></i>
    <span style={{ fontSize: "1rem", color: "#333" }}>Click to upload Excel file</span>
    
    {/* Hidden file input */}
    <input
      type="file"
      id="excelFile"
      accept=".xlsx, .xls"
      onChange={handleExcelChange}  // Handle file change
      style={{ display: "none" }}  // Hide the default file input
    />
  </div>
</div>

{/* Upload Button */}
<div className="col-md-3 d-flex align-items-end">
  <button className="btn mt-1 btn-success" onClick={handleExcelUpload}>
    Upload Excel
  </button>

  {message && <div className="alert alert-info mt-3">{message}</div>}


</div>


<div className="col-md-3 d-flex align-items-end">
<button  className="btn mt-1 btn-primary  mb-3" onClick={handleActivateAll}>
  Activate All
</button>
</div>


<div className="col-md-3 d-flex align-items-end">
<button  className="btn mt-1 btn-primary  mb-3" onClick={handleDeleteAll}>
  Delete All
</button>
</div>

</Row>


      <h2 className="mb-4 mt-5">User All Properties</h2>
    
              {properties.length > 0 ? (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                    <th>Image</th>
    <th>PPC ID</th>
    <th>Phone Number</th>
    <th>Property Mode</th>
    <th>Property Type</th>
    <th>Price</th>
    <th>City</th>
   
    <th>Features Property Status</th>
    <th>Status</th>
    <th>Actions</th>
                      <th>Active OR Pending</th>
                      <th>Permenent Delete</th>
                      <th>View Details</th>
                      
                    </tr>
                  </thead>

                  <tbody>
                    {properties.map((property) => (
                      <tr key={property._id}>
                        <td>
                          <img
                            src={
                              property.photos && property.photos.length > 0
                                ? `http://localhost:5006/${property.photos[0]}`
                                : "https://d17r9yv50dox9q.cloudfront.net/car_gallery/default.jpg"
                            }
                            alt="Property"
                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                          />
                        </td>
                        <td>{property.ppcId}</td>
                        <td>{property.phoneNumber}</td>
                        <td>{property.propertyMode}</td>
                        <td>{property.propertyType}</td>
                        <td>{property.price}</td>
                        <td>{property.city}</td>
                      
      
                        {/* Feature Status Toggle Button */}
                        <td>
                          <Button
                            variant={property.featureStatus === "yes" ? "danger" : "success"}
                            size="sm"
                            onClick={() => handleFeatureStatusChange(property.ppcId, property.featureStatus)}
                          >
                            {property.featureStatus === "yes" ? "Set to No" : "Set to Yes"}
                          </Button>
                        </td>


                        {/* Status Column */}
                         <td>
                          <span
                            style={{
                              padding: "5px 10px",
                              borderRadius: "5px",
                              backgroundColor:
                                statusProperties[property.ppcId] === "delete"
                                  ? "red"
                                  : statusProperties[property.ppcId] === "active"
                                  ? "green"
                                  : "rgb(236, 106, 149)",
                              color: "white",
                            }}
                          >
                            {statusProperties[property.ppcId]}
                          </span>
                        </td>



                       <td>
                          {statusProperties[property.ppcId] === "delete" ? (
                            <Button variant="secondary" size="sm" onClick={() => handleUndo(property.ppcId)}>
                              Undo
                            </Button>
                          ) : (
                            <>
                              <Button
                                variant="info"
                                size="sm"
                                className="ms-2"
                                onClick={() =>
                                  navigate(`/dashboard/edit-property`, {
                                    state: { ppcId: property.ppcId, phoneNumber: property.phoneNumber },
                                  })
                                }
                              >
                                Edit
                              </Button>

                              <Button
                                variant="danger"
                                size="sm"
                                className="ms-2 mt-2"
                                onClick={() => handleDelete(property.ppcId, property.phoneNumber)}
                              >
                                Delete
                              </Button>
                            </>
                          )}
                        </td>

                        {/* Status Change Button */}
                        <td>
                          <Button
                            variant="warning"
                            size="sm"
                            onClick={() =>
                              handleStatusChange(property.ppcId, statusProperties[property.ppcId] || "pending")
                            }
                          >
                            {statusProperties[property.ppcId] === "active" ? "Pending" : "Active"}
                          </Button>
                        </td>

                        <td>
  <Button
    variant="danger"
    size="sm"
    onClick={() => handlePermanentDelete(property.ppcId)}
  >
   Permenent Delete
  </Button>
</td>

                        {/* View Details Button */}
                        <td>
                          <Button
                            variant=""
                            size="sm"
                            style={{backgroundColor:"#0d94c1",color:"white"}}
                            onClick={() =>
                              navigate(`/dashboard/detail`, {
                                state: { ppcId: property.ppcId, phoneNumber: property.phoneNumber },
                              })
                            }
                          >
                            View Details
                          </Button>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>Loading properties...</p>
              )}
        
    </Container>
  );
};

export default AddPropertyList;
