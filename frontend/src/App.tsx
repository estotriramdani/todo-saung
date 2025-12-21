import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';
import ChatbotPage from './pages/Chatbot';

// 1. /app/login
// 2. /app/dashboard
// 3. /app/chatbot (new)
// 4. /app/user-statistics (new)

export default function App() {
  return (
    <Routes>
      {/* kita bisa definisikan routing yang diperlukan. */}
      <Route path="/app/login" element={<LoginPage />} />
      <Route path="/app/dashboard" element={<DashboardPage />} />
      <Route path="/app/chatbot" element={<ChatbotPage />} />
      {/* TUGAS: buatkan halaman 404 Not Found. */}
      <Route path="*" element={<p>Not found</p>} />
    </Routes>
  );
}
