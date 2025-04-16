import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Form, Button } from 'react-bootstrap';

const DeletedPropertiesTable = () => {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [ppcIdSearch, setPpcIdSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

   const [search, setSearch] = useState("");
      const [fromDate, setFromDate] = useState("");

  // Fetch all deleted properties
  useEffect(() => {
    const fetchDeletedProperties = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/properties/pending`);
        setProperties(res.data.data);
        setFiltered(res.data.data);
      } catch (err) {
        console.error('Error fetching deleted properties', err);
      }
    };
    fetchDeletedProperties();
  }, []);

  // Handle filtering
  const handleSearch = () => {
    let result = properties;

    if (ppcIdSearch.trim()) {
      result = result.filter((prop) =>
        prop.ppcId.toLowerCase().includes(ppcIdSearch.toLowerCase())
      );
    }

    if (startDate) {
      const start = new Date(startDate);
      result = result.filter((prop) => new Date(prop.createdAt) >= start);
    }

    if (endDate) {
      const end = new Date(endDate);
      result = result.filter((prop) => new Date(prop.createdAt) <= end);
    }

    setFiltered(result);
  };

  return (
    <div className="p-3">
      <h4>Removed Properties</h4>
     
<form 
    onSubmit={(e) => e.preventDefault()} 
    style={{
        width: "80%",
        margin: "0 auto", // Centers the form horizontally
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        marginBottom:"20px"
    }}
>
    <div className="mb-3">
        <label htmlFor="searchInput" className="form-label fw-bold">Search PPC ID</label>
        <input
            type="text"
            id="searchInput"
            className="form-control"
            placeholder="Enter PPC ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
        />
    </div>

    <div className="mb-3">
        <label htmlFor="fromDate" className="form-label fw-bold">From Date</label>
        <input
            type="date"
            id="fromDate"
            className="form-control"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
        />
    </div>

    <div className="mb-3">
        <label htmlFor="endDate" className="form-label fw-bold">End Date</label>
        <input
            type="date"
            id="endDate"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
        />
    </div>
    <div className="col-md-3 d-flex align-items-end">
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </div>
</form>


        <Table striped bordered hover responsive>
          <thead className="table-dark sticky-top">
            <tr>
              <th>S.No</th>
              <th>PPC ID</th>
              <th>Owner Name</th>
              <th>Phone</th>
              <th>City</th>
              <th>Area</th>
              <th>Status</th>
              <th>Property Type</th>
              <th>Property Mode</th>
              <th>Price</th>
              <th>Total Area</th>
              <th>Bedrooms</th>
              <th>Kitchen</th>
              <th>Furnished</th>
              <th>Car Parking</th>
              <th>Floor No</th>
              <th>Facing</th>
              <th>Ownership</th>
              <th>Property Age</th>
              <th>Sales Type</th>
              <th>Lift</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="22" className="text-center">No properties found.</td>
              </tr>
            ) : (
              filtered.map((prop, idx) => (
                <tr key={prop._id}>
                  <td>{idx + 1}</td>
                  <td>{prop.ppcId}</td>
                  <td>{prop.ownerName}</td>
                  <td>{prop.phoneNumber}</td>
                  <td>{prop.city}</td>
                  <td>{prop.area}</td>
                  <td>{prop.status}</td>
                  <td>{prop.propertyType}</td>
                  <td>{prop.propertyMode}</td>
                  <td>{prop.price}</td>
                  <td>{prop.totalArea}</td>
                  <td>{prop.bedrooms}</td>
                  <td>{prop.kitchen}</td>
                  <td>{prop.furnished}</td>
                  <td>{prop.carParking}</td>
                  <td>{prop.floorNo}</td>
                  <td>{prop.facing}</td>
                  <td>{prop.ownership}</td>
                  <td>{prop.propertyAge}</td>
                  <td>{prop.salesType}</td>
                  <td>{prop.lift}</td>
                  <td>{new Date(prop.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
    </div>
  );
};

export default DeletedPropertiesTable;
