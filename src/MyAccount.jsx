



import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const MyAccount = () => {
  const [phonenumber, setPhonenumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate with phone number in the URL param
    navigate(`/dashboard/add-props/${phonenumber}`);
  };

  return (
    <Container className="mt-5 justify-content-start">
      <h4 className="text-start">Enter Customer Phone Number</h4>
      <Row className="justify-content-start">
        <Col xs={12} md={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="phonenumber">
              <Form.Label>Number :</Form.Label>
              <Form.Control
                type="tel"
                value={phonenumber}
                onChange={(e) => setPhonenumber(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-3">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default MyAccount;





























// import React, { useState } from 'react';
// import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const MyAccount = () => {
//   const [phonenumber, setPhonenumber] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!phonenumber) {
//       setMessage('Phone number is required.');
//       return;
//     }

//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/store-data`, {
//         phoneNumber: phonenumber,
//       });

//       if (response.status === 201) {
//         const ppcId = response.data.ppcId;
//         setMessage(`User added successfully! PPC-ID: ${ppcId}`);
//         navigate(`/dashboard/add-props/${phonenumber}/${ppcId}`);
//       }
//     } catch (error) {
//       if (error.response && error.response.data) {
//         setMessage(error.response.data.message || 'Error adding user.');
//       } else {
//         setMessage('Error adding user. Please try again.');
//       }
//     }
//   };

//   return (
//     <Container className="mt-5 justify-content-start">
//       <h4 className="text-start">Enter Customer Phone Number</h4>
//       <Row className="justify-content-start">
//         <Col xs={12} md={8}>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="phonenumber">
//               <Form.Label>Number :</Form.Label>
//               <Form.Control
//                 type="tel"
//                 value={phonenumber}
//                 onChange={(e) => setPhonenumber(e.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Button variant="primary" type="submit" className="w-100 mt-3">
//               Submit
//             </Button>
//           </Form>
//           {message && <div className="mt-3 text-danger">{message}</div>}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default MyAccount;
