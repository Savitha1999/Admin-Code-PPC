import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserList.css';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

const UserForm = ({ user, onSave, onDelete }) => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        office: '',
        jobType: '',
        targetWeek: '',
        targetMonth: '',
        mobile: '',
        aadhaarNumber: '',
        userName: '',
        password: '',
        role: '',
        userType: ''
    });

    // Update formData when user prop is passed (for update scenario)
    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Submit the form to create or update the user
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (user) {
                // If user exists, update it
                await axios.patch(`${process.env.REACT_APP_API_URL}/admin-update/${user._id}`, formData);
                alert('User updated successfully!');
            } else {
                // If no user, create a new one
                await axios.post(`${process.env.REACT_APP_API_URL}/admin-create`, formData);
                alert('User created successfully!');
            }
            onSave();
        } catch (err) {
           
        }
    };

    // Handle user deletion
    const handleDelete = async () => {
        try {
            if (user && window.confirm('Are you sure you want to delete this user?')) {
                await axios.delete(`${process.env.REACT_APP_API_URL}/admin-delete/${user._id}`);
                alert('User deleted successfully!');
                onDelete();
            }
        } catch (err) {
            alert('An error occurred while deleting!');
        }
    };

    return (
        <div>
            <ToastContainer />
            <h2>{user ? 'Update User' : 'Create User'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label>Staff Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Address:</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>    
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Job Type:</label>
                        <select
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Job Type</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Target Week:</label>
                        <input
                            type="text"
                            name="targetWeek"
                            value={formData.targetWeek}
                            onChange={handleChange}
                        />
                    </div>
                    </div>

                    <div className="form-row">
                    <div className="form-group">
                        <label>Office:</label>
                        <select
                            name="office"
                            value={formData.office}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Office</option>
                            <option value="AUROBINDO">AUROBINDO</option>
                            <option value="SAINT">SAINT</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Target Month:</label>
                        <input
                            type="text"
                            name="targetMonth"
                            value={formData.targetMonth}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* <div className="form-row"> */}
                    {/* <div className="form-group">
                        <label>Mobile:</label>
                        <input
                            type="text"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                        />
                    </div> */}
                                    <div className="form-row">
                    <div className="form-group">
                        <label>Aadhaar Number:</label>
                        <input
                            type="text"
                            name="aadhaarNumber"
                            value={formData.aadhaarNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                        />
                    </div>
                    </div>

                    <div className="form-row">
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Role:</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                           <option value="">Select Roll</option>
                            <option value="manager">Manager</option>
                            <option value="admin">Admin</option>
                            <option value="accountant">Accountant</option>
                        </select>
                    </div>
                </div>
                   
                  
                    <div className="form-group w-50">
                        <label>User Type:</label>
                        <select
                            name="userType"
                            value={formData.userType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select User TYpe</option>
                            <option value="all">All</option>
                            <option value="PUC">PUC</option>
                            <option value="TUC">TUC</option>
                        </select>
                    </div>
                <div>
                    <button type="submit">{user ? 'Update' : 'Create'} User</button>
                    {user && (
                        <button type="button" onClick={handleDelete}>
                            Delete
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};




const UserList = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    // Fetch all users on component mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin-all`);
                setUsers(response.data);
            } catch (err) {
                toast.error('Error fetching users!');
            }
        };
        fetchUsers();
    }, []);

    // Handle when user is saved or deleted
    const handleSave = () => {
        setSelectedUser(null);
        // Refetch users after save
        axios.get(`${process.env.REACT_APP_API_URL}/admin-all`).then(response => setUsers(response.data));
    };

    const handleDelete = () => {
        setSelectedUser(null);
        // Refetch users after deletion
        axios.get(`${process.env.REACT_APP_API_URL}/admin-all`).then(response => setUsers(response.data));
    };

    return (
        <div>
            <h1 style={{color:"rgb(47,116,127)"}} className='text-center mb-4'>User Management</h1>
            <UserForm user={selectedUser} onSave={handleSave} onDelete={handleDelete} />
            <h2>Staff Details</h2>
            <table>
                <thead>
                    <tr>
                        <th>Sl</th>
                        <th>Staff Name</th>
                        <th>Office</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Role</th>
                        <th>Mobile Number</th>
                        <th>Edit / Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.office}</td>
                            <td>{user.userName}</td>
                            <td>{user.password}</td>
                            <td>{user.role}</td>
                            <td>{user.mobile}</td>
                            <td>
                                <button  className='text-primary' onClick={() => setSelectedUser(user)}><FaEdit /></button>
                                <button  className='text-danger fs-5 ' onClick={async () => {
                                    if (window.confirm('Are you sure?')) {
                                        await axios.delete(`${process.env.REACT_APP_API_URL}/admin-delete/${user._id}`);
                                        toast.success('User deleted successfully!');
                                        setUsers(users.filter(u => u._id !== user._id));
                                    }
                                }}><MdDeleteForever /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Toast container for showing toast messages */}
            <ToastContainer />
        </div>
    );
};

export default UserList;
