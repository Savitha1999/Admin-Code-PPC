













import React from "react";
import { NavLink } from "react-router-dom";
import { 
  FaSignInAlt, 
  FaClipboardList, 
  FaBell,
  FaUsers,
  FaBuilding,
  FaCar,
  FaMoneyBill,
  FaMapMarkedAlt,
  FaFileInvoice,
  FaAssistiveListeningSystems,
  FaPhoneAlt,
  FaCogs,
  FaChartBar,
  FaRegUserCircle,
  FaTools,
  FaListAlt,
  FaTrashAlt,
  FaSearch,
  FaPlusCircle,
  FaUserShield,
  FaFileAlt,
  FaUserCheck,
  FaUserClock,
  FaUserTimes,
  FaDownload,
  FaChartLine,
  FaUser,
  FaMoneyBillAlt,
  FaPhone,
  FaRegQuestionCircle
} from "react-icons/fa";
import { RiAccountCircleFill, RiBankCard2Fill, RiBarChart2Fill, RiCaravanFill, RiCellphoneFill, RiDashboardHorizontalFill, RiExchangeFill, RiFileListFill, RiGroupFill, RiHandCoinFill, RiLayoutFill, RiNewspaperFill, RiQuestionAnswerFill, RiRoadMapFill, RiSettings5Fill, RiShieldUserFill, RiTicket2Fill, RiUserFill, RiUserSettingsFill } from "react-icons/ri";
import { FcStatistics } from "react-icons/fc";
import { IoLogInSharp } from "react-icons/io5";
import { MdReport, MdHelp, MdContactMail } from "react-icons/md";
import { BsBuildingGear } from "react-icons/bs";
import { RiCarFill } from 'react-icons/ri';
import logo from "./logo.jpg"
import "./App.css";
import axios from "axios";

const Sidebar = ({ isOpen, toggleSidebar }) => {


  // const handleAddCarClick = async () => {
  //   try {
  //     const response = await axios.post(`${process.env.REACT_APP_API_URL}/store-id`);

  //     if (response.status === 201) {
  //       // alert(`PPC-ID created successfully! New PPC-ID: ${response.data.ppcId}`);
  //     } else {
  //       // alert(`Failed to create PPC-ID: ${response.data.message}`);
  //     }
  //   } catch (error) {
  //     alert('An error occurred while creating the PPC-ID.');
  //     console.error(error);
  //   }
  // };


  return (
    <div className={`sidebar ${isOpen ? "sidebar-open" : ""} p-3 m-3`}>
      <div  className="d-flex align-items-center"><img src={logo} alt="" className="img-fluid logo-size"/>  
          <h1 className="gradient-text ms-3" style={{color:'linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))'}}>PPC</h1>
      </div>
      <hr></hr>
      <nav>
        <ul>
   
          <li className="p-3 text-white" style={{borderRadius:"5px", background:"#8BC34A"}}>
      
              <RiDashboardHorizontalFill size={20} style={{marginRight:'10px '}}/>
              Dashboard
          </li>
          <li className="p-0 mt-2" >
            <NavLink 
              to="/dashboard/statistics" 
               onClick={toggleSidebar} 
              className={({ isActive }) => (isActive ? "active-link rounded" : "")}
            >
              <FcStatistics size={20}/>
              Statistics
            </NavLink>
          </li>
          <li className="p-3 mt-2  text-white"  style={{borderRadius:"5px",  background:"#8BC34A"}}>
      
              <MdReport size={20} style={{marginRight:'10px '}}/>
              Report
          </li>
          <li className="p-0 mt-2" >
            <NavLink 
              to="/dashboard/loginreport" 
               onClick={toggleSidebar} 
              className={({ isActive }) => (isActive ? "active-link rounded" : "")}
            >
              <IoLogInSharp size={20}/>
              Login Report
            </NavLink>
          </li>
          <li className="p-0 mt-2" >
            <NavLink 
              to="/dashboard/adminreport" 
              className={({ isActive }) => (isActive ? "active-link rounded" : "")}
            >
              <FaSignInAlt size={20}/>
              Admin Report
            </NavLink>
          </li>
  

<li className="p-3 mt-2  text-white"  style={{borderRadius:"5px",  background:"#8BC34A"}}>
           
              <FaBell size={20} style={{marginRight:'10px '}}/>
              Notification
          </li>

          <li className="p-0 mt-2" >
        <NavLink
          to="/dashboard/admin-notification"
           onClick={toggleSidebar}
          className={({ isActive }) => (isActive ? "active-link rounded" : "")}
        >
          <FaBell size={20}/>
          Admin Notification
        </NavLink>
      </li>

      <li className="p-3 mt-2  text-white"  style={{borderRadius:"5px",  background:"#8BC34A"}}>
     
          <FaBuilding size={20} style={{marginRight:'10px '}}/>
          Office Setup
      </li>

      <li className="p-0 mt-2" >
       <NavLink
          to="/dashboard/office"
           onClick={toggleSidebar}
          className={({ isActive }) => (isActive ? "active-link rounded" : "")}
        > 
          <FaBuilding size={20}/>
          Office 
        </NavLink>
      </li>

      <li className="p-0 mt-2" >
        <NavLink
          to="/dashboard/users"
           onClick={toggleSidebar}
          className={({ isActive }) => (isActive ? "active-link rounded" : "")}
        >
          <FaUsers size={20}/>
          Users
        </NavLink>
      </li>

      <li className="p-0 mt-2" >
        <NavLink
          to="/dashboard/plan"
          onClick={toggleSidebar}
          className={({ isActive }) => (isActive ? "active-link rounded" : "")}
        >
          <FaClipboardList size={20}/>
          Plan
        </NavLink>
      </li>

      <li className="p-0 mt-2" >
        <NavLink
          to="/dashboard/buyerplan"
           onClick={toggleSidebar}
          className={({ isActive }) => (isActive ? "active-link rounded" : "")}
        >
          <FaClipboardList size={20}/>
          Buyer Plan
        </NavLink>
      </li>
      <li className="p-0 mt-2" >
        <NavLink
          to="/dashboard/paymenttype"
          style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar}
          className={({ isActive }) => (isActive ? "active-link rounded" : "")}
        >
          <FaMoneyBill size={20}/>
          Payment Type
        </NavLink>
      </li>
      {/* <li className="p-0 mt-2" >
        <NavLink
          to="/dashboard/car-make"
          style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar}
          className={({ isActive }) => (isActive ? "active-link rounded" : "")}
        >
          <FaBuilding size={20}/>
          Property Make
        </NavLink>
      </li>
      <li className="p-0 mt-2" >
        <NavLink
          to="/dashboard/car-model"
          style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar}
          className={({ isActive }) => (isActive ? "active-link rounded" : "")}
        >
          <FaBuilding />
          Property Model
        </NavLink>
      </li> */}
      <li className="p-0 mt-2" >
        <NavLink
          to="/dashboard/state"
          onClick={toggleSidebar}
          className={({ isActive }) => (isActive ? "active-link rounded" : "")}
        >
          <FaMapMarkedAlt />
          State
        </NavLink>
      </li>
      <li className="p-0 mt-2" >
        <NavLink
          to="/dashboard/district"
           onClick={toggleSidebar}
          className={({ isActive }) => (isActive ? "active-link rounded" : "")}
        >
          <FaMapMarkedAlt />
          District
        </NavLink>
      </li>
      <li className="p-0 mt-2" >
        <NavLink
          to="/dashboard/city"
           onClick={toggleSidebar}
          className={({ isActive }) => (isActive ? "active-link rounded" : "")}
        >
          <FaMapMarkedAlt />
          City
        </NavLink>
      </li>
      <li className="p-0 mt-2" >
        <NavLink
          to="/dashboard/area"
           onClick={toggleSidebar}
          className={({ isActive }) => (isActive ? "active-link rounded" : "")}
        >
          <FaMapMarkedAlt />
          Area
        </NavLink>
      </li>
      <li className="p-0 mt-2" >
        <NavLink
          to="/dashboard/rolls"
          onClick={toggleSidebar}
          className={({ isActive }) => (isActive ? "active-link rounded" : "")}
        >
          <FaUserShield />
          Rolls
        </NavLink>
      </li>

      <li className="p-0 mt-2" >
        <NavLink
          to="/dashboard/adminlog"
           onClick={toggleSidebar}
          className={({ isActive }) => (isActive ? "active-link rounded" : "")}
        >
          <FaFileAlt />
          Admin Log
        </NavLink>
      </li>
     
    
      
      <li className="p-3 mt-2  text-white"  style={{borderRadius:"5px",  background:"#8BC34A"}}>
    
    <FaCar style={{marginRight:'10px '}}/>
    Admin Send Form Data
</li>

      <li className="p-0 mt-2" >
        <NavLink
          to="/dashboard/set-property"
          onClick={toggleSidebar}
          className={({ isActive }) => (isActive ? "active-link rounded" : "")}
        >
          <FaFileAlt />
          Admin Set Property
        </NavLink>
      </li>

      <li className="p-0 mt-2" >
        <NavLink
          to="/dashboard/notification-send"
          onClick={toggleSidebar}
          className={({ isActive }) => (isActive ? "active-link rounded" : "")}
        >
          <FaFileAlt />
        Notification Send Form      
 </NavLink>
      </li>
     
      <li className="p-0 mt-2" >
        <NavLink
          to="/dashboard/profile-table"
          onClick={toggleSidebar}
          className={({ isActive }) => (isActive ? "active-link rounded" : "")}
        >
          <FaFileAlt />
          Get User Profile
 </NavLink>
      </li>

        
      {/* <li className="p-0 mt-2" >
        <NavLink
          to="/dashboard/user-call-list"
          onClick={toggleSidebar}
          className={({ isActive }) => (isActive ? "active-link rounded" : "")}
        >
          <FaFileAlt />
User Call List
 </NavLink>
      </li>
      */}
    
      
     <li className="p-3 mt-2  text-white"  style={{borderRadius:"5px",  background:"#8BC34A"}}>
    
          <FaCar style={{marginRight:'10px '}}/>
          Pondy Used Property
      </li>

   
 <li className="p-0 mt-2">
      <NavLink
        to="/dashboard/add-car"
        // onClick={(e) => {
        //   handleAddCarClick(); // Call the API when the link is clicked
        //   toggleSidebar(); // Close the sidebar if needed
        // }}
        className={({ isActive }) => (isActive ? "active-link rounded" : "")}
      >
        <FaPlusCircle />
        Add Property
      </NavLink>
    </li> 

    <li className="p-0 mt-2">
    <NavLink
        to="/dashboard/property-list"
        className={({ isActive }) => (isActive ? "active-link rounded" : "")}
      >
        <FaPlusCircle />
        Manage Properties
      </NavLink>
    </li>

    <li className="p-0 mt-2">
    <NavLink
        to="/dashboard/text-editor"
        className={({ isActive }) => (isActive ? "active-link rounded" : "")}
      >
        <FaPlusCircle />
     Text Editors
      </NavLink>
    </li>
   

      <li className="p-0 mt-2" >
        <NavLink
          to="/dashboard/searchcar"
 onClick={toggleSidebar}
          className={({ isActive }) => (isActive ? "active-link rounded" : "")}
        >
          <FaSearch />
          Search Property
        </NavLink>
      </li>
      <li className="p-0 mt-2" >
        <NavLink
          to="/dashboard/py-properties"
          onClick={toggleSidebar}
          className={({ isActive }) => (isActive ? "active-link rounded" : "")}
        >
          <FaListAlt />
          Py Properties
        </NavLink>
      </li>

      
{/* 

      <li className="p-0 mt-2" >
        <NavLink
          to="/dashboard/featured-properties"
          onClick={toggleSidebar}
          className={({ isActive }) => (isActive ? "active-link rounded" : "")}
        >
          <FaUserCheck />
          Featured Properties
        </NavLink>
      </li> */}

      <li className="p-0 mt-2" >
        <NavLink
          to="/dashboard/approved-car"
          style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar}
          className={({ isActive }) => (isActive ? "active-link rounded" : "")}
        >
          <FaUserCheck />
          Approved Property
        </NavLink>
      </li>
      <li className="p-0 mt-2" >
        <NavLink
          to="/dashboard/preapproved-car"
          style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar}
          className={({ isActive }) => (isActive ? "active-link rounded" : "")}
        >
          <FaUserCheck />
          PreApproved Property
        </NavLink>
      </li>
      <li className="p-0 mt-2" >
        <NavLink
          to="/dashboard/pending-car"
          onClick={toggleSidebar}
          className={({ isActive }) => (isActive ? "active-link rounded" : "")}
        >
          <FaUserClock />
          Pending Property
        </NavLink>
      </li>


      <li className="p-0 mt-2" >
        <NavLink
          to="/dashboard/deleted-properties"
        onClick={toggleSidebar}
          className={({ isActive }) => (isActive ? "active-link rounded" : "")}
        >
          <FaTrashAlt />
        Permenent Deleted Property
        </NavLink>
      </li>

      <li className="p-0 mt-2" >
        <NavLink
          to="/dashboard/removed-car"
        onClick={toggleSidebar}
          className={({ isActive }) => (isActive ? "active-link rounded" : "")}
        >
          <FaTrashAlt />
          Removed Property
        </NavLink>
      </li>
      <li className="p-0 mt-2" >
        <NavLink
          to="/dashboard/expire-car"
          style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar}
          className={({ isActive }) => (isActive ? "active-link rounded" : "")}
        >
          <FaUserTimes />
          Expired Property
        </NavLink>
      </li>
      <li className="p-0 mt-2" >
        <NavLink
          to="/dashboard/puc-car"
          style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar}
          className={({ isActive }) => (isActive ? "active-link rounded" : "")}
        >
          <FaFileInvoice />
          PUC Property
        </NavLink>
      </li>


<li className="p-3 mt-2  text-white"  style={{borderRadius:"5px",  background:"#8BC34A"}}>
     
          <FaCar style={{marginRight:'10px '}}/>
          Property List
      </li>

      <li className="p-0 mt-2">
    <NavLink to="/dashboard/feature-property"  onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaCar />
      Featured Property
    </NavLink>
  </li>

      <li className="p-0 mt-2">
    <NavLink to="/dashboard/paid-car" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaCar />
      Paid Property
    </NavLink>
  </li>
  <li className="p-0 mt-2">
    <NavLink to="/dashboard/free-car" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaCar />
      Free Property
    </NavLink>
  </li>
  <li className="p-0 mt-2">
    <NavLink to="/dashboard/dealer-car" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaCar />
      Dealer Property
    </NavLink>
  </li>
  <li className="p-0 mt-2">
    <NavLink to="/dashboard/customer-car" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaCar />
      Customer Property
    </NavLink>
  </li>
  <li className="p-0 mt-2">
    <NavLink to="/dashboard/agent-car" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaCar />
      Agent Property
    </NavLink>
  </li>

  <li className="p-3 mt-2  text-white"  style={{borderRadius:"5px",  background:"#8BC34A"}}>
      <FaUser style={{marginRight:'10px '}}/>
      Accounts
  </li>


  <li className="p-0 mt-2">
    <NavLink to="/dashboard/subscriber" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaUser />
      Subscriber
    </NavLink>
  </li> 
  <li className="p-0 mt-2">
    <NavLink to="/dashboard/free-bills" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaFileInvoice />
      Free Bills
    </NavLink>
  </li>
  <li className="p-0 mt-2">
    <NavLink to="/dashboard/paid-bills" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaFileInvoice />
      Paid Bills
    </NavLink>
  </li>
  <li className="p-0 mt-2">
    <NavLink to="/dashboard/pay-u-money" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaMoneyBillAlt />
      Pay U Money
    </NavLink>
  </li>
  <li className="p-0 mt-2">
    <NavLink to="/dashboard/pay-later" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaMoneyBillAlt />
      Pay Later
    </NavLink>
  </li>
  <li className="p-3 mt-2  text-white"  style={{borderRadius:"5px",  background:"#8BC34A"}}>
    {/* <NavLink to="/dashboard/assist-accounts" style={{color:"#ABD6E9"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}> */}
      <FaUsers style={{marginRight:'10px '}}/>
      Assist Accounts
    {/* </NavLink> */}
  </li>
  <li className="p-0 mt-2">
    <NavLink to="/dashboard/assist-subscriber" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaUsers />
      Assist Subscriber
    </NavLink>
  </li>
  <li className="p-0 mt-2">
    <NavLink to="/dashboard/ba-free-bills" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaFileAlt />
      BA Free Bills
    </NavLink>
  </li>
  <li className="p-0 mt-2">
    <NavLink to="/dashboard/ba-paid-bills" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaFileAlt />
      BA Paid Bills
    </NavLink>
  </li>
  <li className="p-0 mt-2">
    <NavLink to="/dashboard/assist-payu-money" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaMoneyBillAlt />
      Assist PayU Money
    </NavLink>
  </li>
  <li className="p-0 mt-2">
    <NavLink to="/dashboard/assist-pay-later" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaMoneyBillAlt />
      Assist Pay Later
    </NavLink>
  </li>
  <li className="p-3 mt-2  text-white"  style={{borderRadius:"5px",  background:"#8BC34A"}}>
    {/* <NavLink to="/dashboard/customer-care" style={{color:"#ABD6E9"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}> */}
      <FaPhone style={{marginRight:'10px '}}/>
      Customer Care
    {/* </NavLink> */}
  </li>
  {/* <li className="p-0 mt-2">
    <NavLink to="/dashboard/reported-cars" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaCar />
      Reported Propertys
    </NavLink>
  </li> */}
  <li className="p-0 mt-2">
    <NavLink to="/dashboard/callback-form" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaClipboardList />
      Call Back Form
    </NavLink>
  </li>
  {/* <li className="p-0 mt-2">
    <NavLink to="/dashboard/help" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaRegQuestionCircle />
      Help
    </NavLink>
  </li> */}
  <li className="p-3 mt-2  text-white"  style={{borderRadius:"5px",  background:"#8BC34A"}}>
    {/* <NavLink to="/dashboard/buyers-menu" style={{color:"#ABD6E9"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}> */}
      <FaListAlt style={{marginRight:'10px '}}/>
      Buyers Menu
    {/* </NavLink> */}
  </li>
  <li className="p-0 mt-2">
    <NavLink to="/dashboard/get-buyer-assistance"  onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaUsers />
      Buyers Assistant
    </NavLink>
  </li>
  <li className="p-0 mt-2">
    <NavLink to="/dashboard/pending-assistant" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaUsers />
      Pending Assistant
    </NavLink>
  </li>
  <li className="p-0 mt-2">
    <NavLink to="/dashboard/expired-assistant" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaUsers />
      Expired Assistant
    </NavLink>
  </li>
  <li className="p-0 mt-2">
    <NavLink to="/dashboard/buyerlist-interest" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaListAlt />
      Buyers List - Interest
    </NavLink>
  </li>
  <li className="p-0 mt-2">
    <NavLink to="/dashboard/buyers-list-interest-tried" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaListAlt />
      Buyers List - Interest Tried
    </NavLink>
  </li>
  <li className="p-0 mt-2">
    <NavLink to="/dashboard/searched-data" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaClipboardList />
      Searched Data
    </NavLink>
  </li>
  <li className="p-3 mt-2  text-white"  style={{borderRadius:"5px",  background:"#8BC34A"}}>
    {/* <NavLink to="/dashboard/business-support" style={{color:"#ABD6E9"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}> */}
      <FaUsers style={{marginRight:'10px '}}/>
      Business Support
    {/* </NavLink> */}
  </li>
  <li className="p-0 mt-2">
    <NavLink to="/dashboard/interest-table"  onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaUsers />
      Received Interest
    </NavLink>
  </li>
  <li className="p-0 mt-2">
    <NavLink to="/dashboard/contact-table"  onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaUsers />
      Received Contact Request
    </NavLink>
  </li><li className="p-0 mt-2">
    <NavLink to="/dashboard/needhelp-table"  onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaUsers />
      Received Need Help
    </NavLink>
  </li><li className="p-0 mt-2">
    <NavLink to="/dashboard/report-property-table"  onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaUsers />
      Received Report Property
    </NavLink>
  </li><li className="p-0 mt-2">
    <NavLink to="/dashboard/soldout-table" onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaUsers />
      Received SoldOut Request
    </NavLink>
  </li>
  
  <li className="p-0 mt-2">
    <NavLink to="/dashboard/favorite-table"  onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaUsers />
      Received Favorite
    </NavLink>
  </li>

  <li className="p-0 mt-2">
    <NavLink to="/dashboard/viewed-property"  onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaUsers />
      Viewed Properties
    </NavLink>
  </li>
  

  <li className="p-0 mt-2">
    <NavLink to="/dashboard/get-matched-properties" onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaUser />
      Matched Proprties
    </NavLink>
  </li>
  {/* <li className="p-0 mt-2">
    <NavLink to="/dashboard/contact-table" style={{color:"#ABD6E9"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaUser />
      Buyers Contacted
    </NavLink>
  </li> */}
 
  <li className="p-0 mt-2">
    <NavLink to="/dashboard/last-viewed-property"  onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaCar />
      Last Viewed Property
    </NavLink>
  </li>
  <li className="p-0 mt-2">
    <NavLink to="/dashboard/offers-raised"  onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaFileAlt />
      Offers Raised
    </NavLink>
  </li>
  
  <li className="p-0 mt-2">
    <NavLink to="/dashboard/photo-request"  onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
      <FaRegQuestionCircle />
      Photo Request
    </NavLink>
  </li>
         <li className="p-0" >
         <NavLink
          to="/dashboard/downloadleads"
          style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar}
          className={({ isActive }) => (isActive ? "active-link rounded" : "")}
        >
          <FaDownload />
          Download Leads
        </NavLink>
      </li>
  <li className="p-3 mt-2  text-white"  style={{borderRadius:"5px",  background:"#8BC34A"}}>
 
          <FaChartLine style={{marginRight:'10px '}}/>
          Business Statics
      </li>

<li className="p-0 mt-2">
        <NavLink to="/dashboard/carstatics" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
          <RiCarFill size={20} /> Property Statics
        </NavLink>
      </li>
      <li className="p-0 mt-2">
        <NavLink to="/dashboard/buyers-statics" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
          <RiGroupFill size={20} /> Buyers Statics
        </NavLink>
      </li>
      <li className="p-0 mt-2">
        <NavLink to="/dashboard/usage-statics" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
          <RiBarChart2Fill size={20} /> Usage Statics
        </NavLink>
      </li>
      <li className="p-0 mt-2">
        <NavLink to="/dashboard/user-log" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
          <RiFileListFill size={20} /> User Log
        </NavLink>
      </li>
      <li className="p-0 mt-2">
        <NavLink to="/dashboard/daily-usage" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
          <RiBarChart2Fill size={20} /> Daily Usage
        </NavLink>
      </li>
      <li className="p-0 mt-2">
        <NavLink to="/dashboard/my-account" onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
          <RiUserSettingsFill size={20} /> My Account
        </NavLink>
      </li>
      
      <li className="p-3 mt-2  text-white"  style={{borderRadius:"5px",  background:"#8BC34A"}}>
      {/* <NavLink to="/dashboard/follow-ups" style={{color:"#ABD6E9"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}> */}
          <RiNewspaperFill size={20} style={{marginRight:'10px '}}/> Follow Ups
        {/* </NavLink> */}
      </li>
      <li className="p-0 mt-2">
        <NavLink to="/dashboard/car-follow-ups" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
          <RiCaravanFill size={20} /> Property Follow Ups
        </NavLink>
      </li>
      <li className="p-0 mt-2">
        <NavLink to="/dashboard/buyers-follow-ups" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
          <RiGroupFill size={20} /> Buyers Follow Ups
        </NavLink>
      </li>
      <li className="p-0 mt-2">
        <NavLink to="/dashboard/transfer-follow-ups" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
          <RiExchangeFill  size={20} /> Transfer FollowUps
        </NavLink>
      </li>
      <li className="p-0 mt-2">
        <NavLink to="/dashboard/transfer-assistant" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
          <RiHandCoinFill size={20} /> Transfer Assistant
        </NavLink>
      </li>
      <li className="p-3 mt-2  text-white"  style={{borderRadius:"5px",  background:"#8BC34A"}}>
          <RiBankCard2Fill size={20} style={{marginRight:'10px '}}/> Lead Menu
      </li>
      <li className="p-0 mt-2">
        <NavLink to="/dashboard/ba-loan-lead" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
          <RiRoadMapFill size={20} /> BA Loan Lead
        </NavLink>
      </li>
      <li className="p-0 mt-2">
        <NavLink to="/dashboard/help-loan-lead" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
          <RiQuestionAnswerFill size={20} /> Help Loan Lead
        </NavLink>
      </li>
      <li className="p-0 mt-2">
        <NavLink to="/dashboard/insurance-lead" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
          <RiTicket2Fill size={20} /> Insurance Lead
        </NavLink>
      </li>
      <li className="p-0 mt-2">
        <NavLink to="/dashboard/new-car-lead" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
          <RiCarFill size={20} /> New Property Lead
        </NavLink>
      </li>
      <li className="p-0 mt-2">
        <NavLink to="/dashboard/free-user-lead"  onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
          <RiUserFill size={20} /> Free User Lead
        </NavLink>
      </li>
      <li className="p-0 mt-2">
        <NavLink to="/dashboard/mobile-view-lead" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
          <RiCellphoneFill size={20} /> Mobile View Lead
        </NavLink>
      </li>
      <li className="p-3 mt-2  text-white"  style={{borderRadius:"5px",  background:"#8BC34A"}}>
          <RiSettings5Fill size={20} style={{marginRight:'10px '}}/> Settings
      </li>
      <li className="p-0 mt-2">
        <NavLink to="/dashboard/user-rolls" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
          <RiShieldUserFill size={20} /> User Rolls
        </NavLink>
      </li>
      <li className="p-0 mt-2">
        <NavLink to="/dashboard/limits" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
          <RiLayoutFill size={20} /> Limits
        </NavLink>
      </li>
      <li className="p-0 mt-2">
        <NavLink to="/dashboard/puc-number" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
          <RiFileListFill size={20} /> PUC Number
        </NavLink>
      </li>
      <li className="p-0 mt-2">
        <NavLink to="/dashboard/puc-banner" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
          <RiTicket2Fill size={20} /> PUC Banner
        </NavLink>
      </li>
      <li className="p-0 mt-2">
        <NavLink to="/dashboard/tuc-banner" style={{color:"rgb(226,41,151)", fontWeight:"bold"}} onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
          <RiTicket2Fill size={20} /> TUC Banner
        </NavLink>
      </li>
      <li className="p-0 mt-2">
        <NavLink to="/dashboard/profile"  onClick={toggleSidebar} className={({ isActive }) => (isActive ? "active-link rounded" : "")}>
          <RiAccountCircleFill size={20} /> Profile
        </NavLink>
      </li>

        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;





















