import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
      setError('Invalid email format');
      return;
    }

    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const res = await axiosInstance.post(
        '/login', 
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const { access_token } = res.data;

      // Save token in localStorage or context
      localStorage.setItem('token', access_token);

      // Navigate only on success
      navigate('/dashboard');
    } catch (err: any) {
      setError('Invalid email or password');
      console.error(err);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: '#3b70a0' }}
    >
      <div
        className="card p-5 shadow"
        style={{
          backgroundColor: '#e8f0f2',
          borderRadius: '2rem',
          width: '400px',
        }}
      >
        <h2 className="text-center mb-4 fw-bold" style={{ fontSize: '2rem' }}>
          Welcome back
        </h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-muted">Email:</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                backgroundColor: '#cfdde6',
                border: 'none',
                borderRadius: '0.75rem',
              }}
            />
          </div>
          <div className="mb-4">
            <label className="form-label text-muted">password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                backgroundColor: '#cfdde6',
                border: 'none',
                borderRadius: '0.75rem',
              }}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn"
              onClick={handleSubmit}
              style={{
                backgroundColor: '#cfdde6',
                borderRadius: '2rem',
                padding: '0.5rem 2rem',
                color: '#000',
              }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
