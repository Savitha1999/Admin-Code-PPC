



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDeleteForever } from 'react-icons/md';
import moment from 'moment';
import { useSelector } from 'react-redux';

const ReportPropertyTables = () => {
    const [reportedProperties, setReportedProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    // Search & Filter
    const [search, setSearch] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const adminName = useSelector((state) => state.admin.name);

    useEffect(() => {
        const recordView = async () => {
            try {
                await axios.post(`${process.env.REACT_APP_API_URL}/record-view`, {
                    userName: adminName,
                    viewedFile: "Report Property Table",
                    viewTime: moment().format("YYYY-MM-DD HH:mm:ss"),
                });
            } catch (err) {
                console.error("Failed to record dashboard view:", err);
            }
        };

        if (adminName) {
            recordView();
        }
    }, [adminName]);

    useEffect(() => {
        const fetchReportedData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/get-reported-properties`);
                setReportedProperties(res.data.data || []);
            } catch (err) {
                console.error("Failed to fetch reported properties:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchReportedData();
    }, []);

    const handleDelete = async (ppcId) => {
        const confirm = window.confirm("Are you sure you want to delete all reports for this PPC ID?");
        if (!confirm) return;

        try {
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/delete-report/${ppcId}`);
            alert(res.data.message);
            setReportedProperties(prev => prev.filter(item => item.ppcId !== ppcId));
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete reports");
        }
    };

    const filterData = () => {
        return reportedProperties.filter(item => {
            const createdAt = new Date(item.createdAt).getTime();
            const from = fromDate ? new Date(fromDate).getTime() : null;
            const to = endDate ? new Date(endDate).getTime() : null;

            const matchSearch = search
                ? String(item.ppcId).toLowerCase().includes(search.toLowerCase())
                : true;
            const matchFrom = from ? createdAt >= from : true;
            const matchTo = to ? createdAt <= to : true;

            return matchSearch && matchFrom && matchTo;
        });
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Reported Properties</h2>

            {/* Filters */}
            <form
                onSubmit={(e) => e.preventDefault()}
                className="mb-4 p-4"
                style={{
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    background: "#fff",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                }}
            >
                <div className="mb-3">
                    <label className="form-label fw-bold">Search PPC ID</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter PPC ID"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">From Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">End Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </form>

            {loading ? (
                <p>Loading reported properties...</p>
            ) : filterData().length > 0 ? (
                <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>PPC ID</th>
                            <th>Owner Name</th>
                            <th>Owner Phone</th>
                            <th>Property Mode</th>
                            <th>Property Type</th>
                            <th>Price</th>
                            <th>Area</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Created</th>
                            <th>Updated</th>
                            <th>Total Reports</th>
                            <th>Report Details</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterData().map((item, index) => (
                            <tr key={item.ppcId}>
                                <td>{index + 1}</td>
                                <td>{item.ppcId}</td>
                                <td>{item.ownerName}</td>
                                <td>{item.ownerPhoneNumber}</td>
                                <td>{item.propertyMode}</td>
                                <td>{item.propertyType}</td>
                                <td>{item.price}</td>
                                <td>{item.area}</td>
                                <td>{item.city}</td>
                                <td>{item.state}</td>
                                <td>{moment(item.createdAt).format("DD-MM-YYYY hh:mm A")}</td>
                                <td>{moment(item.updatedAt).format("DD-MM-YYYY hh:mm A")}</td>
                                <td>{item.totalReports}</td>
                                <td>
                                    {item.reportDetails.map((report, i) => (
                                        <div key={i} className="mb-2 p-2 bg-light rounded">
                                            <div><strong>By:</strong> {report.phoneNumber}</div>
                                            <div><strong>Reason:</strong> {report.selectReasons || "N/A"}</div>
                                            <div><strong>Comment:</strong> {report.reason || "—"}</div>
                                            <div><strong>Date:</strong> {moment(report.date).format("DD-MM-YYYY hh:mm A")}</div>
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(item.ppcId)}
                                        title="Delete Reports"
                                    >
                                        <MdDeleteForever size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No reported properties found.</p>
            )}
        </div>
    );
};

export default ReportPropertyTables;
