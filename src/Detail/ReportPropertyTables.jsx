// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { MdDeleteForever } from 'react-icons/md';

// const ReportPropertyTables = () => {
//     const [reportPropertyRequestsData, setReportPropertyRequestsData] = useState([]);
//     const [propertiesData, setPropertiesData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // Fetch all report property request data for owners and buyers
//     const fetchAllReportPropertyData = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-all-reportproperty-requests`);

//             if (response.status === 200 && response.data.reportPropertyRequestsData) {
//                 setReportPropertyRequestsData(response.data.reportPropertyRequestsData);
//                 setPropertiesData(response.data.propertiesData);
//             } else {
//                 console.error('Unexpected API response:', response.data);
//             }
//         } catch (error) {
//             console.error('Error fetching report property request data:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDelete = async (ppcId) => {
//         const confirmDelete = window.confirm(`Are you sure you want to remove all report requests for this property?`);
    
//         if (!confirmDelete) {
//             alert("Deletion canceled.");
//             return;
//         }
    
//         try {
//             const response = await axios.delete(`${process.env.REACT_APP_API_URL}/delete-report/${ppcId}`);
    
//             if (response.data.message.includes('removed successfully')) {
//                 alert(`All report requests removed successfully`);
//                 setPropertiesData(prevData => 
//                     prevData.map(property => 
//                         property.ppcId === ppcId 
//                             ? { ...property, reportProperty: [] } // Clear reported requests
//                             : property
//                     )
//                 );
//             } else {
//                 alert(`Failed to remove report requests`);
//             }
//         } catch (error) {
//             console.error(`Error removing report requests:`, error);
//             alert(`Error removing report requests`);
//         }
//     };
    
    
//     useEffect(() => {
//         fetchAllReportPropertyData();
//     }, []);

//     return (
//         <div>
//             {loading ? (
//                 <p>Loading data...</p>
//             ) : (
//                 <>
//                     {/* Displaying Report Property Owner Data */}
//                     <h3>Report Property Owner Data</h3>
//                     {reportPropertyRequestsData.length > 0 ? (
//                         <table border="1">
//                             <thead>
//                                 <tr>
//                                     <th>PPC ID</th>
//                                     <th>Posted User Phone Number</th>
//                                     <th>Report Requested User Phone Numbers</th>
//                                     <th>Property Mode</th>
//                                     <th>Property Type</th>
//                                     <th>Price</th>
//                                     <th>Area</th>
//                                     <th>Views</th>
//                                     <th>Created At</th>
//                                     <th>Updated At</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {reportPropertyRequestsData
//                                     .filter(data => data.ppcId) // Ensure ppcId exists
//                                     .map((data, index) => (
//                                         <tr key={index}>
//                                             <td>{data.ppcId}</td>
//                                             <td>{data.postedUserPhoneNumber}</td>
//                                             <td>{(data.reportRequestedUserPhoneNumbers || []).filter(Boolean).join(', ')}</td>
//                                             <td>{data.propertyMode || 'N/A'}</td>
//                                             <td>{data.propertyType || 'N/A'}</td>
//                                             <td>{data.price || 'N/A'}</td>
//                                             <td>{data.area || 'N/A'}</td>
//                                             <td>{data.views || 0}</td>
//                                             <td>{data.createdAt ? new Date(data.createdAt).toLocaleString() : 'N/A'}</td>
//                                             <td>{data.updatedAt ? new Date(data.updatedAt).toLocaleString() : 'N/A'}</td>
//                                             <td>
//                                                 <button className='text-danger fs-5' onClick={() => handleDelete(data.ppcId)}>
//                                                     <MdDeleteForever />
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                             </tbody>
//                         </table>
//                     ) : (
//                         <p>No report property owner data found.</p>
//                     )}

//                     {/* Displaying Report Property Buyer Data */}
//                     <h3>Report Property Buyer Data</h3>
//                     {propertiesData.length > 0 ? (
//                         <table border="1">
//                             <thead>
//                                 <tr>
//                                     <th>PPC ID</th>
//                                     <th>Posted User Phone Number</th>
//                                     <th>Property Details</th>
//                                     <th>Report Requested User Phone Numbers</th>
//                                     <th>Views</th>
//                                     <th>Created At</th>
//                                     <th>Updated At</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {propertiesData
//                                     .filter(property => property.ppcId) // Ensure ppcId exists
//                                     .map((property, index) => (
//                                         <tr key={index}>
//                                             <td>{property.ppcId}</td>
//                                             <td>{property.postedUserPhoneNumber}</td>
//                                             <td>{property.propertyDetails || 'No details available'}</td>
//                                             <td>{(property.reportRequesters || []).filter(Boolean).join(', ')}</td>
//                                             <td>{property.views || 0}</td>
//                                             <td>{property.createdAt ? new Date(property.createdAt).toLocaleString() : 'N/A'}</td>
//                                             <td>{property.updatedAt ? new Date(property.updatedAt).toLocaleString() : 'N/A'}</td>
//                                             <td>
//                                                 <button className='text-danger fs-5' onClick={() => handleDelete(property.ppcId)}>
//                                                     <MdDeleteForever />
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                             </tbody>
//                         </table>
//                     ) : (
//                         <p>No report property buyer data found.</p>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// };

// export default ReportPropertyTables;














import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDeleteForever } from 'react-icons/md';

const ReportPropertyTables = () => {
    const [reportPropertyRequestsData, setReportPropertyRequestsData] = useState([]);
    const [propertiesData, setPropertiesData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Search & Filter States
    const [search, setSearch] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // Fetch all report property request data for owners and buyers
    const fetchAllReportPropertyData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-all-reportproperty-requests`);

            if (response.status === 200 && response.data.reportPropertyRequestsData) {
                setReportPropertyRequestsData(response.data.reportPropertyRequestsData);
                setPropertiesData(response.data.propertiesData);
            } else {
                console.error('Unexpected API response:', response.data);
            }
        } catch (error) {
            console.error('Error fetching report property request data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Delete report property request by PPC ID
    const handleDelete = async (ppcId) => {
        const confirmDelete = window.confirm(`Are you sure you want to remove all report requests for this property?`);

        if (!confirmDelete) {
            alert("Deletion canceled.");
            return;
        }

        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/delete-report/${ppcId}`);

            if (response.data.message.includes('removed successfully')) {
                alert(`All report requests removed successfully`);
                setReportPropertyRequestsData(prevData => prevData.filter(data => data.ppcId !== ppcId));
                setPropertiesData(prevData => prevData.filter(property => property.ppcId !== ppcId));
            } else {
                alert(`Failed to remove report requests`);
            }
        } catch (error) {
            console.error(`Error removing report requests:`, error);
            alert(`Error removing report requests`);
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
        fetchAllReportPropertyData();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Search Reported Properties</h2>

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
                    {/* Report Property Owner Data */}
                    <h3 className='text-success pb-3'>Report Property Owner Data</h3>
                    {filterData(reportPropertyRequestsData).length > 0 ? (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>PPC ID</th>
                                    <th>Posted User Phone Number</th>
                                    <th>Report Requested User Phone Numbers</th>
                                    <th>Property Mode</th>
                                    <th>Property Type</th>
                                    <th>Price</th>
                                    <th>Area</th>
                                    <th>Views</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterData(reportPropertyRequestsData).map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.ppcId}</td>
                                        <td>{data.postedUserPhoneNumber}</td>
                                        <td>{(data.reportRequestedUserPhoneNumbers || []).join(', ')}</td>
                                        <td>{data.propertyMode || 'N/A'}</td>
                                        <td>{data.propertyType || 'N/A'}</td>
                                        <td>{data.price || 'N/A'}</td>
                                        <td>{data.area || 'N/A'}</td>
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
                        <p>No report property owner data found.</p>
                    )}

                    {/* Report Property Buyer Data */}
                    <h3 className='text-warning mt-5 mb-3'>Report Property Buyer Data</h3>
                    {filterData(propertiesData).length > 0 ? (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>PPC ID</th>
                                    <th>Posted User Phone Number</th>
                                    <th>Property Details</th>
                                    <th>Report Requested User Phone Numbers</th>
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
                                        <td>{property.propertyDetails || 'No details available'}</td>
                                        <td>{(property.reportRequesters || []).join(', ')}</td>
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
                        <p>No report property buyer data found.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default ReportPropertyTables;
