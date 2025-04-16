






import React, { useState } from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { FaBars, FaTimes, FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";
import logo from "./logo.jpg";

const AppNavbar = ({ toggleSidebar }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
    toggleSidebar();
  };

  return (
    <Navbar expand="md" className="shadow-sm bg-light p-3 mb-3">
      <Container fluid>
        {/* Logo Section */}
        <Navbar.Brand href="#" className="d-flex align-items-center">
  {/* <img
    src={logo}
    alt="Logo"
    className="rounded-circle me-2"
    height="40" 
    width="40"  
    style={{ objectFit: "cover" }} 
  /> */}
  <span className="fw-bold text-primary"> Pondy Properties | Admin </span>
</Navbar.Brand>

        {/* Hamburger Menu for Sidebar */}
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
            <FaUserCircle size={30} className="text-primary" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="shadow rounded">
            <Dropdown.Item href="#profile" className="d-flex align-items-center">
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



// import React, { useState } from "react";
// import { Navbar, Container, Dropdown } from "react-bootstrap";
// import { FaBars, FaTimes, FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";
// import defaultLogo from "./logo.jpg"; // fallback image

// const AppNavbar = ({ toggleSidebar, adminData }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const handleToggle = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//     toggleSidebar();
//   };

//   const profileImage = adminData?.profileImage ? adminData.profileImage : defaultLogo;

//   return (
//     <Navbar expand="md" className="shadow-sm bg-light p-3 mb-3">
//       <Container fluid>
//         <Navbar.Brand href="#" className="d-flex align-items-center">
//           <img
//             src={profileImage}
//             alt="Admin Profile"
//             className="rounded-circle me-2"
//             height="40"
//             width="40"
//             style={{ objectFit: "cover" }}
//           />
//           <span className="fw-bold text-primary">Pondy Properties | Admin</span>
//         </Navbar.Brand>

//         <button
//           className="border-0 bg-transparent d-md-none"
//           onClick={handleToggle}
//           aria-label="Toggle Sidebar"
//         >
//           {isSidebarOpen ? (
//             <FaTimes size={25} className="text-primary" />
//           ) : (
//             <FaBars size={25} className="text-primary" />
//           )}
//         </button>

//         <Dropdown align="end">
//           <Dropdown.Toggle
//             variant="light"
//             id="dropdown-profile"
//             className="border-0 bg-transparent d-flex align-items-center p-0"
//           >
//             <img
//               src={profileImage}
//               alt="Admin"
//               className="rounded-circle"
//               height="30"
//               width="30"
//               style={{ objectFit: "cover" }}
//             />
//           </Dropdown.Toggle>
//           <Dropdown.Menu className="shadow rounded">
//             <Dropdown.Item href="#profile" className="d-flex align-items-center">
//               <FaUserCircle className="me-2" /> Profile
//             </Dropdown.Item>
//             <Dropdown.Item href="#settings" className="d-flex align-items-center">
//               <FaCog className="me-2" /> Settings
//             </Dropdown.Item>
//             <Dropdown.Item href="/logout" className="d-flex align-items-center text-danger">
//               <FaSignOutAlt className="me-2" /> Logout
//             </Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </Container>
//     </Navbar>
//   );
// };

// export default AppNavbar;
