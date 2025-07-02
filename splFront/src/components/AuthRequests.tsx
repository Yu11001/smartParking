import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaCheck, FaTimes } from 'react-icons/fa';

interface AuthRequest {
  name: string;
  plateNumber: string;
  email: string;
  photo: string;
  status?: 'Approved' | 'Rejected';
}

const initialRequests: AuthRequest[] = [
  { name: 'admin', plateNumber: 'CM6655', email: 'admin@mail.com', photo: 'p1.jpg' },
  { name: 'john', plateNumber: 'CM6655', email: 'john@mail.com', photo: 'p2.jpg' },
  { name: 'will', plateNumber: 'CM6655', email: 'will@mail.com', photo: 'p3.jpg' },
];

const AuthRequests: React.FC = () => {
  const [requests, setRequests] = useState<AuthRequest[]>(initialRequests);

  const handleApprove = (index: number, status: 'Approved' | 'Rejected') => {
    const updatedRequests = [...requests];
    updatedRequests[index].status = status;
    setRequests(updatedRequests);
  };

  return (
    <div className="p-4" style={{ color: '#E8F0F2' }}>
      <h3 className="mb-4 fw-bold" style={{ color: '#3A6EA5' }}>
        Auth Requests
      </h3>
      <Table striped bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th className="align-middle">Name</th>
            <th className="align-middle">Plate Number</th>
            <th className="align-middle">Email</th>
            <th className="align-middle">Photo</th>
            <th className="align-middle">Approve</th>
            <th className="align-middle">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req, index) => (
            <tr key={index}>
              <td className="align-middle">{req.name}</td>
              <td className="align-middle">{req.plateNumber}</td>
              <td className="align-middle">{req.email}</td>
              <td className="align-middle">{req.photo}</td>
              <td className="align-middle">
                <Button
                  variant="link"
                  className="text-success me-2"
                  onClick={() => handleApprove(index, 'Approved')}
                >
                  <FaCheck />
                </Button>
                <Button
                  variant="link"
                  className="text-danger"
                  onClick={() => handleApprove(index, 'Rejected')}
                >
                  <FaTimes />
                </Button>
              </td>
              <td className="align-middle">
                {req.status ? (
                  req.status === 'Approved' ? (
                    <span className="text-success fw-semibold">Approved</span>
                  ) : (
                    <span className="text-danger fw-semibold">Rejected</span>
                  )
                ) : (
                  <span className="text-muted">Pending</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AuthRequests;
