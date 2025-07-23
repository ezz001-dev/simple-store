import React, { useState } from 'react';

// Tipe untuk properti yang diterima oleh halaman login/register
interface AuthPageProps {
  onLoginSuccess: (data: any) => void;
  onRegisterSuccess: (data: any) => void;
  onSwitchView: (view: 'login' | 'register') => void;
}

// Komponen Halaman Login
export const LoginPage: React.FC<Pick<AuthPageProps, 'onLoginSuccess' | 'onSwitchView'>> = ({ onLoginSuccess, onSwitchView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    // TODO: Implementasikan pemanggilan API ke endpoint /api/auth/login
    console.log('Logging in with:', { email, password });
    // Simulasi pemanggilan API
    setTimeout(() => {
        // Ganti ini dengan data asli dari API
        const mockApiResponse = {
            access_token: 'fake_jwt_token_for_testing',
            user: { id: 1, name: 'Test User', email: email, role: 'customer' }
        };
        onLoginSuccess(mockApiResponse);
        setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 disabled:bg-green-300"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-6">
          Belum punya akun?{' '}
          <button onClick={() => onSwitchView('register')} className="text-green-600 hover:underline font-semibold">
            Daftar di sini
          </button>
        </p>
      </div>
    </div>
  );
};

// Komponen Halaman Registrasi
export const RegisterPage: React.FC<Pick<AuthPageProps, 'onRegisterSuccess' | 'onSwitchView'>> = ({ onRegisterSuccess, onSwitchView }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
        setError("Password dan konfirmasi password tidak cocok.");
        return;
    }
    setIsLoading(true);
    setError(null);
    // TODO: Implementasikan pemanggilan API ke endpoint /api/auth/register
    console.log('Registering with:', { name, email, password });
    // Simulasi pemanggilan API
    setTimeout(() => {
        onRegisterSuccess({});
        setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
           <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
           <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password_confirmation">
              Konfirmasi Password
            </label>
            <input
              type="password"
              id="password_confirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 disabled:bg-green-300"
          >
            {isLoading ? 'Mendaftarkan...' : 'Register'}
          </button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-6">
          Sudah punya akun?{' '}
          <button onClick={() => onSwitchView('login')} className="text-green-600 hover:underline font-semibold">
            Login di sini
          </button>
        </p>
      </div>
    </div>
  );
};
