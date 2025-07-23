import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white mt-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    <div className="md:col-span-2">
                        <h3 className="text-2xl font-bold mb-2">Kkomi</h3>
                        <p className="text-sm text-gray-400 mb-4">Korean Cafe - Mart</p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white">f</a>
                            <a href="#" className="text-gray-400 hover:text-white">yt</a>
                            <a href="#" className="text-gray-400 hover:text-white">ig</a>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Ultras</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-white">About us</a></li>
                            <li><a href="#" className="hover:text-white">Conditions</a></li>
                            <li><a href="#" className="hover:text-white">Our Journals</a></li>
                            <li><a href="#" className="hover:text-white">Careers</a></li>
                            <li><a href="#" className="hover:text-white">Affiliate Programme</a></li>
                            <li><a href="#" className="hover:text-white">Ultras Press</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Customer Service</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-white">FAQ</a></li>
                            <li><a href="#" className="hover:text-white">Contact</a></li>
                            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white">Returns & Refunds</a></li>
                            <li><a href="#" className="hover:text-white">Cookie Guidelines</a></li>
                            <li><a href="#" className="hover:text-white">Delivery Information</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Subscribe Us</h3>
                        <p className="text-gray-400 mb-2 text-sm">Subscribe to our newsletter to get updates about our new products.</p>
                        <div className="flex mt-4">
                            <input type="email" placeholder="Email Address" className="w-full rounded-l-md p-2 text-gray-800 text-sm" />
                            <button className="bg-black text-white px-4 rounded-r-md hover:bg-gray-700 text-sm">SUBSCRIBE</button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
