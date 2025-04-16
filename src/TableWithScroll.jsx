// import React from "react";

// const TableWithScroll = () => {
//   // Sample data
//   const rows = Array.from({ length: 30 }, (_, i) => ({
//     id: i + 1,
//     name: `Item ${i + 1}`,
//     value: Math.floor(Math.random() * 100),
//   }));

//   const tableStyle = {
//     width: "100%",
//     borderCollapse: "collapse",
//     border: "1px solid #ddd",
//   };

//   const theadStyle = {
//     backgroundColor: "#f4f4f4",
//     position: "sticky",
//     top: 0,
//     zIndex: 1,
//   };

//   const thTdStyle = {
//     padding: "8px",
//     textAlign: "left",
//     border: "1px solid #ddd",
//   };

//   const tbodyStyle = {
//     display: "block",
//     maxHeight: "300px", // Set your desired height
//     overflowY: "scroll",
//   };

//   const trStyle = {
//     display: "table",
//     width: "100%",
//     tableLayout: "fixed",
//   };

//   return (
//     <div>
//       <h1>Scrollable Table</h1>
//       <table style={tableStyle}>
//         <thead style={theadStyle}>
//           <tr style={trStyle}>
//             <th style={thTdStyle}>ID</th>
//             <th style={thTdStyle}>Name</th>
//             <th style={thTdStyle}>Value</th>
//           </tr>
//         </thead>
//         <tbody style={tbodyStyle}>
//           {rows.map((row) => (
//             <tr key={row.id} style={trStyle}>
//               <td style={thTdStyle}>{row.id}</td>
//               <td style={thTdStyle}>{row.name}</td>
//               <td style={thTdStyle}>{row.value}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TableWithScroll;



import React, { useState, useEffect } from "react";
import axios from "axios";

const ScrollableTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:1000/PPC/user/all");
        if (response.status === 200 && Array.isArray(response.data.data)) {
          setData(response.data.data);
          setFilteredData(response.data.data);
        } else {
          setError("Error: Invalid response structure or empty data");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error fetching data. Please check your API or network.");
      }
    };

    fetchData();
  }, []);

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid #ddd",
  };

  const theadStyle = {
    backgroundColor: "#f4f4f4",
    position: "sticky",
    top: 0,
    zIndex: 1,
  };

  const thTdStyle = {
    padding: "8px",
    textAlign: "left",
    border: "1px solid #ddd",
  };

  const tbodyStyle = {
    display: "block",
    maxHeight: "300px", // Set desired height
    overflowY: "scroll",
  };

  const trStyle = {
    display: "table",
    width: "100%",
    tableLayout: "fixed",
  };

  return (
    <div>
      <h1>Scrollable Table with API Data</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table style={tableStyle}>
        <thead style={theadStyle}>
          <tr style={trStyle}>
            <th style={thTdStyle}>ID</th>
            <th style={thTdStyle}>Name</th>
            <th style={thTdStyle}>Email</th>
          </tr>
        </thead>
        <tbody style={tbodyStyle}>
          {filteredData.map((item) => (
            <tr key={item.id} style={trStyle}>
              <td style={thTdStyle}>{item.id}</td>
              <td style={thTdStyle}>{item.name}</td>
              <td style={thTdStyle}>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScrollableTable;
