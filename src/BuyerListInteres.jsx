import React, { useState } from "react";

const BuyerListInterest = () => {
      const [fromDate, setFromDate] = useState("");
      const [endDate, setEndDate] = useState("");
      const [search, setSearch] = useState("");
    
      const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Search: ${search}, From Date: ${fromDate}, End Date: ${endDate}`);
      };
  const data = [
    {
      sNo: 1,
      baId: "3851",
      postedFrom: "TUC",
      interestedDate: "2023-05-23 10:37:44",
      interestSenderNumber: "9360462947",
      status: "Accepted",
      buyerNumber: "0",
      action: "Read",
      planName: "FREE",
    },
    {
      sNo: 2,
      baId: "1454",
      postedFrom: "PUC",
      interestedDate: "2023-03-29 22:38:24",
      interestSenderNumber: "9445382462",
      status: "Pending",
      buyerNumber: "9944244409",
      action: "Unread",
      planName: "",
    },
    {
      sNo: 3,
      baId: "3811",
      postedFrom: "PUC",
      interestedDate: "2023-03-29 22:37:14",
      interestSenderNumber: "9445382462",
      status: "Pending",
      buyerNumber: "8939566080",
      action: "Unread",
      planName: "FREE",
    },
  ];

  return (
    <> <div className="d-flex justify-content-between align-items-center mb-3">
    <h4>Manage Buyer List - Interest
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
            <th>S.No</th>
            <th>BA ID</th>
            <th>Posted From</th>
            <th>Interested Date</th>
            <th>Interest Sender Number</th>
            <th>Status</th>
            <th>Buyer Number</th>
            <th>Action</th>
            <th>Plan Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.sNo}>
              <td>{item.sNo}</td>
              <td>{item.baId}</td>
              <td>{item.postedFrom}</td>
              <td>{item.interestedDate}</td>
              <td>{item.interestSenderNumber}</td>
              <td>{item.status}</td>
              <td>{item.buyerNumber}</td>
              <td>{item.action}</td>
              <td>{item.planName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default BuyerListInterest;
