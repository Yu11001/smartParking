import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface Admin {
  id: number;
  username: string;
  password: string;
}

const AdminProfilePage = () => {
  const navigate = useNavigate();
  const [adminList, setAdminList] = useState<Admin[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Admin>>({});

  // Load initial data with dummy
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('adminList') || '[]');
    if (stored.length === 0) {
      const defaultAdmins = [
        { id: 1, username: 'admin', password: 'admin123' },
        { id: 2, username: 'will', password: 'willpass' },
        { id: 3, username: 'john', password: 'johnpass' },
      ];
      localStorage.setItem('adminList', JSON.stringify(defaultAdmins));
      setAdminList(defaultAdmins);
    } else {
      setAdminList(stored);
    }
  }, []);

  // Delete modal
  const handleDeleteClick = (id: number) => {
    setTargetId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (targetId !== null) {
      const updated = adminList.filter((a) => a.id !== targetId);
      setAdminList(updated);
      localStorage.setItem('adminList', JSON.stringify(updated));
    }
    setShowDeleteModal(false);
    setTargetId(null);
  };

  // Edit handlers
  const handleEditClick = (admin: Admin) => {
    setEditingId(admin.id);
    setEditData({ username: admin.username, password: admin.password });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = () => {
    if (editingId !== null) {
      const updated = adminList.map((admin) =>
        admin.id === editingId
          ? { ...admin, username: editData.username || '', password: editData.password || '' }
          : admin
      );
      setAdminList(updated);
      localStorage.setItem('adminList', JSON.stringify(updated));
      setEditingId(null);
      setEditData({});
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  return (
    <div className="p-5 bg-light min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-4 fw-bold" style={{ color: '#3A6EA5' }}>
          Admin Profile
        </h3>
        <Button
          variant="light"
          className="px-4 py-2 rounded-pill shadow-sm"
          onClick={() => navigate('/add-admin')}
        >
          Add
        </Button>
      </div>

      <Table striped bordered hover className="bg-body-secondary">
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Password</th>
            <th>Edit</th>
            <th className="text-danger">Delete</th>
          </tr>
        </thead>
        <tbody>
          {adminList.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.id}</td>

              {editingId === admin.id ? (
                <>
                  <td>
                    <Form.Control
                      type="text"
                      name="username"
                      value={editData.username || ''}
                      onChange={handleEditChange}
                      size="sm"
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      name="password"
                      value={editData.password || ''}
                      onChange={handleEditChange}
                      size="sm"
                    />
                  </td>
                  <td className="d-flex gap-2">
                    <Button variant="success" size="sm" onClick={saveEdit}>
                      Save
                    </Button>
                    <Button variant="secondary" size="sm" onClick={cancelEdit}>
                      Cancel
                    </Button>
                  </td>
                  <td />
                </>
              ) : (
                <>
                  <td>{admin.username}</td>
                  <td>{admin.password}</td>
                  <td
                    className="text-primary"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleEditClick(admin)}
                  >
                    Edit
                  </td>
                  <td
                    className="text-danger"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDeleteClick(admin.id)}
                  >
                    Delete
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Confirm Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this admin?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminProfilePage;
