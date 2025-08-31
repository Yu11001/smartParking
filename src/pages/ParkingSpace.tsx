import React, { useState, useRef, useEffect } from 'react';
import { Button, Container, Modal, Row, Col } from 'react-bootstrap';
import OpenGateButton from '../components/OpenGateButton';
import Hls from 'hls.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const streams = ['parking', 'parking2', 'license', 'license1'];
const streamTitles = ['Parking Area 1', 'Parking Area 2', 'License Check 1', 'License Check 2'];

const ParkingSpace: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedStream, setSelectedStream] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const hlsInstances = useRef<(Hls | null)[]>([]);
  const modalHls = useRef<Hls | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('N/A');

  // Initialize video streams for grid
  useEffect(() => {
    streams.forEach((stream, index) => {
      const video = videoRefs.current[index];
      if (video && Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: false,
          lowLatencyMode: true,
          backBufferLength: 90
        });
        
        const streamUrl = `/${stream}/index.m3u8`;
        hls.loadSource(streamUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => {
            // Auto-play might be blocked, that's okay
          });
        });
        
        hlsInstances.current[index] = hls;
      }
    });

    // Update timestamp
    setLastUpdated(new Date().toLocaleString());

    // Cleanup function
    return () => {
      hlsInstances.current.forEach(hls => {
        if (hls) {
          hls.destroy();
        }
      });
    };
  }, []);

  // Handle modal video stream
  useEffect(() => {
    if (showModal) {
      const video = modalVideoRef.current;
      if (video && Hls.isSupported()) {
        if (modalHls.current) {
          modalHls.current.destroy();
        }
        
        const hls = new Hls({
          enableWorker: false,
          lowLatencyMode: true,
          backBufferLength: 90
        });
        
        const streamUrl = `/${streams[selectedStream]}/index.m3u8`;
        hls.loadSource(streamUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => {
            // Auto-play might be blocked, that's okay
          });
        });
        
        modalHls.current = hls;
      }
    } else {
      if (modalHls.current) {
        modalHls.current.destroy();
        modalHls.current = null;
      }
    }
  }, [showModal, selectedStream]);

  const handleVideoClick = (streamIndex: number) => {
    setSelectedStream(streamIndex);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
        <b>CAMT Live Feed - All Cameras</b>
      </h3>

      {/* 2x2 Grid */}
      <Row className="g-3 mb-4">
        {streams.map((stream, index) => (
          <Col key={stream} xs={12} md={6}>
            <div 
              style={{
                backgroundColor: '#c5d8e3',
                borderRadius: '10px',
                padding: '10px',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                ':hover': {
                  transform: 'scale(1.02)'
                }
              }}
              onClick={() => handleVideoClick(index)}
              className="video-container"
            >
              <h6 className="text-center mb-2" style={{ color: '#2c4965' }}>
                {streamTitles[index]}
              </h6>
              <div style={{
                width: '100%',
                height: '250px',
                backgroundColor: '#a8c5d1',
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <video
                  ref={(el) => videoRefs.current[index] = el}
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                  muted
                  playsInline
                />
                <div 
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    opacity: '0',
                    transition: 'opacity 0.3s'
                  }}
                  className="click-hint"
                >
                  Click to enlarge
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Controls */}
      <div className="d-flex justify-content-center">
        {/* <Button
          variant="light"
          className="rounded-pill px-4"
          style={{ backgroundColor: '#c5d8e3', border: 'none', color: '#2c4965' }}
          onClick={handleOpenGate}
        >
          Click to Open Gate
        </Button> */}
        <OpenGateButton />

      </div>

      <p className="text-muted text-center mt-3" style={{ fontSize: '0.9rem' }}>
        Last updated: {lastUpdated}
      </p>

      {/* Modal for enlarged video */}
      <Modal 
        show={showModal} 
        onHide={handleCloseModal} 
        size="xl" 
        centered
        backdrop="static"
      >
        <Modal.Header closeButton style={{ backgroundColor: '#3A6EA5', color: 'white' }}>
          <Modal.Title>{streamTitles[selectedStream]}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#E8F0F2', padding: '20px' }}>
          <div style={{
            width: '100%',
            height: '500px',
            backgroundColor: '#c5d8e3',
            borderRadius: '10px',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <video
              ref={modalVideoRef}
              controls
              style={{ 
                width: '100%', 
                height: '100%',
                objectFit: 'contain',
                borderRadius: '10px'
              }}
              autoPlay
            />
          </div>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#E8F0F2' }}>
          <Button 
            variant="secondary" 
            onClick={handleCloseModal}
            className="rounded-pill"
            style={{ backgroundColor: '#c5d8e3', border: 'none', color: '#2c4965' }}
          >
            Close
          </Button>
          {/* <Button
            variant="primary"
            className="rounded-pill"
            style={{ backgroundColor: '#3A6EA5', border: 'none' }}
            onClick={handleOpenGate}
          >
            Open Gate
          </Button> */}
          <OpenGateButton />
        </Modal.Footer>
      </Modal>

      <ToastContainer />

      <style>{`
        .video-container:hover .click-hint {
          opacity: 1 !important;
        }
        
        .video-container:hover {
          transform: scale(1.02);
        }
      `}</style>
    </Container>
  );
};

export default ParkingSpace;