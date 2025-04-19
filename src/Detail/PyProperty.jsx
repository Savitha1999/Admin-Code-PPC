// import { useState, useEffect } from "react";
// import { Container, Table, Spinner, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   FaRupeeSign, FaBed, FaCalendarAlt, FaUserAlt, FaRulerCombined,
//   FaCamera, FaEye
// } from "react-icons/fa";
// import { MdDeleteForever } from "react-icons/md";

// const PyProperty = () => {
//   const [properties, setProperties] = useState([]);
//   const [imageCounts, setImageCounts] = useState({});
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProperties = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-Pudhucherry-properties`);
//         setProperties(response.data.data);
//         setError("");
//       } catch (error) {
//         setError("Pondy properties Not Found");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProperties();
//   }, []);


//   const fetchImageCount = async (ppcId) => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/uploads-count`, {
//         params: { ppcId },
//       });
//       return response.data.uploadedImagesCount || 0;
//     } catch (error) {
//       console.error(`Error fetching image count for property ${ppcId}:`, error);
//       return 0;
//     }
//   };

  
//   const handleDelete = async (ppcId) => {
//     const confirmDelete = window.confirm("Are you sure you want to permanently delete this record?");
//     if (!confirmDelete) return;
  
//     try {
//       const response = await axios.delete(`${process.env.REACT_APP_API_URL}/delete-ppcId-data`, {
//         params: { ppcId },
//       });
  
//       if (response.status === 200) {
//         alert("User deleted successfully!");
//         setProperties((prevProperties) =>
//           prevProperties.filter((property) => property.ppcId !== ppcId)
//         );
//       } else {
//         alert(response.data.message || "Failed to delete user.");
//       }
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       alert("An error occurred while deleting.");
//     }
//   };
  

//   useEffect(() => {
//     const fetchAllImageCounts = async () => {
//       const counts = {};
//       await Promise.all(
//         properties.map(async (property) => {
//           const count = await fetchImageCount(property.ppcId);
//           counts[property.ppcId] = count;
//         })
//       );
//       setImageCounts(counts);
//     };

//     if (properties.length > 0) {
//       fetchAllImageCounts();
//     }
//   }, [properties]);

//   return (
//     <Container fluid className="py-4">
//       <h2 className="mb-3 text-center">Puducherry Properties</h2>
//       {error && <p className="text-danger text-center">{error}</p>}
//       {loading ? (
//         <div className="text-center">
//           <Spinner animation="border" />
//         </div>
//       ) : (
//         <div className="table-responsive">
//           <Table striped bordered hover responsive size="sm" className="table-sm align-middle">
//             <thead className="table-dark text-center">
//               <tr>
//                 <th>ppcId</th>
//                 <th>Type</th>
//                 <th>Mode</th>
//                 <th>City</th>
//                 <th>Area</th>
//                 <th>Date</th>
//                 <th>Price</th>
//                 <th>Photos</th>
//                 <th>Views</th>
//                 <th>View Details</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {properties.map((property) => (
//                 <tr
//                   key={property._id}
//                   style={{ cursor: "pointer" }}
//                 >
//                   {/* <td className="text-center">
//                     <img
//                       src={
//                         property.photos && property.photos.length > 0
//                           ? `http://localhost:5006/${property.photos[0].replace(/\\/g, "/")}`
//                           : "https://d17r9yv50dox9q.cloudfront.net/car_gallery/default.jpg"
//                       }
//                       alt="Property"
//                       style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "8px" }}
//                     />
//                   </td> */}

// <td>{property.ppcId || 'N/A'}</td>

//                   <td>{property.propertyType || 'N/A'}</td>
//                   <td>{property.propertyMode || 'N/A'}</td>
//                   <td>{property.city || 'N/A'}</td>
//                   <td>{property.totalArea || 'N/A'} {property.areaUnit || ''}</td>
//                   <td>
//                     {property.createdAt ? new Date(property.createdAt).toLocaleDateString('en-IN', {
//                       year: 'numeric',
//                       month: 'short',
//                       day: 'numeric'
//                     }) : 'N/A'}
//                   </td>
//                   <td>
//                     <span className="text-success fw-bold">
//                       <FaRupeeSign className="me-1" />
//                       {property.price ? property.price.toLocaleString('en-IN') : 'N/A'}
//                     </span>
//                     <div style={{ fontSize: '11px', color: '#888' }}>Negotiable</div>
//                   </td>
//                   <td className="text-center">
//                     <FaCamera className="me-1" />
//                     {imageCounts[property.ppcId] || 0}
//                   </td>
//                   <td className="text-center">
//                     <FaEye className="me-1" />
//                     {property.views || 0}
//                   </td>
//                     <td>
//                                             <Button
//                                               variant=""
//                                               size="sm"
//                                               style={{backgroundColor:"#0d94c1",color:"white"}}
//                                               onClick={() =>
//                                                 navigate(`/dashboard/detail`, {
//                                                   state: { ppcId: property.ppcId, phoneNumber: property.phoneNumber },
//                                                 })
//                                               }
//                                             >
//                                               View Details
//                                             </Button>
//                                           </td>
//                                           <td>
//                                              <button className="btn btn-danger" onClick={() => handleDelete(property.ppcId)}>
//                                                                                             <MdDeleteForever size={24} />
//                                                                                         </button>
//                                           </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>
//       )}
//     </Container>
//   );
// };

// export default PyProperty;














import { useState, useEffect } from "react";
import { Container, Table, Spinner, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaRupeeSign, FaCamera, FaEye
} from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const PyProperty = () => {
  const [properties, setProperties] = useState([]);
  const [imageCounts, setImageCounts] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  const fetchProperties = async (filters = {}) => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-Pudhucherry-properties`, {
        params: filters,
      });
      setProperties(response.data.data);
      setError("");
    } catch (error) {
      setError("Pondy properties Not Found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchImageCount = async (ppcId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/uploads-count`, {
        params: { ppcId },
      });
      return response.data.uploadedImagesCount || 0;
    } catch (error) {
      console.error(`Error fetching image count for property ${ppcId}:`, error);
      return 0;
    }
  };

  const fetchAllImageCounts = async () => {
    const counts = {};
    await Promise.all(
      properties.map(async (property) => {
        const count = await fetchImageCount(property.ppcId);
        counts[property.ppcId] = count;
      })
    );
    setImageCounts(counts);
  };

  useEffect(() => {
    if (properties.length > 0) {
      fetchAllImageCounts();
    }
  }, [properties]);

  const handleDelete = async (ppcId) => {
    const confirmDelete = window.confirm("Are you sure you want to permanently delete this record?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/delete-ppcId-data`, {
        params: { ppcId },
      });

      if (response.status === 200) {
        alert("User deleted successfully!");
        setProperties((prevProperties) =>
          prevProperties.filter((property) => property.ppcId !== ppcId)
        );
      } else {
        alert(response.data.message || "Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting.");
    }
  };

  const handleFilter = async () => {
    fetchProperties({ startDate, endDate });
  };

  const handleReset = async () => {
    setStartDate("");
    setEndDate("");
    fetchProperties();
  };

  return (
    <Container fluid className="py-4">
      <h2 className="mb-3 text-center">Puducherry Properties</h2>

      {/* Filter Form */}
      <div className="card p-3 mb-3">
        <div className="row g-3 align-items-end">
          <div className="col-md-3">
            <label className="form-label fw-semibold">Start Date</label>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">End Date</label>
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="col-md-3 d-flex gap-2">
            <button className="btn btn-primary w-100" onClick={handleFilter}>Filter</button>
            <button className="btn btn-outline-secondary w-100" onClick={handleReset}>Reset</button>
          </div>
          
        </div>
      </div>

      {error && <p className="text-danger text-center">{error}</p>}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover responsive size="sm" className="table-sm align-middle">
            <thead className="table-dark text-center">
              <tr>
                <th>ppcId</th>
                <th>Type</th>
                <th>Mode</th>
                <th>City</th>
                <th>Area</th>
                <th>Date</th>
                <th>Price</th>
                <th>Photos</th>
                <th>Views</th>
                <th>View Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property._id} style={{ cursor: "pointer" }}>
                  <td>{property.ppcId || 'N/A'}</td>
                  <td>{property.propertyType || 'N/A'}</td>
                  <td>{property.propertyMode || 'N/A'}</td>
                  <td>{property.city || 'N/A'}</td>
                  <td>{property.totalArea || 'N/A'} {property.areaUnit || ''}</td>
                  <td>
                    {property.createdAt ? new Date(property.createdAt).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    }) : 'N/A'}
                  </td>
                  <td>
                    <span className="text-success fw-bold">
                      <FaRupeeSign className="me-1" />
                      {property.price ? property.price.toLocaleString('en-IN') : 'N/A'}
                    </span>
                    <div style={{ fontSize: '11px', color: '#888' }}>Negotiable</div>
                  </td>
                  <td className="text-center">
                    <FaCamera className="me-1" />
                    {imageCounts[property.ppcId] || 0}
                  </td>
                  <td className="text-center">
                    <FaEye className="me-1" />
                    {property.views || 0}
                  </td>
                  <td>
                    <Button
                      variant=""
                      size="sm"
                      style={{ backgroundColor: "#0d94c1", color: "white" }}
                      onClick={() =>
                        navigate(`/dashboard/detail`, {
                          state: { ppcId: property.ppcId, phoneNumber: property.phoneNumber },
                        })
                      }
                    >
                      View Details
                    </Button>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDelete(property.ppcId)}>
                      <MdDeleteForever size={24} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default PyProperty;
