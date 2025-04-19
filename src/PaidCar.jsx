
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PaidCar = () => {
      const [fromDate, setFromDate] = useState("");
        const [endDate, setEndDate] = useState("");
        const [search, setSearch] = useState("");
      
        const handleSubmit = (e) => {
          e.preventDefault();
          alert(`Search: ${search}, From Date: ${fromDate}, End Date: ${endDate}`);
        };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const data = [
    { slNo: 1, pucId: 5068, postedFrom: 'PUC', submitDate: '2022-11-17 01:43:43', carMake: 'Renault', carModel: 'Lodgy', price: 675000, phoneNumber: '9894061868', salesType: 'Urgent', transactionId: '', activatedDate: '', plan: '', amount: '', discount: '', billCreatedBy: 'Owner', billCreatedOffice: 'Owner', bill: false },
    { slNo: 2, pucId: 4737, postedFrom: 'TUC', submitDate: '2022-10-28', carMake: 'Renault', carModel: 'Triber', price: 545000, phoneNumber: '7871595039', salesType: 'Urgent', transactionId: 'PUC - 41', activatedDate: '2022-10-28 16:37:13', plan: 'SILVER', amount: 299, discount: 0, billCreatedBy: 'sathish', billCreatedOffice: 'AUROBINDO', bill: true },
    { slNo: 3, pucId: 4607, postedFrom: 'TUC', submitDate: '2022-10-20', carMake: 'Skoda', carModel: 'Octavia', price: 260000, phoneNumber: '9994887669', salesType: 'Urgent', transactionId: '826844de55f95ed602c3', activatedDate: '2022-10-20 04:20:30', plan: 'SILVER', amount: 299, discount: 0, billCreatedBy: 'Owner', billCreatedOffice: 'Owner', bill: true },
  ];

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
    <div className="d-flex justify-content-between align-items-center mb-3">
    <h4>Manage Paid Car

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
        <button type="submit" className="btn" style={{background:"#E91E63", color:"#fff", border:'none'}}>
          Submit
        </button>
      </form>
    </div>
    <div className="container mt-4">
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Sl No</th>
            <th>PUC ID</th>
            <th>Posted From</th>
            <th>Submit Date</th>
            <th>Car Make</th>
            <th>Car Model</th>
            <th>Price</th>
            <th>Mobile Number</th>
            <th>Sales Type</th>
            <th>Transaction ID/Bill Number</th>
            <th>Activated Date</th>
            <th>Plan</th>
            <th>Amount</th>
            <th>Discount</th>
            <th>Bill Created By</th>
            <th>Bill Created Office</th>
            <th>Bill</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item.slNo}</td>
              <td>{item.pucId}</td>
              <td>{item.postedFrom}</td>
              <td>{item.submitDate}</td>
              <td>{item.carMake}</td>
              <td>{item.carModel}</td>
              <td>{item.price}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.salesType}</td>
              <td>{item.transactionId}</td>
              <td>{item.activatedDate}</td>
              <td>{item.plan}</td>
              <td>{item.amount}</td>
              <td>{item.discount}</td>
              <td>{item.billCreatedBy}</td>
              <td>{item.billCreatedOffice}</td>
              <td>{item.bill ? 'Yes' : 'No'}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2">Edit Bill</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <li
              key={pageNumber}
              className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}
            >
              <button className="page-link" onClick={() => handlePageChange(pageNumber)}>
                {pageNumber}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
    </>
  );
};

export default PaidCar;
