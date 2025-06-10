import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';

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

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
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

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Licence Plate</h4>
        <Button variant="light" onClick={handleAdd}>
          Add
        </Button>
      </div>
      <Table bordered hover>
        <thead className="table-light">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Plate Number</th>
            <th>Email</th>
            <th>Edit</th>
            <th className="text-danger">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.id} className="bg-light">
              <td>{entry.id}</td>
              <td>{entry.name}</td>
              <td>{entry.plateNumber}</td>
              <td>{entry.email}</td>
              <td
                className="text-primary"
                style={{ cursor: 'pointer' }}
                onClick={() => handleEdit(entry.id)}
              >
                Edit
              </td>
              <td
                className="text-danger"
                style={{ cursor: 'pointer' }}
                onClick={() => handleDelete(entry.id)}
              >
                Delete
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default LicencePlateTable;
