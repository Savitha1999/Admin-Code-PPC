



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaSearch } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import moment from 'moment';
import { useSelector } from 'react-redux';

const City = () => {
    const [cities, setCities] = useState([]);
    const [cityName, setCityName] = useState('');
    const [editingCity, setEditingCity] = useState(null);
    const [stateName, setStateName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const adminName = useSelector((state) => state.admin.name);
  

    // ✅ Record view on mount
 useEffect(() => {
   const recordDashboardView = async () => {
     try {
       await axios.post(`${process.env.REACT_APP_API_URL}/record-view`, {
         userName: adminName,
         viewedFile: "City",
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
        fetchCities();
    }, []);

    const fetchCities = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/city-all`);
            setCities(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const createCity = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/city-create`, { cityName, state: stateName });
            setCities([...cities, response.data]);
            setCityName('');
            setStateName('');
        } catch (err) {
            console.error(err);
        }
    };

    const updateCity = async () => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/city-update/${editingCity._id}`, { cityName, state: stateName });
            setCities(cities.map(city => (city._id === editingCity._id ? response.data : city)));
            setCityName('');
            setStateName('');
            setEditingCity(null);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteCity = async (id) => {
        try {
            await axios.delete(`h${process.env.REACT_APP_API_URL}/city-delete/${id}`);
            setCities(cities.filter(city => city._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const editCity = (city) => {
        setEditingCity(city);
        setCityName(city.cityName);
        setStateName(city.state);
    };

    const filteredCities = cities.filter(city =>
        city.cityName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <h1>City Management</h1>
            <div className="form-container">
                <h2>{editingCity ? 'Update City' : 'Create City'}</h2>
                <div className="form-row">
                    <label htmlFor="state">State:</label>
                    <select id="state" value={stateName} onChange={(e) => setStateName(e.target.value)}>
                        <option value="" disabled>Select a state</option>
                        <option value="Pudhucherry">Pudhucherry</option>
                        <option value="Tamilnadu">Tamilnadu</option>
                        <option value="Others">Others</option>
                    </select>
                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
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
                <button onClick={editingCity ? updateCity : createCity}>
                    {editingCity ? 'Update' : 'Create'}
                </button>
            </div>

            <h4 className="text-danger">Roll Details</h4>
      <p>
        <a href="#export">Export All to Excel</a> | <a href="#print">Print All to Print</a>
      </p>
      
            <div className="table-container">
                <h2>Cities</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Sl No</th>
                            <th>State</th>
                            <th>City</th>
                            <th>Edit / Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCities.map((city, index) => (
                            <tr key={city._id}>
                                <td>{index + 1}</td>
                                <td>{city.state}</td>
                                <td>{city.cityName}</td>
                                <td>
                                    <span className="edit text-primary" onClick={() => editCity(city)}> <FaEdit /> </span>
                                    <span className="delete text-danger fs-5" onClick={() => deleteCity(city._id)}> <MdDeleteForever /> </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default City;
