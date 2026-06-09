import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
