



import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AssistPayU = () => {
      const [fromDate, setFromDate] = useState("");
      const [endDate, setEndDate] = useState("");
      const [search, setSearch] = useState("");

      
  const adminName = useSelector((state) => state.admin.name);
  

  // ✅ Record view on mount
useEffect(() => {
 const recordDashboardView = async () => {
   try {
     await axios.post(`${process.env.REACT_APP_API_URL}/record-view`, {
       userName: adminName,
       viewedFile: "Assistant PayU",
       viewTime: moment().format("YYYY-MM-DD HH:mm:ss"), // optional, backend already handles it


     });
     console.log("Dashboard view recorded");
   } catch (err) {
     console.error("Failed to record dashboard view:", err);
   }
 };

 if (adminName) {
   recordDashboardView();
 }
}, [adminName]);

      const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Search: ${search}, From Date: ${fromDate}, End Date: ${endDate}`);
      };
      const data = [
        {
          assistId: 646,
          postedFrom: "PUC",
          mobileNumber: "8072288752",
          planName: "BASIC",
          date: "2022-01-25 09:49:25",
          transactionId: "9cc52657039b201c6a91",
          amount: 1,
          status: "Paid",
        },
        {
          assistId: 645,
          postedFrom: "PUC",
          mobileNumber: "8072288752",
          planName: "BASIC",
          date: "2022-01-25 09:43:30",
          transactionId: "94e3052b96c54820b383",
          amount: 1,
          status: "Paid",
        },
      ];
  return (
    <> 
     
    <div className="d-flex justify-content-between align-items-center mb-3">
    <h4>Manage Assist Pay u Money
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
            <th>Assist ID</th>
            <th>Posted From</th>
            <th>Mobile Number</th>
            <th>Plan Name</th>
            <th>Date</th>
            <th>Transaction Id</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.assistId}>
              <td>{item.assistId}</td>
              <td>{item.postedFrom}</td>
              <td>{item.mobileNumber}</td>
              <td>{item.planName}</td>
              <td>{item.date}</td>
              <td>{item.transactionId}</td>
              <td>{item.amount}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default AssistPayU;
