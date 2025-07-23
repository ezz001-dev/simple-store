// src/App.tsx
import React, { useState } from 'react';
import { CustomerView } from './pages/customer/CustomerView';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { CartSidebar } from './components/cart/CartSidebar';
import type { Product, CartItem } from './types';

export default function App() {
  const [view, setView] = useState<'customer' | 'admin'>('customer');
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

  return (
    <div>
      {/* Komponen untuk mengganti tampilan */}
      <div className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg">
        <p className="text-sm mb-2 text-center">Ganti Tampilan</p>
        <div className="flex space-x-2">
            <button onClick={() => setView('customer')} className={`px-4 py-2 rounded-md text-sm ${view === 'customer' ? 'bg-white text-blue-600' : 'bg-blue-500'}`}>Customer</button>
            <button onClick={() => setView('admin')} className={`px-4 py-2 rounded-md text-sm ${view === 'admin' ? 'bg-white text-blue-600' : 'bg-blue-500'}`}>Admin</button>
        </div>
      </div>
      
      {showCheckoutMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
            Checkout berhasil! (Simulasi)
        </div>
      )}

      {view === 'customer' ? (
         <>
          <CustomerView 
            cartItems={cartItems}
            onAddToCart={handleAddToCart} 
            onToggleCart={handleToggleCart}
          />
          {isCartOpen &&  <CartSidebar 
            isOpen={isCartOpen}
            cartItems={cartItems} 
            onRemoveItem={handleRemoveFromCart} 
            onClose={handleToggleCart} 
            onCheckout={handleCheckout} 
          />}
        </>
      ) : (
        <AdminDashboard />
      )}
    </div>
  );
}