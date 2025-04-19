
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux';

const AdminReport = () => {
  const [reportData, setReportData] = useState({
    webLogin: 0,
    appLogin: 0,
    totalLogin: 0,
    totalReported: 0,
    totalHelp: 0,
    totalContact: 0,
  });

  

  const adminName = useSelector((state) => state.admin.name);
  

  // ✅ Record view on mount
useEffect(() => {
 const recordDashboardView = async () => {
   try {
     await axios.post(`${process.env.REACT_APP_API_URL}/record-view`, {
       userName: adminName,
       viewedFile: "Admin Report",
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
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // 1. Fetch login counts
      const loginRes = await axios.get(`${process.env.REACT_APP_API_URL}/user/login-mode-count`);
      const { webLoginCount, appLoginCount } = loginRes.data;

      // 2. Fetch reported counts (for both modes)
      const reportWeb = await axios.get(`${process.env.REACT_APP_API_URL}/property-reports-count?loginMode=web`);
      const reportApp = await axios.get(`${process.env.REACT_APP_API_URL}/property-reports-count?loginMode=app`);

      // 3. Help count
      const helpRes = await axios.get(`${process.env.REACT_APP_API_URL}/total-help-request-count`);

      // 4. Contact count
      const contactRes = await axios.get(`${process.env.REACT_APP_API_URL}/total-contact-count`);

      setReportData({
        webLogin: webLoginCount,
        appLogin: appLoginCount,
        totalLogin: webLoginCount + appLoginCount,
        totalReported: (reportWeb.data.totalReportedProperties || 0) + (reportApp.data.totalReportedProperties || 0),
        totalHelp: helpRes.data.totalHelpRequests || 0,
        totalContact: contactRes.data.totalContactCount || 0,
      });
    } catch (error) {
      console.error("Error fetching admin report data:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Pondy Properties | Admin</h2>
      <p>Welcome to your Dashboard, <strong>divya</strong>!</p>
      <table className="table table-bordered mt-3">
        <thead className="thead-light">
          <tr>
            <th>SL NO</th>
            <th>DESCRIPTION</th>
            <th>APP</th>
            <th>WEB</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>NO. OF LOGIN</td>
            <td>{reportData.appLogin}</td>
            <td>{reportData.webLogin}</td>
            <td>{reportData.totalLogin}</td>
          </tr>
          <tr>
            <td>2</td>
            <td>NO. OF REPORTED</td>
            <td>N/A</td>
            <td>{reportData.totalReported}</td>
            <td>{reportData.totalReported}</td>
          </tr>
          <tr>
            <td>3</td>
            <td>NO. OF HELP REQUIRED</td>
            <td>N/A</td>
            <td>{reportData.totalHelp}</td>
            <td>{reportData.totalHelp}</td>
          </tr>
          <tr>
            <td>4</td>
            <td>NO. OF CONTACT FORM</td>
            <td>N/A</td>
            <td>{reportData.totalContact}</td>
            <td>{reportData.totalContact}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminReport;
