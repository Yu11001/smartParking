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
        Dashboard
      </NavLink>
      <NavLink to="/admin-profile" className="sidebar-link">
        Admin Profile
      </NavLink>
      <NavLink to="/parking-space" className="sidebar-link">
        Parking Space
      </NavLink>
      <NavLink to="/licence-plate" className="sidebar-link">
        Licence Plate
      </NavLink>
      <NavLink to="/auth-requests" className="sidebar-link">
        Auth Requests
      </NavLink>
      <NavLink to="/" className="sidebar-link mt-5">
        Logout
      </NavLink>
    </Nav>
  </div>
);

export default Sidebar;
