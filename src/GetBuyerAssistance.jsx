






import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaCity, FaMapMarkerAlt, FaLandmark, FaMoneyBillWave, FaHome, FaRegBuilding, FaCalendarAlt, FaRupeeSign ,
  FaUniversity, FaCheckCircle, FaCompass, FaFileAlt, FaBuilding, FaRuler, FaBed, FaCreditCard, FaChevronDown , FaPhone , FaClock
, FaComment,
FaEdit,
FaTrash} from "react-icons/fa";
import {MdDeleteForever} from "react-icons/md";
import imge from "./Assets/ppbuyer.png";



const GetBuyerAssistance = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    altPhoneNumber: "",
    city: "",
    area: "",
    loanInput: "",
    minPrice: "",
    maxPrice: "",
    areaUnit: "",
    noOfBHK: "",
    propertyMode: "",
    propertyType: "",
    propertyAge: "",
    bankLoan: "",
    propertyApproved: "",
    facing: "",
    state: "",
    paymentType: "",
    description: "",
  });

    const [dropdownState, setDropdownState] = useState({ activeDropdown: null, filterText: "" });
  
  const [buyerRequests, setBuyerRequests] = useState([]); // Table Data
  const [dataList, setDataList] = useState({});
  const [editId, setEditId] = useState(null); // Track if editing an existing request

  useEffect(() => {
    fetchDropdownData();
    fetchBuyerRequests();
  }, []);

  // Fetch dropdown options
  const fetchDropdownData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch`);
      const groupedData = response.data.data.reduce((acc, item) => {
        if (!acc[item.field]) acc[item.field] = [];
        acc[item.field].push(item.value);
        return acc;
      }, {});
      setDataList(groupedData);
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };

  
  const toggleDropdown = (field) => {
    setDropdownState((prevState) => ({ activeDropdown: prevState.activeDropdown === field ? null : field, filterText: "" }));
  };

  const handleDropdownSelect = (field, value) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
    setDropdownState({ activeDropdown: null, filterText: "" });
  };


  // Fetch all Buyer Assistance Requests
  const fetchBuyerRequests = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-buyerAssistance`);
      setBuyerRequests(response.data.data);
    } catch (error) {
      console.error("Error fetching buyer requests:", error);
    }
  };

  // Handle Form Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Submit Form (Add / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // Update existing request
        await axios.put(`${process.env.REACT_APP_API_URL}/update-buyerAssistance/${editId}`, formData);
        alert("Request updated successfully!");
      } else {
        // Add new request
        await axios.post(`${process.env.REACT_APP_API_URL}/add-buyerAssistance`, formData);
        alert("Request added successfully!");
      }
      setFormData({ phoneNumber: "", city: "", state: "", minPrice: "", maxPrice: "", propertyMode: "", propertyType: "" });
      setEditId(null);
      fetchBuyerRequests();
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Failed to process the request.");
    }
  };

  // Edit an Existing Request
  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-buyerAssistance/${id}`);
      setFormData(response.data.data);
      setEditId(id);
    } catch (error) {
      console.error("Error fetching request for edit:", error);
    }
  };

  // Delete a Request
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/delete-buyerAssistance/${id}`);
      alert("Request deleted successfully!");
      fetchBuyerRequests();
    } catch (error) {
      console.error("Error deleting request:", error);
      alert("Failed to delete the request.");
    }
  };

  return (
    <div className="container">
      {/* Property Assistance Form */}
      <div className="p-3" style={{fontFamily: "Inter, sans-serif" }}>

      <img src={imge} alt="" className="header-image"  style={{width:'100%'}}/>

        <h4 className="mt-3" style={{ color: "#2F747F" }}>{editId ? "Edit Property Assistance" : "Add Property Assistance"}</h4>

      <form onSubmit={handleSubmit} className="mt-3">
  
<div className="row mb-3 justify-content-between">
<div className="col-6 pe-3">
    <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%', border: '1px solid #2F747F', background: "#fff" }}>
      <FaRupeeSign className="input-icon" style={{ color: '#2F747F', marginLeft: "10px", marginRight: '10px' }} />
      <input
        type="text"
        name="minPrice"
        value={formData.minPrice}
        onChange={handleInputChange}
        className="form-input m-0"
        placeholder="Enter Min Price"
        style={{ width: '100%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
      />
    </div>
  </div>

  <div className="col-6 pe-3">
    <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', border: '1px solid #2F747F', background: "#fff" }}>
      <FaRupeeSign className="input-icon" style={{ color: '#2F747F', marginLeft: "10px" }} />
      <input
        type="text"
        name="maxPrice"
        value={formData.maxPrice}
        onChange={handleInputChange}
        className="form-input m-0"
        placeholder="Enter Max Price"
        style={{  width: '100%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
      />
    </div>
  </div>
</div>


      <div className="col-12 mb-3">
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', border: '1px solid #2F747F', background: "#fff" }}>
    <FaPhone className="input-icon" style={{ color: '#2F747F', marginLeft: "10px" }} />
    <input
      type="tel"
      name="phoneNumber"
      value={formData.phoneNumber}
      onChange={handleInputChange}
      className="form-input m-0"
      placeholder="Enter PhoneNumber"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
      />
  </div>
</div>

<div className="row justify-content-center">
  <div className="col-12 mb-3">
    <div className="input-group">
      <button type="button" style={{border: "1px solid #2F747F",}} className="btn w-100 d-flex justify-content-between align-items-center m-0 text-muted" onClick={() => toggleDropdown("propertyMode")}>
        <span><FaBuilding className="me-2" color="#2F747F"/> {formData.propertyMode || "Select Property Mode"}</span> 
        <FaChevronDown color="#2F747F"/>
      </button>
    </div>

    {dropdownState.activeDropdown === "propertyMode" && (
      <div className="dropdown-popup w-100">
        <input 
          type="text" 
          className="form-control m-0 mt-2"
          placeholder="Filter options..." 
          value={dropdownState.filterText} 
          onChange={(e) => setDropdownState((prevState) => ({ ...prevState, filterText: e.target.value }))} 
        />
        <ul className="list-group mt-2 w-100">
          {(dataList.propertyMode || [])
            .filter(option => option.toLowerCase().includes(dropdownState.filterText.toLowerCase()))
            .map((option, index) => (
              <li 
                key={index} 
                className="list-group-item list-group-item-action d-flex align-items-center" 
                onClick={() => handleDropdownSelect("propertyMode", option)}
              >
                 {option}
              </li>
          ))}
        </ul>
      </div>
    )}
  </div>
</div>

<div className="row">
  {/* Property Type */}
  <div className="col-12 mb-3">
    <div className="input-group">
      <button type="button" style={{border: "1px solid #2F747F",}} className="btn w-100 d-flex justify-content-between align-items-center m-0 text-muted" onClick={() => toggleDropdown("propertyType")}>
        <span><FaHome className="me-2" color="#2F747F" /> {formData.propertyType || "Select Property Type"}</span> 
        <FaChevronDown color="#2F747F"/>
      </button>
    </div>
    {dropdownState.activeDropdown === "propertyType" && (
      <div className="dropdown-popup w-100">
        <input type="text" className="form-control mt-2" placeholder="Filter options..." value={dropdownState.filterText} onChange={(e) => setDropdownState(prev => ({ ...prev, filterText: e.target.value }))} />
        <ul className="list-group mt-2 w-100">
          {(dataList.propertyType || []).filter(option => option.toLowerCase().includes(dropdownState.filterText.toLowerCase())).map((option, index) => (
            <li key={index} className="list-group-item list-group-item-action d-flex align-items-center" onClick={() => handleDropdownSelect("propertyType", option)}>
               {option}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
   {/* Bed */}

  <div className="col-12 mb-3">
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', border: '1px solid #2F747F', background: "#fff" }}>
    <FaBed className="input-icon" style={{ color: '#2F747F', marginLeft: "10px" }} />
    <input
      type="text"
      name="noOfBHK"
      value={formData.noOfBHK}
      onChange={handleInputChange}
      className="form-input m-0"
      placeholder="Enter No Of BHK"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>

 {/* Facing */}
 <div className="col-12 mb-3">
    <div className="input-group">
      <button type="button" style={{border: "1px solid #2F747F",}} className="btn w-100 d-flex justify-content-between align-items-center m-0 text-muted" onClick={() => toggleDropdown("facing")}>
        <span><FaCompass className="me-2" color="#2F747F" /> {formData.facing || "Select Facing"}</span> 
        <FaChevronDown color="#2F747F"/>
      </button>
    </div>
    {dropdownState.activeDropdown === "facing" && (
      <div className="dropdown-popup w-100">
        <input type="text" className="form-control mt-2" placeholder="Filter options..." value={dropdownState.filterText} onChange={(e) => setDropdownState(prev => ({ ...prev, filterText: e.target.value }))} />
        <ul className="list-group mt-2 w-100">
          {(dataList.facing || []).filter(option => option.toLowerCase().includes(dropdownState.filterText.toLowerCase())).map((option, index) => (
            <li key={index} className="list-group-item list-group-item-action d-flex align-items-center" onClick={() => handleDropdownSelect("facing", option)}>
              {option}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>

    {/* Property Approved */}
    <div className="col-12 mb-3">
    <div className="input-group">
      <button type="button" style={{border: "1px solid #2F747F",}} className="btn w-100 d-flex justify-content-between align-items-center m-0 text-muted" onClick={() => toggleDropdown("propertyApproved")}>
        <span><FaCheckCircle className="me-2" color="#2F747F" /> {formData.propertyApproved || "Select Property Approved"}</span> 
        <FaChevronDown color="#2F747F"/>
      </button>
    </div>
    {dropdownState.activeDropdown === "propertyApproved" && (
      <div className="dropdown-popup w-100">
        <input type="text" className="form-control mt-2" placeholder="Filter options..." value={dropdownState.filterText} onChange={(e) => setDropdownState(prev => ({ ...prev, filterText: e.target.value }))} />
        <ul className="list-group mt-2 w-100">
          {(dataList.propertyApproved || []).filter(option => option.toLowerCase().includes(dropdownState.filterText.toLowerCase())).map((option, index) => (
            <li key={index} className="list-group-item list-group-item-action d-flex align-items-center" onClick={() => handleDropdownSelect("propertyApproved", option)}>
             {option}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>

  
  {/* Bank Loan */}
  <div className="col-12 mb-3">
    <div className="input-group">
      <button type="button" style={{border: "1px solid #2F747F",}} className="btn w-100 d-flex justify-content-between align-items-center m-0 text-muted" onClick={() => toggleDropdown("bankLoan")}>
        <span><FaUniversity className="me-2" color="#2F747F" /> {formData.bankLoan || "Select Bank Loan"}</span> 
        <FaChevronDown color="#2F747F"/>
      </button>
    </div>
    {dropdownState.activeDropdown === "bankLoan" && (
      <div className="dropdown-popup w-100">
        <input type="text" className="form-control mt-2" placeholder="Filter options..." value={dropdownState.filterText} onChange={(e) => setDropdownState(prev => ({ ...prev, filterText: e.target.value }))} />
        <ul className="list-group mt-2 w-100">
          {(dataList.bankLoan || []).filter(option => option.toLowerCase().includes(dropdownState.filterText.toLowerCase())).map((option, index) => (
            <li key={index} className="list-group-item list-group-item-action d-flex align-items-center" onClick={() => handleDropdownSelect("bankLoan", option)}>
               {option}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>

  {/* Property Age */}
  <div className="col-12 mb-3">
    <div className="input-group">
      <button type="button" style={{border: "1px solid #2F747F",}} className="btn w-100 d-flex justify-content-between align-items-center m-0 text-muted" onClick={() => toggleDropdown("propertyAge")}>
        <span><FaClock className="me-2" color="#2F747F" /> {formData.propertyAge || "Select Property Age"}</span> 
        <FaChevronDown color="#2F747F"/>
      </button>
    </div>
    {dropdownState.activeDropdown === "propertyAge" && (
      <div className="dropdown-popup w-100">
        <input type="text" className="form-control mt-2" placeholder="Filter options..." value={dropdownState.filterText} onChange={(e) => setDropdownState(prev => ({ ...prev, filterText: e.target.value }))} />
        <ul className="list-group mt-2 w-100">
          {(dataList.propertyAge || []).filter(option => option.toLowerCase().includes(dropdownState.filterText.toLowerCase())).map((option, index) => (
            <li key={index} className="list-group-item list-group-item-action d-flex align-items-center" onClick={() => handleDropdownSelect("propertyAge", option)}>
           {option}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>



 
</div>

<div className="col-12 mb-3">
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', border: '1px solid #2F747F', background: "#fff" }}>
    <FaCity className="input-icon" style={{ color: '#2F747F', marginLeft: "10px" }} />
    <input
      type="text"
      name="city"
      value={formData.city}
      onChange={handleInputChange}
      className="form-input m-0"
      placeholder="Enter City"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>

<div className="col-12 mb-3">
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', border: '1px solid #2F747F', background: "#fff" }}>
    <FaMapMarkerAlt className="input-icon" style={{ color: '#2F747F', marginLeft: "10px" }} />
    <input
      type="text"
      name="state"
      value={formData.state}
      onChange={handleInputChange}
      className="form-input m-0"
      placeholder="Enter State"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>

<div className="col-12 mb-3">
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', border: '1px solid #2F747F', background: "#fff" }}>
    <FaLandmark className="input-icon" style={{ color: '#2F747F', marginLeft: "10px" }} />
    <input
      type="text"
      name="area"
      value={formData.area}
      onChange={handleInputChange}
      className="form-input m-0"
      placeholder="Enter Area"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>







{/* Area Unit Dropdown */}
<div className="col-12 mb-3">
  <div className="input-group">
    <button type="button" style={{ border: "1px solid #2F747F" }} className="btn w-100 d-flex justify-content-between align-items-center m-0 text-muted" onClick={() => toggleDropdown("areaUnit")}>
      <span><FaRuler className="me-2" color="#2F747F" /> {formData.areaUnit || "Select Area Unit"}</span> 
      <FaChevronDown color="#2F747F" />
    </button>
  </div>
  {dropdownState.activeDropdown === "areaUnit" && (
    <div className="dropdown-popup w-100">
      <input type="text" className="form-control mt-2" placeholder="Filter options..." value={dropdownState.filterText} onChange={(e) => setDropdownState(prev => ({ ...prev, filterText: e.target.value }))} />
      <ul className="list-group mt-2 w-100">
        {(dataList.areaUnit || []).filter(option => option.toLowerCase().includes(dropdownState.filterText.toLowerCase())).map((option, index) => (
          <li key={index} className="list-group-item list-group-item-action d-flex align-items-center" onClick={() => handleDropdownSelect("areaUnit", option)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  )}
</div>



<div className="col-12 mb-3">
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', border: '1px solid #2F747F', background: "#fff" }}>
    <FaCreditCard className="input-icon" style={{ color: '#2F747F', marginLeft: "10px" }} />
    <input
      type="text"
      name="paymentType"
      value={formData.paymentType}
      onChange={handleInputChange}
      className="form-input m-0"
      placeholder="Enter Payment Type"
      style={{ flex: '1 0 80%', padding: '8px', fontSize: '14px', border: 'none', outline: 'none' }}
    />
  </div>
</div>
<div className="col-12 mb-3">
  <div className="input-card p-0 rounded-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', border: '1px solid #2F747F', background: "#fff" }}>
    {/* <FaComment className="input-icon" style={{ color: '#2F747F', marginLeft: "10px" }} /> */}
    <textarea
      name="description"
      value={formData.description}
      onChange={handleInputChange}
      className="form-input m-0"
      placeholder="Enter Description"
      style={{
        flex: '1 0 80%',
        padding: '8px',
        fontSize: '14px',
        border: 'none',
        outline: 'none',
        resize: 'none',  // Optional: Prevent resizing of the textarea
        minHeight: '100px' // Optional: Set a minimum height
      }}
    />
  </div>
</div>

     
  

        <button type="submit" className="submit-button" style={{ padding: "10px 20px", cursor: "pointer", background:"#6CBAAF", border:'none', color:'#ffffff'}}>
          {formData._id ? "UPDATE PROPERTY ASSISTANCE" : "ADD PROPERTY ASSISTANCE"}
        </button>
      </form>


      </div>

      {/* Table to Display Submitted Requests */}
      <div className="mt-5">
      <div style={{ width: "100%" }}>
      <div style={{ maxHeight: "500px", overflowY: "scroll", scrollbarWidth: "none" }}>
  <h4 className="mb-3 fw-bold "> Buyer Assistance Requests </h4>
  <table className="table">
    <thead>
      <tr>
        <th>Phone</th>
        <th>Alt Phone</th>
        <th>City</th>
        <th>Area</th>
        <th>State</th>
        <th>Min Price</th>
        <th>Max Price</th>
        <th>Area Unit</th>
        <th>No. of BHK</th>
        <th>Property Mode</th>
        <th>Property Type</th>
        <th>Property Age</th>
        <th>Bank Loan</th>
        <th>Property Approved</th>
        <th>Facing</th>
        <th>Payment Type</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {buyerRequests.map((request, index) => (
        <tr key={index}>
          <td>{request.phoneNumber}</td>
          <td>{request.altPhoneNumber}</td>
          <td>{request.city}</td>
          <td>{request.area}</td>
          <td>{request.state}</td>
          <td>{request.minPrice}</td>
          <td>{request.maxPrice}</td>
          <td>{request.areaUnit}</td>
          <td>{request.noOfBHK}</td>
          <td>{request.propertyMode}</td>
          <td>{request.propertyType}</td>
          <td>{request.propertyAge}</td>
          <td>{request.bankLoan}</td>
          <td>{request.propertyApproved}</td>
          <td>{request.facing}</td>
          <td>{request.paymentType}</td>
          <td>{request.description}</td>
          <td>
                                                    <span className="edit text-primary" onClick={() => handleEdit(request._id)}> <FaEdit /></span>
                                                    <span className="delete text-danger ms-3 fs-5" onClick={() => handleDelete(request._id)}><MdDeleteForever /></span>
                                                </td>
        </tr>
      ))}
     
            {buyerRequests.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center">No Requests Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div></div>
    </div>
  );
};

export default GetBuyerAssistance;

