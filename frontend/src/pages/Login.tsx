export default function LoginPage() {
  const handleForm: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    const response = await fetch('http://localhost:5000/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const responseJson = await response.json();

    if (response.ok) {
      alert('Login berhasil');
      window.location.href = '/app/dashboard';
    } else {
      alert(`Login gagal: ${responseJson.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-teal-300 to-yellow-200">
      <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-10 w-full max-w-md border border-white/30">
        <h2 className="text-4xl font-bold text-center text-teal-700 mb-10">SCoding Login</h2>

        <form onSubmit={handleForm} id="loginForm">
          <div className="mb-6">
            <label className="block text-teal-700 font-semibold mb-2">Username</label>
            <input
              type="text"
              className="w-full bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="Masukkan username"
              id="username"
              name="username"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-teal-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              className="w-full bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="Masukkan password"
              id="password"
              name="password"
              required
            />
          </div>

          <div className="flex items-center justify-between mb-6 text-sm">
            <label className="flex items-center gap-2 text-teal-700">
              <input type="checkbox" className="w-4 h-4 border-teal-400 rounded" />
              Remember me
            </label>
            <a href="#" className="text-blue-700 hover:underline font-medium">
              {' '}
              Forgot password?{' '}
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
