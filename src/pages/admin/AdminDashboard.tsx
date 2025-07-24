import React, { useState, useEffect } from 'react';
import { ProductManagementPage } from './ProductManagementPage';
import { TransactionPage } from './TransactionPage'; // Impor halaman baru
import apiService from '../../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { LoadingSpinner, ErrorMessage } from '../../components/ui/FeedbackComponents';
import { LayoutDashboard, Package, ShoppingCart, Menu, Search, Bell, UserCircle, LogOut, Wallet, Archive, TrendingUp, ThumbsUp } from 'lucide-react';

interface DashboardStats {
    summary: {
        total_revenue: string;
        total_stock: number;
        items_sold: number;
        category_count: number;
    };
    monthly_sales: { month: string; total: number }[];
    best_sellers: { name: string; quantity: number }[];
    stock_levels: { name: string; stock: number }[];
}

// Komponen untuk tampilan dashboard utama dengan data dinamis
const DashboardView: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboardStats = async () => {
            setIsLoading(true);
            try {
                const data = await apiService<DashboardStats>('/dashboard/stats');
                setStats(data);
            } catch (err) {
                setError('Gagal memuat statistik dasbor.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchDashboardStats();
    }, []);

    if (isLoading) return <div className="p-6"><LoadingSpinner /></div>;
    if (error) return <div className="p-6"><ErrorMessage message={error} /></div>;
    if (!stats) return null;

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const summaryCards = [
        { title: 'Total Semua Pendapatan', value: `Rp ${Number(stats.summary.total_revenue).toLocaleString('id-ID')}`, icon: <Wallet size={32} className="text-yellow-500" />, bgColor: 'bg-white' },
        { title: 'Stok Barang', value: stats.summary.total_stock, icon: <Archive size={32} className="text-red-500" />, bgColor: 'bg-white' },
        { title: 'Barang Telah Terjual', value: `${stats.summary.items_sold}+`, icon: <TrendingUp size={32} className="text-green-500" />, bgColor: 'bg-green-100' },
        { title: 'Kategori Barang', value: stats.summary.category_count, icon: <ThumbsUp size={32} className="text-blue-500" />, bgColor: 'bg-white' },
    ];

    return (
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
            {/* Kartu Ringkasan Dinamis dengan Ikon Lucide */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {summaryCards.map((card, index) => (
                    <div key={index} className={`p-6 rounded-lg shadow-sm flex justify-between items-center ${card.bgColor}`}>
                        <div>
                            <p className="text-sm text-gray-500">{card.title}</p>
                            <p className="text-2xl font-bold">{card.value}</p>
                        </div>
                        <div>{card.icon}</div>
                    </div>
                ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Penjualan per Bulan */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold mb-4">Penjualan per Bulan</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={stats.monthly_sales} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis tickFormatter={(value) => new Intl.NumberFormat('id-ID', { notation: 'compact' }).format(value as number)} />
                            <Tooltip formatter={(value) => `Rp ${Number(value).toLocaleString('id-ID')}`} />
                            <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Best Seller */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold mb-4">Best Seller</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={stats.best_sellers} dataKey="quantity" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                                {stats.best_sellers.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${value} terjual`} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Stok Barang */}
                <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold mb-4">Stok Barang (Terendah)</h3>
                    <div className="space-y-4">
                        {stats.stock_levels.map((item, index) => (
                            <div key={index}>
                                <div className="flex justify-between text-sm mb-1"><span>{item.name}</span><span className="font-semibold">{item.stock}</span></div>
                                <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{ width: `${item.stock}%` }}></div></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

interface AdminDashboardProps {
    onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
    const [currentView, setCurrentView] = useState<'dashboard' | 'products' | 'transactions'>('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsSidebarOpen(false)}
            ></div>

            <aside className={`fixed lg:relative inset-y-0 left-0 w-64 bg-white shadow-md z-30 transform transition-transform lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
                <div className="flex-grow">
                    <div className="p-6 flex items-center space-x-2">
                        <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-md text-xl font-bold">WH</div>
                        <h1 className="text-xl font-bold text-gray-800">AWH</h1>
                    </div>
                    <nav className="mt-6 px-4">
                        <p className="text-xs text-gray-400 uppercase px-4 mb-2">AWH</p>
                        <button onClick={() => { setCurrentView('dashboard'); setIsSidebarOpen(false); }} className={`w-full flex items-center px-4 py-3 font-semibold rounded-lg ${currentView === 'dashboard' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}><LayoutDashboard size={20} className="mr-3" /> Dashboard</button>
                        <p className="text-xs text-gray-400 uppercase px-4 mt-6 mb-2">PAGES</p>
                        <button onClick={() => { setCurrentView('products'); setIsSidebarOpen(false); }} className={`w-full flex items-center px-4 py-3 font-semibold rounded-lg ${currentView === 'products' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}><Package size={20} className="mr-3" /> Master Barang</button>
                        <button onClick={() => { setCurrentView('transactions'); setIsSidebarOpen(false); }} className={`w-full flex items-center px-4 py-3 font-semibold rounded-lg ${currentView === 'transactions' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}><ShoppingCart size={20} className="mr-3" /> Transaksi</button>
                    </nav>
                </div>
                
                <div className="p-4">
                    <button onClick={onLogout} className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg font-semibold">
                        <LogOut size={20} className="mr-3" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
            
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex justify-between items-center p-4 bg-white shadow-sm">
                    <div className="flex items-center">
                        <button className="text-gray-500 lg:hidden" onClick={() => setIsSidebarOpen(true)}>
                            <Menu size={24} />
                        </button>
                        <div className="relative flex items-center ml-4">
                            <input type="text" placeholder="Search..." className="bg-gray-100 pl-4 pr-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <Search size={20} className="text-gray-400" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-500"><Bell size={22} /></button>
                        <button className="text-gray-500"><UserCircle size={22} /></button>
                    </div>
                </header>

                {currentView === 'dashboard' && <DashboardView />}
                {currentView === 'products' && <ProductManagementPage />}
                {currentView === 'transactions' && <TransactionPage />}
            </div>
        </div>
    );
};
