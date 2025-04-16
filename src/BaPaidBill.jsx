
import React, { useState } from "react";

const BaPaidBill = () => {
      const [fromDate, setFromDate] = useState("");
      const [endDate, setEndDate] = useState("");
      const [search, setSearch] = useState("");
    
      const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Search: ${search}, From Date: ${fromDate}, End Date: ${endDate}`);
      };
      const data = [
        {
          baId: 1022,
          postedFrom: "PUC",
          transactionId: "",
          paymentDate: "",
          paymentType: "",
          planName: "",
          planAmount: "",
          discount: "",
          netAmount: "",
          billCreatedBy: "Owner",
          billCreatedOffice: "Owner",
        },
      ];
    
  return (
    <> 
     
    <div className="d-flex justify-content-between align-items-center mb-3">
    <h4>Manage Paid Bills
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
        <button type="submit" className="btn" style={{background:"#5F9EA0", color:"#fff", border:'none'}}>
          Submit
        </button>
      </form>
    </div>
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>BA ID</th>
            <th>Posted From</th>
            <th>Transaction Id/Bill Number</th>
            <th>Payment Date</th>
            <th>Payment Type</th>
            <th>Plan Name</th>
            <th>Plan Amount</th>
            <th>Discount</th>
            <th>Net Amount</th>
            <th>Bill Created By</th>
            <th>Bill Created Office</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.baId}>
              <td>{item.baId}</td>
              <td>{item.postedFrom}</td>
              <td>{item.transactionId || "N/A"}</td>
              <td>{item.paymentDate || "N/A"}</td>
              <td>{item.paymentType || "N/A"}</td>
              <td>{item.planName || "N/A"}</td>
              <td>{item.planAmount || "N/A"}</td>
              <td>{item.discount || "N/A"}</td>
              <td>{item.netAmount || "N/A"}</td>
              <td>{item.billCreatedBy}</td>
              <td>{item.billCreatedOffice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default BaPaidBill;
