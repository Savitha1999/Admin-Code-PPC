

import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Table, Pagination, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const ApprovedCar = () => {
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
       viewedFile: "Approved Property",
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
      id: 8286,
      makeFeatured: "Set Featured",
      makePUCCar: "Set PUC CAR",
      postedFrom: "PUC",
      carMake: "Honda",
      carModel: "City",
      carPrice: 1045000,
      carKm: 51000,
      fuelType: "Petrol",
      regState: "TN",
      noOfAds: 49,
      mobileNumber: "9600902096",
      salesType: "Normal",
      submitBy: "GANESH",
      pendingApprovedBy: "",
      approvedBy: "GANESH",
      approvedDate: "2024-12-24 17:09:41",
      planName: "FREE",
      bill: "Create Bill",
    },
    {
      id: 8281,
      makeFeatured: "Set Featured",
      makePUCCar: "Set PUC CAR",
      postedFrom: "PUC",
      carMake: "Maruthi Suzuki",
      carModel: "DZire",
      carPrice: 750000,
      carKm: 24000,
      fuelType: "Petrol",
      regState: "PY",
      noOfAds: 70,
      mobileNumber: "8778268681",
      salesType: "Normal",
      submitBy: "GANESH",
      pendingApprovedBy: "",
      approvedBy: "GANESH",
      approvedDate: "2024-12-24 16:50:18",
      planName: "FREE",
      bill: "Create Bill",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
    <div className="d-flex justify-content-between align-items-center mb-3">
    <h4>Manage Approved Car

    </h4>  <button className="btn"style={{background:"#2EA44F", color:"#fff", border:'none'}}>EXPORT WITH OTP VERIFICATION</button>
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
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>PUC ID</th>
            <th>Make Featured</th>
            <th>Make PUC CAR</th>
            <th>Posted From</th>
            <th>Car Make</th>
            <th>Car Model</th>
            <th>Car Price</th>
            <th>Car Km</th>
            <th>Fuel Type</th>
            <th>Reg State</th>
            <th>No of Ads</th>
            <th>Mobile NUMBER</th>
            <th>Sales TYPE</th>
            <th>Submit BY</th>
            <th>Pending Approved By</th>
            <th>Approved By</th>
            <th>Approved Date</th>
            <th>PLAN NAME</th>
            <th>Bill</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td><Button variant="link">{item.makeFeatured}</Button></td>
              <td><Button variant="link">{item.makePUCCar}</Button></td>
              <td>{item.postedFrom}</td>
              <td>{item.carMake}</td>
              <td>{item.carModel}</td>
              <td>{item.carPrice}</td>
              <td>{item.carKm}</td>
              <td>{item.fuelType}</td>
              <td>{item.regState}</td>
              <td>{item.noOfAds}</td>
              <td>{item.mobileNumber}</td>
              <td>{item.salesType}</td>
              <td>{item.submitBy}</td>
              <td>{item.pendingApprovedBy || "N/A"}</td>
              <td>{item.approvedBy}</td>
              <td>{item.approvedDate}</td>
              <td>{item.planName}</td>
              <td><Button variant="link">{item.bill}</Button></td>
              <td>
                <Button variant="primary" size="sm">View</Button>{" "}
                <Button variant="secondary" size="sm">Edit</Button>{" "}
                <Button variant="danger" size="sm">Delete</Button>
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
    </div>
    </>
  );
};

export default ApprovedCar;
