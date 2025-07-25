import React from 'react';
import type { CartItem } from '../../types';
import { API_BASE_URL_STORAGE } from '../../services/api';
import { Trash2 } from 'lucide-react';

interface CartSidebarProps {
    isOpen: boolean;
    cartItems: CartItem[];
    onRemoveItem: (productId: number) => void;
    onClose: () => void;
    onCheckout: () => void;
    onUpdateQuantity: (productId: number, amount: number) => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, cartItems, onRemoveItem, onClose, onCheckout , onUpdateQuantity }) => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
    <>
      {/* Backdrop yang akan muncul di belakang sidebar */}
      <div className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose} 
      />
      {/* Sidebar dengan transisi transform */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b">
            {/* Menampilkan jumlah total item dengan gaya badge */}
            <div className="flex items-center space-x-3">
                <h2 className="text-xl font-bold">Your Cart</h2>
                <span className="bg-gray-200 text-gray-700 text-sm font-semibold px-2.5 py-0.5 rounded-full">{totalItems}</span>
            </div>
            <button onClick={onClose} className="text-2xl font-bold">&times;</button>
          </div>
          <div className="flex-grow p-4 overflow-y-auto">
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center mt-8">Your cart is empty.</p>
            ) : (
              cartItems.map(item => (
                <div key={item.id} className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img src={
                      item.image_url 
                          ? `${API_BASE_URL_STORAGE}${item.image_url}` 
                          : `https://placehold.co/300x300/e2e8f0/333?text=${encodeURIComponent(item.name)}`
                    } alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">Rp {Number(item.price).toLocaleString('id-ID')}</p>
                      {/* Kontrol Kuantitas */}
                      <div className="flex items-center mt-2">
                        <button onClick={() => onUpdateQuantity(item.id, -1)} className="w-6 h-6 border rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-100">-</button>
                        <span className="px-3 font-semibold">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, 1)} className="w-6 h-6 border rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-100">+</button>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => onRemoveItem(item.id)} className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="p-4 border-t">
            <div className="flex justify-between items-center font-bold text-lg mb-4">
              <span>Total</span>
              <span>Rp. {totalPrice.toLocaleString('id-ID')}</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-yellow-400 text-gray-800 font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors duration-300"
              disabled={cartItems.length === 0}
            >
              Continue to checkout
            </button>
          </div>
        </div>
      </div>
    </>
    );
};
