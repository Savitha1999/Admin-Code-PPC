
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";

const MatchedList = () => {
  const [buyerAssistance, setBuyerAssistance] = useState([]);
  const [loading, setLoading] = useState(false);

  const adminName = useSelector((state) => state.admin.name);
  

  // ✅ Record view on mount
useEffect(() => {
 const recordDashboardView = async () => {
   try {
     await axios.post(`${process.env.REACT_APP_API_URL}/record-view`, {
       userName: adminName,
       viewedFile: "MatchedList",
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


  useEffect(() => {
    fetchBuyerAssistance();
  }, []);

  const fetchBuyerAssistance = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-buyerAssistance`);
      setBuyerAssistance(response.data.data);
    } catch (error) {
      console.error("Error fetching Buyer Assistance requests:", error);
    } finally {
      setLoading(false);
    }
  };

  // Soft Delete
  const handleSoftDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;

    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/delete-buyer-assistance/${id}`);
        fetchBuyerAssistance();
    } catch (error) {
      console.error("Error deleting Buyer Assistance:", error);
    }
  };

  // Undo Soft Delete
  const handleUndoDelete = async (id) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/undo-delete-buyer-assistance/${id}`);
      fetchBuyerAssistance();
    } catch (error) {
      console.error("Error restoring Buyer Assistance:", error);
    }
  };

  // Permanent Delete
  const handlePermanentDelete = async (id) => {
    if (!window.confirm("This action is irreversible! Do you want to permanently delete this request?")) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/permanent-delete-buyer-assistance/${id}`);
      fetchBuyerAssistance();
    } catch (error) {
      console.error("Error permanently deleting Buyer Assistance:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Buyer Assistance Requests</h2>
      {loading ? <p>Loading...</p> : (
        <table className="table table-striped">
          <thead>
            <tr>
            <th>ID</th>
      <th>City</th>
      <th>Area</th>
      <th>Min Price</th>
      <th>Max Price</th>
      <th>Property Type</th>
      <th>Property Mode</th>
      <th>Loan</th>
      <th>Property Age</th>
      <th>BHK</th>
      <th>Facing</th>
      <th>Payment Type</th>
      <th>Phonenumber</th>
      <th>Status</th>
      <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {buyerAssistance.length > 0 ? buyerAssistance.map((request) => (
              <tr key={request._id}>
                 <td>{request.ba_id}</td>
        <td>{request.city}</td>
        <td>{request.area}</td>
        <td>{request.minPrice}</td>
        <td>{request.maxPrice}</td>
        <td>{request.propertyType}</td>
        <td>{request.propertyMode}</td>
        <td>{request.bankLoan}</td>
        <td>{request.propertyAge}</td>
        <td>{request.noOfBHK}</td>
        <td>{request.facing}</td>
        <td>{request.paymentType}</td>
        <td>{request.phoneNumber}</td>
                <td>
                  {request.isDeleted ? <span className="text-danger">Deleted</span> : <span className="text-success">Active</span>}
                </td>
                <td>
                  {!request.isDeleted ? (
                    <>
                      <button className="btn btn-warning btn-sm" onClick={() => handleSoftDelete(request._id)}>Soft Delete</button>
                      <button className="btn btn-danger btn-sm ms-2" onClick={() => handlePermanentDelete(request._id)}>Permanent Delete</button>
                    </>
                  ) : (
                    <button className="btn btn-primary btn-sm" onClick={() => handleUndoDelete(request._id)}>Undo Delete</button>
                  )}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="8" className="text-center">No Buyer Assistance requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MatchedList;
