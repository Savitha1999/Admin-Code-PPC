// import React from 'react'

// export default function PaidBills() {
//   return (
//     <div>PaidBills</div>
//   )
// }




import React, { useState } from "react";
import { Table, Pagination, Button, Modal } from "react-bootstrap";

const PaidBills = () => {

    const [fromDate, setFromDate] = useState("");
        const [endDate, setEndDate] = useState("");
        const [search, setSearch] = useState("");
      
        const handleSubmit = (e) => {
          e.preventDefault();
          alert(`Search: ${search}, From Date: ${fromDate}, End Date: ${endDate}`);
        };
  const initialData = [
    {
      pucId: 8188,
      postedFrom: "PUC",
      transactionId: "PUC - 51",
      paymentDate: "2024-11-28 17:27:58",
      paymentType: "Cash",
      plan: "SILVER",
      planAmount: 299,
      discount: 299,
      netAmount: 0,
      billCreatedBy: "GANESH",
      billCreatedOffice: "AUROBINDO",
      bill:["edit Bill", "Delete Car"]
    },
    {
      pucId: 4737,
      postedFrom: "TUC",
      transactionId: "PUC - 41",
      paymentDate: "2022-10-28 16:37:13",
      paymentType: "Google pay",
      plan: "SILVER",
      planAmount: 299,
      discount: 0,
      netAmount: 299,
      billCreatedBy: "sathish",
      billCreatedOffice: "AUROBINDO",
      bill:["edit Bill", "Delete Car"]

    },
    {
      pucId: 4607,
      postedFrom: "TUC",
      transactionId: "826844de55f95ed602c3",
      paymentDate: "2022-10-20 04:20:30",
      paymentType: "online",
      plan: "SILVER",
      planAmount: 299,
      discount: 0,
      netAmount: 299,
      billCreatedBy: "Owner",
      billCreatedOffice: "Owner",
      bill:["edit Bill", "Delete Car"]

    },
  ];

  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteClick = (car) => {
    setSelectedCar(car);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setData(data.filter((item) => item.pucId !== selectedCar.pucId));
    setShowDeleteModal(false);
    setSelectedCar(null);
  };

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
        <button type="submit" className="btn" style={{background:"#E91E63", color:"#fff", border:'none'}}>
          Submit
        </button>
      </form>
    </div>
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Puc Id</th>
            <th>Posted From</th>
            <th>Transaction Id/Bill Number</th>
            <th>Payment Date</th>
            <th>Payment Type</th>
            <th>Plan</th>
            <th>Plan Amount</th>
            <th>Discount</th>
            <th>Net Amount</th>
            <th>Bill Created By</th>
            <th>Bill Created Office</th>
            <th>Bill</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.pucId}>
              <td>{item.pucId}</td>
              <td>{item.postedFrom}</td>
              <td>{item.transactionId}</td>
              <td>{item.paymentDate}</td>
              <td>{item.paymentType}</td>
              <td>{item.plan}</td>
              <td>{item.planAmount}</td>
              <td>{item.discount}</td>
              <td>{item.netAmount}</td>
              <td>{item.billCreatedBy}</td>
              <td>{item.billCreatedOffice}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2">
                  Edit Bill
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteClick(item)}
                >
                  Delete Car
                </Button>
              </td>
            </tr>
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

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the car with PUC ID "
          {selectedCar && selectedCar.pucId}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
};

export default PaidBills;
