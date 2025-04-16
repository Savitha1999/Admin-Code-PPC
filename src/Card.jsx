// import React, { useState } from 'react';
// import { Card, Row, Col, Form } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const StudentCard = ({ student }) => {
//   return (
//     <Card classNameName="mb-3">
//     <Row noGutters>
//       <Col md={4}>
//         <Card.Img src={student.photo} alt={`${student.name}'s photo`}height={50} classNameName="img-fluid" />
//       </Col>
//       <Col md={8}>
//         <Card.Body>
//           <Card.Title>{student.name}</Card.Title>
//           <Card.Text>
//             <strong>Phone:</strong> {student.phone}<br />
//             <strong>Location:</strong> {student.location}<br />
//             <strong>Education:</strong> {student.education}<br />
//             <strong>Passout:</strong> {student.passout}<br />
//             <strong>Course Details:</strong> {student.courseDetail}<br />
//             <strong>experience:</strong> {student.experience}<br />
//             <strong>Position:</strong> {student.position}<br />
//             <strong>Portfolio:</strong> <a href={student.portfolio} target="_blank" rel="noopener noreferrer">View Portfolio</a>
//           </Card.Text>
//         </Card.Body>
//       </Col>
//     </Row>
//   </Card> 
//   );
// };

// const App = () => {
//   const [students, setStudents] = useState([
//     {
//       photo: 'https://clipground.com/images/student-png-5.png',
//       name: 'John Doe',
//       phone: '123-456-7890',
//       location: 'City, Country',
//       education: 'Bachelor of Science in Computer Science',
//       passout: '2020',
//       courseDetail: 'Full-Stack Web Development',
//       experience: '2 years',
//       position: 'Software Engineer',
//       portfolio: 'https://portfolio.example.com'
//     },
//     {
//       photo: 'path/to/photo.jpg',
//       name: 'Den',
//       phone: '758694641',
//       location: 'pondy, Country',
//       education: 'Bachelor of Science in Computer Science',
//       passout: '2020',
//       courseDetail: 'Full-Stack Web Development',
//       experience: '2 years',
//       position: 'Software Engineer',
//       portfolio: 'https://portfolio.example.com'
//     }
//     // Add more students as needed
//   ]);

//   const [filter, setFilter] = useState({ name: '', phone: '', email: '' });

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilter((prevFilter) => ({
//       ...prevFilter,
//       [name]: value,
//     }));
//   };

//   const filteredProfiles = students.filter((student) =>
//     student.name.toLowerCase().includes(filter.name.toLowerCase()) &&
//     student.phone.includes(filter.phone) &&
//     (!student.email || student.email.toLowerCase().includes(filter.email.toLowerCase()))
//   );

//   return (
//     <>
//     <div classNameName="container mt-4">
//       <Form classNameName="mb-4">
//         <Row>
//           <Col>
//             <Form.Group controlId="filterName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="name"
//                 placeholder="Enter name"
//                 value={filter.name}
//                 onChange={handleFilterChange}
//               />
//             </Form.Group>
//           </Col>
//           <Col>
//             <Form.Group controlId="filterPhone">
//               <Form.Label>Phone</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="phone"
//                 placeholder="Enter phone"
//                 value={filter.phone}
//                 onChange={handleFilterChange}
//               />
//             </Form.Group>
//           </Col>
//           <Col>
//             <Form.Group controlId="filterEmail">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 placeholder="Enter email"
//                 value={filter.email}
//                 onChange={handleFilterChange}
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//       </Form>

//       {filteredProfiles.map((student, index) => (
//         <StudentCard key={index} student={student} />
//       ))}
//     </div>
//     </>
//   );
// };

// export default App;


// import React, { useState } from 'react';
// import { Card, Row, Col, Form, Button, ButtonGroup } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// const StudentCard = ({ student }) => (

//   <Card className="mb-3" style={{boxShadow:'7px 5px 21px -9px rgba(0,0,0,0.6)', padding:'5px',boxSizing:'border-box'}}>
//   <Row noGutters>
//     <Col md={1} className="d-flex align-items-center justify-content-center">
//     <Card.Img 
//     variant="left" 
//     src={student.photo} 
//     style={{ width: '80px', height: '80px', margin: '15px' }} 
//   />
//     </Col>
//     <Col md={9}>
//       <Card.Body>
//         <Card.Title>{student.name}</Card.Title>
//         <Card.Text>
//           <Row>
//             <Col md={4}>
//               <strong>Email:</strong> {student.email}<br />
//               <strong>Phone:</strong> {student.phone}<br />
//               <strong>Location:</strong> {student.location}<br />
//             </Col>
//             <Col md={4}>
//               <strong>Education:</strong> {student.education}<br />
//               <strong>Passout:</strong> {student.passout}<br />
//               <strong>Course Details:</strong> {student.courseDetail}<br />
//             </Col>
//             <Col md={4}>
//               <strong>experience:</strong> {student.experience}<br />
//               <strong>Position:</strong> {student.position}<br />
//               <strong>Portfolio:</strong> <a href={student.portfolio} target="_blank" rel="noopener noreferrer">View Portfolio</a><br />
//             </Col>
//           </Row>
//         </Card.Text>
//       </Card.Body>
//     </Col>
//     <Col md={2} className="d-flex align-items-center justify-content-center">
//       <Button variant="primary" ><span className='donl'>Download</span><em className='emm'></em></Button>
//     </Col>
//   </Row>
// </Card>

// );

// const PlacementCard = ({ placement }) => (
 
//   <Card className="d-flex flex-row align-items-center p-3 mb-3" style={{boxShadow:'7px 5px 21px -9px rgba(0,0,0,0.6)', padding:'5px'}}>
//   <Card.Img 
//     variant="left" 
//     src={placement.photo} 
//     style={{ width: '50px', height: '50px', marginRight: '15px' }} 
//   />
//   <Card.Body className="d-flex flex-column">
//     <Card.Title>{placement.name}</Card.Title>
//     <Card.Text className="d-flex flex-wrap align-items-center">
//       <span className="me-3"><strong>Industry:</strong> {placement.company}</span>
//       <span className="me-3"><strong>Position:</strong> {placement.position}</span>
//       <span className="me-3"><strong>Join Date:</strong> {placement.date}</span>

//     </Card.Text>
//   </Card.Body>
//   <div className="ms-auto d-flex align-items-center">
//     <Button variant="primary" className="me-3">Apply Now</Button>
//   </div>
// </Card>


// );

// const CompanyCard = ({ company }) => (
  
//   <Card className="d-flex flex-row align-items-center p-3 mb-3" style={{boxShadow:'7px 5px 21px -9px rgba(0,0,0,0.6)', padding:'5px'}}>
//   <Card.Img 
//     variant="left" 
//     src={company.photo} 
//     style={{ width: '50px', height: '50px', marginRight: '15px' }} 
//   />
//   <Card.Body className="d-flex flex-column">
//     <Card.Title>{company.position}</Card.Title>
//     <Card.Text className="d-flex flex-wrap align-items-center">
//       <span className="me-3"><strong>Industry:</strong> {company.name}</span>
//       <span className="me-3"><strong>Location:</strong> {company.location}</span>
//       <span className="me-3"><strong>Experience:</strong> {company.experience}</span>

//     </Card.Text>
//   </Card.Body>
//   <div className="ms-auto d-flex align-items-center">
//     <Button variant="primary" className="me-3">Apply Now</Button>
//   </div>
// </Card>
// );

// const App = () => {
//   const [selectedCategory, setSelectedCategory] = useState('student');
  
//   // Profile data
//   const [students, setStudents] = useState([
//     {
//       photo: 'https://clipground.com/images/student-png-5.png',
//       name: 'John Doe',
//       email: 'john.doe@example.com',
//       phone: '123-456-7890',
//       location: 'City, Country',
//       education: 'Bachelor of Science in Computer Science',
//       passout: '2020',
//       courseDetail: 'Full-Stack Web Development',
//       experience: '2 years',
//       position: 'Software Engineer',
//       portfolio: 'https://portfolio.example.com'
//     },
//     {
//       photo: '',
//       name: 'Den',
//       email: 'den@example.com',
//       phone: '758694641',
//       location: 'Pondy, Country',
//       education: 'Bachelor of Science in Computer Science',
//       passout: '2020',
//       courseDetail: 'Full-Stack Web Development',
//       experience: '2 years',
//       position: 'Software Engineer',
//       portfolio: 'https://portfolio.example.com'
//     }
//   ]);
  
//   // Placement data
//   const [placements, setPlacements] = useState([
//     {
//       photo:'',
//       name: 'John Doe',
//       company: 'ABC Corp',
//       position: 'Software Engineer',
//       date: '2023-08-30'
//     },
//     {
//       photo:'',
//       name: 'Jane Smith',
//       company: 'XYZ Ltd',
//       position: 'Data Analyst',
//       date: '2023-07-15'
//     }
//   ]);
  
//   // Company data
//   const [companies, setCompanies] = useState([
//     {
//       photo:'',
//       name: 'ABC Corp',
//       experience: '0-3 years',
//       location: 'pondy, pondycherry',
//       position: 'software developer'
//     },
//     {
//       photo:'',
//       name: 'XYZ Ltd',
//       experience: '5-9 year',
//       location: 'chennai, tamilnadu',
//       position: 'Data Analysist'

//     }
//   ]);

//   const [filter, setFilter] = useState({ name: '', phone: '', email: '', position: '', company: '', industry: '' });

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilter((prevFilter) => ({
//       ...prevFilter,
//       [name]: value,
//     }));
//   };

//   const filteredProfiles = students.filter((student) =>
//     student.name.toLowerCase().includes(filter.name.toLowerCase()) &&
//     student.phone.includes(filter.phone) &&
//     student.email.toLowerCase().includes(filter.email.toLowerCase())
//   );

//   const filteredPlacements = placements.filter((placement) =>
//     placement.name.toLowerCase().includes(filter.name.toLowerCase()) &&
//     placement.position.toLowerCase().includes(filter.position.toLowerCase()) &&
//     placement.company.toLowerCase().includes(filter.company.toLowerCase())
//   );
//   // const filteredCompanies = companies.filter((company) =>
//   //   company.name.toLowerCase().includes(filter.name.toLowerCase()) &&
//   //   company.position.toLowerCase().includes(filter.position.toLowerCase())   
//   // );
 
//   const filteredCompanies = companies.filter((company) => {
//     const experienceMatch = filter.experience 
//       ? (company.experience || '').toLowerCase().includes(filter.experience.toLowerCase())
//       : true;
  
//     return (company.name || '').toLowerCase().includes(filter.name.toLowerCase()) &&
//       (company.position || '').toLowerCase().includes(filter.position.toLowerCase()) &&
//       experienceMatch;
//   });


//   const renderContent = () => {
//     switch (selectedCategory) {
//       case 'student':
//         return filteredProfiles.map((student, index) => (
//           <StudentCard key={index} student={student} />
//         ));
//       case 'placement':
//         return filteredPlacements.map((placement, index) => (
//           <PlacementCard key={index} placement={placement} />
//         ));
//       case 'company':
//         return filteredCompanies.map((company, index) => (
//           <CompanyCard key={index} company={company} />
//         ));
//       default:
//         return null;
//     }
//   };

//   const renderFilterInputs = () => {
//     switch (selectedCategory) {
//       case 'student':
//         return (
//           <>
//             <Col>
//               <Form.Group controlId="filterName">
//                 <Form.Label>Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="name"
//                   placeholder="Enter name"
//                   value={filter.name}
//                   onChange={handleFilterChange}
//                 />
//               </Form.Group>
//             </Col>
//             <Col>
//               <Form.Group controlId="filterPhone">
//                 <Form.Label>Phone</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="phone"
//                   placeholder="Enter phone"
//                   value={filter.phone}
//                   onChange={handleFilterChange}
//                 />
//               </Form.Group>
//             </Col>
//             <Col>
//               <Form.Group controlId="filterEmail">
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control
//                   type="email"
//                   name="email"
//                   placeholder="Enter email"
//                   value={filter.email}
//                   onChange={handleFilterChange}
//                 />
//               </Form.Group>
//             </Col>
//           </>
//         );
//       case 'placement':
//         return (
//           <>
//             <Col>
//               <Form.Group controlId="filterName">
//                 <Form.Label>Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="name"
//                   placeholder="Enter name"
//                   value={filter.name}
//                   onChange={handleFilterChange}
//                 />
//               </Form.Group>
//             </Col>
//             <Col>
//               <Form.Group controlId="filterPosition">
//                 <Form.Label>Position</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="position"
//                   placeholder="Enter position"
//                   value={filter.position}
//                   onChange={handleFilterChange}
//                 />
//               </Form.Group>
//             </Col>
//             <Col>
//               <Form.Group controlId="filterCompany">
//                 <Form.Label>Company</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="company"
//                   placeholder="Enter company"
//                   value={filter.company}
//                   onChange={handleFilterChange}
//                 />
//               </Form.Group>
//             </Col>
//           </>
//         );
//       case 'company':
//         return (
//           <>
//             <Col>
//               <Form.Group controlId="filterName">
//                 <Form.Label>Company Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="name"
//                   placeholder="Enter company name"
//                   value={filter.name}
//                   onChange={handleFilterChange}
//                 />
//               </Form.Group>
//             </Col>
//             <Col>
//               <Form.Group controlId="filterIndustry">
//                 <Form.Label>Position</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="position"
//                   placeholder="Enter position"
//                   value={filter.position}
//                   onChange={handleFilterChange}
//                 />
//               </Form.Group>
//             </Col>
//             <Col>
//             <Form.Group controlId="filterExperience">
//               <Form.Label>Experience</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="experience"
//                 placeholder="Enter experience"
//                 value={filter.experience}
//                 onChange={handleFilterChange}
//               />
//             </Form.Group>
//           </Col>
//           </>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <ButtonGroup className="mb-4">
//         {['student', 'placement', 'company'].map((category) => (
//           <Button
//             key={category}
//             variant={selectedCategory === category ? 'primary' : 'outline-primary'}
//             onClick={() => setSelectedCategory(category)}
//           >
//             {category.charAt(0).toUpperCase() + category.slice(1)}
//           </Button>
//         ))}
//       </ButtonGroup>

//       <Form className="mb-4">
//         <Row>{renderFilterInputs()}</Row>
//       </Form>

//       {renderContent()}
//     </div>
//   );
// };

// export default App;


import React, { useState } from 'react';
import { Card, Row, Col, Button, Form, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentCard = ({ student }) => (
  <Container fluid className="p-3">
    <Card className="d-flex flex-row align-items-center p-3 mb-3" style={{ boxShadow: '7px 5px 21px -9px rgba(0,0,0,0.6)' }}>
      <Card.Img
        variant="left"
        src={student.photo}
        style={{ width: '80px', height: '80px', margin: '15px' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{student.name}</Card.Title>
        <Card.Text className="d-flex flex-wrap">
          <Row>
            <Col md={4}>
              <strong>Email:</strong> {student.email}<br />
              <strong>Phone:</strong> {student.phone}<br />
              <strong>Location:</strong> {student.location}<br />
            </Col>
            <Col md={4}>
              <strong>Education:</strong> {student.education}<br />
              <strong>Passout:</strong> {student.passout}<br />
              <strong>Course Details:</strong> {student.courseDetail}<br />
            </Col>
            <Col md={4}>
              <strong>Experience:</strong> {student.experience}<br />
              <strong>Position:</strong> {student.position}<br />
              <strong>Portfolio:</strong> <a href={student.portfolio} target="_blank" rel="noopener noreferrer">View Portfolio</a><br />
            </Col>
          </Row>
        </Card.Text>
      </Card.Body>
      <div className="ms-auto d-flex align-items-center">
        <Button variant="primary"><span className='donl'>Download</span><em className='emm'></em></Button>
      </div>
    </Card>
  </Container>
);

const PlacementCard = ({ placement }) => (
  <Container fluid className="p-3">

  <Card className="d-flex flex-row align-items-center p-3 mb-3" style={{ boxShadow: '7px 5px 21px -9px rgba(0,0,0,0.6)', padding: '5px' }}>
    <Card.Img
      variant="left"
      src={placement.photo}
      style={{ width: '50px', height: '50px', marginRight: '15px' }}
    />
    <Card.Body className="d-flex flex-column">
      <Card.Title>{placement.name}</Card.Title>
      <Card.Text className="d-flex flex-wrap align-items-center">
        <span className="me-3"><strong>Industry:</strong> {placement.company}</span>
        <span className="me-3"><strong>Position:</strong> {placement.position}</span>
        <span className="me-3"><strong>Join Date:</strong> {placement.date}</span>
      </Card.Text>
    </Card.Body>
    <div className="ms-auto d-flex align-items-center">
      <Button variant="primary" className="me-3">Aprove</Button>
    </div>
  </Card>
  </Container>

);

const TestimonialCard = ({ testimonial }) => (
  <Container fluid className="p-3">

  <Card className="d-flex flex-row align-items-center p-3 mb-3" style={{ boxShadow: '7px 5px 21px -9px rgba(0,0,0,0.6)', padding: '5px' }}>
    <Card.Img
      variant="left"
      src={testimonial.photo}
      style={{ width: '50px', height: '50px', marginRight: '15px' }}
    />
    <Card.Body className="d-flex flex-column">
      <Card.Title>{testimonial.name}</Card.Title>
      <Card.Text className="d-flex flex-wrap align-items-center">
      <span className="me-3"><strong>Professional:</strong> {testimonial.professional}</span>
        <span className="me-3"><strong>Message:</strong> {testimonial.message}</span>
        <span className="me-3"><strong>Star Rating:</strong> {testimonial.starRating}</span>
      </Card.Text>
    </Card.Body>
    <div className="ms-auto d-flex align-items-center">
      <Button variant="primary" className="me-3">Aprove</Button>
    </div>
  </Card>
  </Container>

);

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('student');
  const [filter, setFilter] = useState({ name: '', phone: '', email: '' });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const categories = {
    student: 'Students',
    placement: 'Placements',
    testimonial: 'Testimonials',
  };

  // Profile data
  const [students] = useState([
    {
      photo: 'https://clipground.com/images/student-png-5.png',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      location: 'City, Country',
      education: 'Bachelor of Science in Computer Science',
      passout: '2020',
      courseDetail: 'Full-Stack Web Development',
      experience: '2 years',
      position: 'Software Engineer',
      portfolio: 'https://portfolio.example.com'
    },
    {
      photo: '',
      name: 'Den',
      email: 'den@example.com',
      phone: '758694641',
      location: 'Pondy, Country',
      education: 'Bachelor of Science in Computer Science',
      passout: '2020',
      courseDetail: 'Full-Stack Web Development',
      experience: '2 years',
      position: 'Software Engineer',
      portfolio: 'https://portfolio.example.com'
    }
  ]);

  // Placement data
  const [placements] = useState([
    {
      photo: '',
      name: 'John Doe',
      company: 'ABC Corp',
      position: 'Software Engineer',
      date: '2023-08-30'
    },
    {
      photo: '',
      name: 'Jane Smith',
      company: 'XYZ Ltd',
      position: 'Data Analyst',
      date: '2023-07-15'
    }
  ]);

  // Testimonial data
  const [testimonials] = useState([
    {
      photo: '',
      name: 'John Doe',
      message: 'Great working experience!',
      starRating: '5 stars',
      professional: 'Software Developer'
    },
    {
      photo: '',
      name: 'Jane Smith',
      message: 'Amazing environment to grow.',
      starRating: '4 stars',
      professional: 'Data Analyst'
    }
  ]);

  const filteredStudents = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(filter.name.toLowerCase()) &&
      student.phone.includes(filter.phone) &&
      student.email.toLowerCase().includes(filter.email.toLowerCase())
    );
  });

  const renderContent = () => {
    switch (selectedCategory) {
      case 'student':
        return filteredStudents.map((student, index) => (
          <StudentCard key={index} student={student} />
        ));
      case 'placement':
        return placements.map((placement, index) => (
          <PlacementCard key={index} placement={placement} />
        ));
      case 'testimonial':
        return testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ));
      default:
        return null;
    }
  };

  const renderFilterInputs = () => {
    if (selectedCategory === 'student') {
      return (
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="filterName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter name"
                value={filter.name}
                onChange={handleFilterChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="filterPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                placeholder="Enter phone"
                value={filter.phone}
                onChange={handleFilterChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="filterEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={filter.email}
                onChange={handleFilterChange}
              />
            </Form.Group>
          </Col>
        </Row>
      );
    }
    return null;
  };

   // Inline styles
   const categoriesStyle = {
    display: 'flex',
  justifyContent: 'center',  
  alignItems: 'center',      
  gap: '10px',              
    marginBottom: '20px',
  };

  const spanStyle = {
    margin: '0 10px',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  const activeSpanStyle = {
    ...spanStyle, 
    borderBottom: '2px solid blue', 
  };

  return (
    <div>
         <div className="mb-3" style={categoriesStyle}>
        {Object.keys(categories).map((key) => (
          <span
            key={key}
            onClick={() => setSelectedCategory(key)}
            style={selectedCategory === key ? activeSpanStyle : spanStyle}
          >
            {categories[key]}
          </span>
        ))}
      </div>
      {renderFilterInputs()}
      {renderContent()}
    </div>
  );
};

export default App;

