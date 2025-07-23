// src/App.tsx
import React, { useState } from 'react';
import { CustomerView } from './pages/customer/CustomerView';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { CartSidebar } from './components/cart/CartSidebar';
import type { Product, CartItem , User } from './types';
import { LoginPage, RegisterPage } from './pages/auth/AuthPages';

export default function App() {
   // State untuk menyimpan data user dan token
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);


    // State untuk mengontrol tampilan antara login dan register
  const [authView, setAuthView] = useState<'login' | 'register'>('login');

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckoutMessage, setShowCheckoutMessage] = useState(false);

  const handleAddToCart = (productToAdd: Product, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productToAdd.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevItems, { ...productToAdd, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };
  
  const handleToggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  
  const handleCheckout = () => {
    if (cartItems.length > 0) {
        setShowCheckoutMessage(true);
        setCartItems([]);
        setIsCartOpen(false);
        setTimeout(() => setShowCheckoutMessage(false), 3000);
    }
  };


  // Handler setelah registrasi berhasil
  const handleRegisterSuccess = () => {
    // Arahkan ke halaman login setelah registrasi berhasil
    setAuthView('login');
  };

   // Handler setelah login berhasil
  const handleLoginSuccess = (data: { user: User; access_token: string }) => {
    setUser(data.user);
    setToken(data.access_token);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.access_token);
  };

   // Handler untuk logout
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };


  if (!user || !token) {
    return authView === 'login' ? (
      <LoginPage onLoginSuccess={handleLoginSuccess} onSwitchView={setAuthView} />
    ) : (
      <RegisterPage onRegisterSuccess={handleRegisterSuccess} onSwitchView={setAuthView} />
    );
  }

  return (
    <div>
      <button onClick={handleLogout} className="fixed bottom-4 right-4 z-50 bg-red-500 text-white p-3 rounded-full shadow-lg">
        Logout
      </button>

      {user.role === 'admin' ? (
        <AdminDashboard />
      ) : (
        <>
          <CustomerView 
            cartItems={cartItems}
            onAddToCart={handleAddToCart} 
            onToggleCart={handleToggleCart}
          />
          <CartSidebar 
            isOpen={isCartOpen}
            cartItems={cartItems} 
            onRemoveItem={handleRemoveFromCart} 
            onClose={handleToggleCart} 
            onCheckout={handleCheckout} 
          />
        </>
      )}
    </div>
  );
}