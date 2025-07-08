import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../style/Sidebar.css';

const Sidebar: React.FC = () => (
  <div
    className="text-white vh-100 p-3"
    style={{ backgroundColor: '#3A6EA5', width: '240px', minWidth: '240px' }}
  >
    <div className="text-center mb-4">
      <div className="bg-white rounded-circle d-inline-block p-3">
        <span className="text-dark">👤</span>
      </div>
      <div>Admin</div>
    </div>
    <Nav className="flex-column gap-2">
      <NavLink to="/dashboard" className="sidebar-link">
        <i className="fas fa-tachometer-alt me-2"></i>
        <span>Dashboard</span>
      </NavLink>
      <NavLink to="/admin-profile" className="sidebar-link">
        <i className="fas fa-user-shield me-2"></i>
        <span>Admin Profile</span>
      </NavLink>
      <NavLink to="/parking-space" className="sidebar-link">
        <i className="fas fa-parking me-2"></i>
        <span>Parking Space</span>
      </NavLink>
      <NavLink to="/licence-plate" className="sidebar-link">
        <i className="fas fa-id-card me-2"></i>
        <span>Licence Plate</span>
      </NavLink>
      <NavLink to="/auth-requests" className="sidebar-link">
        <i className="fas fa-user-check me-2"></i>
        <span>Auth Requests</span>
      </NavLink>
      <NavLink to="/" className="sidebar-link mt-5">
        <i className="fas fa-sign-out-alt me-2"></i>
        <span>Logout</span>
      </NavLink>
    </Nav>
  </div>
);

export default Sidebar;
