// import React from 'react'

// export default function PayUMoney() {
//   return (
//     <div>PayUMoney</div>
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
import { Table, Pagination, Modal, Button } from "react-bootstrap";

const PayUMoney = () => {
     const [fromDate, setFromDate] = useState("");
        const [endDate, setEndDate] = useState("");
        const [search, setSearch] = useState("");
      
        const handleSubmit = (e) => {
          e.preventDefault();
          alert(`Search: ${search}, From Date: ${fromDate}, End Date: ${endDate}`);
        };
  const initialData = [
    {
      pucId: 8096,
      postedFrom: "PUC",
      planName: "SILVER",
      date: "2024-09-18 17:54:00",
      transactionId: "0e03fa59e75a9e8b02b0",
      mobile: "8050006406",
      amount: 299,
      status: "Paid",
    },
    {
      pucId: 7972,
      postedFrom: "PUC",
      planName: "SILVER",
      date: "2024-06-18 20:05:15",
      transactionId: "87c6e7a5611c91c61f3b",
      mobile: "9943888802",
      amount: 299,
      status: "Paid",
    },
    {
      pucId: 7910,
      postedFrom: "PUC",
      planName: "SILVER",
      date: "2024-03-14 11:03:32",
      transactionId: "a39f57105afa727eae48",
      mobile: "7708566929",
      amount: 299,
      status: "Paid",
    },
    {
      pucId: 7727,
      postedFrom: "TUC",
      planName: "SILVER",
      date: "2023-09-24 06:09:15",
      transactionId: "b106e7984db96f7b236a",
      mobile: "8870884896",
      amount: 299,
      status: "Paid",
    },
  ];

  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const itemsPerPage = 3;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  return (
    <>
    <div className="d-flex justify-content-between align-items-center mb-3">
    <h4>Manage Pay u Money

    </h4>  <button className="btn" style={{background:"#2EA44F", color:"#fff", border:'none'}}>EXPORT WITH OTP VERIFICATION</button>
    </div>
    <div className="container mt-5">
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
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>PUC ID</th>
            <th>Posted From</th>
            <th>Plan Name</th>
            <th>Date</th>
            <th>Transaction ID</th>
            <th>Mobile</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.pucId}>
              <td>{item.pucId}</td>
              <td>{item.postedFrom}</td>
              <td>{item.planName}</td>
              <td>{item.date}</td>
              <td>{item.transactionId}</td>
              <td>{item.mobile}</td>
              <td>{item.amount}</td>
              <td>{item.status}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleViewDetails(item)}
                >
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        {[...Array(totalPages).keys()].map((page) => (
          <Pagination.Item
            key={page + 1}
            active={page + 1 === currentPage}
            onClick={() => handlePageChange(page + 1)}
          >
            {page + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Transaction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTransaction && (
            <div>
              <p>
                <strong>PUC ID:</strong> {selectedTransaction.pucId}
              </p>
              <p>
                <strong>Posted From:</strong> {selectedTransaction.postedFrom}
              </p>
              <p>
                <strong>Plan Name:</strong> {selectedTransaction.planName}
              </p>
              <p>
                <strong>Date:</strong> {selectedTransaction.date}
              </p>
              <p>
                <strong>Transaction ID:</strong>{" "}
                {selectedTransaction.transactionId}
              </p>
              <p>
                <strong>Mobile:</strong> {selectedTransaction.mobile}
              </p>
              <p>
                <strong>Amount:</strong> {selectedTransaction.amount}
              </p>
              <p>
                <strong>Status:</strong> {selectedTransaction.status}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
};

export default PayUMoney;
