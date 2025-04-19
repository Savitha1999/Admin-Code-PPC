




import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";

function GetForm() {
  const [ppcId, setPpcId] = useState(null);
  const [formData, setFormData] = useState({
    ppcId: "",
    phoneNumber: "",
    rentalPropertyAddress: "",
    state: "",
    city: "",
    district: "",
    area: "",
    streetName: "",
    doorNumber: "",
    nagar: "",
    ownerName: "",
    email: "",
    alternatePhone: "",
    video: "",
    photos: [],
    propertyMode: "",
    propertyType: "",
    bankLoan: "",
    negotiation: "",
    ownership: "",
    bedrooms: "",
    kitchen: "",
    kitchenType: "",
    balconies: "",
    floorNo: "",
    areaUnit: "",
    propertyApproved: "",
    propertyAge: "",
    postedBy: "",
    facing: "",
    salesMode: "",
    salesType: "",
    furnished: "",
    lift: "",
    attachedBathrooms: "",
    western: "",
    numberOfFloors: "",
    carParking: "",
    bestTimeToCall: "",
  });

  const adminName = useSelector((state) => state.admin.name);
  

  // ✅ Record view on mount
useEffect(() => {
 const recordDashboardView = async () => {
   try {
     await axios.post(`${process.env.REACT_APP_API_URL}/record-view`, {
       userName: adminName,
       viewedFile: "GetForm",
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
    const fetchPpcId = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/latest-ppcid`);
        const nextPpcId = response.data.latestPpcId ? response.data.latestPpcId + 1 : 1001;
        setPpcId(nextPpcId);
      } catch (error) {
        console.error('Error fetching the latest ppcId:', error);
      }
    };

    fetchPpcId();
  }, []);

  const [dataList, setDataList] = useState({}); // Object to store dropdown options for each field

  // Fetch dropdown options for all fields
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

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
    setFormData({ ...formData, photos: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/add-property`, formData);
      alert(response.data.message);
      if (response.data.message === "Property Added Successfully") {
        // Redirect or handle success
      }
    } catch (error) {
      console.error("Error saving property data:", error);
    }
  };

  useEffect(() => {
    fetchDropdownData(); // Fetch dropdown options when the component mounts
  }, []);

  return (
    <div>
      <h1>Property Management</h1>
      <form onSubmit={handleSubmit}>
      <p className='p-3' style={{color:"white",backgroundColor:"rgb(47,116,127)"}}>PPC-ID: {ppcId}</p>
      {Object.keys(formData).map((field) => {
          if (field === "photos") {
            return (
              <div key={field} style={{ marginBottom: "15px" }}>
                <label>
                  Upload Photos:
                  <input
                    type="file"
                    name={field}
                    multiple
                    onChange={handlePhotoChange}
                    className="form-control"
                  />
                </label>
                <div>
                  {formData.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Property ${index + 1}`}
                      style={{ width: "100px", marginRight: "10px" }}
                    />
                  ))}
                </div>
              </div>
            );
          } else if (
            [
              "propertyMode",
              "propertyType",
              "bankLoan",
              "negotiation",
              "ownership",
              "bedrooms",
              "kitchen",
              "kitchenType",
              "balconies",
              "floorNo",
              "areaUnit",
              "propertyApproved",
              "propertyAge",
              "postedBy",
              "facing",
              "salesMode",
              "salesType",
              "furnished",
              "lift",
              "attachedBathrooms",
              "western",
              "numberOfFloors",
              "carParking",
              "bestTimeToCall",
            ].includes(field)
          ) {
            return (
              <div key={field} style={{ marginBottom: "15px" }}>
                <label>
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}:
                  <select
                    name={field}
                    value={formData[field] || ""}
                    onChange={handleFieldChange}
                    className="form-control"
                  >
                    <option value="">Select {field}</option>
                    {dataList[field]?.map((value, index) => (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            );
          } else {
            return (
              <div key={field} style={{ marginBottom: "15px" }}>
                <label>
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}:
                  <input
                    type="text"
                    name={field}
                    value={formData[field] || ""}
                    onChange={handleFieldChange}
                    className="form-control"
                  />
                </label>
              </div>
            );
          }
        })}
        <button type="submit" className="btn btn-primary">
          Save Property
        </button>
      </form>
    </div>
  );
}

export default GetForm;
