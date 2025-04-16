// import React from 'react'

// export default function CarFollowUps() {
//   return (
//     <div>CarFollowUps</div>
//   )
// }



import React, { useState } from 'react';

export default function CarFollowUps() {
  // Sample data (replace with your actual data)
  const data = [
    {
      id: 1,
      pucId: 8295,
      createdBy: "GANESH",
      office: "AUROBINDO",
      postedFrom: "TUC",
      status: "Incomplete",
      carMake: "Honda",
      price: 700000,
      mobileNumber: "9677772444",
      followupCreatedBy: "GANESH",
      followupStatus: "Not Decided",
      followupType: "Enquiry Followup",
      followupDate: "2024-12-26",
      actions: ["Create"],
      more: [ "View", "Edit", "Delete"],

    },
    {
      id: 2,
      pucId: 2932,
      createdBy: "diviauro",
      office: "AUROBINDO",
      postedFrom: "TUC",
      status: "Incomplete",
      carMake: "",
      price: 0,
      mobileNumber: "9962369443",
      followupCreatedBy: "diviauro",
      followupStatus: "Not Decided",
      followupType: "Data Followup",
      followupDate: "2022-04-15",
      actions: ["Create"],
      more: [ "View", "Edit", "Delete"],

    },
    {
      id: 3,
      pucId: 2660,
      createdBy: "diviauro",
      office: "AUROBINDO",
      postedFrom: "PUC",
      status: "Deleted",
      carMake: "Maruthi Suzuki",
      price: 50000,
      mobileNumber: "9791454048",
      followupCreatedBy: "diviauro",
      followupStatus: "Not Decided",
      followupType: "Payment Followup",
      followupDate: "2022-03-31",
      actions: ["Create"],
      more: [ "View", "Edit", "Delete"],

    },
    {
      id: 4,
      pucId: 2661,
      createdBy: "diviauro",
      office: "AUROBINDO",
      postedFrom: "TUC",
      status: "Incomplete",
      carMake: "Renault",
      price: 1075000,
      mobileNumber: "9842277767",
      followupCreatedBy: "diviauro",
      followupStatus: "Ready To Pay",
      followupType: "Payment Followup",
      followupDate: "2022-03-31",
      actions: ["Create"],
      more: [ "View", "Edit", "Delete"],

    },
    {
      id: 5,
      pucId: 2635,
      createdBy: "diviauro",
      office: "AUROBINDO",
      postedFrom: "TUC",
      status: "Active",
      carMake: "Renault",
      price: 525000,
      mobileNumber: "6263168398",
      followupCreatedBy: "diviauro",
      followupStatus: "Ready To Pay",
      followupType: "Payment Followup",
      followupDate: "2022-03-28",
      actions: ["Create"],
      more: [ "View", "Edit", "Delete"],

    },
    {
      id: 6,
      pucId: 1656,
      createdBy: "diviauro",
      office: "AUROBINDO",
      postedFrom: "PUC",
      status: "Deleted",
      carMake: "",
      price: 0,
      mobileNumber: "9787676555",
      followupCreatedBy: "diviauro",
      followupStatus: "Not Decided",
      followupType: "Data Followup",
      followupDate: "2022-02-21",
      actions: ["Create"],
      more: [ "View", "Edit", "Delete"],

    },
  ];
  

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate indexes for current page
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData = data.slice(firstIndex, lastIndex);

  // Total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

    const [dropdown1, setDropdown1] = useState("");
    const [dropdown2, setDropdown2] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      alert(`Selected values: Dropdown 1 - ${dropdown1}, Dropdown 2 - ${dropdown2}`);
    };  return (
    <>
  <div className="container mt-5">
      <h2 className="mb-4">React Dropdown Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="dropdown1" className="form-label">
            Office
          </label>
          <select
            id="dropdown1"
            className="form-select"
            value={dropdown1}
            onChange={(e) => setDropdown1(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="Option 1A">Option 1A</option>
            <option value="Option 1B">Option 1B</option>
            <option value="Option 1C">Option 1C</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="dropdown2" className="form-label">
            Staff
          </label>
          <select
            id="dropdown2"
            className="form-select"
            value={dropdown2}
            onChange={(e) => setDropdown2(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="Option 2A">Option 2A</option>
            <option value="Option 2B">Option 2B</option>
            <option value="Option 2C">Option 2C</option>
          </select>
        </div>

        <button type="submit" className='btn' style={{background:"#E91E63", color:"#fff", border:'none'}}>
          Submit
        </button>
      </form>
    </div>
    <div className="d-flex justify-content-end align-items-center mb-3">
        <button className='btn' style={{background:"#5F9EA0", color:"#fff", border:'none'}}>Resolved Insurance - Loan Lead</button>
      </div>    <div className="container mt-4">
      <h2 className="text-center">Car Followup Report</h2>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-dark">
  <tr>
    <th>Sl No.</th>
    <th>PUC ID</th>
    <th>Created By</th>
    <th>Office</th>
    <th>Posted From</th>
    <th>Status</th>
    <th>Car Make</th>
    <th>Price</th>
    <th>Mobile Number</th>
    <th>Follow-up Created By</th>
    <th>Follow-up Status</th>
    <th>Follow-up Type</th>
    <th>Follow-up Date</th>
    <th>Actions</th>
    <th>more</th>

  </tr>
</thead>
<tbody>
  {currentData.map((item) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.pucId}</td>
      <td>{item.createdBy}</td>
      <td>{item.office}</td>
      <td>{item.postedFrom}</td>
      <td>{item.status}</td>
      <td>{item.carMake || '-'}</td>
      <td>{item.price}</td>
      <td>{item.mobileNumber}</td>
      <td>{item.followupCreatedBy}</td>
      <td>{item.followupStatus}</td>
      <td>{item.followupType}</td>
      <td>{item.followupDate}</td>
      <td>
        {item.actions.map((action, index) => (
          <button key={index} className="btn btn-sm btn-primary mx-1">
            {action}
          </button>
        ))}
      </td>
      <td>
        {item.more.map((more, index) => (
          <button key={index} className="btn btn-sm btn-primary mx-1">
            {more}
          </button>
        ))}
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>

      {/* Pagination controls */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              className={`page-item ${
                currentPage === index + 1 ? 'active' : ''
              }`}
              key={index}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? 'disabled' : ''
            }`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
    </>
  );
}
