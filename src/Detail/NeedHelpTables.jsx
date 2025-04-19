







import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDeleteForever } from 'react-icons/md';
import moment from 'moment';
import { useSelector } from 'react-redux';

const HelpRequestTables = () => {
  const [helpRequests, setHelpRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [helpRequestsData, setHelpRequestsData] = useState([]);
  const [propertiesData, setPropertiesData] = useState([]);

  const adminName = useSelector((state) => state.admin.name);

  
    // Delete help request by PPC ID
    const handleDelete = async (ppcId) => {
        const confirmDelete = window.confirm("Are you sure you want to remove this help request?");
        
        if (!confirmDelete) {
            alert("Deletion canceled.");
            return;
        }

        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/delete-help/${ppcId}`);
            if (response.data.message === 'Help request removed successfully.') {
                setHelpRequestsData(prevData => prevData.filter(data => data.ppcId !== ppcId));
                setPropertiesData(prevData => prevData.filter(property => property.ppcId !== ppcId));
                alert('Help request removed successfully');
            } else {
                alert('Failed to remove help request');
            }
        } catch (error) {
            alert('Error removing help request');
        }
    };

  useEffect(() => {
    const recordView = async () => {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/record-view`, {
          userName: adminName,
          viewedFile: "Help Request Table",
          viewTime: moment().format("YYYY-MM-DD HH:mm:ss"),
        });
      } catch (err) {
        console.error("View record failed:", err);
      }
    };

    if (adminName) recordView();
  }, [adminName]);

  useEffect(() => {
    const fetchHelpRequests = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/get-help-requests`);
        setHelpRequests(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch help requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHelpRequests();
  }, []);

  const filterData = () => {
    return helpRequests.filter(item => {
      const createdAt = new Date(item.requestedAt).getTime();
      const from = fromDate ? new Date(fromDate).getTime() : null;
      const to = endDate ? new Date(endDate).getTime() : null;

      const matchSearch = search
        ? String(item.ppcId).toLowerCase().includes(search.toLowerCase())
        : true;
      const matchFrom = from ? createdAt >= from : true;
      const matchTo = to ? createdAt <= to : true;

      return matchSearch && matchFrom && matchTo;
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Help Requests</h2>

      {/* Filters */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mb-4 p-4"
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          background: "#fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <div className="mb-3">
          <label className="form-label fw-bold">Search PPC ID</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter PPC ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">From Date</label>
          <input
            type="date"
            className="form-control"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">End Date</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </form>

      {loading ? (
        <p>Loading help requests...</p>
      ) : filterData().length > 0 ? (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>PPC ID</th>
              <th>Owner Phone</th>
              <th>Property Mode</th>
              <th>Property Type</th>
              <th>Price</th>
              <th>Area</th>
              <th>City</th>
              <th>State</th>
              <th>Requested By</th>
              <th>Help Reason</th>
              <th>Comment</th>
              <th>Requested At</th>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {filterData().map((item, index) => (
              <tr key={`${item.ppcId}-${index}`}>
                <td>{index + 1}</td>
                <td>{item.ppcId}</td>
                <td>{item.ownerPhoneNumber}</td>
                <td>{item.propertyMode}</td>
                <td>{item.propertyType}</td>
                <td>{item.price}</td>
                <td>{item.area}</td>
                <td>{item.city}</td>
                <td>{item.state}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.selectHelpReason}</td>
                <td>{item.comment || "—"}</td>
                <td>{moment(item.requestedAt).format("DD-MM-YYYY hh:mm A")}</td>
                <td>
                                            <button className="btn btn-danger" onClick={() => handleDelete(item.ppcId)}>
                                                <MdDeleteForever size={24} />
                                            </button>
                                        </td>
              
              </tr>


            ))}
          </tbody>
        </table>
      ) : (
        <p>No help requests found.</p>
      )}
    </div>
  );
};

export default HelpRequestTables;
