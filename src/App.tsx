import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { SoftwareRequestForm } from './components/SoftwareRequestForm';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/request-form" element={<SoftwareRequestForm />} />
      </Routes>
    </BrowserRouter>
  );
}
