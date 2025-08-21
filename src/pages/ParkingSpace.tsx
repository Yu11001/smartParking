import React, { useState, useRef, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import Hls from 'hls.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const streams = ['parking', 'parking2', 'license', 'license1', 'infer-live'];

const ParkingSpace: React.FC = () => {
  const [streamIndex, setStreamIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('N/A');

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const hls = new Hls();
      const streamUrl = `/${streams[streamIndex]}/index.m3u8`;
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    }
  }, [streamIndex]);

  const handleSwitchStream = () => {
    setStreamIndex((prevIndex) => (prevIndex + 1) % streams.length);
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
            controls
            style={{ width: '100%', height: '100%', border: 'none', borderRadius: '10px' }}
          />
        </div>
      </div>

      <div className="d-flex justify-content-center mt-3">
        <div style={{ maxWidth: '800px', width: '100%' }} className="d-flex justify-content-between">
          <Button
            variant="light"
            className="rounded-pill px-4"
            style={{ backgroundColor: '#c5d8e3', border: 'none', color: '#2c4965' }}
            onClick={handleSwitchStream}
          >
            Switch Stream
          </Button>
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
