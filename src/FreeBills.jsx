
import React, { useState } from "react";
import { Table, Pagination, Button, Modal } from "react-bootstrap";

const FreeBills = () => {
      const [fromDate, setFromDate] = useState("");
        const [endDate, setEndDate] = useState("");
        const [search, setSearch] = useState("");
      
        const handleSubmit = (e) => {
          e.preventDefault();
          alert(`Search: ${search}, From Date: ${fromDate}, End Date: ${endDate}`);
        };
  const initialData = [
    {
      pucId: 8286,
      postedFrom: "PUC",
      carTitle: "Honda City",
      freeBillNumber: "PUC - 52",
      paymentDate: "2024-12-24 17:09:41",
      paymentMode: "Free",
      planName: "FREE",
      billCreatedBy: "GANESH",
      billCreatedOffice: "AUROBINDO",
    },
    {
      pucId: 8281,
      postedFrom: "PUC",
      carTitle: "Maruthi Suzuki DZire",
      freeBillNumber: "PUC - 52",
      paymentDate: "2024-12-24 16:50:18",
      paymentMode: "Free",
      planName: "FREE",
      billCreatedBy: "GANESH",
      billCreatedOffice: "AUROBINDO",
    },
    {
      pucId: 8282,
      postedFrom: "PUC",
      carTitle: "Mahindra Thar",
      freeBillNumber: "PUC - 52",
      paymentDate: "2024-12-24 16:49:32",
      paymentMode: "Free",
      planName: "FREE",
      billCreatedBy: "GANESH",
      billCreatedOffice: "AUROBINDO",
    },
    {
      pucId: 8283,
      postedFrom: "PUC",
      carTitle: "Maruthi Suzuki Ciaz",
      freeBillNumber: "PUC - 52",
      paymentDate: "2024-12-24 16:49:07",
      paymentMode: "Free",
      planName: "FREE",
      billCreatedBy: "GANESH",
      billCreatedOffice: "AUROBINDO",
    },
  ];

  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const itemsPerPage = 5;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteClick = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  const handleDeleteConfirm = () => {
    setData(data.filter((item) => item.pucId !== selectedCar.pucId));
    setShowModal(false);
    setSelectedCar(null);
  };

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
        <button type="submit" className="btn" style={{background:"#E91E63", color:"#fff", border:'none'}}>
          Submit
        </button>
      </form>
    </div>
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>PUC ID</th>
            <th>Posted From</th>
            <th>Car Title</th>
            <th>Free Bill Number</th>
            <th>Payment Date</th>
            <th>Payment Mode</th>
            <th>Plan Name</th>
            <th>Bill Created By</th>
            <th>Bill Created Office</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.pucId}>
              <td>{item.pucId}</td>
              <td>{item.postedFrom}</td>
              <td>{item.carTitle}</td>
              <td>{item.freeBillNumber}</td>
              <td>{item.paymentDate}</td>
              <td>{item.paymentMode}</td>
              <td>{item.planName}</td>
              <td>{item.billCreatedBy}</td>
              <td>{item.billCreatedOffice}</td>
              <td>
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the car "
          {selectedCar && selectedCar.carTitle}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
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

export default FreeBills;
