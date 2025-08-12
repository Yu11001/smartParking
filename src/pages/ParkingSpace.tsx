import React, { useRef, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Camera } from 'react-bootstrap-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ParkingSpace: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('N/A');

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setLastUpdated(new Date().toLocaleString());
      })
      .catch((err) => {
        console.error('Error accessing camera: ', err);
      });

    return () => {
      if (videoRef.current?.srcObject instanceof MediaStream) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleOpenGate = () => {
    toast.success('Gate is opening...', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  };

  return (
    <Container fluid className="p-4" style={{ backgroundColor: '#E8F0F2', minHeight: '100vh' }}>
      <h3 className="mb-4" style={{ color: '#3A6EA5' }}>
        <b>CAMT Live Feed</b>
      </h3>

      <div className="d-flex justify-content-center">
        <div
          style={{
            width: '100%',
            maxWidth: '800px',
            height: '400px',
            backgroundColor: '#c5d8e3',
            position: 'relative',
          }}
          className="d-flex justify-content-center align-items-center rounded"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
          />
          {!videoRef.current?.srcObject && (
            <Camera size={64} className="position-absolute text-secondary" />
          )}
        </div>
      </div>

      <div className="d-flex justify-content-center mt-3">
        <div style={{ maxWidth: '800px', width: '100%' }} className="d-flex justify-content-end">
          <Button
            variant="light"
            className="rounded-pill px-4"
            style={{ backgroundColor: '#c5d8e3', border: 'none', color: '#2c4965' }}
            onClick={handleOpenGate}
          >
            Click to Open Gate
          </Button>
        </div>
      </div>
      <p className="text-muted text-center mt-2" style={{ fontSize: '0.9rem' }}>
        Last updated: {lastUpdated}
      </p>
      <ToastContainer />
    </Container>
  );
};

export default ParkingSpace;
