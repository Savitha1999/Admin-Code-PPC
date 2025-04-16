// import React from 'react'

// export default function BuyersStatics() {
//   return (
//     <div>BuyersStatics</div>
//   )
// }


// import React, { useState } from "react";

// const PaginationTable = () => {
//   const [fromDate, setFromDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [search, setSearch] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`Search: ${search}, From Date: ${fromDate}, End Date: ${endDate}`);
//   };
//   const data = [
//     {
//       mobileNumber: "9791958938",
//       postedFrom: "TUC",
//       lastLogin: "2025-01-08 12:52:58",
//       noOfAdsViewed: 18,
//       noOfSentInterest: 0,
//       noOfCalled: 0,
//       noOfShortlisted: 0,
//       noOfReported: 0,
//       noOfHelp: 0,
//       action: "Expand",
//     },
//     {
//       mobileNumber: "1918056623716",
//       postedFrom: "TUC",
//       lastLogin: "2025-01-08 11:32:13",
//       noOfAdsViewed: 0,
//       noOfSentInterest: 0,
//       noOfCalled: 0,
//       noOfShortlisted: 0,
//       noOfReported: 0,
//       noOfHelp: 0,
//       action: "Expand",
//     },
//   ].map((item, index) => ({ ...item, sNo: index + 1 }));

//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//       <h4>Buyer Statics</h4>  <button className="btn btn-primary">EXPORT WITH OTP VERIFICATION</button>
//       </div>
//         <div className="container mt-5">
//       <h2 className="mb-4">Search Form with Dates</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Search Field */}
//         <div className="mb-3">
//           <label htmlFor="searchInput" className="form-label">
//             Search
//           </label>
//           <input
//             type="text"
//             id="searchInput"
//             className="form-control"
//             placeholder="Enter search term"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         {/* From Date Field */}
//         <div className="mb-3">
//           <label htmlFor="fromDate" className="form-label">
//             From Date
//           </label>
//           <input
//             type="date"
//             id="fromDate"
//             className="form-control"
//             value={fromDate}
//             onChange={(e) => setFromDate(e.target.value)}
//           />
//         </div>

       
//         {/* Submit Button */}
//         <button type="submit" className="btn btn-primary">
//           Submit
//         </button>
//       </form>
//     </div>
//       <div className="table-responsive">
//         <table className="table table-bordered">
//           <thead className="thead-dark">
//             <tr>
//               <th>S.No</th>
//               <th>Mobile Number</th>
//               <th>Posted From</th>
//               <th>Last Login</th>
//               <th>No Of Ads Viewed</th>
//               <th>No Of Sent Interest</th>
//               <th>No Of Called</th>
//               <th>No Of Shortlisted</th>
//               <th>No Of Reported</th>
//               <th>No Of Help</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((item) => (
//               <tr key={item.sNo}>
//                 <td>{item.sNo}</td>
//                 <td>{item.mobileNumber}</td>
//                 <td>{item.postedFrom}</td>
//                 <td>{item.lastLogin}</td>
//                 <td>{item.noOfAdsViewed}</td>
//                 <td>{item.noOfSentInterest}</td>
//                 <td>{item.noOfCalled}</td>
//                 <td>{item.noOfShortlisted}</td>
//                 <td>{item.noOfReported}</td>
//                 <td>{item.noOfHelp}</td>
//                 <td>
//                   <button className="btn btn-primary btn-sm me-2">
//                     Expand
//                   </button>
//                   <button className="btn btn-success btn-sm">
//                     Print
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default PaginationTable;


import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const BuyersStatics = () => {

       const [fromDate, setFromDate] = useState("");
        const [endDate, setEndDate] = useState("");
        const [search, setSearch] = useState("");
      
        const handleSubmit = (e) => {
          e.preventDefault();
          alert(`Search: ${search}, From Date: ${fromDate}, End Date: ${endDate}`);
        };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const data = [
    { postedFrom: 'PUC', mobile: '9943494299', postedBy: 'Agent - Amirthalingam', cars: 3 },
    { postedFrom: 'PUC', mobile: '8778268681', postedBy: 'Agent -', cars: 71 },
    { postedFrom: 'PUC', mobile: '6380005030', postedBy: 'Agent - yuvaraj', cars: 3 },
    { postedFrom: 'TUC', mobile: '7397143524', postedBy: 'Agent - Vignesh', cars: 1 },
  ];

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
    <h4>Buyer Statics
    </h4>  <button className="btn" style={{background:"#2EA44F", color:"#fff", border:'none'}}>EXPORT WITH OTP VERIFICATION</button>
    </div>
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="searchInput" className="form-label">
            Search
          </label>
          <input
            type="text"
            id="searchInput"
            className="form-control"
            placeholder="Enter search term"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

      {/* From Date Field */}
      <div className="mb-3">
          <label htmlFor="fromDate" className="form-label">
            From Date
          </label>
          <input
            type="date"
            id="fromDate"
            className="form-control"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        {/* End Date Field */}
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button className="btn" type="submit" style={{background:"#E91E63", color:"#fff", border:'none'}}>
          Submit
        </button>
      </form>
    </div>
    <div className="container mt-4">
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Posted From</th>
            <th>Mobile Number</th>
            <th>Posted By</th>
            <th>No. of Cars</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item.postedFrom}</td>
              <td>{item.mobile}</td>
              <td>{item.postedBy}</td>
              <td>{item.cars}</td>
              <td>
              <button className="btn btn-primary btn-sm me-2">Expand</button>
                <button className="btn btn-danger btn-sm me-2">Print</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <li
              key={pageNumber}
              className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}
            >
              <button className="page-link" onClick={() => handlePageChange(pageNumber)}>
                {pageNumber}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
    </>
  );
};

export default BuyersStatics;
