// import Home from './components/Home.tsx';
// import Register from './components/Register.tsx';
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
// import Dashboard from './components/Dashboard';
import LicencePlate from './pages/LicencePlate.tsx';

const App: React.FC = () => (
  <Row className="g-0">
    <Col md={2}>
      <Sidebar />
    </Col>
    <Col md={10} className="bg-light">
      <LicencePlate />
    </Col>
  </Row>
);

export default App;
