const Home: React.FC = () => {
  const available = 17;
  const total = 30;
  const used = 222;

  return (
    <div style={{ backgroundColor: '#e8f0f2', minHeight: '100vh' }}>
      {/* Navbar */}
      <nav className="navbar" style={{ backgroundColor: '#3b70a0', color: 'white' }}>
        <div className="container-fluid">
          <span className="navbar-brand text-white fw-bold" style={{ fontSize: '1.0rem' }}>
            SMART
            <br />
            PARKING
          </span>
          <div className="ms-auto d-flex">
            <a className="nav-link text-white mx-3" href="#">
              Home
            </a>
            <a className="nav-link text-white" href="#">
              Login
            </a>
          </div>
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
                {available}/{total}
              </span>
            </div>
          </div>
          <div className="col-md-3">
            <h4 className="mb-3 fw-semibold" style={{ color: '#3A6EA5' }}>
              Used
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
                {used}
              </span>
            </div>
          </div>
        </div>

        <button
          className="btn"
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
