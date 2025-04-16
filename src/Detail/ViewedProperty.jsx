// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ViewedProperties = () => {
//   const [viewedProperties, setViewedProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchViewedProperties = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/all-viewed-properties`);
//         setViewedProperties(response.data.viewedProperties);
//       } catch (err) {
//         setError("Failed to fetch viewed properties.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchViewedProperties();
//   }, []);

//   if (loading) return <p className="text-center fs-4">Loading viewed properties...</p>;
//   if (error) return <p className="text-danger text-center">{error}</p>;
//   if (viewedProperties.length === 0) return <p className="text-center">No viewed properties available.</p>;

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center mb-4">Viewed Properties</h2>
//       <div className="table-responsive">
//         <table className="table table-bordered table-striped">
//           <thead className="table-dark">
//             <tr>
//               <th>PPC ID</th>
//               <th>Price</th>
//               <th>Type</th>
//               <th>Mode</th>
//               <th>City</th>
//               <th>Area</th>
//               <th>Total Area</th>
//               <th>Ownership</th>
//               <th>Viewers</th>
//             </tr>
//           </thead>
//           <tbody>
//             {viewedProperties.map((property) => (
//               <tr key={property.ppcId}>
//                 <td>{property.ppcId}</td>
//                 <td>₹ {property.price ? property.price.toLocaleString("en-IN") : "N/A"}</td>
//                 <td>{property.propertyType || "N/A"}</td>
//                 <td>{property.propertyMode || "N/A"}</td>
//                 <td>{property.city || "N/A"}</td>
//                 <td>{property.area || "N/A"}</td>
//                 <td>{property.totalArea || "N/A"} {property.areaUnit || ""}</td>
//                 <td>{property.ownership || "N/A"}</td>
//                 <td>
//                   {property.viewers.length > 0 ? (
//                     <ul>
//                       {property.viewers.map((viewer, index) => (
//                         <li key={index}>{viewer.phoneNumber} (Viewed at: {new Date(viewer.viewedAt).toLocaleString()})</li>
//                       ))}
//                     </ul>
//                   ) : (
//                     "No Viewers"
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ViewedProperties;









// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaEye } from "react-icons/fa";

// const ViewedProperties = () => {
//   const [viewedProperties, setViewedProperties] = useState([]);
//   const [zeroViewProperties, setZeroViewProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//       const [search, setSearch] = useState("");
//       const [fromDate, setFromDate] = useState("");
//       const [endDate, setEndDate] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const viewedResponse = await axios.get(`${process.env.REACT_APP_API_URL}/all-viewed-properties`);
//         setViewedProperties(viewedResponse.data.viewedProperties);
//       } catch (err) {
//         setError("Failed to fetch viewed properties.");
//       }

//       try {
//         const zeroViewResponse = await axios.get(`${process.env.REACT_APP_API_URL}/zero-view-properties`);
//         setZeroViewProperties(zeroViewResponse.data.properties);
//       } catch (err) {
//         setError("Failed to fetch zero-view properties.");
//       }
      
//       setLoading(false);
//     };

//     fetchData();
//   }, []);

//   const handleDelete = async (ppcId) => {
//     try {
//       await axios.delete(`${process.env.REACT_APP_API_URL}/delete-viewed-property/${ppcId}`);
//       setViewedProperties(viewedProperties.filter(property => property.ppcId !== ppcId));
//     //   setZeroViewProperties(zeroViewProperties.filter(property => property.ppcId !== ppcId));

//     } catch (error) {
//       console.error("Error deleting viewed property:", error);
//       setError("Failed to delete property.");
//     }
//   };

//   if (loading) return <p className="text-center fs-4">Loading properties...</p>;
//   if (error) return <p className="text-danger text-center">{error}</p>;

//    // Filter function for search and date range
//    const filterData = (data) => {
//     return data.filter(item => {
//         const createdAt = new Date(item.createdAt).getTime();
//         const from = fromDate ? new Date(fromDate).getTime() : null;
//         const to = endDate ? new Date(endDate).getTime() : null;

//         // Ensure ppcId is a string before calling toLowerCase()
//         const matchesSearch = search ? String(item.ppcId).toLowerCase().includes(search.toLowerCase()) : true;
//         const matchesStartDate = from ? createdAt >= from : true;
//         const matchesEndDate = to ? createdAt <= to : true;

//         return matchesSearch && matchesStartDate && matchesEndDate;
//     });
// };

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center mb-4">Viewed Properties</h2>
      
// <form 
//     onSubmit={(e) => e.preventDefault()} 
//     style={{
//         width: "80%",
//         margin: "0 auto", // Centers the form horizontally
//         padding: "20px",
//         border: "1px solid #ccc",
//         borderRadius: "10px",
//         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//         backgroundColor: "#fff",
//         marginBottom:"20px"
//     }}
// >
//     <div className="mb-3">
//         <label htmlFor="searchInput" className="form-label fw-bold">Search PPC ID</label>
//         <input
//             type="text"
//             id="searchInput"
//             className="form-control"
//             placeholder="Enter PPC ID"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
//         />
//     </div>

//     <div className="mb-3">
//         <label htmlFor="fromDate" className="form-label fw-bold">From Date</label>
//         <input
//             type="date"
//             id="fromDate"
//             className="form-control"
//             value={fromDate}
//             onChange={(e) => setFromDate(e.target.value)}
//             style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
//         />
//     </div>

//     <div className="mb-3">
//         <label htmlFor="endDate" className="form-label fw-bold">End Date</label>
//         <input
//             type="date"
//             id="endDate"
//             className="form-control"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
//         />
//     </div>
// </form>


//       <div className="table-responsive">
//         <table className="table table-bordered table-striped">
//           <thead className="table-dark">
//             <tr>
//               <th>PPC ID</th>
//               <th>Price</th>
//               <th>Type</th>
//               <th>Mode</th>
//               <th>City</th>
//               <th>Area</th>
//               <th>Total Area</th>
//               <th>Ownership</th>
//               <th>View Count</th>
//               <th>Viewers</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//           filterData{viewedProperties.map((property) => (
//               <tr key={property.ppcId}>
//                 <td>{property.ppcId}</td>
//                 <td>₹ {property.price ? property.price.toLocaleString("en-IN") : "N/A"}</td>
//                 <td>{property.propertyType || "N/A"}</td>
//                 <td>{property.propertyMode || "N/A"}</td>
//                 <td>{property.city || "N/A"}</td>
//                 <td>{property.area || "N/A"}</td>
//                 <td>{property.totalArea || "N/A"} {property.areaUnit || ""}</td>
//                 <td>{property.ownership || "N/A"}</td>
//                   <FaEye className="me-1" /> {property.views || '0'}
//                 <td>
//                   {property.viewers.length > 0 ? (
//                     <ul>
//                       {property.viewers.map((viewer, index) => (
//                         <li key={index}>{viewer.phoneNumber} (Viewed at: {new Date(viewer.viewedAt).toLocaleString()})</li>
//                       ))}
//                     </ul>
//                   ) : (
//                     "No Viewers"
//                   )}
//                 </td>
//                 <td>
//                   <button className="btn btn-danger btn-sm" onClick={() => handleDelete(property.ppcId)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
      
    //   <h2 className="text-center mt-5 mb-4">Zero-View Properties</h2>
    //   <div className="table-responsive">
    //     <table className="table table-bordered table-striped">
    //       <thead className="table-dark">
    //         <tr>
    //           <th>PPC ID</th>
    //           <th>Price</th>
    //           <th>Type</th>
    //           <th>Mode</th>
    //           <th>City</th>
    //           <th>Area</th>
    //           <th>Total Area</th>
    //           <th>Ownership</th>
    //           <th>Action</th>

    //         </tr>
    //       </thead>
    //       <tbody>
    //         {zeroViewProperties.length > 0 ? (
    //           zeroViewProperties.map((property) => (
    //             <tr key={property.ppcId}>
    //               <td>{property.ppcId}</td>
    //               <td>₹ {property.price ? property.price.toLocaleString("en-IN") : "N/A"}</td>
    //               <td>{property.propertyType || "N/A"}</td>
    //               <td>{property.propertyMode || "N/A"}</td>
    //               <td>{property.city || "N/A"}</td>
    //               <td>{property.area || "N/A"}</td>
    //               <td>{property.totalArea || "N/A"} {property.areaUnit || ""}</td>
    //               <td>{property.ownership || "N/A"}</td>
    //               {/* <td>
    //                 <button className="btn btn-danger btn-sm" onClick={() => handleDelete(property.ppcId)}>Delete</button>
    //               </td> */}
    //             </tr>
    //           ))
    //         ) : (
    //           <tr>
    //             <td colSpan="8" className="text-center">No properties with zero views.</td>
    //           </tr>
    //         )}
    //       </tbody>
    //     </table>
//       </div>
//     </div>
//   );
// };

// export default ViewedProperties;





// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ViewedProperties = () => {
//   const [viewedProperties, setViewedProperties] = useState([]);
//   const [zeroViewProperties, setZeroViewProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");
//   const [fromDate, setFromDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const viewedResponse = await axios.get(`${process.env.REACT_APP_API_URL}/all-viewed-properties`);
//         setViewedProperties(viewedResponse.data.viewedProperties);
//       } catch (err) {
//         setError("Failed to fetch viewed properties.");
//       }

//       try {
//         const zeroViewResponse = await axios.get(`${process.env.REACT_APP_API_URL}/zero-view-properties`);
//         setZeroViewProperties(zeroViewResponse.data.properties);
//       } catch (err) {
//         setError("Failed to fetch zero-view properties.");
//       }
      
//       setLoading(false);
//     };

//     fetchData();
//   }, []);

//   const handleDelete = async (ppcId) => {
//     try {
//       await axios.delete(`${process.env.REACT_APP_API_URL}/delete-viewed-property/${ppcId}`);
//       setViewedProperties(viewedProperties.filter(property => property.ppcId !== ppcId));
//       setZeroViewProperties(zeroViewProperties.filter(property => property.ppcId !== ppcId));
//     } catch (error) {
//       console.error("Error deleting viewed property:", error);
//       setError("Failed to delete property.");
//     }
//   };

//   const filterData = (data) => {
//     return data.filter(item => {
//         const createdAt = new Date(item.createdAt).getTime();
//         const from = fromDate ? new Date(fromDate).getTime() : null;
//         const to = endDate ? new Date(endDate).getTime() : null;

//         const matchesSearch = search ? String(item.ppcId).toLowerCase().includes(search.toLowerCase()) : true;
//         const matchesStartDate = from ? createdAt >= from : true;
//         const matchesEndDate = to ? createdAt <= to : true;

//         return matchesSearch && matchesStartDate && matchesEndDate;
//     });
//   };

//   if (loading) return <p className="text-center fs-4">Loading properties...</p>;
//   if (error) return <p className="text-danger text-center">{error}</p>;

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center mb-4">Viewed Properties</h2>
      
//       <form className="mb-4">
        // <h3>Viewed Properties Search</h3>
//         <input type="text" placeholder="Search PPC ID" value={search} onChange={(e) => setSearch(e.target.value)} className="form-control mb-2" />
//         <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="form-control mb-2" />
//         <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="form-control mb-2" />
//       </form>

    //   <h3 className="mt-5" > Viewed Properties All Datas</h3>

//       <div className="table-responsive mt-3">
//         <table className="table table-bordered ">
//           <thead className="table-dark">
//             <tr>
//               <th>PPC ID</th>
//               <th>Price</th>
//               <th>Type</th>
//               <th>Mode</th>
//               <th>City</th>
//               <th>Area</th>
//               <th>Total Area</th>
//               <th>Ownership</th>
//               <th>View Count</th>
//               <th>Viewers</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filterData(viewedProperties).map((property) => (
//               <tr key={property.ppcId}>
//                 <td>{property.ppcId}</td>
//                 <td>₹ {property.price ? property.price.toLocaleString("en-IN") : "N/A"}</td>
//                 <td>{property.propertyType || "N/A"}</td>
//                 <td>{property.propertyMode || "N/A"}</td>
//                 <td>{property.city || "N/A"}</td>
//                 <td>{property.area || "N/A"}</td>
//                 <td>{property.totalArea || "N/A"} {property.areaUnit || ""}</td>
//                 <td>{property.ownership || "N/A"}</td>
//                 <td>{property.views || 0}</td>
//                 <td>
//                   {property.viewers.length > 0 ? (
//                     <ul>
//                       {property.viewers.map((viewer, index) => (
//                         <li key={index}>{viewer.phoneNumber} (Viewed at: {new Date(viewer.viewedAt).toLocaleString()})</li>
//                       ))}
//                     </ul>
//                   ) : (
//                     "No Viewers"
//                   )}
//                 </td>
//                 <td>
//                   <button className="btn btn-danger btn-sm" onClick={() => handleDelete(property.ppcId)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ViewedProperties;





import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewedProperties = () => {
  const [viewedProperties, setViewedProperties] = useState([]);
  const [zeroViewProperties, setZeroViewProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const viewedResponse = await axios.get(`${process.env.REACT_APP_API_URL}/all-viewed-properties`);
        setViewedProperties(viewedResponse.data.viewedProperties);
      } catch (err) {
        setError("Failed to fetch viewed properties.");
      }

      try {
        const zeroViewResponse = await axios.get(`${process.env.REACT_APP_API_URL}/zero-view-properties`);
        setZeroViewProperties(zeroViewResponse.data.properties);
      } catch (err) {
        setError("Failed to fetch zero-view properties.");
      }
      
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleDelete = async (ppcId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/delete-viewed-property/${ppcId}`);
      setViewedProperties(viewedProperties.filter(property => property.ppcId !== ppcId));
      setZeroViewProperties(zeroViewProperties.filter(property => property.ppcId !== ppcId));
    } catch (error) {
      console.error("Error deleting viewed property:", error);
      setError("Failed to delete property.");
    }
  };

  const filterData = (data) => {
    return data.filter(item => {
        const createdAt = new Date(item.createdAt).getTime();
        const from = fromDate ? new Date(fromDate).getTime() : null;
        const to = endDate ? new Date(endDate).getTime() : null;

        const matchesSearch = search ? String(item.ppcId).toLowerCase().includes(search.toLowerCase()) : true;
        const matchesStartDate = from ? createdAt >= from : true;
        const matchesEndDate = to ? createdAt <= to : true;

        return matchesSearch && matchesStartDate && matchesEndDate;
    });
  };

  if (loading) return <p className="text-center fs-4">Loading properties...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;

  const tableHeaders = viewedProperties.length > 0 ? Object.keys(viewedProperties[0]) : [];

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Viewed Properties</h2>
      
      <form className="mb-4">
      <h3>Viewed Properties Search</h3>
        <input type="text" placeholder="Search PPC ID" value={search} onChange={(e) => setSearch(e.target.value)} className="form-control mb-2" />
        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="form-control mb-2" />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="form-control mb-2" />
      </form>

      <h3 className="mt-5 mb-2" > Viewed Properties All Datas</h3>


      <div className="table-responsive" style={{ maxHeight: "500px", overflowY: "auto" }}>
        <table className="table table-bordered table-striped">
          <thead className="table-dark" style={{ position: "sticky", top: 0, zIndex: 2 }}>
            <tr>
              <th>PPC ID</th>
              <th>Price</th>
              <th>Type</th>
              <th>Mode</th>
              <th>City</th>
              <th>Area</th>
              <th>Total Area</th>
              <th>Ownership</th>
              <th>View Count</th>
              <th>Viewers</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filterData(viewedProperties).map((property) => (
              <tr key={property.ppcId}>
                <td>{property.ppcId}</td>
                <td>₹ {property.price ? property.price.toLocaleString("en-IN") : "N/A"}</td>
                <td>{property.propertyType || "N/A"}</td>
                <td>{property.propertyMode || "N/A"}</td>
                <td>{property.city || "N/A"}</td>
                <td>{property.area || "N/A"}</td>
                <td>{property.totalArea || "N/A"} {property.areaUnit || ""}</td>
                <td>{property.ownership || "N/A"}</td>
                <td>{property.views || 0}</td>
                <td>
                  {property.viewers && property.viewers.length > 0 ? (
                    <ul>
                      {property.viewers.map((viewer, index) => (
                        <li key={index}>{viewer.phoneNumber} (Viewed at: {new Date(viewer.viewedAt).toLocaleString()})</li>
                      ))}
                    </ul>
                  ) : (
                    "No Viewers"
                  )}
                </td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(property.ppcId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

 
      
      </div>
      <h2 className="text-center mt-5 mb-4">Zero-View Properties</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
        <thead className="table-dark" style={{ position: "sticky", top: 0, zIndex: 2 }}>
        <tr>
              <th>PPC ID</th>
              <th>Price</th>
              <th>Type</th>
              <th>Mode</th>
              <th>City</th>
              <th>Area</th>
              <th>Total Area</th>
              <th>Ownership</th>

            </tr>
          </thead>
          <tbody>
            {zeroViewProperties.length > 0 ? (
              zeroViewProperties.map((property) => (
                <tr key={property.ppcId}>
                  <td>{property.ppcId}</td>
                  <td>₹ {property.price ? property.price.toLocaleString("en-IN") : "N/A"}</td>
                  <td>{property.propertyType || "N/A"}</td>
                  <td>{property.propertyMode || "N/A"}</td>
                  <td>{property.city || "N/A"}</td>
                  <td>{property.area || "N/A"}</td>
                  <td>{property.totalArea || "N/A"} {property.areaUnit || ""}</td>
                  <td>{property.ownership || "N/A"}</td>
                
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">No properties with zero views.</td>
              </tr>
            )}
          </tbody>
        </table>
</div>
    </div>
  );
};

export default ViewedProperties;