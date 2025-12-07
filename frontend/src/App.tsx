import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';
import { useState } from 'react';

export default function App() {
  const [currentPage] = useState(() => window.location.pathname);

  if (currentPage === '/app/dashboard') {
    return <DashboardPage />;
  }

  if (currentPage === '/app/login' || currentPage === '/app') {
    return <LoginPage />;
  }

  return (
    <div>
      <h1>Halaman tidak ditemukan</h1>
    </div>
  );
}
