import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, name, plateNumber, photo });
  };
  const notify = () => {
    toast('Successfully registered! Please check your email for results:)');
  };

  return (
    <div
      className="container-fluid"
      style={{ minWidth: '100%', minHeight: '100vh', backgroundColor: '#E8F0F2', padding: '0' }}
    >
      <nav className="navbar px-4" style={{ backgroundColor: '#3b70a0' }}>
        <span
          className="navbar-brand text-white fw-bold"
          style={{ fontFamily: 'Bruno Ace SC, sans-serif' }}
        >
          Smart Parking
        </span>
        <div className="ms-auto d-flex gap-4">
          <a href="#" className="text-white nav-link">
            Home
          </a>
          <a href="#" className="text-white nav-link">
            Login
          </a>
        </div>
      </nav>

      <div
        className="container py-5"
        style={{
          maxWidth: '70%',
          minHeight: '100vh',
          backgroundColor: '#E8F0F2',
          padding: '0',
        }}
      >
        <h3 className="fw-bold" style={{ color: '#3A6EA5' }}>
          Registration Request
        </h3>
        <form onSubmit={handleSubmit} className="row mt-4">
          <div className="col-md-6">
            <div className="mb-3">
              <input
                type="email"
                className="form-control bg-secondary bg-opacity-25 text-primary rounded-3"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control bg-secondary bg-opacity-25 text-primary rounded-3"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control bg-secondary bg-opacity-25 text-primary rounded-3"
                placeholder="Plate Number"
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="col-md-6 d-flex align-items-start justify-content-center">
            <div
              className="w-75 h-100 bg-secondary bg-opacity-25 rounded-3 d-flex align-items-center justify-content-center"
              style={{ color: '#3A6EA5' }}
            >
              <label
                htmlFor="photo"
                className="w-100 h-100 text-center"
                style={{ cursor: 'pointer' }}
              >
                {photo ? photo.name : 'Photo'}
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  className="d-none"
                  onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                />
              </label>
            </div>
          </div>

          <div className="col-12 mt-4 text-center">
            <button
              type="submit"
              className="btn bg-opacity-50 px-5 rounded-3 btn-outline-secondary"
              style={{ color: '#3A6EA5', whiteSpace: 'pre-line' }}
              onClick={notify}
            >
              Register
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
