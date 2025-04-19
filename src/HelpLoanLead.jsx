

import React, { useState } from "react";

const NeedHelpLeadTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Sample data
  const tableData = [
    { rowId: 1, carId: "12345", postedFrom: "Chennai", phone: "+91-9876543210", carTitle: "Toyota Corolla", createdDate: "2024-12-20", lead: "Yes", message: "Need assistance with documentation." },
    { rowId: 2, carId: "67890", postedFrom: "Pondicherry", phone: "+91-8765432109", carTitle: "Honda Civic", createdDate: "2024-12-22", lead: "No", message: "Looking for insurance options." },
    { rowId: 3, carId: "11223", postedFrom: "Bangalore", phone: "+91-9123456789", carTitle: "Hyundai i20", createdDate: "2024-12-24", lead: "Yes", message: "Need help with loan approval." },
    { rowId: 4, carId: "44556", postedFrom: "Mumbai", phone: "+91-9345678912", carTitle: "Maruti Swift", createdDate: "2024-12-25", lead: "No", message: "Clarification on loan terms." },
    { rowId: 5, carId: "78901", postedFrom: "Delhi", phone: "+91-9456781234", carTitle: "Ford EcoSport", createdDate: "2024-12-26", lead: "Yes", message: "Need help with car registration." },
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
        <h2>Need Help Lead</h2>
        <button style={{background:"#5F9EA0", color:"#fff", border:'none'}}>Resolved Insurance - Loan Lead</button>
      </div>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ROW ID</th>
            <th>CAR ID</th>
            <th>Posted From</th>
            <th>PHONE</th>
            <th>CAR TITLE</th>
            <th>CREATED DATE</th>
            <th>LEAD</th>
            <th>MESSAGE</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row) => (
            <tr key={row.rowId}>
              <td>{row.rowId}</td>
              <td>{row.carId}</td>
              <td>{row.postedFrom}</td>
              <td>{row.phone}</td>
              <td>{row.carTitle}</td>
              <td>{row.createdDate}</td>
              <td>{row.lead}</td>
              <td>{row.message}</td>
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

export default NeedHelpLeadTable;
