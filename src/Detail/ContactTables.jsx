








import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDeleteForever } from 'react-icons/md';

const ContactTables = () => {
    const [contactRequestsData, setContactRequestsData] = useState([]);
    const [propertiesData, setPropertiesData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Search & Filter States
    const [search, setSearch] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // Fetch all contact request data for owners and buyers
    const fetchAllContactData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-all-contact-requests`);

            if (response.status === 200 && response.data.contactRequestsData) {
                setContactRequestsData(response.data.contactRequestsData);
                setPropertiesData(response.data.propertiesData);
            } else {
                console.error('Unexpected API response:', response.data);
            }
        } catch (error) {
            console.error('Error fetching contact request data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Delete contact request by PPC ID
    const handleDelete = async (ppcId) => {
        const confirmDelete = window.confirm(`Are you sure you want to remove all contact requests for this property?`);

        if (!confirmDelete) {
            alert("Deletion canceled.");
            return;
        }

        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/delete-contact/${ppcId}`);

            if (response.data.message.includes('removed successfully')) {
                alert(`All contact requests removed successfully`);
                setContactRequestsData(prevData => prevData.filter(data => data.ppcId !== ppcId));
                setPropertiesData(prevData => prevData.filter(property => property.ppcId !== ppcId));
            } else {
                alert(`Failed to remove contact requests`);
            }
        } catch (error) {
            console.error(`Error removing contact requests:`, error);
            alert(`Error removing contact requests`);
        }
    };

    // Filter function for search and date range
    const filterData = (data) => {
        return data.filter(item => {
            const createdAt = new Date(item.createdAt).getTime();
            const from = fromDate ? new Date(fromDate).getTime() : null;
            const to = endDate ? new Date(endDate).getTime() : null;

            // Ensure ppcId is a string before calling toLowerCase()
            const matchesSearch = search ? String(item.ppcId).toLowerCase().includes(search.toLowerCase()) : true;
            const matchesStartDate = from ? createdAt >= from : true;
            const matchesEndDate = to ? createdAt <= to : true;

            return matchesSearch && matchesStartDate && matchesEndDate;
        });
    };

    useEffect(() => {
        fetchAllContactData();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Search Contact Requests</h2>

            {/* Search & Filter Form */}
            <form 
                onSubmit={(e) => e.preventDefault()} 
                style={{
                    width: "80%",
                    margin: "0 auto",
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                    marginBottom:"20px"
                }}
            >
                <div className="mb-3">
                    <label htmlFor="searchInput" className="form-label fw-bold">Search PPC ID</label>
                    <input
                        type="text"
                        id="searchInput"
                        className="form-control"
                        placeholder="Enter PPC ID"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="fromDate" className="form-label fw-bold">From Date</label>
                    <input
                        type="date"
                        id="fromDate"
                        className="form-control"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="endDate" className="form-label fw-bold">End Date</label>
                    <input
                        type="date"
                        id="endDate"
                        className="form-control"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
                    />
                </div>
            </form>

            {loading ? (
                <p>Loading data...</p>
            ) : (
                <>
                    {/* Contact Request Owner Data */}
                    <h3 className='text-success pb-3 mt-4'>Contact Request Owner Data</h3>
                    {filterData(contactRequestsData).length > 0 ? (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>PPC ID</th>
                                    <th>Posted User Phone Number</th>
                                    <th>Contact Requested User Phone Numbers</th>
                                    <th>Best Time to Call</th>
                                    <th>Email</th>
                                    <th>Views</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterData(contactRequestsData).map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.ppcId}</td>
                                        <td>{data.postedUserPhoneNumber}</td>
                                        <td>{(data.contactRequestedUserPhoneNumbers || []).join(', ')}</td>
                                        <td>{data.bestTimeToCall || 'N/A'}</td>
                                        <td>{data.email || 'N/A'}</td>
                                        <td>{data.views || 0}</td>
                                        <td>{data.createdAt ? new Date(data.createdAt).toLocaleString() : 'N/A'}</td>
                                        <td>{data.updatedAt ? new Date(data.updatedAt).toLocaleString() : 'N/A'}</td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => handleDelete(data.ppcId)}>
                                                <MdDeleteForever size={24} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No contact request owner data found.</p>
                    )}

                    {/* Contact Request Buyer Data */}
                    <h3 className='text-warning mt-5 mb-3'>Contact Request Buyer Data</h3>
                    {filterData(propertiesData).length > 0 ? (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>PPC ID</th>
                                    <th>Posted User Phone Number</th>
                                    <th>Contact Requesters Phone Numbers</th>
                                    <th>Best Time to Call</th>
                                    <th>Email</th>
                                    <th>Views</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterData(propertiesData).map((property, index) => (
                                    <tr key={index}>
                                        <td>{property.ppcId}</td>
                                        <td>{property.postedUserPhoneNumber}</td>
                                        <td>{(property.contactRequesters || []).join(', ')}</td>
                                        <td>{property.bestTimeToCall || 'N/A'}</td>
                                        <td>{property.email || 'N/A'}</td>
                                        <td>{property.views || 0}</td>
                                        <td>{property.createdAt ? new Date(property.createdAt).toLocaleString() : 'N/A'}</td>
                                        <td>{property.updatedAt ? new Date(property.updatedAt).toLocaleString() : 'N/A'}</td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => handleDelete(property.ppcId)}>
                                                <MdDeleteForever size={24} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No contact request buyer data found.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default ContactTables;
