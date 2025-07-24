import React, { useState, useEffect } from 'react';
import { SearchIcon } from '../../assets/icons';
import { ProductManagementPage } from './ProductManagementPage';
import apiService from '../../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { LoadingSpinner, ErrorMessage } from '../../components/ui/FeedbackComponents';

// Tipe data untuk statistik dasbor
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

    const dummyStats = {
    "summary": {
        "total_revenue": "50000000.00",
        "total_stock": 145,
        "items_sold": 290,
        "category_count": 5
    },
    "monthly_sales": [
        {
            "month": "Feb",
            "total": 12000000
        },
        {
            "month": "Mar",
            "total": 19000000
        },
        {
            "month": "Apr",
            "total": 15000000
        },
        {
            "month": "Mei",
            "total": 25000000
        },
        {
            "month": "Jun",
            "total": 21000000
        },
        {
            "month": "Jul",
            "total": 32000000
        }
    ],
    "best_sellers": [
        {
            "name": "Melon Juice",
            "quantity": 500
        },
        {
            "name": "Banana Juice",
            "quantity": 300
        },
        {
            "name": "Strawberry Juice",
            "quantity": 100
        }
    ],
    "stock_levels": [
        {
            "name": "Sunstar Fresh Strawberry Juice",
            "stock": 20
        },
        {
            "name": "Chocolate",
            "stock": 40
        },
        {
            "name": "Sunstar Fresh Fruit Juice",
            "stock": 50
        },
        {
            "name": "Sunstar Fresh Banana Juice",
            "stock": 60
        },
        {
            "name": "Sunstar Fresh Melon Juice",
            "stock": 80
        }
    ]
}

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

    return (
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
            {/* Kartu Ringkasan Dinamis */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="p-6 rounded-lg shadow-sm bg-white flex justify-between items-center"><div><p className="text-sm text-gray-500">Total Semua Pendapatan</p><p className="text-2xl font-bold">Rp {Number(stats.summary.total_revenue).toLocaleString('id-ID')}</p></div><div className="text-4xl">💰</div></div>
                <div className="p-6 rounded-lg shadow-sm bg-white flex justify-between items-center"><div><p className="text-sm text-gray-500">Stok Barang</p><p className="text-2xl font-bold">{stats.summary.total_stock}</p></div><div className="text-4xl">📦</div></div>
                <div className="p-6 rounded-lg shadow-sm bg-green-100 flex justify-between items-center"><div><p className="text-sm text-gray-500">Barang Telah Terjual</p><p className="text-2xl font-bold">{stats.summary.items_sold}+</p></div><div className="text-4xl">📈</div></div>
                <div className="p-6 rounded-lg shadow-sm bg-white flex justify-between items-center"><div><p className="text-sm text-gray-500">Kategori Barang</p><p className="text-2xl font-bold">{stats.summary.category_count}</p></div><div className="text-4xl">👍</div></div>
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

export const AdminDashboard: React.FC = () => {
    const [currentView, setCurrentView] = useState<'dashboard' | 'products'>('dashboard');

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <aside className="w-64 bg-white shadow-md hidden lg:block">
                <div className="p-6 flex items-center space-x-2">
                    <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-md text-xl font-bold">WH</div>
                    <h1 className="text-xl font-bold text-gray-800">AWH</h1>
                </div>
                <nav className="mt-6 px-4">
                    <p className="text-xs text-gray-400 uppercase px-4 mb-2">AWH</p>
                    <button onClick={() => setCurrentView('dashboard')} className={`w-full flex items-center px-4 py-3 font-semibold rounded-lg ${currentView === 'dashboard' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}><span className="mr-3">📊</span> Dashboard</button>
                    <p className="text-xs text-gray-400 uppercase px-4 mt-6 mb-2">PAGES</p>
                    <button onClick={() => setCurrentView('products')} className={`w-full flex items-center px-4 py-3 font-semibold rounded-lg ${currentView === 'products' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}><span className="mr-3">📦</span> Master Barang</button>
                    <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"><span className="mr-3">🛒</span> Transaksi</a>
                </nav>
            </aside>
            
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex justify-between items-center p-4 bg-white border-b">
                    <div className="flex items-center"><button className="text-gray-500 lg:hidden"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button><div className="relative ml-4"><SearchIcon /><input type="text" placeholder="Search..." className="pl-8 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500" /></div></div>
                    <div className="flex items-center space-x-4"><button className="text-gray-500"><span>🔔</span></button><button className="text-gray-500"><span>👤</span></button></div>
                </header>

                {currentView === 'dashboard' && <DashboardView />}
                {currentView === 'products' && <ProductManagementPage />}
            </div>
        </div>
    );
};
