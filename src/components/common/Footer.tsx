import React from 'react';
import { Facebook, Youtube, Instagram, Send } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t border-gray-200 mt-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
                    <div className="sm:col-span-2 md:col-span-2">
                        <h3 className="text-2xl font-bold mb-2 text-gray-800">Kkomi</h3>
                        <p className="text-sm text-gray-500 mb-4">Korean Cafe - Mart</p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-blue-600">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-red-600">
                                <Youtube size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-pink-600">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4 text-gray-800">Ultras</h3>
                        <ul className="space-y-2 text-gray-500 text-sm">
                            <li><a href="#" className="hover:text-gray-800">About us</a></li>
                            <li><a href="#" className="hover:text-gray-800">Conditions</a></li>
                            <li><a href="#" className="hover:text-gray-800">Our Journals</a></li>
                            <li><a href="#" className="hover:text-gray-800">Careers</a></li>
                            <li><a href="#" className="hover:text-gray-800">Affiliate Programme</a></li>
                            <li><a href="#" className="hover:text-gray-800">Ultras Press</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4 text-gray-800">Customer Service</h3>
                        <ul className="space-y-2 text-gray-500 text-sm">
                            <li><a href="#" className="hover:text-gray-800">FAQ</a></li>
                            <li><a href="#" className="hover:text-gray-800">Contact</a></li>
                            <li><a href="#" className="hover:text-gray-800">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-gray-800">Returns & Refunds</a></li>
                            <li><a href="#" className="hover:text-gray-800">Cookie Guidelines</a></li>
                            <li><a href="#" className="hover:text-gray-800">Delivery Information</a></li>
                        </ul>
                    </div>
                    <div className="sm:col-span-2 md:col-span-1">
                        <h3 className="font-bold mb-4 text-gray-800">Subscribe Us</h3>
                        <p className="text-gray-500 mb-2 text-sm">Subscribe to our newsletter to get updates about our new products.</p>
                        <div className="flex mt-4 relative">
                            <input 
                                type="email" 
                                placeholder="Email Address" 
                                className="w-full rounded-lg p-3 text-gray-800 text-sm bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 pr-12" 
                            />
                            <button className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-green-600">
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
