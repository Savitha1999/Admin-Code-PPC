

import { useState, useEffect } from "react";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const NotificationManager = () => {
  const [notifications, setNotifications] = useState([]);
  const [formData, setFormData] = useState({
    userPhoneNumber: "",
    message: "",
    type: "message",
  });
  const [editingNotification, setEditingNotification] = useState(null);

  // Fetch all notifications
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/notifications`);
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingNotification) {
        // Update existing notification
        await axios.put(`${process.env.REACT_APP_API_URL}/notification/${editingNotification._id}`, formData);
      } else {
        // Create new notification
        await axios.post(`${process.env.REACT_APP_API_URL}/send-notification`, formData);
      }

      fetchNotifications(); // Refresh list
      setFormData({ userPhoneNumber: "", message: "", type: "message" });
      setEditingNotification(null);
    } catch (error) {
      console.error("Error submitting notification:", error);
    }
  };

  // Edit Notification
  const handleEdit = (notification) => {
    setFormData({
      userPhoneNumber: notification.userPhoneNumber,
      message: notification.message,
      type: notification.type,
    });
    setEditingNotification(notification);
  };

  // Delete Notification
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/notification/${id}`);
      fetchNotifications(); // Refresh list
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Notifications</h1>

      {/* Notification Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-lg mb-6">
        <div className="mb-3">
          <label className="block font-medium">User Phone Number</label>
          <input
            type="text"
            name="userPhoneNumber"
            value={formData.userPhoneNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-3">
          <label className="block font-medium">Message</label>
          <input
            type="text"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-3">
          <label className="block font-medium">Type</label>
          <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded">
          <option className="bg-primary text-white" value="">Select Type</option>
            <option value="message">Message</option>
            <option value="warning">warning Alert</option>
          </select>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingNotification ? "Update Notification" : "Create Notification"}
        </button>
      </form>

      {/* Notification Table */}
      <table className="w-full border-collapse border border-gray-200 shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Phone Number</th>
            <th className="border p-2">Message</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <tr key={notification._id} className="border">
                <td className="p-2 border">{notification.userPhoneNumber}</td>
                <td className="p-2 border">{notification.message}</td>
                <td className="p-2 border">{notification.type}</td>
                <td className="p-2 border flex gap-2">
                  <button onClick={() => handleEdit(notification)} className="text-info px-3 py-1 rounded">
<FaEdit />                
  </button>
                  <button onClick={() => handleDelete(notification._id)} className="text-danger px-3 py-1 rounded">
<MdDeleteForever />                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-4 text-center">No notifications found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationManager;














