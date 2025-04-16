







import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaSearch } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

const Area = () => {
    const [areas, setAreas] = useState([]);
    const [areaName, setAreaName] = useState('');
    const [editingArea, setEditingArea] = useState(null);
    const [stateName, setStateName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchAreas();
    }, []);

    const fetchAreas = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/area-all`);
            setAreas(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const createArea = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/area-create`, { areaName, state: stateName });
            setAreas([...areas, response.data]);
            setAreaName('');
            setStateName('');
        } catch (err) {
            console.error(err);
        }
    };

    const updateArea = async () => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/area-update/${editingArea._id}`, { areaName, state: stateName });
            setAreas(areas.map(area => (area._id === editingArea._id ? response.data : area)));
            setAreaName('');
            setStateName('');
            setEditingArea(null);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteArea = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/area-delete/${id}`);
            setAreas(areas.filter(area => area._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const editArea = (area) => {
        setEditingArea(area);
        setAreaName(area.areaName);
        setStateName(area.state);
    };

    const filteredAreas = areas.filter(area =>
        area.areaName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <h1>Area Management</h1>
            <div className="form-container">
                <h2>{editingArea ? 'Update Area' : 'Create Area'}</h2>
                <div className="form-row">
                    <label htmlFor="state">State:</label>
                    <select id="state" value={stateName} onChange={(e) => setStateName(e.target.value)}>
                        <option value="" disabled>Select a state</option>
                        <option value="Pudhucherry">Pudhucherry</option>
                        <option value="Tamilnadu">Tamilnadu</option>
                        <option value="Others">Others</option>
                    </select>
                    <label htmlFor="area">Area:</label>
                    <input
                        type="text"
                        id="area"
                        value={areaName}
                        onChange={(e) => setAreaName(e.target.value)}
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
                <button onClick={editingArea ? updateArea : createArea}>
                    {editingArea ? 'Update' : 'Create'}
                </button>
            </div>

            <h4 className="text-danger">Roll Details</h4>
      <p>
        <a href="#export">Export All to Excel</a> | <a href="#print">Print All to Print</a>
      </p>
      
            <div className="table-container">
                <h2>Areas</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Sl No</th>
                            <th>State</th>
                            <th>Area</th>
                            <th>Edit / Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAreas.map((area, index) => (
                            <tr key={area._id}>
                                <td>{index + 1}</td>
                                <td>{area.state}</td>
                                <td>{area.areaName}</td>
                                <td>
                                    <span className="edit text-primary" onClick={() => editArea(area)}> <FaEdit /> </span>
                                    <span className="delete text-danger fs-5" onClick={() => deleteArea(area._id)}> <MdDeleteForever /> </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Area;
