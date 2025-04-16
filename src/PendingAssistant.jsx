// import React from 'react'

// export default function PendingAssistant() {
//   return (
//     <div>PendingAssistant</div>
//   )
// }


import React, { useState } from "react";

const PendingAssistant = () => {
      const [fromDate, setFromDate] = useState("");
      const [endDate, setEndDate] = useState("");
      const [search, setSearch] = useState("");
    
      const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Search: ${search}, From Date: ${fromDate}, End Date: ${endDate}`);
      };
      const data = [
        {
          slId: 1,
          postedFrom: "TUC",
          baId: "6101",
          createdDate: "2025-01-08 20:34:26",
          createdBy: "Client",
          mobileNumber: "9043688767",
          priceMin: 100000,
          priceMax: 300000,
          carMake: "Any",
          carModel: "Any",
          fuelType: "Diesel",
          bodyType: "Any",
          regState: "Any",
          buyingMode: "CASH",
          staffName: "",
          status: "",
          followupDate: "",
          action: "Create Followup",
          deleteOrView: "Create Follow-up",
        },
        {
          slId: 2,
          postedFrom: "TUC",
          baId: "6100",
          createdDate: "2025-01-08 20:34:19",
          createdBy: "Client",
          mobileNumber: "9043688767",
          priceMin: 100000,
          priceMax: 300000,
          carMake: "Any",
          carModel: "Any",
          fuelType: "Diesel",
          bodyType: "Any",
          regState: "Any",
          buyingMode: "CASH",
          staffName: "",
          status: "",
          followupDate: "",
          action: "Create Followup",
          deleteOrView: "Create Follow-up",
        },
      ];
  return (
    <> 
     <div className="d-flex justify-content-between align-items-center mb-3">
   <button className="btn" style={{background:"#5F9EA0", color:"#fff", border:'none'}}>delete Pending Assistant</button>
    </div>
    <div className="d-flex justify-content-between align-items-center mb-3">
    <h4>Manage Expired Assistant
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
            <th>Sl ID</th>
            <th>Posted From</th>
            <th>BA ID</th>
            <th>Created Date</th>
            <th>Created By</th>
            <th>Mobile Number</th>
            <th>Price Min</th>
            <th>Price Max</th>
            <th>Car Make</th>
            <th>Car Model</th>
            <th>Fuel Type</th>
            <th>Body Type</th>
            <th>Reg State</th>
            <th>Buying Mode</th>
            <th>Staff Name</th>
            <th>Status</th>
            <th>Followup Date</th>
            <th>Action</th>
            <th>Delete/View</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.slId}>
              <td>{item.slId}</td>
              <td>{item.postedFrom}</td>
              <td>{item.baId}</td>
              <td>{item.createdDate}</td>
              <td>{item.createdBy}</td>
              <td>{item.mobileNumber}</td>
              <td>{item.priceMin}</td>
              <td>{item.priceMax}</td>
              <td>{item.carMake}</td>
              <td>{item.carModel}</td>
              <td>{item.fuelType}</td>
              <td>{item.bodyType}</td>
              <td>{item.regState}</td>
              <td>{item.buyingMode}</td>
              <td>{item.staffName}</td>
              <td>{item.status}</td>
              <td>{item.followupDate}</td>
              <td>
                <button className="btn btn-primary btn-sm">{item.action}</button>
              </td>
              <td>
                <button className="btn btn-danger btn-sm">{item.deleteOrView}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default PendingAssistant;
