import React, { useEffect, useState } from "react";
import axios from "axios";
import myImage from '../Assets/Rectangle 146.png'; // Correct path
import myImage1 from '../Assets/Rectangle 145.png'; // Correct path
import pic from '../Assets/Mask Group 3@2x.png'; // Correct path
import { MdOutlineStarOutline } from "react-icons/md";
import { FaBed, FaRulerCombined, FaRupeeSign, FaUserAlt, FaEye, FaCamera, FaRegCalendarAlt } from "react-icons/fa";

const FeaturedProperty = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-featured-properties`); // Update with your API URL
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
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Featured</th>
            <th>Property Type</th>
            <th>Location</th>
            <th>Area</th>
            <th>Bedrooms</th>
            <th>Ownership</th>
            <th>Best Time to Call</th>
            <th>Price</th>
            <th>Views</th>
            <th>Photos</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property._id}>
              <td>
                {property.photos && property.photos.length > 0 ? (
                  <img
                    src={`http://localhost:5006/${property.photos[0].replace(/\\/g, "/")}`}
                    alt="Property"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                ) : (
                  <img src={pic} alt="Placeholder" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                )}
                <span className="badge bg-warning text-dark ms-2">
                  <MdOutlineStarOutline /> Featured
                </span>
              </td>
              <td>{property.propertyType || 'N/A'}</td>
              <td>{property.city || 'N/A'}</td>
              <td>{property.totalArea || 'N/A'}</td>
              <td>{property.bedrooms || 'N/A'}</td>
              <td>{property.ownership || 'N/A'}</td>
              <td>{property.bestTimeToCall || 'N/A'}</td>
              <td>
                <FaRupeeSign /> {property.price ? property.price.toLocaleString('en-IN') : 'N/A'}
              </td>
              <td>{property.views}</td>
              <td>
                <div className="d-flex">
                  <span className="me-2">
                    <FaCamera size={16} />
                    0
                  </span>
                  <span>
                    <FaEye size={16} />
                    {property.views}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeaturedProperty;
