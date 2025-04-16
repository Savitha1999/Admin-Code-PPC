





import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminForm() {
  const [formData, setFormData] = useState({
    propertyMode: "",
    propertyType: "",
    bankLoan: "",
    negotiation: "",
    ownership: "",
    bedrooms: "", // Bedrooms now handled separately
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
    alternatePhone: "",
  });

  const [dataList, setDataList] = useState([]); // Data list for the active field
  const [activeField, setActiveField] = useState("propertyMode"); // Default active field

  // Fetch data for the active field from the backend
  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch`);
      setDataList(response.data.data || []); // Assuming backend returns `data` for activeField
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle input changes for the active field
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 

  const handleAddField = async () => {
    if (!formData[activeField]) {
      alert(`Please enter a value for ${activeField}`);
      return;
    }
  
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/adds`, {
        field: activeField,
        value: formData[activeField],
      });
      alert(`${activeField} added successfully!`);
      setFormData({ ...formData, [activeField]: "" }); // Clear the input field
      fetchData(); // Refresh the data list
    } catch (error) {
      console.error(`Error adding ${activeField}:`, error);
      alert(`Error adding data: ${error.response?.data?.error || error.message}`);
    }
  };
  
  
  // Set the active field for dynamic management
  const handleSetActiveField = (field) => {
    setActiveField(field);
    fetchData(); // Fetch data for the selected field
  };

  useEffect(() => {
    fetchData(); // Fetch initial data for the default field
  }, [activeField]);

  const handleEditField = async (field, value) => {
    const newValue = prompt(`Enter the updated value for ${field}:`);
    if (!newValue) return;
  
    console.log("Updating field:", { field, value, newValue });
  
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/update`, {
        field,     // Field to update (e.g., propertyMode)
        value,     // Current value of the field (e.g., commercial)
        newValue,  // New value provided by the user
      });
      alert(`${field} updated successfully!`);
      fetchData(); // Refresh the data list
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };
  

  const handleDeleteField = async (field, value) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete this ${field}?`);
    if (!confirmDelete) return;
  
    console.log("Deleting field:", { field, value }); // Debugging log
  
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/delete`, {
        data: { field, value }, // Send field and value in the request body
      });
      alert(`${field} deleted successfully!`);
      fetchData(); // Refresh the data list
    } catch (error) {
      console.error(`Error deleting ${field}:`, error);
    }
  };
  
  


  return (
    <div>
      <h1>Property Management</h1>
      <form>
        {/* Dynamic field selection */}
        <label>
          Select Field to Manage:
          <select value={activeField} onChange={(e) => handleSetActiveField(e.target.value)}>
            {Object.keys(formData).map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
        </label>

        {/* Display only input for the selected field */}
        {activeField === "bedrooms" ? (
          <div style={{ marginBottom: "10px" }}>
            <label>
              {activeField.charAt(0).toUpperCase() + activeField.slice(1)}:
              <input
                type="number"
                name={activeField}
                value={formData[activeField] || ""}
                onChange={handleFieldChange}
                style={{ marginRight: "10px" }}
              />
            </label>
            <button type="button" onClick={handleAddField}>
              Add {activeField}
            </button>
          </div>
        ) : (
          // Other fields' input forms can be displayed similarly
          <div style={{ marginBottom: "10px" }}>
            <label>
              {activeField.charAt(0).toUpperCase() + activeField.slice(1)}:
              <input
                type="text"
                name={activeField}
                value={formData[activeField] || ""}
                onChange={handleFieldChange}
                style={{ marginRight: "10px" }}
              />
            </label>
            <button type="button" onClick={handleAddField}>
              Add {activeField}
            </button>
          </div>
        )}
      </form>

      {/* Table for managing the active field */}
      <h2>Manage {activeField.charAt(0).toUpperCase() + activeField.slice(1)}</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>{activeField}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {dataList.map((item) => (
    <tr key={item._id}>
      <td>{item._id}</td>
      <td>{item[activeField]}</td>
      <td>
        <button onClick={() => handleEditField(activeField, item[activeField])}>Edit</button>
        <button onClick={() => handleDeleteField(activeField, item[activeField])}>Delete</button>
      </td>
    </tr>
  ))}
</tbody>


      </table>
    </div>
  );
}

export default AdminForm;
