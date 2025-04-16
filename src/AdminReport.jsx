


import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';

const AdminReport = () => {
  return (
    <Container fluid>
      {/* First Table */}
      <Row className="mb-4 mt-4">
        <Col>
          <Table responsive  >
            <thead>
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
                <td>16110</td>
                <td>284</td>
                <td>16394</td>
              </tr>
              <tr>
                <td>2</td>
                <td>NO. OF REPORTED</td>
                <td>N/A</td>
                <td>62</td>
                <td>62</td>
              </tr>
              <tr>
                <td>3</td>
                <td>NO. OF HELP REQUIRED</td>
                <td>N/A</td>
                <td>85</td>
                <td>85</td>
              </tr>
              <tr>
                <td>4</td>
                <td>NO. OF CONTACT FORM</td>
                <td>N/A</td>
                <td>161</td>
                <td>161</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Second Table */}
      <Row className="mb-4">
        <Col>
          <Table responsive>
            <thead>
              <tr>
                <th>SL NO</th>
                <th>DESCRIPTION</th>
                <th>CLIENT</th>
                <th>ADMIN</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>NO. OF DELETED</td>
                <td>663</td>
                <td>1329</td>
                <td>1992</td>
              </tr>
              <tr>
                <td>2</td>
                <td>NO. OF EXPIRED</td>
                <td>N/A</td>
                <td>993</td>
                <td>993</td>
              </tr>
              <tr>
                <td>3</td>
                <td>NO. OF PENDING</td>
                <td>N/A</td>
                <td>65</td>
                <td>65</td>
              </tr>
              <tr>
                <td>4</td>
                <td>NO. OF PRE APPROVED</td>
                <td>N/A</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>5</td>
                <td>NO. OF APPROVED</td>
                <td>N/A</td>
                <td>2056</td>
                <td>2056</td>
              </tr>
              <tr>
                <td>6</td>
                <td>NO. OF INCOMPLETE</td>
                <td>N/A</td>
                <td>2962</td>
                <td>2962</td>
              </tr>
              <tr>
                <td>7</td>
                <td>NO. OF BUYER ASSISTANCE</td>
                <td>5330</td>
                <td>238</td>
                <td>5568</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Third Table */}
      <Row className="mb-4">
        <Col>
          <Table responsive>
            <thead>
              <tr>
                <th>SL NO</th>
                <th>DESCRIPTION</th>
                <th>OFFLINE BILL</th>
                <th>ONLINE BILL</th>
                <th>TOTAL BILL</th>
                <th>OFFLINE AMOUNT</th>
                <th>ONLINE AMOUNT</th>
                <th>NET AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>FREE</td>
                <td>3137</td>
                <td>N/A</td>
                <td>3137</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>2</td>
                <td>SILVER</td>
                <td>36</td>
                <td>28</td>
                <td>64</td>
                <td>9754</td>
                <td>8476</td>
                <td>18230</td>
              </tr>
              <tr>
                <td>3</td>
                <td>GOLD</td>
                <td>3</td>
                <td>0</td>
                <td>3</td>
                <td>1499</td>
                <td>N/A</td>
                <td>1499</td>
              </tr>
              <tr>
                <td>4</td>
                <td>PLATINUM</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>0</td>
              </tr>
              <tr>
                <td>5</td>
                <td>BASIC</td>
                <td>0</td>
                <td>3</td>
                <td>3</td>
                <td>N/A</td>
                <td>1497</td>
                <td>1497</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Fourth Table */}
      <Row className="mb-4">
        <Col>
          <Table responsive>
            <thead>
              <tr>
                <th>SL NO</th>
                <th>DESCRIPTION</th>
                <th>OFFLINE BILL</th>
                <th>ONLINE BILL</th>
                <th>TOTAL BILL</th>
                <th>OFFLINE AMOUNT</th>
                <th>ONLINE AMOUNT</th>
                <th>NET AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>FREE</td>
                <td>1141</td>
                <td>N/A</td>
                <td>1141</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>2</td>
                <td>BASIC</td>
                <td>0</td>
                <td>3</td>
                <td>3</td>
                <td>N/A</td>
                <td>3</td>
                <td>3</td>
              </tr>
              <tr>
                <td>3</td>
                <td>ADVANCE</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>0</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminReport;

