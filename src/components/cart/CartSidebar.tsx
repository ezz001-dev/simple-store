
import React from 'react';
import type { CartItem } from '../../types';
import { Trash2, X } from 'lucide-react';
import { API_BASE_URL_STORAGE } from '../../services/api';

interface CartSidebarProps {
    isOpen: boolean;
    cartItems: CartItem[];
    onRemoveItem: (productId: number) => void;
    onUpdateQuantity: (productId: number, amount: number) => void;
    onClose: () => void;
    onCheckout: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, cartItems, onRemoveItem, onUpdateQuantity, onClose, onCheckout }) => {
    const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
                <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
                <span className="bg-gray-100 text-gray-700 text-sm font-semibold px-2.5 py-0.5 rounded-full">{totalItems}</span>
            </div>
            <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-800">
                <X size={24} />
            </button>
          </div>
          <div className="flex-grow p-4 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 mb-4 text-gray-300"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                <p>Your cart is empty.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img src={item.image_url ? `${API_BASE_URL_STORAGE}${item.image_url}` : `https://placehold.co/100x100/e2e8f0/333?text=N/A`} alt={item.name} className="w-20 h-20 object-cover rounded-lg mr-4" />
                      <div>
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-gray-600 text-sm">Rp {Number(item.price).toLocaleString('id-ID')}</p>
                        <div className="flex items-center mt-2">
                          <button onClick={() => onUpdateQuantity(item.id, -1)} className="w-7 h-7 border rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-100">-</button>
                          <span className="px-4 font-semibold">{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(item.id, 1)} className="w-7 h-7 border rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-100">+</button>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => onRemoveItem(item.id)} className="text-gray-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-between items-center font-bold text-lg mb-4">
              <span className="text-gray-700">Total</span>
              <span className="text-gray-900">Rp {totalPrice.toLocaleString('id-ID')}</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 disabled:bg-green-400 shadow-sm"
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
