import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LandingPage from './components/LandingPage';
import CRMPage from './pages/CRMPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Автономний CRM роут */}
        <Route path="/crm" element={<CRMPage />} />
        
        {/* Публічний портал з єдиним Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/intensives" element={<LandingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
