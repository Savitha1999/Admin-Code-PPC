import React from "react";
import { Table, Button, Form, InputGroup, Row, Col } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const AdminNotification = () => {
  return (
    <div className="container mt-4">
        {/* <Row> */}
            {/* <Col lg={2}></Col>
            <Col lg={10}> */}
      <h4 className="mb-5" style={{color:"rgb(47,116,127)"}}>Manage Notification</h4>

      <div className="d-flex justify-content-between align-items-center  mb-3">
        <Button style={{background:"#5F9EA0", color:"#fff", border:'none'}}>Go to Car Notification Page</Button>

        <div className="d-flex align-items-center gap-2 mb-3">
  <Form.Control type="date" placeholder="From Date" className="w-auto" />
  <Form.Control type="date" placeholder="To Date" className="w-auto" />
  <Button style={{background:"#E91E63", color:"#fff", border:'none'}}>Search By Date</Button>
</div>


        <Button style={{background:"#2EA44F", color:"#fff", border:'none'}}>EXPORT-WITH OTP VERIFICATION</Button>
      </div>

      <InputGroup className="mb-3 mx-auto w-50">
  <Form.Control type="text" placeholder="Search..." />
  <Button variant="outline-secondary"><FaSearch /></Button>
</InputGroup>


      <Table style={{border:"1px solid gray"}} bordered hover responsive>
        <thead>
          <tr>
            <th>Page</th>
            <th>Admin Notification</th>
            <th>Date</th>
            <th>Status</th>
            <th>Respond by</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Call Back Form</td>
            <td>A Customer Requested call back</td>
            <td>2024-12-25 05:45:15</td>
            <td className="text-danger">Unread</td>
            <td>—</td>
            <td>
              <Button variant="link">View</Button>
            </td>
          </tr>
          <tr>
            <td>Login Report</td>
            <td>A New Login - 9925400834</td>
            <td>2024-12-24 07:09:52</td>
            <td className="text-danger">Unread</td>
            <td>—</td>
            <td>
              <Button variant="link">View</Button>
            </td>
          </tr>
          <tr>
            <td>Call Back Form</td>
            <td>A Customer Requested call back</td>
            <td>2024-12-24 03:46:33</td>
            <td className="text-danger">Unread</td>
            <td>—</td>
            <td>
              <Button variant="link">View</Button>
            </td>
          </tr>
          <tr>
            <td>Expired Car</td>
            <td>Puc id:6110 is expired today</td>
            <td>2024-12-24 00:00:04</td>
            <td className="text-danger">Unread</td>
            <td>—</td>
            <td>
              <Button variant="link">View</Button>
            </td>
          </tr>
          <tr>
            <td>Call Back Form</td>
            <td>A Customer Requested call back</td>
            <td>2024-12-25 05:45:15</td>
            <td className="text-danger">Unread</td>
            <td>—</td>
            <td>
              <Button variant="link">View</Button>
            </td>
          </tr>
          <tr>
            <td>Login Report</td>
            <td>A New Login - 9925400834</td>
            <td>2024-12-24 07:09:52</td>
            <td className="text-danger">Unread</td>
            <td>—</td>
            <td>
              <Button variant="link">View</Button>
            </td>
          </tr>
          <tr>
            <td>Call Back Form</td>
            <td>A Customer Requested call back</td>
            <td>2024-12-24 03:46:33</td>
            <td className="text-danger">Unread</td>
            <td>—</td>
            <td>
              <Button variant="link">View</Button>
            </td>
          </tr>
          <tr>
            <td>Expired Car</td>
            <td>Puc id:6110 is expired today</td>
            <td>2024-12-24 00:00:04</td>
            <td className="text-danger">Unread</td>
            <td>—</td>
            <td>
              <Button variant="link">View</Button>
            </td>
          </tr>        </tbody>
      </Table>
      {/* </Col>
      </Row> */}
    </div>
  );
};

export default AdminNotification;
