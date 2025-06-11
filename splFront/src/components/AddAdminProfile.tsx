import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddAdminProfile: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    const existingAdmins = JSON.parse(localStorage.getItem('adminList') || '[]');

    const newAdmin = {
      id: existingAdmins.length + 1,
      username: name,
      password: '*****',
    };

    const updatedAdmins = [...existingAdmins, newAdmin];
    localStorage.setItem('adminList', JSON.stringify(updatedAdmins));

    navigate('/admin-profile');
  };

  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: '100vh', backgroundColor: '#eaf3f6' }}
    >
      <h2 className="mb-4" style={{ color: '#3A6EA5' }}>
        Admin Profile
      </h2>
      <Form style={{ width: '300px' }}>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email"
            className="text-center bg-light border-0 rounded-pill"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Name"
            className="text-center bg-light border-0 rounded-pill"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Control
            type="password"
            placeholder="Password"
            className="text-center bg-light border-0 rounded-pill"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <div className="d-grid">
          <Button
            variant="primary"
            className="rounded-pill"
            style={{ backgroundColor: '#aac9dd', border: 'none' }}
            onClick={handleRegister}
          >
            Register
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddAdminProfile;
