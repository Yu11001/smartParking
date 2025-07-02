import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Homepage from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/DashboardPage';
import AdminProfile from './pages/AdminProfilePage';
import ParkingSpace from './pages/ParkingSpace';
import LicencePlate from './pages/LicencePlate';
import Register from './components/Register';
import AddAdminProfile from './components/AddAdminProfile';
import AuthRequests from './components/AuthRequests';
import AddLicencePlate from './components/AddLicencePlate';

const LayoutWithSidebar: React.FC = () => {
  const location = useLocation();
  const hideSidebarRoutes = ['/', '/login', '/register'];

  const hideSidebar = hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="d-flex" style={{ backgroundColor: 'E8F0F2' }}>
      {!hideSidebar && <Sidebar />}
      <div className="flex-grow-1 p-0">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/add-admin" element={<AddAdminProfile />} />
          <Route path="/licence-plate" element={<LicencePlate />} />
          <Route path="/parking-space" element={<ParkingSpace />} />
          <Route path="/auth-requests" element={<AuthRequests />} />
          <Route path="/add-licence" element={<AddLicencePlate />} />
        </Routes>
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <Router>
    <LayoutWithSidebar />
  </Router>
);

export default App;
