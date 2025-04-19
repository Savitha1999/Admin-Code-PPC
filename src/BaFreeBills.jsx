// import React from 'react'

// export default function BaFreeBills() {
//   return (
//     <div>BaFreeBills</div>
//   )
// }


import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BaFreeBills = () => {
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
       viewedFile: "BaFree  Bills",
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
          baId: 6086,
          postedFrom: "TUC",
          mobileNumber: "9003308330",
          billNumber: "",
          billDate: "2025-01-08 12:04:54",
          paymentMode: "",
          billCreatedBy: "",
          billCreatedOffice: "",
        },
        {
          baId: 6082,
          postedFrom: "TUC",
          mobileNumber: "9944029902",
          billNumber: "",
          billDate: "2025-01-07 22:25:27",
          paymentMode: "",
          billCreatedBy: "",
          billCreatedOffice: "",
        },
      ];
    
    
  return (
    <> 
     
    <div className="d-flex justify-content-between align-items-center mb-3">
    <h4>Manage Free Bills
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
            <th>Mobile Number</th>
            <th>Bill Number</th>
            <th>Bill Date</th>
            <th>Payment Mode</th>
            <th>Bill Created By</th>
            <th>Bill Created Office</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.baId}>
              <td>{item.baId}</td>
              <td>{item.postedFrom}</td>
              <td>{item.mobileNumber}</td>
              <td>{item.billNumber || "N/A"}</td>
              <td>{item.billDate}</td>
              <td>{item.paymentMode || "N/A"}</td>
              <td>{item.billCreatedBy || "N/A"}</td>
              <td>{item.billCreatedOffice || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default BaFreeBills;
