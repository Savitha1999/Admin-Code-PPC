



import React, { useState, useEffect } from "react";
import axios from "axios";

const NotificationsTable = () => {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const itemsPerPage = 50;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-all-notifications`);
        setNotifications(response.data.notifications);
        setFilteredNotifications(response.data.notifications); // initial filtered
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch notifications");
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this notification?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/delete-notification/${id}`);
      const updated = notifications.filter(notification => notification._id !== id);
      setNotifications(updated);
      setFilteredNotifications(updated);
    } catch (err) {
      alert("Failed to delete notification.");
    }
  };

  const handleFilter = () => {
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const filtered = notifications.filter(notification => {
      const createdAt = new Date(notification.createdAt);
      return (!start || createdAt >= start) && (!end || createdAt <= end);
    });

    setFilteredNotifications(filtered);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setFilteredNotifications(notifications);
    setCurrentPage(1);
  };
  

  if (loading) return <div>Loading notifications...</div>;
  if (error) return <div>{error}</div>;

  const totalItems = filteredNotifications.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNotifications = filteredNotifications.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h2>Notifications</h2>

      {/* Filter Form */}
      <div className="row mb-3">
        <div className="col-md-3">
          <label>Start Date</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label>End Date</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="col-md-3 d-flex align-items-end">
          <button className="btn btn-primary me-2" onClick={handleFilter}>
            Filter
          </button>
          <button className="btn btn-secondary" onClick={handleReset}>
            Reset
          </button>
        </div>
        </div>

      {/* Notifications Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Message</th>
            <th>Type</th>
            <th>Recipient Phone</th>
            <th>Sender Phone</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentNotifications.length > 0 ? (
            currentNotifications.map((notification, index) => (
              <tr key={notification._id}>
                <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                <td>{notification.message}</td>
                <td>{notification.type}</td>
                <td>{notification.recipientPhoneNumber}</td>
                <td>{notification.senderPhoneNumber}</td>
                <td>{notification.isRead ? "Read" : "Unread"}</td>
                <td>{new Date(notification.createdAt).toLocaleString()}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(notification._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No notifications found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination mt-3">
        <button
          className="btn btn-primary me-1"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`btn btn-secondary me-1 ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="btn btn-primary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NotificationsTable;
