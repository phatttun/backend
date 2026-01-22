import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Master from './pages/Master';
import RequestDetail from './pages/RequestDetail';
import { SoftwareRequestForm } from './components/SoftwareRequestForm';
import Sidebar from './components/Sidebar';
import './components/Sidebar.css';
import Login from './pages/Login';

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === '/login';

  const handleLogin = (username: string, password: string) => {
    // จำลองการตรวจสอบข้อมูล
    if (username && password) {
      // เข้าสู่ระบบสำเร็จ ไปหน้า Home
      navigate('/');
      return true;
    }
    return false;
  };

  return (
    <div className={isLoginPage ? '' : 'sidebar-layout'}>
      {!isLoginPage && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
      <div className={isLoginPage ? 'w-full' : 'flex-1 flex flex-col overflow-visible'}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/master" element={<Master />} />
          <Route path="/request-form" element={<SoftwareRequestForm />} />
          <Route path="/request-form/:id" element={<SoftwareRequestForm />} />
          <Route path="/request-detail/:id" element={<RequestDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}