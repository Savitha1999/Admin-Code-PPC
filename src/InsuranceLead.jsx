// import React from 'react'

// export default function InsuranceLead() {
//   return (
//     <div>InsuranceLead</div>
//   )
// }


import React from "react";

const InsuranceLoanLeadTable = () => {
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Insurance Lead</h2>
        <button style={{background:"#5F9EA0", color:"#fff", border:'none'}}>Resolved Insurance - Loan Lead</button>
      </div>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>CAR ID</th>
            <th>Posted From</th>
            <th>MOBILE NUMBER</th>
            <th>CAR TITLE</th>
            <th>AD SUBMIT DATE</th>
            <th>INSURANCE TYPE</th>
            <th>INSURANCE SALE LEAD</th>
            <th>INSURANCE EXPIRY DATE</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>12345</td>
            <td>Chennai</td>
            <td>+91-9876543210</td>
            <td>Toyota Corolla</td>
            <td>2024-12-20</td>
            <td>Comprehensive</td>
            <td>Yes</td>
            <td>2025-12-20</td>
            <td>
              <button className="btn btn-sm btn-success">View</button>{" "}
              <button className="btn btn-sm btn-danger">Delete</button>
            </td>
          </tr>
          <tr>
            <td>67890</td>
            <td>Pondicherry</td>
            <td>+91-8765432109</td>
            <td>Honda Civic</td>
            <td>2024-12-22</td>
            <td>Third-Party</td>
            <td>No</td>
            <td>2025-06-15</td>
            <td>
              <button className="btn btn-sm btn-success">View</button>{" "}
              <button className="btn btn-sm btn-danger">Delete</button>
            </td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default InsuranceLoanLeadTable;
