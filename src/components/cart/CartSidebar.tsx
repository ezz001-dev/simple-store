import React from 'react';
import type { CartItem } from '../../types';

interface CartSidebarProps {
    isOpen: boolean;
    cartItems: CartItem[];
    onRemoveItem: (productId: number) => void;
    onClose: () => void;
    onCheckout: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, cartItems, onRemoveItem, onClose, onCheckout }) => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

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
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button onClick={onClose} className="text-2xl font-bold">&times;</button>
          </div>
          <div className="flex-grow p-4 overflow-y-auto">
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center mt-8">Your cart is empty.</p>
            ) : (
              cartItems.map(item => (
                <div key={item.id} className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img src={item?.image_url || `https://placehold.co/300x300/e2e8f0/333?text=${encodeURIComponent(item.name)}`} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">Rp. {Number(item.price).toLocaleString('id-ID')}</p>
                       <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <button onClick={() => onRemoveItem(item.id)} className="text-red-500 hover:text-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
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
