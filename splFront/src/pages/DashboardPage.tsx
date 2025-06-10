import React from 'react';
import { Container } from 'react-bootstrap';
import DashboardCards from '../components/DashboardCards';
import WeeklyUsageChart from '../components/WeeklyUsageChart';

const DashboardPage: React.FC = () => (
  <Container className="pt-4" style={{ backgroundColor: '#E8F0F2' }}>
    <br />
    <br />
    <DashboardCards />
    <br />
    <br />
    <br />
    <WeeklyUsageChart />
  </Container>
);

export default DashboardPage;
