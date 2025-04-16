import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const ProfileTable = () => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [editingProfile, setEditingProfile] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "", address: "" });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/profiles`);
      setProfiles(res.data);
      setFilteredProfiles(res.data);
    } catch (err) {
      alert("Error fetching profiles");
    }
  };

  const handleEdit = (profile) => {
    setEditingProfile(profile._id);
    setFormData(profile);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this profile?")) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/profile/${id}`);
      fetchProfiles();
    } catch (err) {
      alert("Error deleting profile");
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/profile/${editingProfile}`, formData);
      setEditingProfile(null);
      setFormData({ name: "", email: "", mobile: "", address: "" });
      fetchProfiles();
    } catch (err) {
      alert("Error updating profile");
    }
  };

  const handleDateFilter = () => {
    const from = startDate ? new Date(startDate).getTime() : null;
    const to = endDate ? new Date(endDate).getTime() : null;

    const filtered = profiles.filter(profile => {
      const createdAt = new Date(profile.createdAt).getTime();
      const afterStart = from ? createdAt >= from : true;
      const beforeEnd = to ? createdAt <= to : true;
      return afterStart && beforeEnd;
    });

    setFilteredProfiles(filtered);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">All User Profiles</h1>

      <div className="flex items-center gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium">From</label>
          <input
            type="date"
            className="border px-3 py-2 rounded"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">To</label>
          <input
            type="date"
            className="border px-3 py-2 rounded"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button
          onClick={handleDateFilter}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-5"
        >
          Filter
        </button>
      </div>

      <table className="min-w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Email</th>
            <th className="border p-2 text-left">Mobile</th>
            <th className="border p-2 text-left">Address</th>
            <th className="border p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProfiles.map(profile => (
            <tr key={profile._id}>
              <td className="border p-2">{profile.name}</td>
              <td className="border p-2">{profile.email}</td>
              <td className="border p-2">{profile.mobile}</td>
              <td className="border p-2">{profile.address}</td>
              <td className="border p-2 text-center">
                <button
                  className="bg-blue-500 text-info px-3 py-1 rounded mr-2"
                  onClick={() => handleEdit(profile)}
                >
                  <FaEdit/>
                </button>
                <button
                  className="bg-red-500 text-danger px-3 py-1 rounded"
                  onClick={() => handleDelete(profile._id)}
                >
<MdDeleteForever />                                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingProfile && (
        <div className="mt-8 p-4 border rounded bg-gray-50">
          <h2 className="text-xl font-semibold mb-3">Edit Profile</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="border p-2 rounded"
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="border p-2 rounded"
            />
            <input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile"
              className="border p-2 rounded"
            />
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="border p-2 rounded"
            />
            <div className="col-span-2">
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileTable;
