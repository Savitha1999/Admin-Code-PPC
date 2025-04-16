// import React from 'react'

// export default function ExpireCar() {
//   return (
//     <div>ExpireCar</div>
//   )
// }


import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ExpireCar = () => {
        const [fromDate, setFromDate] = useState("");
        const [endDate, setEndDate] = useState("");
        const [search, setSearch] = useState("");
      
        const handleSubmit = (e) => {
          e.preventDefault();
          alert(`Search: ${search}, From Date: ${fromDate}, End Date: ${endDate}`);
        };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const data = [
    { id: 8046, postedFrom: 'PUC', carMake: 'Hyundai', carModel: 'Santro', phoneNumber: '8778268681', submitBy: 'client Web', planName: 'FREE', approvedDate: '2024-07-27 13:07:13', expiredDate: '' },
    { id: 8072, postedFrom: 'PUC', carMake: 'Maruthi Suzuki', carModel: 'Swift', phoneNumber: '8778268681', submitBy: 'client Web', planName: 'FREE', approvedDate: '2024-08-02 17:55:49', expiredDate: '' },
  ];

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

     const [dropdown1, setDropdown1] = useState("");
      const [dropdown2, setDropdown2] = useState("");
    
      const handleSubmit1 = (e) => {
        e.preventDefault();
        alert(`Selected values: Dropdown 1 - ${dropdown1}, Dropdown 2 - ${dropdown2}`);
      }; 
  return (
    <>
          <form onSubmit={handleSubmit1}>
        <div className="mb-3">
          <label htmlFor="dropdown1" className="form-label">
          Choose Expired
          </label>
          <select
            id="dropdown1"
            className="form-select"
            value={dropdown1}
            onChange={(e) => setDropdown1(e.target.value)}
          >
            <option value="">Select CAr Type</option>
            <option value="Option 1A">Option 1A</option>
            <option value="Option 1B">Option 1B</option>
            <option value="Option 1C">Option 1C</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="dropdown2" className="form-label">
          Choose Active
          </label>
          <select
            id="dropdown2"
            className="form-select"
            value={dropdown2}
            onChange={(e) => setDropdown2(e.target.value)}
          >
            <option value="">Select car Type</option>
            <option value="Option 2A">Option 2A</option>
            <option value="Option 2B">Option 2B</option>
            <option value="Option 2C">Option 2C</option>
          </select>
        </div>

        <button className="btn" type="submit" style={{background:"#E91E63", color:"#fff", border:'none'}}>
          Submit
        </button>
      </form>
    <div className="d-flex justify-content-between align-items-center mb-3">
    <h4>MANAGE EXPIRED CARS
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
            <th>Phone Number</th>
            <th>Submit By</th>
            <th>Plan Name</th>
            <th>Approved Date</th>
            <th>Expired Date</th>
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
              <td>{item.phoneNumber}</td>
              <td>{item.submitBy}</td>
              <td>{item.planName}</td>
              <td>{item.approvedDate}</td>
              <td>{item.expiredDate}</td>
              <td>
                <button className="btn btn-primary btn-sm me-2">Undo</button>
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

export default ExpireCar;
