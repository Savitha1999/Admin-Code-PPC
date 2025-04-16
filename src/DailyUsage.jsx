


import React, { useState } from "react";

const PaginationTable = () => {
  const [search, setSearch] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Search: ${search},`);
  };
  const [data, setData] = useState([
    {
      sNo: 1,
      mobileNumber: "9791958938",
      postedFrom: "TUC",
      lastLogin: "2025-01-08 12:52:58",
      noOfAds: 0,
      noOfAssistance: 0,
      totalContactsViewed: 0,
      noOfContactsViewedToday: 0,
      noOfDailyLimit: 15,
      noOfDailyLimitReached: 0,
      action: "Expand",

    },
    {
      sNo: 2,
      mobileNumber: "1918056623716",
      postedFrom: "TUC",
      lastLogin: "2025-01-08 11:32:13",
      noOfAds: 0,
      noOfAssistance: 0,
      totalContactsViewed: 0,
      noOfContactsViewedToday: 0,
      noOfDailyLimit: 15,
      noOfDailyLimitReached: 0,
      action: "Expand",

    },
  ]);

  const [editData, setEditData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newDailyLimit, setNewDailyLimit] = useState("");

  const handleEdit = (item) => {
    setEditData(item);
    setNewDailyLimit(item.noOfDailyLimit);
    setShowEditModal(true);
  };

  const handleSave = () => {
    setData(
      data.map((item) =>
        item.sNo === editData.sNo
          ? { ...item, noOfDailyLimit: newDailyLimit }
          : item
      )
    );
    setShowEditModal(false);
  };

  const handleDelete = (item) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setData(data.filter((row) => row.sNo !== item.sNo));
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
   <h4>Daily Usage</h4>    
   <button className='btn' style={{background:"#2EA44F", color:"#fff", border:'none'}}>EXPORT WITH OTP VERIFICATION</button>      </div>
       <form onSubmit={handleSubmit}>
        {/* Search Field */}
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

        {/* Submit Button */}
        <button className='btn' type="submit" style={{background:"#E91E63", color:"#fff", border:'none'}}>
          Submit
        </button>
      </form>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>S.No</th>
              <th>Mobile Number</th>
              <th>Posted From</th>
              <th>Last Login</th>
              <th>No Of Ads</th>
              <th>No Of Assistance</th>
              <th>Total Contacts Viewed</th>
              <th>No Of Contacts Viewed Today</th>
              <th>No Of Daily Limit</th>
              <th>No Of Daily Limit Reached</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.sNo}>
                <td>{item.sNo}</td>
                <td>{item.mobileNumber}</td>
                <td>{item.postedFrom}</td>
                <td>{item.lastLogin}</td>
                <td>{item.noOfAds}</td>
                <td>{item.noOfAssistance}</td>
                <td>{item.totalContactsViewed}</td>
                <td>{item.noOfContactsViewedToday}</td>
                <td>{item.noOfDailyLimit}   <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleEdit(item)}
                  >
                    <i className="bi bi-pencil"></i> Edit
                  </button></td>
                <td>{item.noOfDailyLimitReached} <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item)}
                  >
                    <i className="bi bi-trash"></i> Delete
                  </button></td>
                <td>
                <button className="btn btn-primary btn-sm me-2">
                    Expand
                  </button>
                  <button className="btn btn-success btn-sm">
                    Print
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for editing the daily limit */}
      {showEditModal && (
        <div className="modal fade show" style={{ display: "block" }} tabindex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Daily Limit</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="dailyLimit" className="form-label">
                    No Of Daily Limit
                  </label>
                  <input
                    type="number"
                    id="dailyLimit"
                    className="form-control"
                    value={newDailyLimit}
                    onChange={(e) => setNewDailyLimit(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaginationTable;


