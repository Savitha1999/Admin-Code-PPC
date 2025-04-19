

// ***************************








import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Officelist.css';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { useSelector } from 'react-redux';
import moment from 'moment';

const OfficeForm = ({ office, onSave }) => {
  const [formData, setFormData] = useState({
    officeName: '',
    landLine: '',
    address: '',
    mobile: '',
  });
   const adminName = useSelector((state) => state.admin.name);
  

     // ✅ Record view on mount
  useEffect(() => {
    const recordDashboardView = async () => {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/record-view`, {
          userName: adminName,
          viewedFile: "Office",
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
    if (office) {
      setFormData(office);
    }
  }, [office]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (office) {
        await axios.put(`${process.env.REACT_APP_API_URL}/office-update/${office._id}`, formData);
        toast.success('Office updated successfully!');
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/office-create`, formData);
        toast.success('Office created successfully!');
      }
      onSave();
    } catch (error) {
      toast.error('Failed to save office!');
    }
  };

  return (
    <div>
      <ToastContainer />
      <h2 style={{ color: 'rgb(47,116,127)' }} className='text-center mb-4'>
        {office ? 'Update Office' : 'Create Office'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Office Name:</label>
            <input
              type="text"
              name="officeName"
              value={formData.officeName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Land Line:</label>
            <input
              type="text"
              name="landLine"
              value={formData.landLine}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Mobile:</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button className='w-25' type="submit">{office ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

const OfficeList = () => {
  const [offices, setOffices] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState(null);

  useEffect(() => {
    fetchOffices();
  }, []);

  const fetchOffices = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/office-all`);
      setOffices(response.data);
    } catch (error) {
      toast.error('Failed to fetch office details!');
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this office?')) {
        await axios.delete(`${process.env.REACT_APP_API_URL}/office-delete/${id}`);
        toast.success('Office deleted successfully!');
        fetchOffices();
      }
    } catch (error) {
      toast.error('Failed to delete office!');
    }
  };

  const handleSave = () => {
    setSelectedOffice(null);
    fetchOffices();
  };

  return (
    <div>
      <OfficeForm office={selectedOffice} onSave={handleSave} />
      <h3>Office Details</h3>
      <table>
        <thead>
          <tr>
            <th>SL</th>
            <th>Office Name</th>
            <th>Address</th>
            <th>Land Line</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {offices.map((office, index) => (
            <tr key={office._id}>
              <td>{index + 1}</td>
              <td>{office.officeName}</td>
              <td>{office.address}</td>
              <td>{office.landLine}</td>
              <td>{office.mobile}</td>
              <td>
                <button className='text-primary ' onClick={() => setSelectedOffice(office)}><FaEdit/></button>
                <button className='text-danger fs-5' onClick={() => handleDelete(office._id)}><MdDeleteForever /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OfficeList;




