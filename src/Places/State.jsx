import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './places.css';
import { FaEdit, FaSearch } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

const State = () => {
    const [states, setStates] = useState([]);
    const [stateName, setStateName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [editingState, setEditingState] = useState(null);

    useEffect(() => {
        fetchStates();
    }, []);

    const fetchStates = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/state-all`);
            setStates(response.data);
        } catch (err) {
            toast.error("Failed to fetch states");
            console.error(err);
        }
    };

    const createState = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/state-create`, { stateName });
            setStates([...states, response.data]);
            setStateName('');
            toast.success("State created successfully");
        } catch (err) {
            toast.error("Failed to create state");
            console.error(err);
        }
    };

    const updateState = async () => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/state-update/${editingState._id}`, { stateName });
            setStates(states.map(state => (state._id === editingState._id ? response.data : state)));
            setStateName('');
            setEditingState(null);
            toast.success("State updated successfully");
        } catch (err) {
            toast.error("Failed to update state");
            console.error(err);
        }
    };

    const deleteState = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/state-delete/${id}`);
            setStates(states.filter(state => state._id !== id));
            toast.success("State deleted successfully");
        } catch (err) {
            toast.error("Failed to delete state");
            console.error(err);
        }
    };

    const editState = (state) => {
        setEditingState(state);
        setStateName(state.stateName);
    };

    const filteredStates = states.filter(state =>
        state.stateName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <h1>State Management</h1>
            <div className="form-container w-50">
                <h2>{editingState ? 'Update State' : 'Create State'}</h2>
                <label htmlFor="state">State:</label>
                <select id="state" value={stateName} onChange={(e) => setStateName(e.target.value)}>
                    <option value="" disabled>Select a state</option>
                    <option value="Pudhucherry">Pudhucherry</option>
                    <option value="Tamilnadu">Tamilnadu</option>
                    <option value="Others">Others</option>
                </select>
                <button onClick={editingState ? updateState : createState}>
                    {editingState ? 'Update' : 'Create'}
                </button>
            </div>
            <div className="search-container ">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <span className="search-icon"><FaSearch /></span>
            </div>
            <h4 className="text-danger">Roll Details</h4>
      <p>
        <a href="#export">Export All to Excel</a> | <a href="#print">Print All to Print</a>
      </p>
            <div className="table-container">
                <h2>States</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Sl No</th>
                            <th>State</th>
                            <th>Edit / Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStates.map((state, index) => (
                            <tr key={state._id}>
                                <td>{index + 1}</td>
                                <td>{state.stateName}</td>
                                <td>
                                    <span className="edit text-primary" onClick={() => editState(state)}> <FaEdit /></span>
                                    <span className="delete text-danger fs-5" onClick={() => deleteState(state._id)}><MdDeleteForever /></span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    );
};

export default State;






