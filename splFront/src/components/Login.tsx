import React, { useState, type FormEvent } from 'react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
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
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-muted">username:</label>
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
