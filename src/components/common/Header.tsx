import React, { useState } from 'react';
import { SearchIcon } from '../../assets/icons/SearchIcon';
import { UserIcon } from '../../assets/icons/UserIcon';
import type { CartItem } from '../../types';

interface HeaderProps {
  cartItems: CartItem[];
  onToggleCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartItems, onToggleCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const cartTotalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div>
            <div className="text-3xl font-bold text-green-600">Kkomi</div>
            <p className="text-sm text-gray-500">Korean Cafe - Mart</p>
          </div>
          <div className="hidden md:flex flex-grow max-w-xl mx-8">
            <div className="relative w-full flex items-center border border-gray-300 rounded-md">
              <span className="pl-4 pr-2 text-gray-500">All Categories</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              <div className="h-6 border-l border-gray-300 mx-2"></div>
              <input
                type="text"
                placeholder="Search for more than 20,000 products"
                className="w-full py-2 pl-2 pr-10 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <SearchIcon />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-right hidden lg:block">
              <p className="text-sm text-gray-500">For Support?</p>
              <p className="font-bold text-gray-800">+980-34984089</p>
            </div>
            <UserIcon />
            <button onClick={onToggleCart} className="flex items-center space-x-2">
              <div className="text-right">
                <p className="text-sm text-gray-500">Your Cart</p>
                <p className="font-bold text-gray-800">Rp. {cartTotalPrice.toLocaleString('id-ID')}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
