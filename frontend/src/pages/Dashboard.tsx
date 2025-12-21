// pages/Dashboard.tsx

import Navbar from '../components/Navbar';

export default function DashboardPage() {
  // Sample todos data (not connected to API)
  const sampleTodos = [
    {
      id: 1,
      title: 'Complete project proposal',
      description: 'Finish writing the project proposal for the new client',
      due_date: '2025-12-25',
      completed: false,
    },
    {
      id: 2,
      title: 'Review code changes',
      description: 'Review pull requests from team members',
      due_date: '2025-12-22',
      completed: true,
    },
    {
      id: 3,
      title: 'Update documentation',
      description: 'Update API documentation with new endpoints',
      due_date: '2025-12-30',
      completed: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-teal-300 to-yellow-200">
      <Navbar />
      
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-8 mb-8 border border-white/30">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-teal-700 mb-2">My Todos</h1>
              <p className="text-teal-600">Manage your daily tasks efficiently</p>
            </div>
            <button className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
              + Add New Todo
            </button>
          </div>
        </div>

        {/* Add Todo Form */}
        <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-8 mb-8 border border-white/30">
          <h2 className="text-2xl font-bold text-teal-700 mb-6">Create New Todo</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-teal-700 font-semibold mb-2">Title</label>
              <input
                type="text"
                className="w-full bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
                placeholder="Enter todo title"
              />
            </div>
            <div>
              <label className="block text-teal-700 font-semibold mb-2">Description</label>
              <textarea
                className="w-full bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
                placeholder="Enter todo description"
                rows={3}
              ></textarea>
            </div>
            <div>
              <label className="block text-teal-700 font-semibold mb-2">Due Date</label>
              <input
                type="date"
                className="w-full bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Create Todo
            </button>
          </form>
        </div>

        {/* Todos List */}
        <div className="space-y-4">
          {sampleTodos.map((todo) => (
            <div
              key={todo.id}
              className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-6 border border-white/30 hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      className="w-5 h-5 border-teal-400 rounded cursor-pointer"
                      readOnly
                    />
                    <h3
                      className={`text-xl font-semibold ${
                        todo.completed ? 'text-gray-400 line-through' : 'text-teal-700'
                      }`}
                    >
                      {todo.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        todo.completed
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {todo.completed ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3 ml-8">{todo.description}</p>
                  <div className="flex items-center gap-4 ml-8 text-sm">
                    <span className="text-teal-600 font-medium">
                      📅 Due: {new Date(todo.due_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  {!todo.completed ? (
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium shadow transition-all duration-200">
                      ✓ Complete
                    </button>
                  ) : (
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium shadow transition-all duration-200">
                      ↻ Reopen
                    </button>
                  )}
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow transition-all duration-200">
                    ✎ Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium shadow transition-all duration-200">
                    🗑 Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-6 border border-white/30 text-center">
            <div className="text-4xl font-bold text-teal-600 mb-2">
              {sampleTodos.length}
            </div>
            <div className="text-teal-700 font-semibold">Total Todos</div>
          </div>
          <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-6 border border-white/30 text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {sampleTodos.filter((t) => t.completed).length}
            </div>
            <div className="text-teal-700 font-semibold">Completed</div>
          </div>
          <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-6 border border-white/30 text-center">
            <div className="text-4xl font-bold text-yellow-600 mb-2">
              {sampleTodos.filter((t) => !t.completed).length}
            </div>
            <div className="text-teal-700 font-semibold">Pending</div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
