import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon, UserIcon } from '../../assets/icons';
import type { CartItem, User } from '../../types'; 

// Ikon-ikon baru untuk menu profil
const AccountIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

interface HeaderProps {
  cartItems: CartItem[];
  onToggleCart: () => void;
  onSearch: (query: string) => void;
  onLogout: () => void;
  user: User | null;
}

export const Header: React.FC<HeaderProps> = ({ cartItems, onToggleCart, onSearch, onLogout, user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const cartTotalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);

  // Efek untuk debouncing
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onSearch]);

  // Efek untuk menutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuRef]);


  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
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
            
            <div className="relative" ref={profileMenuRef}>
              <button onClick={() => setIsProfileMenuOpen(prev => !prev)}>
                <UserIcon />
              </button>
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-30 border border-gray-200">
                  {user && (
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                  )}
                  <div className="py-1">
                    <a href="#" className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <AccountIcon />
                      Akun Saya
                    </a>
                    <a href="#" className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <SettingsIcon />
                      Pengaturan
                    </a>
                  </div>
                  <div className="py-1 border-t border-gray-200">
                    <button
                      onClick={onLogout}
                      className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogoutIcon />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

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
