

import React, { useState } from "react";

const ReportedCar = () => {
      const [fromDate, setFromDate] = useState("");
      const [endDate, setEndDate] = useState("");
      const [search, setSearch] = useState("");
    
      const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Search: ${search}, From Date: ${fromDate}, End Date: ${endDate}`);
      };
      const data = [
        {
          pucId: 4378,
          postedFrom: "PUC",
          carMake: "Hyundai I20 2009",
          ownerNumber: "9841128668",
          reportedNo: "8015369343",
          reportedMessage: "Sold Out",
          comment: "Sold Out",
          reportedDate: "2024-07-09 08:21:39",
          reportedStatus: "Reported",
          action: "Resolve Delete",
        },
        {
          pucId: 7992,
          postedFrom: "PUC",
          carMake: "Maruthi Suzuki Alto 800",
          ownerNumber: "9600902096",
          reportedNo: "9944244409",
          reportedMessage: "Already Sold",
          comment: "",
          reportedDate: "2024-07-05 14:11:37",
          reportedStatus: "Reported",
          action: "Resolve Delete",
        },
      ];
    
    
  return (
    <> 
     
    <div className="d-flex justify-content-between align-items-center mb-3">
    <h4>Manage Reported Car
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
            <th>PUC ID</th>
            <th>Posted From</th>
            <th>Car Make</th>
            <th>Owner Number</th>
            <th>Reported No</th>
            <th>Reported Message</th>
            <th>Comment</th>
            <th>Reported Date</th>
            <th>Reported Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.pucId}>
              <td>{item.pucId}</td>
              <td>{item.postedFrom}</td>
              <td>{item.carMake}</td>
              <td>{item.ownerNumber}</td>
              <td>{item.reportedNo}</td>
              <td>{item.reportedMessage}</td>
              <td>{item.comment || "N/A"}</td>
              <td>{item.reportedDate}</td>
              <td>{item.reportedStatus}</td>
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

export default ReportedCar;
