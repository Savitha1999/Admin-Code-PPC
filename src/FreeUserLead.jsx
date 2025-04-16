// import React from 'react'

// export default function FreeUserLead() {
//   return (
//     <div>FreeUserLead</div>
//   )
// }
// import React, { useState } from 'react';

// const PaginationTable = () => {
//   // Sample data (replace with your actual data)
//   const data = Array.from({ length: 50 }, (_, index) => ({
//     id: index + 1,
//     postedFrom: `Location ${index + 1}`,
//     createdDate: `2024-01-${(index % 31) + 1}`,
//     lastLoginDate: `2024-01-${(index % 31) + 10}`,
//     code: `C${1000 + index}`,
//     mobileNumber: `123456789${index % 10}`,
//     mode: index % 2 === 0 ? 'Online' : 'Offline',
//     version: `v${1 + (index % 5)}.0`,
//     verifiedOtpBy: `Verifier ${index + 1}`,
//     staffName: `Staff ${index + 1}`,
//     remarks: `Remark ${index + 1}`,
//     reportDate: `2024-02-${(index % 28) + 1}`,
//     deletedDate: index % 5 === 0 ? `2024-03-${(index % 28) + 1}` : null,
//     bannedDate: index % 7 === 0 ? `2024-04-${(index % 28) + 1}` : null,
//     action: 'Edit',
//     status: index % 3 === 0 ? 'Active' : 'Inactive',
//   }));

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   // Calculate indexes for current page
//   const lastIndex = currentPage * itemsPerPage;
//   const firstIndex = lastIndex - itemsPerPage;
//   const currentData = data.slice(firstIndex, lastIndex);

//   // Total pages
//   const totalPages = Math.ceil(data.length / itemsPerPage);

//   // Handle page change
//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center">Responsive Pagination Table</h2>
//       <div className="table-responsive">
//         <table className="table table-bordered">
//           <thead className="thead-dark">
//             <tr>
//               <th>S.No</th>
//               <th>Posted From</th>
//               <th>Created Date</th>
//               <th>Last Login Date</th>
//               <th>Code</th>
//               <th>Mobile Number</th>
//               <th>Mode</th>
//               <th>Version</th>
//               <th>Verified OTP By</th>
//               <th>Staff Name</th>
//               <th>Remarks</th>
//               <th>Report Date</th>
//               <th>Deleted Date</th>
//               <th>Banned Date</th>
//               <th>Action</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentData.map((item) => (
//               <tr key={item.id}>
//                 <td>{item.id}</td>
//                 <td>{item.postedFrom}</td>
//                 <td>{item.createdDate}</td>
//                 <td>{item.lastLoginDate}</td>
//                 <td>{item.code}</td>
//                 <td>{item.mobileNumber}</td>
//                 <td>{item.mode}</td>
//                 <td>{item.version}</td>
//                 <td>{item.verifiedOtpBy}</td>
//                 <td>{item.staffName}</td>
//                 <td>{item.remarks}</td>
//                 <td>{item.reportDate}</td>
//                 <td>{item.deletedDate || '-'}</td>
//                 <td>{item.bannedDate || '-'}</td>
//                 <td>
//                   <button className="btn btn-primary btn-sm">{item.action}</button>
//                 </td>
//                 <td>{item.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination controls */}
//       <nav>
//         <ul className="pagination justify-content-center">
//           <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//             <button
//               className="page-link"
//               onClick={() => handlePageChange(currentPage - 1)}
//             >
//               Previous
//             </button>
//           </li>
//           {Array.from({ length: totalPages }, (_, index) => (
//             <li
//               className={`page-item ${
//                 currentPage === index + 1 ? 'active' : ''
//               }`}
//               key={index}
//             >
//               <button
//                 className="page-link"
//                 onClick={() => handlePageChange(index + 1)}
//               >
//                 {index + 1}
//               </button>
//             </li>
//           ))}
//           <li
//             className={`page-item ${
//               currentPage === totalPages ? 'disabled' : ''
//             }`}
//           >
//             <button
//               className="page-link"
//               onClick={() => handlePageChange(currentPage + 1)}
//             >
//               Next
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default PaginationTable;



import React, { useState } from "react";

const FreeUserLeadTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Sample data
  const tableData = [
    { carId: "123456789", postedFrom: "Chennai", mobile: "+91-9876543210", carTitle: "Toyota Corolla", adSubmitDate: "2024-12-20", interestCount: 5, shortlistedCount: 3, contactedCount: 2 },
    { carId: "987654321", postedFrom: "Pondicherry", mobile: "+91-8765432109", carTitle: "Honda Civic", adSubmitDate: "2024-12-22", interestCount: 8, shortlistedCount: 5, contactedCount: 4 },
    { carId: "112233445", postedFrom: "Bangalore", mobile: "+91-9123456789", carTitle: "Hyundai i20", adSubmitDate: "2024-12-24", interestCount: 3, shortlistedCount: 2, contactedCount: 1 },
    { carId: "556677889", postedFrom: "Mumbai", mobile: "+91-9345678912", carTitle: "Maruti Swift", adSubmitDate: "2024-12-25", interestCount: 6, shortlistedCount: 4, contactedCount: 3 },
    { carId: "778899001", postedFrom: "Delhi", mobile: "+91-9456781234", carTitle: "Ford EcoSport", adSubmitDate: "2024-12-26", interestCount: 7, shortlistedCount: 5, contactedCount: 4 },
    // Add more rows as needed
  ];

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Free User Lead</h2>
        <button style={{background:"#5F9EA0", color:"#fff", border:'none'}}>Resolved Free User Lead</button>
      </div>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>CAR ID</th>
            <th>Posted From</th>
            <th>MOBILE NUMBER</th>
            <th>CAR TITLE</th>
            <th>AD SUBMIT DATE</th>
            <th>Received Interest Count</th>
            <th>Buyer Shortlisted Count</th>
            <th>Buyer Contacted Count</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, index) => (
            <tr key={index}>
              <td>{row.carId}</td>
              <td>{row.postedFrom}</td>
              <td>{row.mobile}</td>
              <td>{row.carTitle}</td>
              <td>{row.adSubmitDate}</td>
              <td>{row.interestCount}</td>
              <td>{row.shortlistedCount}</td>
              <td>{row.contactedCount}</td>
              <td>
                <button className="btn btn-sm btn-success">View</button>{" "}
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center mt-3">
        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                onClick={() => handlePageChange(index + 1)}
              >
                <span className="page-link">{index + 1}</span>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default FreeUserLeadTable;
