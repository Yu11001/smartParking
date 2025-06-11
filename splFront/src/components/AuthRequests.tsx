import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaCheck, FaTimes } from 'react-icons/fa';

interface AuthRequest {
  name: string;
  plateNumber: string;
  email: string;
  photo: string;
}

const requests: AuthRequest[] = [
  { name: 'admin', plateNumber: 'CM6655', email: 'admin@mail.com', photo: 'p1.jpg' },
  { name: 'john', plateNumber: 'CM6655', email: 'john@mail.com', photo: 'p2.jpg' },
  { name: 'will', plateNumber: 'CM6655', email: 'will@mail.com', photo: 'p3.jpg' },
];

const AuthRequests: React.FC = () => {
  return (
    <div className="p-4">
      <h3 className="mb-4 text-primary fw-bold">Auth Requests</h3>
      <Table striped bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Plate Number</th>
            <th>Email</th>
            <th>Photo</th>
            <th>Approve</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req, index) => (
            <tr key={index}>
              <td>{req.name}</td>
              <td>{req.plateNumber}</td>
              <td>{req.email}</td>
              <td>{req.photo}</td>
              <td>
                <Button variant="link" className="text-success me-2">
                  <FaCheck />
                </Button>
                <Button variant="link" className="text-danger">
                  <FaTimes />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AuthRequests;
