import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Master from './pages/Master';
import { SoftwareRequestForm } from './components/SoftwareRequestForm';
import Sidebar from './components/Sidebar';
import './components/Sidebar.css';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="sidebar-layout">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-visible">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/master" element={<Master />} />
            <Route path="/request-form" element={<SoftwareRequestForm />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}