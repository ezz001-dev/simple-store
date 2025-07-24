import React, { useState, useEffect } from 'react';
import { CustomerView } from './pages/customer/CustomerView';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { LoginPage, RegisterPage } from './pages/auth/AuthPages';
import { CartSidebar } from './components/cart/CartSidebar';
import type { Product, CartItem, User } from './types';
import apiService from './services/api';
import { SuccessModal } from './components/ui/SuccessModal';

export default function App() {
  // State untuk menyimpan data user dan token
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  
  // State untuk mengontrol tampilan antara login dan register
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  
  // State untuk aplikasi utama
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Cek token di localStorage saat aplikasi pertama kali dimuat
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handler setelah login berhasil
  const handleLoginSuccess = (data: { user: User; access_token: string }) => {
    setUser(data.user);
    setToken(data.access_token);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.access_token);
  };

  // Handler setelah registrasi berhasil
  const handleRegisterSuccess = () => {
    setAuthView('login');
  };
  
  // Handler untuk logout
  const handleLogout = async () => {
    try {
        await apiService('/auth/logout', { method: 'POST' });
    } catch (error) {
        console.error('Logout failed, but logging out client-side anyway:', error);
    } finally {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }
  };

  // Handler untuk keranjang belanja
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
  
  // Memperbarui fungsi checkout untuk memanggil API
  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    const checkoutData = {
        payment_method: 'cash',
        items: cartItems.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
        })),
    };

    try {
        await apiService('/checkout', {
            method: 'POST',
            body: JSON.stringify(checkoutData),
        });
        
        setCartItems([]);
        setIsCartOpen(false);
        setIsSuccessModalOpen(true);

    } catch (error: any) {
        console.error('Checkout failed:', error);
        alert(error.error || 'Checkout gagal, silakan coba lagi.');
    }
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
      <SuccessModal 
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Pesanan Berhasil!"
        message="Pesanan Anda telah kami terima dan akan segera diproses."
      />

      {user.role === 'admin' ? (
        // Teruskan fungsi handleLogout sebagai prop
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <>
          <CustomerView 
            user={user}
            cartItems={cartItems}
            onAddToCart={handleAddToCart} 
            onToggleCart={handleToggleCart}
            onLogout={handleLogout}
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
