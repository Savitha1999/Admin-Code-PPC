

import React, { useState } from "react";

const Help = () => {
      const [fromDate, setFromDate] = useState("");
      const [endDate, setEndDate] = useState("");
      const [search, setSearch] = useState("");
    
      const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Search: ${search}, From Date: ${fromDate}, End Date: ${endDate}`);
      };
      const data = [
        {
          rowId: 97,
          pucId: 7992,
          postedFrom: "PUC",
          carMake: "Maruthi Suzuki Alto 800",
          helpSeekNumber: "9944244409",
          helpMessage: "Help Me to buy this Car",
          comment: "test",
          helpDate: "2024-07-05 14:11:54",
          action: "Resolve",
        },
        {
          rowId: 96,
          pucId: 4060,
          postedFrom: "TUC",
          carMake: "Maruthi Suzuki Swift 2015",
          helpSeekNumber: "9003139611",
          helpMessage: "Loan Help",
          comment: "",
          helpDate: "2024-04-06 17:19:31",
          action: "Resolve",
        },
      ];
    
  return (
    <> 
     
    <div className="d-flex justify-content-between align-items-center mb-3">
    <h4>Manage Help Page
    </h4>  <button className="btn" style={{background:"#2EA44F", color:"#fff", border:'none'}}>EXPORT WITH OTP VERIFICATION</button>
    </div>
    <div className="container mt-5">
      <h2 className="mb-4">User Logs</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="searchInput" className="form-label">
            Search
          </label>
          <input
            type="text"
            id="searchInput"
            className="form-control"
            placeholder="Enter search term"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

      {/* From Date Field */}
      <div className="mb-3">
          <label htmlFor="fromDate" className="form-label">
            From Date
          </label>
          <input
            type="date"
            id="fromDate"
            className="form-control"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        {/* End Date Field */}
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button type="submit" className="btn" style={{background:"#E91E63", color:"#fff", border:'none'}}>
          Submit
        </button>
      </form>
    </div>
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ROW ID</th>
            <th>PUC ID</th>
            <th>Posted From</th>
            <th>Car Make</th>
            <th>Help Seek Number</th>
            <th>Help Message</th>
            <th>Comment</th>
            <th>Help Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.rowId}>
              <td>{item.rowId}</td>
              <td>{item.pucId}</td>
              <td>{item.postedFrom}</td>
              <td>{item.carMake}</td>
              <td>{item.helpSeekNumber}</td>
              <td>{item.helpMessage}</td>
              <td>{item.comment || "N/A"}</td>
              <td>{item.helpDate}</td>
              <td>
                <button className="btn btn-primary btn-sm">{item.action}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default Help;












// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';

// const CombinedPropertyTable = ({ phoneNumber }) => {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);

//   const fetchAllPropertyData = useCallback(async () => {
//     if (!phoneNumber) return;

//     setLoading(true);

//     const endpoints = [
//       { url: '/get-favorite-owner', key: 'favoriteRequestsData', label: 'Favorite' },
//       { url: '/get-contact-owner', key: 'contactRequestsData', label: 'Contact' },
//       { url: '/get-interest-owner', key: 'interestRequestsData', label: 'Interest' },
//       { url: '/fetch-owner-matched-properties', key: 'properties', label: 'Matched' },
//       { url: '/get-help-as-owner', key: 'helpRequestsData', label: 'Help' },
//       { url: `/offers/owner/${phoneNumber}`, key: 'offers', label: 'Offers', isDirectPath: true },
//       { url: `/photo-requests/owner/${phoneNumber}`, key: null, label: 'Photo Request', isDirectPath: true },
//       { url: '/get-reportProperty-owner', key: 'reportPropertyRequestsData', label: 'Reported' },
//       { url: '/get-soldOut-owner', key: 'soldOutRequestsData', label: 'Sold Out' },
//       { url: '/property-owner-viewed-users', key: 'properties', label: 'Viewed' }
//     ];

//     const allProperties = [];

//     try {
//       await Promise.all(
//         endpoints.map(async (ep) => {
//           const fullUrl = ep.isDirectPath
//             ? `${process.env.REACT_APP_API_URL}${ep.url}`
//             : `${process.env.REACT_APP_API_URL}${ep.url}?phoneNumber=${phoneNumber}`;

//           const response = await axios.get(fullUrl);
//           const resultData = ep.key ? response.data[ep.key] : response.data;

//           if (Array.isArray(resultData)) {
//             resultData.forEach(item => {
//               allProperties.push({ ...item, source: ep.label });
//             });
//           }
//         })
//       );

//       setProperties(allProperties);
//     } catch (err) {
//       setMessage({ text: "Failed to fetch combined property data.", type: "error" });
//     } finally {
//       setLoading(false);
//     }
//   }, [phoneNumber]);

//   useEffect(() => {
//     fetchAllPropertyData();
//   }, [fetchAllPropertyData]);

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>All Property Requests</h2>

//       {message && (
//         <div style={{ color: message.type === 'error' ? 'red' : 'green', marginBottom: '10px' }}>
//           {message.text}
//         </div>
//       )}

//       {loading ? (
//         <p>Loading properties...</p>
//       ) : (
//         <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//           <thead>
//             <tr style={{ backgroundColor: '#f4f4f4' }}>
//               <th style={thStyle}>#</th>
//               <th style={thStyle}>Title</th>
//               <th style={thStyle}>Location</th>
//               <th style={thStyle}>Status</th>
//               <th style={thStyle}>Source</th>
//             </tr>
//           </thead>
//           <tbody>
//             {properties.length === 0 ? (
//               <tr>
//                 <td colSpan="5" style={{ textAlign: 'center', padding: '10px' }}>No properties found.</td>
//               </tr>
//             ) : (
//               properties.map((property, index) => (
//                 <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
//                   <td style={tdStyle}>{index + 1}</td>
//                   <td style={tdStyle}>{property.title || property.propertyTitle || "N/A"}</td>
//                   <td style={tdStyle}>{property.location || property.address || "N/A"}</td>
//                   <td style={tdStyle}>{property.status || "N/A"}</td>
//                   <td style={tdStyle}><span style={badgeStyle}>{property.source}</span></td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// // Simple styling
// const thStyle = {
//   padding: '10px',
//   border: '1px solid #ccc',
//   textAlign: 'left',
//   fontWeight: 'bold'
// };

// const tdStyle = {
//   padding: '10px',
//   border: '1px solid #ccc'
// };

// const badgeStyle = {
//   backgroundColor: '#007bff',
//   color: 'white',
//   borderRadius: '4px',
//   padding: '2px 8px',
//   fontSize: '0.85rem'
// };

// export default CombinedPropertyTable;
