import React, { useState, useRef, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import Hls from 'hls.js';
import { Camera } from 'react-bootstrap-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const streams = ['Parking1', 'Parking2', 'Enter Gate', 'Exit Gate'];

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
      setLastUpdated(new Date().toLocaleString());
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
        <b>Parking Space</b>
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
        <div
          style={{ maxWidth: '800px', width: '100%' }}
          className="d-flex justify-content-between flex-wrap"
        >
          <div className="d-flex flex-wrap mb-2">
            {streams.map((stream, index) => (
              <Button
                key={stream}
                variant="light"
                className="rounded-pill px-3 me-2 mb-2"
                style={{
                  backgroundColor: streamIndex === index ? '#3A6EA5' : '#c5d8e3',
                  border: 'none',
                  color: streamIndex === index ? '#fff' : '#2c4965',
                }}
                onClick={() => setStreamIndex(index)}
              >
                {stream}
              </Button>
            ))}
          </div>
          <Button
            variant="light"
            className="rounded-pill px-4"
            style={{ backgroundColor: '#c5d8e3', border: 'none', color: '#2c4965' }}
            onClick={handleOpenGate}
          >
            Open Gate
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
