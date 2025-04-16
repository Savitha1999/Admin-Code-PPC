import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineStarOutline } from "react-icons/md";
import { FaBed, FaRulerCombined, FaRupeeSign, FaRegCalendarAlt, FaEye } from "react-icons/fa";

const FeaturedProperty = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-featured-properties`);
        setProperties(response.data.properties);
      } catch (err) {
        setError("Failed to fetch featured properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <p className="text-center fs-4">Loading featured properties...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;
  if (properties.length === 0) return <p className="text-center">No featured properties available.</p>;

  return (
    <div className="container mb-4">
      <h2 className="text-center mb-4">Featured Properties</h2>

      {/* ✅ Table Format */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>PPC_Id</th>
              <th>Property Mode</th>
              <th>Property Type</th>
              <th>PhoneNumber</th>
              <th>City</th>
              <th>Area</th>
              <th>Bedrooms</th>
              <th>Ownership</th>
              <th>Best Time to Call</th>
              <th>Price</th>
              <th>Views</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property, index) => (
              <tr key={property._id}>
                <td>{index + 1}</td>
                <td>{property.ppcId}</td>
                <td>{property.propertyMode || 'N/A'}</td>
                <td>{property.propertyType || 'N/A'}</td>
                <td>{property.phoneNumber || 'N/A'}</td>
                <td>{property.city || 'N/A'}</td>
                <td>{property.totalArea || 'N/A'}</td>
                <td>{property.bedrooms || 'N/A'}</td>
                <td>{property.ownership || 'N/A'}</td>
                <td>{property.bestTimeToCall || 'N/A'}</td>
                <td>
                  <FaRupeeSign size={13} /> {property.price ? property.price.toLocaleString('en-IN') : 'N/A'}
                </td>
                <td>
                  <FaEye className="me-1" /> {property.views || '0'}
                </td>
                <td>
                  <span className="badge bg-warning text-dark">
                    <MdOutlineStarOutline className="me-1" />
                    Featured
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeaturedProperty;
