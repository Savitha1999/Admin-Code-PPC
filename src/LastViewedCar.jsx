import React, { useEffect, useState } from "react";
import axios from "axios";

const AllLastViewedProperties = () => {
  const [views, setViews] = useState([]);
  const [filteredViews, setFilteredViews] = useState([]);
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchLastViewedProperties();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, fromDate, endDate, views]);

  const fetchLastViewedProperties = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/user-get-all-last-views`);
      setViews(data);
    } catch (err) {
      console.error("Failed to fetch last viewed properties", err);
    }
  };

  const applyFilters = () => {
    const filtered = views.filter((entry) => {
      const createdAt = new Date(entry.viewedAt).getTime();
      const from = fromDate ? new Date(fromDate).getTime() : null;
      const to = endDate ? new Date(endDate).getTime() : null;

      const matchesSearch = search
        ? entry.property?.ppcId?.toString().toLowerCase().includes(search.toLowerCase())
        : true;
      const matchesFromDate = from ? createdAt >= from : true;
      const matchesToDate = to ? createdAt <= to : true;

      return matchesSearch && matchesFromDate && matchesToDate;
    });

    setFilteredViews(filtered);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">All Users' Last Viewed Properties</h2>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search by PPC ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />
      </div>


      {/* Table */}
      <div className="overflow-x-auto mt-3">
        <h3> All User Viewed Properties </h3>
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Phone Number</th>
              <th className="border px-4 py-2">PPC ID</th>
              <th className="border px-4 py-2">Property Type</th>
              <th className="border px-4 py-2">City</th>
              <th className="border px-4 py-2">District</th>
              <th className="border px-4 py-2">Viewed At</th>
            </tr>
          </thead>
          <tbody>
            {filteredViews.length > 0 ? (
              filteredViews.map((entry, index) => (
                <tr key={entry.property._id || index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{entry.phoneNumber}</td>
                  <td className="border px-4 py-2">{entry.property.ppcId}</td>
                  <td className="border px-4 py-2">{entry.property.propertyType}</td>
                  <td className="border px-4 py-2">{entry.property.city || "-"}</td>
                  <td className="border px-4 py-2">{entry.property.district || "-"}</td>
                  <td className="border px-4 py-2">
                    {new Date(entry.viewedAt).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No entries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllLastViewedProperties;
