import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useAxios from '../api/axios';

interface ParkingSnapshot {
  available_spaces: number;
  total_spaces: number;
}

const Home: React.FC = () => {
  const [snapshot, setSnapshot] = useState<ParkingSnapshot | null>(null);
  const navigate = useNavigate();
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

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const occupiedSpaces = snapshot
    ? snapshot.total_spaces - snapshot.available_spaces
    : 0;

  return (
    <div style={{ backgroundColor: '#e8f0f2', minHeight: '100vh' }}>
      {/* Navbar */}
      <nav className="navbar px-4" style={{ backgroundColor: '#3b70a0' }}>
        <span
          className="navbar-brand text-white fw-bold"
          style={{ fontFamily: 'Bruno Ace SC, sans-serif' }}
        >
          Smart Parking
        </span>
        <div className="ms-auto d-flex gap-4">
          <Link to="/" className="text-white nav-link">
            Home
          </Link>
          <Link to="/login" className="text-white nav-link">
            Login
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-5 text-center center">
        <div className="row justify-content-center mb-5">
          <div className="col-md-3">
            <h4 className="mb-3 fw-semibold" style={{ color: '#3A6EA5' }}>
              Available
            </h4>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: '#cfdde6',
                borderRadius: '1rem',
                height: '150px',
              }}
            >
              <span className="fs-4" style={{ color: '#3A6EA5' }}>
                {snapshot?.available_spaces ?? 0}/{snapshot?.total_spaces ?? 0}
              </span>
            </div>
          </div>
          <div className="col-md-3">
            <h4 className="mb-3 fw-semibold" style={{ color: '#3A6EA5' }}>
              Occupied
            </h4>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: '#cfdde6',
                borderRadius: '1rem',
                height: '150px',
              }}
            >
              <span className="fs-4" style={{ color: '#3A6EA5' }}>
                {occupiedSpaces}
              </span>
            </div>
          </div>
        </div>

        <button
          className="btn"
          onClick={handleRegisterClick}
          style={{
            backgroundColor: '#cfdde6',
            borderRadius: '2rem',
            padding: '0.5rem 2rem',
            color: '#3A6EA5',
            fontWeight: '500',
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Home;
