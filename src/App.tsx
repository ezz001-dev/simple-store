import React, { useState, useEffect } from 'react';
import { CustomerView } from './pages/customer/CustomerView';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { LoginPage, RegisterPage } from './pages/auth/AuthPages';
import { CartSidebar } from './components/cart/CartSidebar';
import type { Product, CartItem, User } from './types';
import apiService from './services/api';
import { SuccessModal } from './components/ui/SuccessModal';
import { SessionExpiredModal } from './components/ui/SessionExpiredModal';
import { ErrorModal } from './components/ui/ErrorModal';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSessionExpiredModalOpen, setIsSessionExpiredModalOpen] = useState(false); 

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isCartShaking, setIsCartShaking] = useState(false);

  const handleLogout = async (isSilent = false) => {
    if (!isSilent) {
        try {
            await apiService('/auth/logout', { method: 'POST' });
        } catch (error) {
            console.error('Logout failed, but logging out client-side anyway:', error);
        }
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    // Listener untuk event sesi berakhir
    const handleSessionExpired = () => {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        if (currentUser?.role === 'admin') {
            alert('Sesi Anda telah berakhir. Anda akan diarahkan ke halaman login.');
            handleLogout(true); // Logout secara diam-diam
        } else {
            setIsSessionExpiredModalOpen(true);
        }
    };

    window.addEventListener('session-expired', handleSessionExpired);

    // Cleanup listener saat komponen unmount
    return () => {
        window.removeEventListener('session-expired', handleSessionExpired);
    };
  }, []);

  const handleLoginSuccess = (data: { user: User; access_token: string }) => {
    setUser(data.user);
    setToken(data.access_token);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.access_token);
  };

  const handleRegisterSuccess = () => {
    setAuthView('login');
  };
  
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
    // setIsCartOpen(true);

    // Memicu animasi
    setIsCartShaking(true);
    setTimeout(() => setIsCartShaking(false), 550);
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };
  
  const handleUpdateCartQuantity = (productId: number, amount: number) => {
    setCartItems(prevItems =>
      prevItems
        .map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter(item => item.quantity > 0) // Hapus item jika kuantitasnya 0 atau kurang
    );
  };

  const handleToggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  
  // const handleCheckout = async () => {
  //   if (cartItems.length === 0) return;
  //   const checkoutData = {
  //       payment_method: 'cash',
  //       items: cartItems.map(item => ({ product_id: item.id, quantity: item.quantity })),
  //   };
  //   try {
  //       await apiService('/checkout', { method: 'POST', body: JSON.stringify(checkoutData) });
  //       setCartItems([]);
  //       setIsCartOpen(false);
  //       setIsSuccessModalOpen(true);
  //   } catch (error: any) {
  //       alert(error.error || 'Checkout gagal, silakan coba lagi.');
  //   }
  // };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    const checkoutData = {
        payment_method: 'cash',
        items: cartItems.map(item => ({ product_id: item.id, quantity: item.quantity })),
    };
    try {
        await apiService('/checkout', { method: 'POST', body: JSON.stringify(checkoutData) });
        setCartItems([]);
        setIsCartOpen(false);
        setIsSuccessModalOpen(true);
    } catch (error: any) {
        console.error('Checkout failed:', error);
        // Gunakan modal error, bukan alert
        setErrorMessage(error.error || 'Checkout gagal, silakan coba lagi.');
        setIsErrorModalOpen(true);
    }
  };

  const handleCloseExpiredModal = () => {
    setIsSessionExpiredModalOpen(false);
    handleLogout(true); // Logout setelah modal ditutup
  };

  if (!user || !token) {
    return (
        <>
            {authView === 'login' ? (
              <LoginPage onLoginSuccess={handleLoginSuccess} onSwitchView={setAuthView} />
            ) : (
              <RegisterPage onRegisterSuccess={handleRegisterSuccess} onSwitchView={setAuthView} />
            )}
            <SessionExpiredModal isOpen={isSessionExpiredModalOpen} onClose={handleCloseExpiredModal} />
        </>
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
      <SessionExpiredModal isOpen={isSessionExpiredModalOpen} onClose={handleCloseExpiredModal} />
      <ErrorModal 
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        title="Checkout Gagal"
        message={errorMessage}
      />

      {user.role === 'admin' ? (
        <AdminDashboard onLogout={() => handleLogout(false)} />
      ) : (
        <>
          <CustomerView 
            user={user}
            cartItems={cartItems}
            onAddToCart={handleAddToCart} 
            onToggleCart={handleToggleCart}
            onLogout={() => handleLogout(false)} 
            isCartShaking={isCartShaking}
          />
          <CartSidebar 
            isOpen={isCartOpen}
            cartItems={cartItems} 
            onRemoveItem={handleRemoveFromCart} 
            onUpdateQuantity={handleUpdateCartQuantity}
            onClose={handleToggleCart} 
            onCheckout={handleCheckout} 
          />
        </>
      )}
    </div>
  );
}
