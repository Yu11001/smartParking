import React from 'react';
import { Container } from 'react-bootstrap';
import LicencePlateTable from '../components/LicencePlateTable';

const LicencePlatePage: React.FC = () => (
  <Container className="pt-4">
    <LicencePlateTable />
  </Container>
);

export default LicencePlatePage;
