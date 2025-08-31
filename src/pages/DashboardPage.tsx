import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Modal, Spinner } from 'react-bootstrap';
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

  const [showModal, setShowModal] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(false);

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

  const handleShowModal = async () => {
    setShowModal(true);
    setLoadingImage(true);
    try {
      const response = await axiosInstance.get('/parking/inference', {
        responseType: 'blob', // important to get binary data
      });
      const imageUrl = URL.createObjectURL(response.data);
      setImageSrc(imageUrl);
    } catch (error) {
      console.error('Error fetching inference image:', error);
    } finally {
      setLoadingImage(false);
    }
  };

  return (
    <Container className="pt-4">
      <h2 className="mb-3 px-2" style={{ color: '#3A6EA5' }}>
        CAMT Parking Overview
      </h2>
      <DashboardCards snapshot={snapshot} />
      <p className="mt-3 text-muted" style={{ fontSize: '0.9rem' }}>
        Last updated: {lastUpdated}
      </p>

      <div>
        <h2 className="mb-3 px-2" style={{ color: '#3A6EA5' }}>
          Status Check
        </h2>
        <div className="px-2">
          <div className="row">
            <div className="col-md-4">
              <Card
                className="p-3 shadow-sm"
                style={{ cursor: 'pointer' }}
                onClick={handleShowModal}
              >
                <Card.Body>
                  <Card.Title>Run AI Parking Detection</Card.Title>
                  <Card.Text>Click to see live inference snapshot</Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="my-5 px-2">
        <WeeklyUsageChart />
      </div>

      {/* Modal for showing snapshot */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Parking Snapshot</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {loadingImage ? (
            <Spinner animation="border" />
          ) : imageSrc ? (
            <img src={imageSrc} alt="Parking Snapshot" style={{ maxWidth: '100%' }} />
          ) : (
            <p className="text-muted">No image available</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DashboardPage;
