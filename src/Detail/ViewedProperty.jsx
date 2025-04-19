




import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";

const ViewedProperties = () => {
  const [viewedProperties, setViewedProperties] = useState([]);
  const [zeroViewProperties, setZeroViewProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const adminName = useSelector((state) => state.admin.name);
  

  // ✅ Record view on mount
useEffect(() => {
 const recordDashboardView = async () => {
   try {
     await axios.post(`${process.env.REACT_APP_API_URL}/record-view`, {
       userName: adminName,
       viewedFile: "Viewed Property",
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
    const fetchData = async () => {
      try {
        const viewedResponse = await axios.get(`${process.env.REACT_APP_API_URL}/all-viewed-properties`);
        setViewedProperties(viewedResponse.data.viewedProperties);
      } catch (err) {
        setError("Failed to fetch viewed properties.");
      }

      try {
        const zeroViewResponse = await axios.get(`${process.env.REACT_APP_API_URL}/zero-view-properties`);
        setZeroViewProperties(zeroViewResponse.data.properties);
      } catch (err) {
        setError("Failed to fetch zero-view properties.");
      }
      
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleDelete = async (ppcId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/delete-viewed-property/${ppcId}`);
      setViewedProperties(viewedProperties.filter(property => property.ppcId !== ppcId));
      setZeroViewProperties(zeroViewProperties.filter(property => property.ppcId !== ppcId));
    } catch (error) {
      console.error("Error deleting viewed property:", error);
      setError("Failed to delete property.");
    }
  };

  const filterData = (data) => {
    return data.filter(item => {
        const createdAt = new Date(item.createdAt).getTime();
        const from = fromDate ? new Date(fromDate).getTime() : null;
        const to = endDate ? new Date(endDate).getTime() : null;

        const matchesSearch = search ? String(item.ppcId).toLowerCase().includes(search.toLowerCase()) : true;
        const matchesStartDate = from ? createdAt >= from : true;
        const matchesEndDate = to ? createdAt <= to : true;

        return matchesSearch && matchesStartDate && matchesEndDate;
    });
  };

  if (loading) return <p className="text-center fs-4">Loading properties...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;

  const tableHeaders = viewedProperties.length > 0 ? Object.keys(viewedProperties[0]) : [];

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Viewed Properties</h2>
      
      <form className="mb-4">
      <h3>Viewed Properties Search</h3>
        <input type="text" placeholder="Search PPC ID" value={search} onChange={(e) => setSearch(e.target.value)} className="form-control mb-2" />
        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="form-control mb-2" />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="form-control mb-2" />
      </form>

      <h3 className="mt-5 mb-2" > Viewed Properties All Datas</h3>


      <div className="table-responsive" style={{ maxHeight: "500px", overflowY: "auto" }}>
        <table className="table table-bordered table-striped">
          <thead className="table-dark" style={{ position: "sticky", top: 0, zIndex: 2 }}>
            <tr>
              <th>PPC ID</th>
              <th>Price</th>
              <th>Type</th>
              <th>Mode</th>
              <th>City</th>
              <th>Area</th>
              <th>Total Area</th>
              <th>Ownership</th>
              <th>View Count</th>
              <th>Viewers</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filterData(viewedProperties).map((property) => (
              <tr key={property.ppcId}>
                <td>{property.ppcId}</td>
                <td>₹ {property.price ? property.price.toLocaleString("en-IN") : "N/A"}</td>
                <td>{property.propertyType || "N/A"}</td>
                <td>{property.propertyMode || "N/A"}</td>
                <td>{property.city || "N/A"}</td>
                <td>{property.area || "N/A"}</td>
                <td>{property.totalArea || "N/A"} {property.areaUnit || ""}</td>
                <td>{property.ownership || "N/A"}</td>
                <td>{property.views || 0}</td>
                <td>
                  {property.viewers && property.viewers.length > 0 ? (
                    <ul>
                      {property.viewers.map((viewer, index) => (
                        <li key={index}>{viewer.phoneNumber} (Viewed at: {new Date(viewer.viewedAt).toLocaleString()})</li>
                      ))}
                    </ul>
                  ) : (
                    "No Viewers"
                  )}
                </td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(property.ppcId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

 
      
      </div>
      <h2 className="text-center mt-5 mb-4">Zero-View Properties</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
        <thead className="table-dark" style={{ position: "sticky", top: 0, zIndex: 2 }}>
        <tr>
              <th>PPC ID</th>
              <th>Price</th>
              <th>Type</th>
              <th>Mode</th>
              <th>City</th>
              <th>Area</th>
              <th>Total Area</th>
              <th>Ownership</th>

            </tr>
          </thead>
          <tbody>
            {zeroViewProperties.length > 0 ? (
              zeroViewProperties.map((property) => (
                <tr key={property.ppcId}>
                  <td>{property.ppcId}</td>
                  <td>₹ {property.price ? property.price.toLocaleString("en-IN") : "N/A"}</td>
                  <td>{property.propertyType || "N/A"}</td>
                  <td>{property.propertyMode || "N/A"}</td>
                  <td>{property.city || "N/A"}</td>
                  <td>{property.area || "N/A"}</td>
                  <td>{property.totalArea || "N/A"} {property.areaUnit || ""}</td>
                  <td>{property.ownership || "N/A"}</td>
                
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">No properties with zero views.</td>
              </tr>
            )}
          </tbody>
        </table>
</div>
    </div>
  );
};

export default ViewedProperties;