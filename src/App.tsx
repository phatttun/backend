import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
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
  const isLoginPage = location.pathname === '/login';

  return (
    <div className={isLoginPage ? '' : 'sidebar-layout'}>
      {!isLoginPage && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
      <div className={isLoginPage ? 'w-full' : 'flex-1 flex flex-col overflow-visible'}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/master"
            element={
              <ProtectedRoute>
                <Master />
              </ProtectedRoute>
            }
          />
          <Route
            path="/request-form"
            element={
              <ProtectedRoute>
                <SoftwareRequestForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/request-form/:id"
            element={
              <ProtectedRoute>
                <SoftwareRequestForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/request-detail/:id"
            element={
              <ProtectedRoute>
                <RequestDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}