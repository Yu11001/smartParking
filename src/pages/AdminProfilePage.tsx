import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAxios from '../api/axios';

const axiosInstance = useAxios();

interface Admin {
  id: number;
  username: string;
  password: string;
  role: string;
}

const AdminProfilePage = () => {
  const navigate = useNavigate();
  const [adminList, setAdminList] = useState<Admin[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Admin>>({});

  // Load initial data with dummy
  // Get all admins
useEffect(() => {
  const fetchAdmins = async () => {
    try {
      const res = await axiosInstance.get('/admin');
      setAdminList(res.data);
    } catch (error) {
      console.error('Failed to fetch admins', error);
    }
  };
  fetchAdmins();
}, []);

  // Delete modal
  const handleDeleteClick = (id: number) => {
    setTargetId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (targetId === null) return;

    try {
      await axiosInstance.delete(`/admin/${targetId}`);

      const updated = adminList.filter((a) => a.id !== targetId);
      setAdminList(updated);
      localStorage.setItem('adminList', JSON.stringify(updated));
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.detail || 'Failed to delete admin.');
      } else {
        alert('Network error or server unavailable.');
      }
      console.error(error);
    } finally {
      setShowDeleteModal(false);
      setTargetId(null);
    }
  };

  // Edit handlers
  const handleEditClick = (admin: Admin) => {
    setEditingId(admin.id);
    setEditData({ username: admin.username, password: admin.password, role: admin.role });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    if (editingId !== null) {
      try {
        const payload: {
          username?: string;
          password?: string;
          role?: string;
        } = {
          username: editData.username,
          role: editData.role,
        };

        if (editData.password) {
          payload.password = editData.password;
        }

        await axiosInstance.patch(`/admin/edit/${editingId}`, payload);

        const updatedList = adminList.map((admin) =>
          admin.id === editingId
            ? {
                ...admin,
                username: editData.username || '',
                role: editData.role || '',
              }
            : admin
        );

        setAdminList(updatedList);
        setEditingId(null);
        setEditData({});
      } catch (error) {
        console.error('Error updating user', error);
      }
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

      <Table bordered>
        <thead className="table-light">
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Password</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {adminList.map((admin) => (
            <tr key={admin.id} className="table-row-hover">
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
                      type="password"
                      name="password"
                      value={editData.password || ''}
                      onChange={handleEditChange}
                      size="sm"
                    />
                  </td>
                  <td>
                    <Form.Select
                      name="role"
                      value={editData.role || ''}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          role: e.target.value,
                        }))
                      }
                      size="sm"
                    >
                      <option value="">Select Role</option>
                      <option value="admin">Admin</option>
                      <option value="operator">Operator</option>
                    </Form.Select>
                  </td>
                  <td>
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={saveEdit}
                      className="me-2"
                    >
                      <i className="fas fa-save"></i>
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={cancelEdit}
                    >
                      <i className="fas fa-times"></i>
                    </Button>
                  </td>
                </>
              ) : (
                <>
                  <td>{admin.username}</td>
                  <td>{'*'.repeat(8)}</td>
                  <td>{admin.role}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleEditClick(admin)}
                      className="me-2"
                    >
                      <i className="fas fa-edit"></i>
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteClick(admin.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
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
