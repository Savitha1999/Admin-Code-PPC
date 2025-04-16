// import React from 'react'

// export default function Subscriber() {
//   return (
//     <div>Subscriber</div>
//   )
// }




import React, { useState } from "react";
import { Table, Pagination, Button, Collapse } from "react-bootstrap";

const SubscriptionsTable = () => {
  const data = [
    {
      subscribeId: 205,
      mobile: "+0-9600902096",
      postedFrom: "PUC",
      planName: "SILVER",
      planAmount: 0,
      validity: 30,
      noOfCar: 1,
      usedAds: 1,
      pendingAds: 0,
      usedFeaturedAds: 0,
      pendingFeaturedAds: 0,
      featuredMaxCar: 0,
      featuredValidity: 0,
      createdDate: "2024-11-28 17:27:58",
      expiryDate: "2024-12-28 17:27:58",
      transactionId: "PUC - 51",
      paymentMode: "Cash",
      paymentType: "Offline",
    },
    {
      subscribeId: 204,
      mobile: "+91-9626211339",
      postedFrom: "PUC",
      planName: "SILVER",
      planAmount: 289,
      validity: 30,
      noOfCar: 1,
      usedAds: 1,
      pendingAds: 0,
      usedFeaturedAds: 0,
      pendingFeaturedAds: 0,
      featuredMaxCar: 0,
      featuredValidity: 0,
      createdDate: "2024-10-04 18:59:36",
      expiryDate: "2024-11-03 18:59:36",
      transactionId: "PUC - 50",
      paymentMode: "App Payu Gateway",
      paymentType: "Offline",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null); // To track expanded rows
  const itemsPerPage = 5;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const toggleRow = (rowId) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
  };
const [search, setSearch] = useState("");
    
      const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Search: ${search},`);
      };
  return (
    <>
    <div className="d-flex justify-content-between align-items-center mb-3">
    <h4>Manage Subscriber
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
        <button type="submit" className="btn" style={{background:"#E91E63", color:"#fff", border:'none'}}>
          Submit
        </button>
      </form>
    </div>
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Subscribe ID</th>
            <th>Mobile</th>
            <th>Posted From</th>
            <th>Plan Name</th>
            <th>Plan Amount</th>
            <th>Validity</th>
            <th>No Of Car</th>
            <th>Used Ads</th>
            <th>Pending Ads</th>
            <th>Used Featured Ads</th>
            <th>Pending Featured Ads</th>
            <th>Featured Max Car</th>
            <th>Featured Validity</th>
            <th>Created Date</th>
            <th>Expiry Date</th>
            <th>Transaction ID/Bill No</th>
            <th>Payment Mode</th>
            <th>Payment Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <React.Fragment key={item.subscribeId}>
              <tr>
                <td>{item.subscribeId}</td>
                <td>{item.mobile}</td>
                <td>{item.postedFrom}</td>
                <td>{item.planName}</td>
                <td>{item.planAmount}</td>
                <td>{item.validity}</td>
                <td>{item.noOfCar}</td>
                <td>{item.usedAds}</td>
                <td>{item.pendingAds}</td>
                <td>{item.usedFeaturedAds}</td>
                <td>{item.pendingFeaturedAds}</td>
                <td>{item.featuredMaxCar}</td>
                <td>{item.featuredValidity}</td>
                <td>{item.createdDate}</td>
                <td>{item.expiryDate}</td>
                <td>{item.transactionId}</td>
                <td>{item.paymentMode}</td>
                <td>{item.paymentType}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => toggleRow(item.subscribeId)}
                  >
                    {expandedRow === item.subscribeId ? "Collapse" : "Expand"}
                  </Button>
                </td>
              </tr>
              <tr>
                <td colSpan="19">
                  <Collapse in={expandedRow === item.subscribeId}>
                    <div>
                      <strong>Additional Details:</strong>
                      <ul>
                        <li>Plan Name: {item.planName}</li>
                        <li>Transaction ID: {item.transactionId}</li>
                        <li>Payment Mode: {item.paymentMode}</li>
                      </ul>
                    </div>
                  </Collapse>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>

      <Pagination>
        {[...Array(totalPages).keys()].map((page) => (
          <Pagination.Item
            key={page + 1}
            active={page + 1 === currentPage}
            onClick={() => handlePageChange(page + 1)}
          >
            {page + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
    </>
  );
};

export default SubscriptionsTable;
