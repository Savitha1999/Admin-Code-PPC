

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const FreeCar = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const data = [
    { id: 8330, postedFrom: 'PUC', carMake: 'Kia', carModel: 'Carens', carPrice: 1490000, carKm: 47000, fuelType: 'Diesel', regState: 'PY', year: 2022, phoneNumber: '9600902096', salesType: 'Normal', pendingApprovedBy: 'GANESH', approvedBy: 'GANESH', approvedDate: '2025-01-08 18:27:28', planName: 'FREE', bill: true },
    { id: 8329, postedFrom: 'PUC', carMake: 'Tata Motors', carModel: 'Zest', carPrice: 440000, carKm: 45000, fuelType: 'Petrol', regState: 'PY', year: 2016, phoneNumber: '9600902096', salesType: 'Normal', pendingApprovedBy: 'GANESH', approvedBy: 'GANESH', approvedDate: '2025-01-08 18:28:06', planName: 'FREE', bill: true },
  ];

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
    const [fromDate, setFromDate] = useState("");
      const [endDate, setEndDate] = useState("");
      const [search, setSearch] = useState("");
    
      const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Search: ${search}, From Date: ${fromDate}, End Date: ${endDate}`);
      };
  return (
    <>
    <div className="d-flex justify-content-between align-items-center mb-3">
    <h4>Manage Free Car

    </h4>  <button style={{background:"#2EA44F", color:"#fff", border:'none'}}>EXPORT WITH OTP VERIFICATION</button>
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
    <div className="container mt-4">
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Posted From</th>
            <th>Car Make</th>
            <th>Car Model</th>
            <th>Car Price</th>
            <th>Car Km</th>
            <th>Fuel Type</th>
            <th>Reg State</th>
            <th>Year</th>
            <th>Mobile Number</th>
            <th>Sales Type</th>
            <th>Pending Approved By</th>
            <th>Approved By</th>
            <th>Approved Date</th>
            <th>Plan Name</th>
            <th>Bill</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.postedFrom}</td>
              <td>{item.carMake}</td>
              <td>{item.carModel}</td>
              <td>{item.carPrice}</td>
              <td>{item.carKm}</td>
              <td>{item.fuelType}</td>
              <td>{item.regState}</td>
              <td>{item.year}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.salesType}</td>
              <td>{item.pendingApprovedBy}</td>
              <td>{item.approvedBy}</td>
              <td>{item.approvedDate}</td>
              <td>{item.planName}</td>
              <td>{item.bill ? 'Yes' : 'No'}</td>
              <td>
                <button className="btn btn-success btn-sm me-2">Create Bill</button>
                <button className="btn btn-info btn-sm me-2">View</button>
                <button className="btn btn-warning btn-sm me-2">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
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
    </>
  );
};

export default FreeCar;
