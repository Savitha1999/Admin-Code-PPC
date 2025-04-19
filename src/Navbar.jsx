



import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { FaBars, FaTimes, FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import axios from "axios";

const AppNavbar = ({ toggleSidebar }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const adminName = useSelector((state) => state.admin.name);
  const navigate = useNavigate(); 

  const handleToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
    toggleSidebar();
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/all-get-puc-profiles`);
        const matched = res.data.data.find((profile) => profile.name === adminName);
        if (matched && matched.profileImage) {
          setProfileImage(matched.profileImage);
        }
      } catch (err) {
        console.error("Error fetching admin profile image:", err);
      }
    };

    fetchProfile();
  }, [adminName]);

  return (
    <Navbar expand="md" className="shadow-sm bg-light p-3 mb-3">
      <Container fluid>
        <Navbar.Brand href="#" className="d-flex align-items-center">
          <span className="fw-bold text-primary"> Pondy Properties | Admin </span>
        </Navbar.Brand>

        <div style={{ marginLeft: 'auto', paddingRight: '1rem' }}>
          Welcome, <strong>{adminName}</strong>
        </div>

        <button
          className="border-0 bg-transparent d-md-none"
          onClick={handleToggle}
          aria-label="Toggle Sidebar"
        >
          {isSidebarOpen ? (
            <FaTimes size={25} className="text-primary" />
          ) : (
            <FaBars size={25} className="text-primary" />
          )}
        </button>

        {/* Profile Dropdown */}
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="light"
            id="dropdown-profile"
            className="border-0 bg-transparent d-flex align-items-center p-0"
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                width="35"
                height="35"
                className="rounded-circle"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <FaUserCircle size={30} className="text-primary" />
            )}
          </Dropdown.Toggle>
          <Dropdown.Menu className="shadow rounded">
            <Dropdown.Item
              onClick={() => navigate("/dashboard/profile")} // ← Step 3
              className="d-flex align-items-center"
            >
              <FaUserCircle className="me-2" /> Profile
            </Dropdown.Item>
            <Dropdown.Item href="#settings" className="d-flex align-items-center">
              <FaCog className="me-2" /> Settings
            </Dropdown.Item>
            <Dropdown.Item href="/logout" className="d-flex align-items-center text-danger">
              <FaSignOutAlt className="me-2" /> Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
