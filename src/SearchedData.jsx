// import React from 'react'

// export default function SearchedData() {
//   return (
//     <div>SearchedData</div>
//   )
// }



import React, { useState } from "react";

const SearchedData = () => {
      const [fromDate, setFromDate] = useState("");
      const [endDate, setEndDate] = useState("");
      const [search, setSearch] = useState("");
    
      const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Search: ${search}, From Date: ${fromDate}, End Date: ${endDate}`);
      };
      const data = [
        {
          id: 1,
          createdDate: "2025-01-09",
          countryCode: "+0",
          mobileNumber: "79",
          buyerAssistanceCreated: 1,
          priceMin: 700000,
          priceMax: null,
          carMake: "Mahindra",
          carModel: "Bolero",
          fuelType: null,
          kmMin: null,
          kmMax: null,
        },
        {
          id: 2,
          createdDate: "2025-01-09",
          countryCode: "+0",
          mobileNumber: "79",
          buyerAssistanceCreated: 1,
          priceMin: 500000,
          priceMax: null,
          carMake: "Mahindra",
          carModel: "Bolero",
          fuelType: null,
          kmMin: null,
          kmMax: null,
        },
      ];
    
  return (
    <> 
     <div className="d-flex justify-content-between align-items-center mb-3">

    <button className="btn" style={{background:"#5F9EA0", color:"#fff", border:'none'}}>delete last viewed cars </button>
    </div>
    <div className="d-flex justify-content-between align-items-center mb-3">
    <h4>Manage Searched Data
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
            <th>ID</th>
            <th>Created Date</th>
            <th>Country Code</th>
            <th>Mobile Number</th>
            <th>Buyer Assistance Created</th>
            <th>Price Min</th>
            <th>Price Max</th>
            <th>Car Make</th>
            <th>Car Model</th>
            <th>Fuel Type</th>
            <th>KM Min</th>
            <th>KM Max</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.createdDate}</td>
              <td>{item.countryCode}</td>
              <td>{item.mobileNumber}</td>
              <td>{item.buyerAssistanceCreated}</td>
              <td>{item.priceMin}</td>
              <td>{item.priceMax || "N/A"}</td>
              <td>{item.carMake}</td>
              <td>{item.carModel}</td>
              <td>{item.fuelType || "N/A"}</td>
              <td>{item.kmMin || "N/A"}</td>
              <td>{item.kmMax || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default SearchedData;
