









import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDeleteForever } from 'react-icons/md';

const NeedHelpTables = () => {
    const [helpRequestsData, setHelpRequestsData] = useState([]);
    const [propertiesData, setPropertiesData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Search & Filter States
    const [search, setSearch] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // Fetch all help request data for owners and buyers
    const fetchAllHelpData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-all-help-requests`);

            if (response.status === 200 && response.data.helpRequestsData) {
                setHelpRequestsData(response.data.helpRequestsData);
                setPropertiesData(response.data.propertiesData);
            } else {
                console.error('Unexpected API response:', response.data);
            }
        } catch (error) {
            console.error('Error fetching help request data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Delete help request by PPC ID
    const handleDelete = async (ppcId) => {
        const confirmDelete = window.confirm("Are you sure you want to remove this help request?");
        
        if (!confirmDelete) {
            alert("Deletion canceled.");
            return;
        }

        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/delete-help/${ppcId}`);
            if (response.data.message === 'Help request removed successfully.') {
                setHelpRequestsData(prevData => prevData.filter(data => data.ppcId !== ppcId));
                setPropertiesData(prevData => prevData.filter(property => property.ppcId !== ppcId));
                alert('Help request removed successfully');
            } else {
                alert('Failed to remove help request');
            }
        } catch (error) {
            alert('Error removing help request');
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
        fetchAllHelpData();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Search Help Requests</h2>

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
                    {/* Help Request Owner Data */}
                    <h3 className='text-success pb-3 mt-5'>Help Request Owner Data</h3>
                    
                    {filterData(helpRequestsData).length > 0 ? (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>PPC ID</th>
                                    <th>Posted User Phone Number</th>
                                    <th>Help Requested User Phone Numbers</th>
                                    <th>Property Mode</th>
                                    <th>Property Type</th>
                                    <th>Price</th>
                                    <th>Area</th>
                                    <th>Owner Name</th>
                                    <th>Views</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterData(helpRequestsData).map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.ppcId}</td>
                                        <td>{data.postedUserPhoneNumber}</td>
                                        <td>{(data.helpRequestedUserPhoneNumbers || []).join(', ')}</td>
                                        <td>{data.propertyMode || 'N/A'}</td>
                                        <td>{data.propertyType || 'N/A'}</td>
                                        <td>{data.price || 'N/A'}</td>
                                        <td>{data.area || 'N/A'}</td>
                                        <td>{data.ownerName || 'Unknown'}</td>
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
                        <p>No help request owner data found.</p>
                    )}
                    <hr></hr>

                    {/* Displaying Help Request Buyer Data */}
<h3 className='text-warning mt-5 mb-4'>Help Request Buyer Data</h3>
{filterData(propertiesData).length > 0 ? (
    <table className="table table-bordered">
        <thead>
            <tr>
                <th>PPC ID</th>
                <th>Posted User Phone Number</th>
                {/* <th>Property Details</th> */}
                <th>Help Requesters Phone Numbers</th>
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
                    {/* <td>{property.propertyDetails || 'No details available'}</td> */}
                    <td>{(property.helpRequesters || []).filter(Boolean).join(', ')}</td>
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
    <p>No help request buyer data found.</p>
)}

                </>
            )}
        </div>
    );
};

export default NeedHelpTables;
