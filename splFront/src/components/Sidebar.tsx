import React from 'react';
import { Nav } from 'react-bootstrap';

const Sidebar: React.FC = () => (
  <div className="text-white vh-100 p-3" style={{ backgroundColor: '#3A6EA5' }}>
    <div className="text-center mb-4">
      <div className="bg-white rounded-circle d-inline-block p-3">
        <span className="text-dark">👤</span>
      </div>
      <div>Admin</div>
    </div>
    <Nav className="flex-column gap-2">
      <Nav.Link className="bg-light text-dark rounded px-3">Dashboard</Nav.Link>
      <Nav.Link className="text-white">Admin Profile</Nav.Link>
      <Nav.Link className="text-white">Parking Space</Nav.Link>
      <Nav.Link className="text-white">Licence Plate</Nav.Link>
      <Nav.Link className="text-white">Auth Requests</Nav.Link>
      <Nav.Link className="text-white mt-5">Logout</Nav.Link>
    </Nav>
  </div>
);

export default Sidebar;
