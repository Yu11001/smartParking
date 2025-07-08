import React, { useEffect, useState } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import { FaCheck, FaTimes } from 'react-icons/fa';
import useAxios from '../api/axios';

interface AuthRequest {
  id: number;
  plateNumber: string;
  photo: string;
  status: string;
  name: string;
  email: string;
}

const AuthRequests: React.FC = () => {
  const axiosInstance = useAxios();
  const [requests, setRequests] = useState<AuthRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const response = await axiosInstance.get('/requests');
      const data = response.data.map((req: any) => ({
        id: req.id,
        plateNumber: req.plate_number,
        photo: req.plate_image_url,
        status: req.status,
        name: req.username,
        email: req.user_email,
      }));
      setRequests(data);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusUpdate = async (id: number, newStatus: 'approved' | 'rejected') => {
    try {
      await axiosInstance.put(`/requests/${id}`, { status: newStatus });
      setRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, status: newStatus.charAt(0).toUpperCase() + newStatus.slice(1) } : req
        )
      );
    } catch (error) {
      console.error(`Failed to ${newStatus} request ${id}:`, error);
    }
  };

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  return (
    <div className="p-3">
      <h3 className="mb-4 fw-bold" style={{ color: '#3A6EA5' }}>
        Authorization Requests
      </h3>
      <Table bordered>
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Plate Number</th>
            <th>Email</th>
            <th>Photo</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id} className="table-row-hover">
              <td>{req.name}</td>
              <td>{req.plateNumber}</td>
              <td>{req.email}</td>
              <td>
                <img
                  src={req.photo}
                  alt="plate"
                  style={{ width: '80px', height: '50px', objectFit: 'cover' }}
                />
              </td>
              <td>{req.status}</td>
              <td>
                {req.status === 'pending' ? (
                  <>
                    <Button
                      variant="outline-success"
                      size="sm"
                      className="me-2"
                      onClick={() => handleStatusUpdate(req.id, 'approved')}
                    >
                      <FaCheck />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleStatusUpdate(req.id, 'rejected')}
                    >
                      <FaTimes />
                    </Button>
                  </>
                ) : (
                  <span className="text-muted">Processed</span>
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
