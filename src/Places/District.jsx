



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaSearch } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import moment from 'moment';
import { useSelector } from 'react-redux';

const District = () => {
    const [districts, setDistricts] = useState([]);
    const [districtName, setDistrictName] = useState('');
    const [editingDistrict, setEditingDistrict] = useState(null);
    const [stateName, setStateName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const adminName = useSelector((state) => state.admin.name);
  

    // ✅ Record view on mount
 useEffect(() => {
   const recordDashboardView = async () => {
     try {
       await axios.post(`${process.env.REACT_APP_API_URL}/record-view`, {
         userName: adminName,
         viewedFile: "District",
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
        fetchDistricts();
    }, []);

    const fetchDistricts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/district-all`);
            setDistricts(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const createDistrict = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/district-create`, { districtName, state: stateName });
            setDistricts([...districts, response.data]);
            setDistrictName('');
            setStateName('');
        } catch (err) {
            console.error(err);
        }
    };

    const updateDistrict = async () => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/district-update/${editingDistrict._id}`, { districtName, state: stateName });
            setDistricts(districts.map(district => (district._id === editingDistrict._id ? response.data : district)));
            setDistrictName('');
            setStateName('');
            setEditingDistrict(null);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteDistrict = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/district-delete/${id}`);
            setDistricts(districts.filter(district => district._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const editDistrict = (district) => {
        setEditingDistrict(district);
        setDistrictName(district.districtName);
        setStateName(district.state);
    };

    const filteredDistricts = districts.filter(district =>
        district.districtName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <h1>District Management</h1>
            <div className="form-container">
                <h2>{editingDistrict ? 'Update District' : 'Create District'}</h2>
                <div className="form-row">
                    <label htmlFor="state">State:</label>
                    <select id="state" value={stateName} onChange={(e) => setStateName(e.target.value)}>
                        <option value="" disabled>Select a state</option>
                        <option value="Pudhucherry">Pudhucherry</option>
                        <option value="Tamilnadu">Tamilnadu</option>
                        <option value="Others">Others</option>
                    </select>
                    <label htmlFor="district">District:</label>
                    <input
                        type="text"
                        id="district"
                        value={districtName}
                        onChange={(e) => setDistrictName(e.target.value)}
                    />
                </div>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <span className="search-icon"><FaSearch /></span>
                </div>
                <button onClick={editingDistrict ? updateDistrict : createDistrict}>
                    {editingDistrict ? 'Update' : 'Create'}
                </button>
            </div>

            <h4 className="text-danger">Roll Details</h4>
      <p>
        <a href="#export">Export All to Excel</a> | <a href="#print">Print All to Print</a>
      </p>
      
            <div className="table-container">
                <h2>Districts</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Sl No</th>
                            <th>State</th>
                            <th>District</th>
                            <th>Edit / Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDistricts.map((district, index) => (
                            <tr key={district._id}>
                                <td>{index + 1}</td>
                                <td>{district.state}</td>
                                <td>{district.districtName}</td>
                                <td>
                                    <span className="edit text-primary" onClick={() => editDistrict(district)}> <FaEdit /> </span>
                                    <span className="delete text-danger fs-5" onClick={() => deleteDistrict(district._id)}> <MdDeleteForever /> </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default District;




