


import React, { useState } from 'react';

export default function PaginationTable() {
  // Sample data (replace with your actual data)
  const data = [
    {
      id: 1,
      buyerId: 77,
      postedFrom: "PUC",
      mobileNumber: "9626491662",
      priceMin: "1 Lakh",
      priceMax: "2 Lakhs",
      carMake: "Maruthi Suzuki",
      carModel: "Alto",
      buyingMode: "CASH",
      office: "AUROBINDO",
      staffName: "diviauro",
      status: "Not Decided",
      followUpdate: "18/01/2022",
      actions: ["Create"],
    },
    {
      id: 2,
      buyerId: 78,
      postedFrom: "PUC",
      mobileNumber: "6591389224",
      priceMin: "2 Lakhs",
      priceMax: "3 Lakhs",
      carMake: "Maruthi Suzuki",
      carModel: "Alto",
      buyingMode: "CASH",
      office: "AUROBINDO",
      staffName: "diviauro",
      status: "Not Decided",
      followUpdate: "15/01/2022",
      actions: ["Create"],
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

        <button className="btn" type="submit" style={{background:"#E91E63", color:"#fff", border:'none'}}>
          Submit
        </button>
      </form>
    </div>
    <div>
  <h1>Followups Details (Today and Past Days)</h1> 
   <h4>Export All to excel</h4>
<p>Print All to print </p>
     </div>    <div className="container mt-4">
      <h2 className="text-center">Car Followup Report</h2>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-dark">
  <tr>
    <th>Sl</th>
    <th>Buyer ID</th>
    <th>Posted From</th>
    <th>Mobile Number</th>
    <th>Price Min</th>
    <th>Price Max</th>
    <th>Car Make</th>
    <th>Car Model</th>
    <th>Buying Mode</th>
    <th>Office</th>
    <th>Staff Name</th>
    <th>Status</th>
    <th>Follow Update</th>
    <th>Action</th>
  </tr>
</thead>

<tbody>
  {currentData.map((item) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.buyerId}</td>
      <td>{item.postedFrom}</td>
      <td>{item.mobileNumber}</td>
      <td>{item.priceMin}</td>
      <td>{item.priceMax}</td>
      <td>{item.carMake}</td>
      <td>{item.carModel}</td>
      <td>{item.buyingMode}</td>
      <td>{item.office}</td>
      <td>{item.staffName}</td>
      <td>{item.status}</td>
      <td>{item.followUpdate}</td>
      <td>
        {item.actions.map((action, index) => (
          <button key={index} className="btn btn-sm btn-primary mx-1">
            {action}
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
