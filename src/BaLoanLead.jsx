
import React, { useState } from "react";

const BuyerAssistanceLeadTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Sample data
  const tableData = [
    { assistId: "123456789", postedFrom: "Chennai", buyerNumber: "+91-9876543210", carTitle: "Toyota Corolla", createdDate: "2024-12-20", lead: "Yes" },
    { assistId: "223344556", postedFrom: "Pondicherry", buyerNumber: "+91-8765432109", carTitle: "Honda Civic", createdDate: "2024-12-22", lead: "No" },
    { assistId: "334455667", postedFrom: "Bangalore", buyerNumber: "+91-9123456789", carTitle: "Hyundai i20", createdDate: "2024-12-24", lead: "Yes" },
    { assistId: "445566778", postedFrom: "Mumbai", buyerNumber: "+91-9345678912", carTitle: "Maruti Swift", createdDate: "2024-12-25", lead: "No" },
    { assistId: "556677889", postedFrom: "Delhi", buyerNumber: "+91-9456781234", carTitle: "Ford EcoSport", createdDate: "2024-12-26", lead: "Yes" },
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
        <h2>Buyer Assistance Lead</h2>
        <button className="btn" style={{background:"#5F9EA0", color:"#fff", border:'none'}}>Resolved Insurance - Loan Lead</button>
      </div>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ASSIST ID</th>
            <th>Posted From</th>
            <th>BUYER NUMBER</th>
            <th>CAR TITLE</th>
            <th>CREATED DATE</th>
            <th>LEAD</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, index) => (
            <tr key={index}>
              <td>{row.assistId}</td>
              <td>{row.postedFrom}</td>
              <td>{row.buyerNumber}</td>
              <td>{row.carTitle}</td>
              <td>{row.createdDate}</td>
              <td>{row.lead}</td>
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

export default BuyerAssistanceLeadTable;
