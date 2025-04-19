

import React, { useState, useEffect } from "react";
import MatchedList from './MatchedList';
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";

const MatchedPropertyTable = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [ownerMatchedProperties, setOwnerMatchedProperties] = useState([]);
    const [buyerMatchedProperties, setBuyerMatchedProperties] = useState([]);
    const [loading, setLoading] = useState(false);

    const adminName = useSelector((state) => state.admin.name);
  

    // ✅ Record view on mount
 useEffect(() => {
   const recordDashboardView = async () => {
     try {
       await axios.post(`${process.env.REACT_APP_API_URL}/record-view`, {
         userName: adminName,
         viewedFile: "Matched Property Table",
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


    // ✅ Fetch Owner-Matched Properties
    const fetchOwnerMatchedProperties = async () => {
        if (!phoneNumber.trim()) {
            alert("Please enter a phone number.");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/fetch-owner-matched-properties`,
                { params: { phoneNumber } }
            );
            setOwnerMatchedProperties(response.data.properties);
        } catch (error) {
            console.error("Error fetching owner-matched properties:", error);
            setOwnerMatchedProperties([]);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Fetch Buyer-Matched Properties
    const fetchBuyerMatchedProperties = async () => {
        if (!phoneNumber.trim()) {
            alert("Please enter a phone number.");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/fetch-buyer-matched-properties`,
                { params: { phoneNumber } }
            );
            setBuyerMatchedProperties(response.data.data);
        } catch (error) {
            console.error("Error fetching buyer-matched properties:", error);
            setBuyerMatchedProperties([]);
        } finally {
            setLoading(false);
        }
    };

    
    return (
        <div style={containerStyle}>
            <h2 style={{ textAlign: "center" }}>Buyer Assistance Dashboard</h2>

            {/* Phone Number Input */}
            <input
                type="text"
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                style={inputStyle}
            />

            {/* Fetch Buttons */}
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px" }}>
                <button onClick={fetchOwnerMatchedProperties} disabled={loading} style={buttonStyle}>
                    Fetch Owner Matched Properties
                </button>
                <button onClick={fetchBuyerMatchedProperties} disabled={loading} style={buttonStyle}>
                    Fetch Buyer Matched Properties
                </button>
            </div>

            {/* Owner Matched Properties Table */}
            <h3>Owner-Matched Properties</h3>
            {ownerMatchedProperties.length === 0 ? (
                <p>No matched properties found.</p>
            ) : (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th>Property Type</th>
                            <th>City</th>
                            <th>Area</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ownerMatchedProperties.map((property) => (
                            <tr key={property._id}>
                                <td>{property.propertyType}</td>
                                <td>{property.city}</td>
                                <td>{property.area}</td>
                                <td>{property.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Buyer Matched Properties Table */}
            <h3>Buyer-Matched Properties</h3>
            {buyerMatchedProperties.length === 0 ? (
                <p>No matched buyer requests found.</p>
            ) : (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th>Property Mode</th>
                            <th>Property Type</th>
                            <th>City</th>
                            <th>Area</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buyerMatchedProperties.map((buyer) => (
                            <tr key={buyer._id}>
                                <td>{buyer.propertyMode}</td>
                                <td>{buyer.propertyType}</td>
                                <td>{buyer.city}</td>
                                <td>{buyer.area}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            
<h5 style={{ color: "rgb(47,116,127)", fontWeight: "bold", marginBottom: "10px" }} className="m-4"> Buyer Assistace All Datas  </h5>
<MatchedList />
        </div>
    );
};

// ✅ Styles
const containerStyle = { maxWidth: "100%", margin: "auto", padding: "20px" };
const inputStyle = { width: "100%", padding: "10px", marginBottom: "10px" };
const buttonStyle = { padding: "10px", margin: "5px", backgroundColor: "#007BFF", color: "white", border: "none" };
const tableStyle = { width: "100%", borderCollapse: "collapse", marginTop: "10px" };

export default MatchedPropertyTable;

