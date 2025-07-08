import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Spinner } from 'react-bootstrap';
import '../style/LicencePlateTable.css';
import { useNavigate } from 'react-router-dom';
import useAxios from '../api/axios';

interface PlateEntry {
  id: number;
  plate_number: string;
  plate_image_url: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

const LicencePlateTable: React.FC = () => {
  const [data, setData] = useState<PlateEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editEntry, setEditEntry] = useState<PlateEntry | null>(null);
  const [editForm, setEditForm] = useState({
    plate_number: '',
    plate_image_url: '',
    user_email: '',
  });

  const navigate = useNavigate();
  const axiosInstance = useAxios();

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axiosInstance.get('/plates');
      setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = () => {
    if (targetId !== null) {
      setData((prev) => prev.filter((item) => item.id !== targetId));
      setTargetId(null);
    }
    setShowModal(false);
  };

  const handleEdit = (id: number) => {
    const entry = data.find((item) => item.id === id);
    if (entry) {
      setEditEntry(entry);
      setEditForm({
        plate_number: entry.plate_number,
        plate_image_url: entry.plate_image_url,
        user_email: entry.user.email,
      });
      setShowEditModal(true);
    }
  };

  const handleEditSubmit = async () => {
    if (!editEntry) return;

    const updatedData = {
      plate_number: editForm.plate_number,
      plate_image_url: editForm.plate_image_url,
      user_email: editForm.user_email,
    };

    try {
      await axiosInstance.put(`/plates/${editEntry.id}`, updatedData);
      setData((prev) =>
        prev.map((item) =>
          item.id === editEntry.id
            ? {
                ...item,
                plate_number: editForm.plate_number,
                plate_image_url: editForm.plate_image_url,
                user: { ...item.user, email: editForm.user_email },
              }
            : item
        )
      );
      setShowEditModal(false);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const handleConfirmDelete = (id: number) => {
    setTargetId(id);
    setShowModal(true);
  };

  const handleAdd = () => {
    navigate('/add-licence');
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-4 fw-bold" style={{ color: '#3A6EA5' }}>
          Licence Plate
        </h3>
        <Button variant="light" onClick={handleAdd}>
          Add
        </Button>
      </div>
      <Table bordered>
        <thead className="table-light">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Plate Number</th>
            <th>Email</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.id} className="table-row-hover">
              <td>{entry.id}</td>
              <td>{entry.user.name}</td>
              <td>{entry.plate_number}</td>
              <td>{entry.user.email}</td>
              <td>
                {entry.plate_image_url ? (
                  <img
                    src={entry.plate_image_url}
                    alt={`Plate ${entry.plate_number}`}
                    style={{ width: '100px', objectFit: 'cover' }}
                  />
                ) : (
                  <span>No Image</span>
                )}
              </td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => handleEdit(entry.id)}
                  className="me-2"
                >
                  <i className="fas fa-edit"></i>
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleConfirmDelete(entry.id)}
                >
                  <i className="fas fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this entry?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}    
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Plate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Plate Number</label>
            <input
              type="text"
              className="form-control"
              value={editForm.plate_number}
              onChange={(e) =>
                setEditForm({ ...editForm, plate_number: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              className="form-control"
              value={editForm.plate_image_url}
              onChange={(e) =>
                setEditForm({ ...editForm, plate_image_url: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Client Email</label>
            <input
              type="email"
              className="form-control"
              value={editForm.user_email}
              onChange={(e) =>
                setEditForm({ ...editForm, user_email: e.target.value })
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default LicencePlateTable;
