

// import React, { useState } from 'react';
// import { Container, Row, Col, Form, Button } from 'react-bootstrap';

// const MyAccount = () => {
//   const [tucId, setTucId] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`TUC ID Entered: ${tucId}`);
//   };

//   return (
//     <Container className="mt-5 justify-content-start">
//    <h4 className="text-start">Enter Customer Phone Number
//    </h4>
//       <Row className="justify-content-start">
  
//         <Col xs={12} md={8} >
       
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="tucId">
//               <Form.Label>Number :</Form.Label>
//               <Form.Control
//                 type="tel"
//                 value={tucId}
//                 onChange={(e) => setTucId(e.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Button variant="primary" type="submit" className="w-100">
//               Submit
//             </Button>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default MyAccount;










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
