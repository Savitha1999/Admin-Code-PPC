





import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { RiLayoutLine } from 'react-icons/ri';
import { TbArrowLeftRight } from 'react-icons/tb';
import {  FaBath, FaChartArea, FaPhone ,FaEdit, FaHome, FaUserAlt, FaEnvelope,  FaRupeeSign , FaFileVideo , FaToilet,FaCar,FaBed,  FaCity , FaTimes} from 'react-icons/fa';
import {  FaRegAddressCard } from 'react-icons/fa6';
import { MdLocationOn, MdOutlineMeetingRoom, MdOutlineOtherHouses, MdSchedule , MdStraighten , MdApproval, MdLocationCity , MdAddPhotoAlternate} from "react-icons/md";
import { BsBank, BsBuildingsFill, BsFillHouseCheckFill , BsTextareaT} from "react-icons/bs";
import { GiKitchenScale, GiMoneyStack , GiResize , GiGears} from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi";
import { BiBuildingHouse , BiWorld} from "react-icons/bi";
import { IoCloseCircle } from "react-icons/io5";
import moment from "moment";
import { useSelector } from "react-redux";

function AddProperty() {
  const location = useLocation();
  // const ppcId = location.state?.ppcId || "";
  const [ppcId, setPpcId] = useState(location.state?.ppcId || ""); 
  // const [ppcId, setPpcId] = useState(null);
  const [formData, setFormData] = useState({
    // ppcId: "",
    propertyMode: '',
    propertyType: '',
    price: '',
    priceData: '',
    propertyAge: '',
    bankLoan: '',
    negotiation: '',
    length: '',
    breadth: '',
    totalArea: '',
    ownership: '',
    bedrooms: '',
    kitchen: '',
    kitchenType: '',
    balconies: '',
    floorNo: '',
    areaUnit: '',
    propertyApproved: '',
    postedBy: '',
    facing: '',
    salesMode: '',
    salesType: '',
    description: '',
    furnished: '',
    lift: '',
    attachedBathrooms: '',
    western: '',
    numberOfFloors: '',
    carParking: '',
    rentalPropertyAddress: '',
    country: '',
    state: '',
    city: '',
    district: '',
    area: '',
    streetName: '',
    doorNumber: '',
    nagar: '',
    ownerName: '',
    email: '',
    phoneNumber: "",
  phoneNumberCountryCode: "",
  alternatePhone: "",
  alternatePhoneCountryCode: "",
    bestTimeToCall: '',
  });
  const [photos, setPhotos] = useState([]);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [video, setVideo] = useState(null);

  const adminName = useSelector((state) => state.admin.name);
  

  // ✅ Record view on mount
useEffect(() => {
 const recordDashboardView = async () => {
   try {
     await axios.post(`${process.env.REACT_APP_API_URL}/record-view`, {
       userName: adminName,
       viewedFile: "Add Property",
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

  const [dropdownState, setDropdownState] = useState({
    activeDropdown: null,
    filterText: "",
  });

  // Toggle dropdown visibility
  const toggleDropdown = (field) => {
    setDropdownState((prevState) => ({
      activeDropdown: prevState.activeDropdown === field ? null : field,
      filterText: "",
    }));
  };

  // Handle dropdown selection
  const handleDropdownSelect = (field, value) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
    setDropdownState({ activeDropdown: null, filterText: "" });
  };

  // Handle filter input change for dropdown
  const handleFilterChange = (e) => {
    setDropdownState((prevState) => ({ ...prevState, filterText: e.target.value }));
  };
  
 

  const [countryCodes, setCountryCodes] = useState([
    { code: '+1', country: 'USA/Canada' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'India' },
    { code: '+61', country: 'Australia' },
    { code: '+81', country: 'Japan' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
    { code: '+34', country: 'Spain' },
    { code: '+55', country: 'Brazil' },
    { code: '+52', country: 'Mexico' },
    { code: '+86', country: 'China' },
    { code: '+39', country: 'Italy' },
    { code: '+7', country: 'Russia/Kazakhstan' },
    // ... other countries
  ]);
  const [alternateCountryCodes, setAlternateCountryCodes] = useState([
    { code: '+1', country: 'USA/Canada' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'India' },
    { code: '+61', country: 'Australia' },
    { code: '+81', country: 'Japan' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
    { code: '+34', country: 'Spain' },
    { code: '+55', country: 'Brazil' },
    { code: '+52', country: 'Mexico' },
    { code: '+86', country: 'China' },
    { code: '+39', country: 'Italy' },
    { code: '+7', country: 'Russia/Kazakhstan' },
  ]);
  
  
  const [dataList, setDataList] = useState({});

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

  useEffect(() => {
    fetchDropdownData();
  }, []);

  

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const maxSize = 10 * 1024 * 1024; // 10MB
    for (let file of files) {
      if (file.size > maxSize) {
        alert('File size exceeds the 10MB limit');
        return;
      }
    }
    if (photos.length + files.length <= 15) {
      setPhotos([...photos, ...files]);
      setSelectedPhotoIndex(0);
    } else {
      alert('Maximum 15 photos can be uploaded.');
    }
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
    if (index === selectedPhotoIndex) {
      setSelectedPhotoIndex(0);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      alert('File size exceeds the 50MB limit');
      return;
    }
    setVideo(file);
  };

  const removeVideo = () => {
    setVideo(null);
  };

  const handlePhotoSelect = (index) => {
    setSelectedPhotoIndex(index);
  };

  // const handleFieldChange = (e) => {
  //   const { name, value } = e.target;
  //   // setFormData({ ...formData, [name]: value });
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value, // This dynamically updates the correct field (phoneNumberCountryCode or alternatePhoneCountryCode)
  //   }));
    
  // };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "price" ? Number(value) || 0 : value, // Ensure price is a number
    }));
  };
  


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    let newPpcId = ppcId; // Use existing PPC-ID if available

    // 🔹 Generate PPC-ID only if it's not already stored
    if (!newPpcId) {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/store-id`);
      if (response.status === 201 && response.data.ppcId) {
        newPpcId = response.data.ppcId;
        setPpcId(newPpcId);
        localStorage.setItem("ppcId", newPpcId); // 🔥 Store PPC-ID in localStorage
      } else {
        alert("Failed to generate PPC-ID. Please try again.");
        return;
      }
    }

    // 🔹 Create FormData instance for file uploads
    const formDataToSend = new FormData();

    // Append PPC-ID (existing or newly generated)
    formDataToSend.append("ppcId", newPpcId);

    // Append form fields
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    // Append photos
    photos.forEach((photo) => {
      formDataToSend.append("photos", photo);
    });

    // Append video if available
    if (video) {
      formDataToSend.append("video", video);
    }

    // 🔹 Submit the property update request (update if PPC-ID exists)
    const propertyResponse = await axios.post(
      `${process.env.REACT_APP_API_URL}/update-property`,
      formDataToSend,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    alert(propertyResponse.data.message);
  } catch (error) {
    console.error("Error saving property data:", error);
    alert("An error occurred while submitting the property data.");
  }
};


useEffect(() => {
  const storedPpcId = localStorage.getItem("ppcId");

  if (!storedPpcId) {
    localStorage.removeItem("ppcId"); // Reset PPC-ID when user leaves and returns
  }
}, []);

const fieldIcons = {
  // Contact Details
  phoneNumber: <FaPhone color="#2F747F" />,
  alternatePhone: <FaPhone color="#2F747F" />,
  email: <FaEnvelope color="#2F747F" />,
  bestTimeToCall: <MdSchedule color="#2F747F" />,
  
  // Property Location
  rentalPropertyAddress: <MdLocationCity color="#2F747F" />,
  country: <BiWorld color="#2F747F" />,
  state: <MdLocationCity color="#2F747F" />,
  city: <FaCity color="#2F747F" />,
  district: <FaRegAddressCard color="#2F747F" />,
  area: <MdLocationOn color="#2F747F" />,
  streetName: <RiLayoutLine color="#2F747F" />,
  doorNumber: <BiBuildingHouse color="#2F747F" />,
  nagar: <FaRegAddressCard color="#2F747F" />,

  // Ownership & Posting Info
  ownerName: <FaUserAlt color="#2F747F" />,
  postedBy: <FaUserAlt color="#2F747F" />,
  ownership: <HiUserGroup color="#2F747F" />,

  // Property Details
  propertyMode: <MdApproval color="#2F747F" />,
  propertyType: <MdOutlineOtherHouses color="#2F747F" />,
  propertyApproved: <BsFillHouseCheckFill color="#2F747F" />,
  propertyAge: <MdSchedule color="#2F747F" />,
  description: <BsTextareaT color="#2F747F" />,

  // Pricing & Financials
  price: <FaRupeeSign color="#2F747F" />,
  bankLoan: <BsBank color="#2F747F" />,
  negotiation: <GiMoneyStack color="#2F747F" />,

  // Measurements
  length: <MdStraighten color="#2F747F" />,
  breadth: <MdStraighten color="#2F747F" />,
  totalArea: <GiResize color="#2F747F" />,
  areaUnit: <FaChartArea color="#2F747F" />,

  // Room & Floor Details
  bedrooms: <FaBed color="#2F747F" />,
  kitchen: <GiKitchenScale color="#2F747F" />,
  kitchenType: <GiKitchenScale color="#2F747F" />,
  balconies: <MdOutlineMeetingRoom color="#2F747F" />,
  floorNo: <BsBuildingsFill color="#2F747F" />,
  numberOfFloors: <BsBuildingsFill color="#2F747F" />,
  attachedBathrooms: <FaBath color="#2F747F" />,
  western: <FaToilet  color="#2F747F" />,

  // Features & Amenities
  facing: <TbArrowLeftRight color="#2F747F" />,
  salesMode: <GiGears color="#2F747F" />,
  salesType: <MdOutlineOtherHouses color="#2F747F" />,
  furnished: <FaHome color="#2F747F" />,
  lift: <BsBuildingsFill color="#2F747F" />,
  carParking: <FaCar color="#2F747F" />,
};

const fieldLabels = {
  propertyMode: "Property Mode",
  propertyType: "Property Type",
  price: "Price",
  propertyAge: "Property Age",
  bankLoan: "Bank Loan",
  negotiation: "Negotiation",
  length: "Length",
  breadth: "Breadth",
  totalArea: "Total Area",
  ownership: "Ownership",
  bedrooms: "Bedrooms",
  kitchen: "Kitchen",
  kitchenType: "Kitchen Type",
  balconies: "Balconies",
  floorNo: "Floor No.",
  areaUnit: "Area Unit",
  propertyApproved: "Property Approved",
  postedBy: "Posted By",
  facing: "Facing",
  salesMode: "Sales Mode",
  salesType: "Sales Type",
  description: "Description",
  furnished: "Furnished",
  lift: "Lift",
  attachedBathrooms: "Attached Bathrooms",
  western: "Western Toilet",
  numberOfFloors: "Number of Floors",
  carParking: "Car Parking",
  rentalPropertyAddress: "Property Address",
  country: "Country",
  state: "State",
  city: "City",
  district: "District",
  area: "Area",
  streetName: "Street Name",
  doorNumber: "Door Number",
  nagar: "Nagar",
  ownerName: "Owner Name",
  email: "Email",
  phoneNumber: "Phone Number",
  phoneNumberCountryCode: "Phone Country Code",
  alternatePhone: "Alternate Phone",
  alternatePhoneCountryCode: "Alternate Phone Country Code",
  bestTimeToCall: "Best Time to Call",
};

    const renderDropdown = (field) => {
      const options = dataList[field] || [];
      const filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(dropdownState.filterText.toLowerCase())
      );
  
      return (
        dropdownState.activeDropdown === field && (
          <div
            className="dropdown-popup"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#fff',
              width: '100%',
              maxWidth: '400px',
              padding: '10px',
              zIndex: 10,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              overflowY: 'auto',
              maxHeight: '50vh',
              animation: 'popupOpen 0.3s ease-in-out',
            }}
          >
                        <div
          style={{
            fontWeight: "bold",
            fontSize: "16px",
            marginBottom: "10px",
            textAlign: "start",
            color: "#019988",
          }}
        >
           {fieldLabels[field] || "Property Field"}
        </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <input
                type="text"
                placeholder="Filter options..."
                value={dropdownState.filterText}
                onChange={handleFilterChange}
                style={{
                  width: '80%',
                  padding: '5px',
                  marginBottom: '10px',
                }}
              />
              <button
                type="button"
                onClick={() => toggleDropdown(field)}
                style={{
                  cursor: 'pointer',
                  border: 'none',
                  background: 'none',
                }}
              >
                <FaTimes size={18} color="red" />
              </button>
            </div>
            <ul
              style={{
                listStyleType: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              {filteredOptions.map((option, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setFormData((prevState) => ({
                      ...prevState,
                      [field]: option,
                    }));
                    toggleDropdown(field);
                  }}
                  style={{
                    padding: '5px',
                    cursor: 'pointer',
                    backgroundColor: '#f9f9f9',
                    marginBottom: '5px',
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )
      );
    };



const selectFields = [
  "propertyMode", "propertyType", "bankLoan", "negotiation", "ownership", 
  "bedrooms", "kitchen", "kitchenType", "balconies", "floorNo", 
  "areaUnit", "propertyApproved", "propertyAge", "postedBy", "facing", 
  "salesMode", "salesType", "furnished", "lift", "attachedBathrooms", 
  "western", "numberOfFloors", "carParking", "bestTimeToCall"
];

const inputFields = [
  "rentalPropertyAddress", "state", "city", "district", "area",
  "streetName", "doorNumber", "nagar", "ownerName", "email",
  "phoneNumber", "alternatePhone","price"
];


const fields = [
  { name: "propertyMode", type: "select" },
  { name: "propertyType", type: "select" },
  { name: "price", type: "input" },
  { name: "negotiation", type: "select" },
  { name: "length", type: "input" },
  { name: "breadth", type: "input" },
  { name: "totalArea", type: "input" },
  { name: "areaUnit", type: "select" },
  { name: "ownership", type: "select" },
  { name: "bedrooms", type: "select" },
  { name: "kitchen", type: "select" },
  { name: "kitchenType", type: "select" },
  { name: "balconies", type: "select" },
  { name: "floorNo", type: "select" },
  { name: "propertyApproved", type: "select" },
  { name: "propertyAge", type: "select" },
  { name: "bankLoan", type: "select" },
  { name: "facing", type: "select" },
  { name: "salesMode", type: "select" },
  { name: "salesType", type: "select" },
  { name: "postedBy", type: "select" },
  { name: "description", type: "input" },
  { name: "furnished", type: "select" },
  { name: "lift", type: "select" },
  { name: "attachedBathrooms", type: "select" },
  { name: "western", type: "select" },
  { name: "numberOfFloors", type: "select" },
  { name: "carParking", type: "select" },
  { name: "rentalPropertyAddress", type: "input" },
  { name: "country", type: "input" },
  { name: "state", type: "input" },
  { name: "city", type: "input" },
  { name: "district", type: "input" },
  { name: "area", type: "input" },
  { name: "streetName", type: "input" },
  { name: "doorNumber", type: "input" },
  { name: "nagar", type: "input" },
  { name: "ownerName", type: "input" },
  { name: "email", type: "input" },
  { name: "phoneNumber", type: "input" },
  { name: "alternatePhone", type: "input" },
  { name: "bestTimeToCall", type: "select" },
];




  return (
    <div className="d-flex align-items-center justify-content-center">
    <div      style={{
              width: '100%',
              maxWidth: '450px',
              minWidth: '300px',
              padding: '5px',
              borderRadius: '8px',
              margin: '0 5px',
            }}>
      <h1>Property Management</h1>
      <form className="addForm" onSubmit={handleSubmit}>
        <p className="p-3" style={{ color: "white", backgroundColor: "rgb(47,116,127)" }}>PPC-ID: {ppcId}</p>


                        <h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}> Property Images  </h4>

<div className="form-group photo-upload-container mt-2">
  <input
    type="file"
    multiple
    accept="image/*"
    onChange={handlePhotoUpload}
    name="photos"
    id="photo-upload"
    className="photo-upload-input"
    style={{ display: 'none' }} // Hide the input field
  />
  <label htmlFor="photo-upload" className="photo-upload-label fw-normal m-0">
    <MdAddPhotoAlternate
      style={{
        color: 'white',
        backgroundColor: '#2e86e4',
        padding: '5px',
        fontSize: '30px',
        borderRadius: '50%',
        marginRight: '5px',
      }}
    />
    Upload Your Property Images
  </label>
</div>

        {photos.length > 0 && (
          <div className="uploaded-photos">
            <h4>Uploaded Photos</h4>
            <div className="uploaded-photos-grid">
              {photos.map((photo, index) => (
                <div key={index} className="uploaded-photo-item">
                  <input
                    type="radio"
                    name="selectedPhoto"
                    className="me-1"
                    checked={selectedPhotoIndex === index}
                    onChange={() => handlePhotoSelect(index)}
                  />
                                                       

                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Uploaded"
                    className="uploaded-photo mb-3"
                  />
                   <button
   style={{border:"none"}}
   className="position-absolute top-0 end-0 btn m-0 p-1"    
   onClick={() => removePhoto(index)}
                  >
                    <IoCloseCircle size={20} color="#F22952"/>
                    </button>
                {/* </div> */}

                
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video Upload Section */}
        <h4 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }}>Property Video</h4>
        <div className="form-group">
          <input
            type="file"
            name="video"
            accept="video/*"
            id="videoUpload"
            onChange={handleVideoChange}
            className="d-none"
          />
          <label htmlFor="videoUpload" className="file-upload-label fw-normal">
            <span className="pt-5">
              <FaFileVideo
                style={{
                  color: 'white',
                  backgroundColor: '#2e86e4',
                  padding: '5px',
                  fontSize: '30px',
                  marginRight: '5px',
                }}
              />
              Upload Property Video
            </span>
          </label>

          {/* Display the selected video */}
          {video && (
            <div className="selected-video-container">
              <h4 className="text-start">Selected Video:</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <video width="200" controls>
                  <source src={URL.createObjectURL(video)} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <Button
                  variant="danger"
                  onClick={removeVideo}
                  style={{ height: '40px' }}
                >
                  Remove
                </Button>
              </div>
            </div>
          )}
        </div>



{fields.map(({ name, type }) => (
  <div key={name} className="form-group">
    <label style={{ color: "#2F747F", fontWeight: "bold", display: "block", marginBottom: "5px" }}>
      {name.replace(/([A-Z])/g, " $1").trim()}:
    </label>

    {type === "select" ? (
      // Custom Styled Select
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: "1" }}>
          <label>
            <select
              name={name}
              value={formData[name] || ""}
              onChange={handleFieldChange}
              className="form-control"
              style={{ display: "none" }} // Hide the default <select> dropdown
            >
              <option value="">Select {name.replace(/([A-Z])/g, " $1")}</option>
              {dataList[name]?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button className="m-0"
              type="button"
              onClick={() => toggleDropdown(name)}
              style={{
                cursor: "pointer",
                border: "1px solid #2F747F",
                padding: "10px",
                background: "#fff",
                borderRadius: "5px",
                width: "100%",
                textAlign: "left",
                color: "#2F747F",
              }}
            >
              <span style={{ marginRight: "10px" }}>
                {fieldIcons[name] || <FaHome />}
              </span>
              {formData[name] || `Select ${name.replace(/([A-Z])/g, " $1")}`}
            </button>

            {renderDropdown(name)}
          </label>
        </div>
      </div>
    ) : name === "description" ? (
      // Textarea for Description
      <div
        className="input-card p-0 rounded-1"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          border: "1px solid #2F747F",
          background: "#fff",
        }}
      >
        <span className="input-icon" style={{ color: "#2F747F", marginLeft: "10px" }}>
          {fieldIcons[name] || <FaEdit />}
        </span>

        <textarea
          name={name}
          value={formData[name] || ""}
          onChange={handleFieldChange}
          className="form-input m-0"
          placeholder={`Enter ${name.replace(/([A-Z])/g, " $1")}`}
          style={{
            flex: "1 0 70%",
            padding: "8px",
            fontSize: "14px",
            border: "none",
            outline: "none",
            minHeight: "100px",
            resize: "vertical",
            color: "#2F747F", // Placeholder text color
          }}
        />
      </div>
    ) : (
      // Custom Styled Input
      <div
        className="input-card p-0 rounded-1"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          border: "1px solid #2F747F",
          background: "#fff",
        }}
      >
        <span className="input-icon" style={{ color: "#2F747F", marginLeft: "10px" }}>
          {fieldIcons[name] || <FaEdit />}
        </span>

        {name === "phoneNumber" && (
          <select
            name="phoneNumberCountryCode"
            value={formData.phoneNumberCountryCode || ""}
            onChange={handleFieldChange}
            className="form-control m-0"
            style={{
              width: "30%",
              padding: "8px",
              fontSize: "14px",
              border: "none",
              outline: "none",
            }}
          >
            <option value="">Select Country Code</option>
            {countryCodes.map((item, index) => (
              <option key={index} value={item.code}>
                {item.code} - {item.country}
              </option>
            ))}
          </select>
        )}

        {name === "alternatePhone" && (
          <select
            name="alternatePhoneCountryCode"
            value={formData.alternatePhoneCountryCode || ""}
            onChange={handleFieldChange}
            className="form-control m-0"
            style={{
              width: "30%",
              padding: "8px",
              fontSize: "14px",
              border: "none",
              outline: "none",
            }}
          >
            <option value="">Select Country Code</option>
            {alternateCountryCodes.map((item, index) => (
              <option key={index} value={item.code}>
                {item.code} - {item.country}
              </option>
            ))}
          </select>
        )}

        <input
          type={name === "email" ? "email" : "text"}
          name={name}
          value={formData[name] || ""}
          onChange={handleFieldChange}
          className="form-input m-0"
          placeholder={`Enter ${name.replace(/([A-Z])/g, " $1")}`}
          style={{
            flex: "1 0 70%",
            padding: "8px",
            fontSize: "14px",
            border: "none",
            outline: "none",
            color: "#2F747F", // Placeholder text color
          }}
        />
      </div>
    )}
  </div>
))}
 
        <button type="submit" style={{background:"#2F747F", color:"#fff"}}>
          Save Property
        </button>
      </form>
    </div>
    </div>
  );
}

export default AddProperty;


