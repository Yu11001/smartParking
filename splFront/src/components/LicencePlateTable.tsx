import React, { useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import '../style/LicencePlateTable.css';

interface PlateEntry {
  id: number;
  name: string;
  plateNumber: string;
  email: string;
}

const initialData: PlateEntry[] = [
  { id: 1, name: 'admin', plateNumber: 'CM6655', email: 'admin@mail.com' },
  { id: 2, name: 'john', plateNumber: 'CM6655', email: 'john@mail.com' },
  { id: 3, name: 'will', plateNumber: 'CM6655', email: 'will@mail.com' },
];

const LicencePlateTable: React.FC = () => {
  const [data, setData] = useState<PlateEntry[]>(initialData);
  const [showModal, setShowModal] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);

  const handleDelete = () => {
    if (targetId !== null) {
      setData((prev) => prev.filter((item) => item.id !== targetId));
      setTargetId(null);
    }
    setShowModal(false);
  };

  const handleEdit = (id: number) => {
    alert(`Edit record with id ${id}`);
  };

  const handleAdd = () => {
    const newId = data.length + 1;
    setData([
      ...data,
      {
        id: newId,
        name: `user${newId}`,
        plateNumber: `NEW${newId}`,
        email: `user${newId}@mail.com`,
      },
    ]);
  };

  const handleConfirmDelete = (id: number) => {
    setTargetId(id);
    setShowModal(true);
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Licence Plate</h4>
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
            <th className="text-primary">Edit</th>
            <th className="text-danger">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.id}>
              <td className="cell-hover">{entry.id}</td>
              <td className="cell-hover">{entry.name}</td>
              <td className="cell-hover">{entry.plateNumber}</td>
              <td className="cell-hover">{entry.email}</td>
              <td
                className="text-primary cell-hover"
                style={{ cursor: 'pointer' }}
                onClick={() => handleEdit(entry.id)}
              >
                Edit
              </td>
              <td
                className="text-danger cell-hover"
                style={{ cursor: 'pointer' }}
                onClick={() => handleConfirmDelete(entry.id)}
              >
                Delete
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
    </div>
  );
};

export default LicencePlateTable;
