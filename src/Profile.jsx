





import React, { useState, useEffect } from "react";
import axios from "axios";
import ppclogo from './Assets/ppclogo.png';

const ProfileManager = () => {
  const [formData, setFormData] = useState({
    pucNumber: "",
    name: "",
    password: "",
    email: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [editId, setEditId] = useState(null); // Used to track update mode

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  // Fetch profiles
  const fetchProfiles = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/all-get-puc-profiles`);
      setProfiles(res.data.data);
    } catch (err) {
      console.error("Error fetching profiles:", err);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  // Save or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("pucNumber", formData.pucNumber);
    data.append("name", formData.name);
    data.append("password", formData.password);
    data.append("email", formData.email);
    if (profileImage) {
      data.append("profileImage", profileImage);
    }

    try {
      if (editId) {
        await axios.put(`${process.env.REACT_APP_API_URL}/update-profile/${editId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Profile updated successfully!");
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/profile`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Profile created successfully!");
      }

      // Reset form
      setFormData({ pucNumber: "", name: "", password: "", email: "" });
      setProfileImage(null);
      setEditId(null);
      fetchProfiles();
    } catch (err) {
      console.error("Error saving/updating profile", err);
      alert("Failed to save/update profile.");
    }
  };

  // Delete profile
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this profile?")) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/delete-profile/${id}`);
      alert("Profile deleted.");
      fetchProfiles();
    } catch (err) {
      console.error("Error deleting:", err);
      alert("Failed to delete.");
    }
  };

  // Edit profile (load into form)
  const handleEdit = (profile) => {
    setFormData({
      pucNumber: profile.pucNumber,
      name: profile.name,
      password: profile.password,
      email: profile.email,
    });
    setProfileImage(null); // user can re-upload or leave as-is
    setEditId(profile._id);
    window.scrollTo({ top: 0, behavior: "smooth" }); // optional
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>{editId ? "Update Profile" : "Create Profile"}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>PUC Number:</label>
        <input
          type="text"
          name="pucNumber"
          value={formData.pucNumber}
          onChange={handleChange}
          className="form-control"
        />

        <br />
        <label>Profile Image:</label>
        <input type="file" onChange={handleFileChange} className="form-control" />

        <br />
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-control"
        />

        <br />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="form-control"
        />

        <br />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-control"
        />

        <br />
        <button type="submit" className="btn btn-success">
          {editId ? "Update" : "Save"}
        </button>
        {editId && (
          <button
            type="button"
            className="btn btn-secondary ml-2"
            onClick={() => {
              setEditId(null);
              setFormData({ pucNumber: "", name: "", password: "", email: "" });
              setProfileImage(null);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <hr />

      <h3>All Profiles (With PUC Number)</h3>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>PUC</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile, index) => (
            <tr key={profile._id}>
              <td>{index + 1}</td>
              <td>{profile.pucNumber}</td>
              <td>
  <img
    src={
      profile.profileImage
        ? `http://localhost:5006/${profile.profileImage}`
        : ppclogo
    }
    alt="profile"
    style={{ width: 50, height: 50, objectFit: "cover" }}
  />
</td>

            
              <td>{profile.name}</td>
              <td>{profile.email}</td>
              <td>{profile.password}</td>
              <td>
                <button className="btn btn-warning btn-sm mr-2" onClick={() => handleEdit(profile)}>
                  Update
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(profile._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {profiles.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center">
                No profiles with PUC Number found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileManager;
