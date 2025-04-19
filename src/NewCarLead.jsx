
import React from "react";

const NewCarLeadTable = () => {
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>New Car Lead</h2>
        <button style={{background:"#5F9EA0", color:"#fff", border:'none'}}>Resolved New Car Lead</button>
      </div>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>CAR ID</th>
            <th>Posted From</th>
            <th>MOBILE NUMBER</th>
            <th>CAR TITLE</th>
            <th>SALE LEAD</th>
            <th>AD SUBMIT DATE</th>
            <th>SUBMIT BY</th>
            <th>PLAN NAME</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>12345</td>
            <td>Chennai</td>
            <td>+91-9876543210</td>
            <td>Toyota Corolla</td>
            <td>Yes</td>
            <td>2024-12-20</td>
            <td>John Doe</td>
            <td>Premium</td>
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
            <td>No</td>
            <td>2024-12-22</td>
            <td>Jane Smith</td>
            <td>Basic</td>
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

export default NewCarLeadTable;
