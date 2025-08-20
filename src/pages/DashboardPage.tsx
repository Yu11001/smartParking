import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import DashboardCards from '../components/DashboardCards';
import WeeklyUsageChart from '../components/WeeklyUsageChart';
import axiosInstance from '../api/axios';

interface ParkingSnapshot {
  available_spaces: number;
  total_spaces: number;
}

const DashboardPage: React.FC = () => {
  const [snapshot, setSnapshot] = useState<ParkingSnapshot | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('N/A');

  useEffect(() => {
    const fetchSnapshot = async () => {
      try {
        const response = await axiosInstance.get('/parking/snapshot/latest');
        setSnapshot(response.data);
      } catch (error) {
        console.error('Error fetching parking snapshot:', error);
      } finally {
        setLastUpdated(new Date().toLocaleString());
      }
    };

    fetchSnapshot();
  }, []);

  return (
    <Container className="pt-4">
      <h2 className="mb-4" style={{ color: '#3A6EA5' }}>
        CAMT Parking Overview
      </h2>
      <DashboardCards snapshot={snapshot} />
      <p className="mt-3 text-muted" style={{ fontSize: '0.9rem' }}>
        Last updated: {lastUpdated}
      </p>
      <div className="my-5">
        <WeeklyUsageChart />
      </div>
    </Container>
  );
};

export default DashboardPage;
