import React, { useState, useEffect, useRef } from 'react';
import type { CartItem, User } from '../../types';
import { Search, User as UserIcon, LogOut, Settings, CircleUserRound, ChevronDown, ShoppingCart as CartIconLucide } from 'lucide-react';

interface HeaderProps {
  cartItems: CartItem[];
  onToggleCart: () => void;
  onSearch: (query: string) => void;
  onLogout: () => void;
  user: User | null;
  isCartShaking : boolean;
}

const dummyCategories = ['All Categories', 'Fruits & Veges', 'Breads & Sweets', 'Juices'];

export const Header: React.FC<HeaderProps> = ({ cartItems, onToggleCart, onSearch, onLogout, user , isCartShaking }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(dummyCategories[0]);
  
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const categoryMenuRef = useRef<HTMLDivElement>(null);
  
  const cartTotalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

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
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target as Node)) {
        setIsCategoryMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuRef, categoryMenuRef]);


  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="text-3xl font-bold text-green-600">Kkomi</div>
            <p className="text-sm text-gray-500 hidden sm:block">Korean Cafe - Mart</p>
          </div>
          
          {/* Filter Pencarian Desktop */}
          <div className="hidden md:flex flex-grow max-w-xl mx-8">
            <div className="relative w-full flex items-center bg-gray-100 rounded-full">
              <div className="relative" ref={categoryMenuRef}>
                <button 
                  onClick={() => setIsCategoryMenuOpen(prev => !prev)}
                  className="flex items-center pl-4 pr-2 py-2 text-sm text-gray-600"
                >
                  <span>{selectedCategory}</span>
                  <ChevronDown size={16} className="ml-1" />
                </button>
                {isCategoryMenuOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-30 border border-gray-200">
                    {dummyCategories.map(cat => (
                      <a 
                        key={cat} 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedCategory(cat);
                          setIsCategoryMenuOpen(false);
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {cat}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="h-6 border-l border-gray-300 mx-2"></div>
              
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full py-2 pl-2 pr-10 bg-transparent focus:outline-none text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
            </div>
          </div>

          {/* Ikon Aksi */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <div className="text-right hidden lg:block">
              <p className="text-sm text-gray-500">For Support?</p>
              <p className="font-bold text-gray-800">+980-34984089</p>
            </div>
            
            <div className="relative" ref={profileMenuRef}>
              <button onClick={() => setIsProfileMenuOpen(prev => !prev)}>
                <UserIcon size={24} className="text-gray-700" />
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
                      <CircleUserRound size={18} className="mr-3 text-gray-500" />
                      Akun Saya
                    </a>
                    <a href="#" className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Settings size={18} className="mr-3 text-gray-500" />
                      Pengaturan
                    </a>
                  </div>
                  <div className="py-1 border-t border-gray-200">
                    <button
                      onClick={onLogout}
                      className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut size={18} className="mr-3 text-gray-500" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button onClick={onToggleCart} className="relative flex items-center space-x-2">
              <div className={`relative ${isCartShaking ? 'shake' : ''}`}>
                <CartIconLucide size={24} className="text-gray-700" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{totalItems}</span>
                )}
              </div>
              <div className="text-right hidden sm:block">
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
