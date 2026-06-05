import LandingPage from './components/LandingPage';
import CRMPage from './pages/CRMPage';

export default function App() {
  // Простий роутінг
  if (window.location.pathname.startsWith('/crm')) {
    return <CRMPage />;
  }

  // За замовчуванням весь світ бачить лендинг
  return <LandingPage />;
}
