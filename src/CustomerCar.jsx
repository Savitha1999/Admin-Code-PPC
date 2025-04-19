

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomerCar = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const data = [
    { postedFrom: 'PUC', mobile: '9943494299', postedBy: 'Agent - Amirthalingam', cars: 3 },
    { postedFrom: 'PUC', mobile: '8778268681', postedBy: 'Agent -', cars: 71 },
    { postedFrom: 'PUC', mobile: '6380005030', postedBy: 'Agent - yuvaraj', cars: 3 },
    { postedFrom: 'TUC', mobile: '7397143524', postedBy: 'Agent - Vignesh', cars: 1 },
  ];

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Customer Cars</h2>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Posted From</th>
            <th>Mobile Number</th>
            <th>Posted By</th>
            <th>No. of Cars</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item.postedFrom}</td>
              <td>{item.mobile}</td>
              <td>{item.postedBy}</td>
              <td>{item.cars}</td>
              <td>
                <button className="btn btn-primary btn-sm me-2">Expand</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <li
              key={pageNumber}
              className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}
            >
              <button className="page-link" onClick={() => handlePageChange(pageNumber)}>
                {pageNumber}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default CustomerCar;
