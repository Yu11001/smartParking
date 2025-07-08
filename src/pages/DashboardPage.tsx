import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import DashboardCards from '../components/DashboardCards';
import WeeklyUsageChart from '../components/WeeklyUsageChart';
import useAxios from '../api/axios';

interface ParkingSnapshot {
  available_spaces: number;
  total_spaces: number;
}

const DashboardPage: React.FC = () => {
  const [snapshot, setSnapshot] = useState<ParkingSnapshot | null>(null);
  const axios = useAxios();

  useEffect(() => {
    const fetchSnapshot = async () => {
      try {
        const response = await axios.get('/parking/snapshot/latest');
        setSnapshot(response.data);
      } catch (error) {
        console.error('Error fetching parking snapshot:', error);
      }
    };

    fetchSnapshot();
  }, []);

  return (
    <Container className="pt-4">
      <h1 className="mb-4">Dashboard</h1>
      <DashboardCards snapshot={snapshot} />
      <div className="my-5">
        <WeeklyUsageChart />
      </div>
    </Container>
  );
};

export default DashboardPage;
