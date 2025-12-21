export default function Navbar() {
  const handleLogout = () => {
    // Logout logic will be implemented later
    alert('Logout clicked - implement API integration manually');
  };

  return (
    <nav className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/30">
      <div className="max-w-6xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-teal-700">SCoding Todos</h1>
            <div className="flex gap-4">
              <a
                href="/app/dashboard"
                className="text-teal-700 hover:text-teal-900 font-semibold px-4 py-2 rounded-lg hover:bg-teal-50 transition-all duration-200"
              >
                My Todos
              </a>
              <a
                href="/app/chatbot"
                className="text-teal-700 hover:text-teal-900 font-semibold px-4 py-2 rounded-lg hover:bg-teal-50 transition-all duration-200"
              >
                Chatbot
              </a>
              <a
                href="/app/user-statistics"
                className="text-teal-700 hover:text-teal-900 font-semibold px-4 py-2 rounded-lg hover:bg-teal-50 transition-all duration-200"
              >
                User Statistics
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-teal-700 font-medium">Welcome, User!</span>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
