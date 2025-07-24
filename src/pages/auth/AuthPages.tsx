import React, { useState } from 'react';
import apiService from '../../services/api';
import type { User } from '../../types';

interface AuthPageProps {
  onLoginSuccess: (data: { user: User; access_token: string }) => void;
  onRegisterSuccess: () => void;
  onSwitchView: (view: 'login' | 'register') => void;
}

// Komponen Halaman Login
export const LoginPage: React.FC<Pick<AuthPageProps, 'onLoginSuccess' | 'onSwitchView'>> = ({ onLoginSuccess, onSwitchView }) => {
  const [email, setEmail] = useState('customer@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
        const data = await apiService<{ user: User; access_token: string }>('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        onLoginSuccess(data);
    } catch (err: any) {
        setError(err.error || 'Login gagal. Periksa kembali email dan password Anda.');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-green-600">Kkomi</h1>
            <p className="text-gray-500 mt-1">Selamat datang kembali!</p>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm mb-4 text-center bg-red-50 p-3 rounded-lg">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
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
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 disabled:bg-green-400 shadow-md"
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
    
    try {
        await apiService('/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            }),
        });
        alert('Registrasi berhasil! Silakan login.');
        onRegisterSuccess();
    } catch (err: any) {
        if (err.errors) {
            const errorMessages = Object.values(err.errors).flat().join(' ');
            setError(errorMessages);
        } else {
            setError(err.message || 'Registrasi gagal. Silakan coba lagi.');
        }
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-green-600">Kkomi</h1>
            <p className="text-gray-500 mt-1">Buat akun baru Anda</p>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm mb-4 text-center bg-red-50 p-3 rounded-lg">{error}</p>}
           <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
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
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
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
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
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
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 disabled:bg-green-400 shadow-md"
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
