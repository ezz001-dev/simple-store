import React, { useState, useEffect } from 'react';
import type { Product } from '../../types';
import apiService from '../../services/api';

interface ProductFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void; // Callback untuk me-refresh data setelah menyimpan
    productToEdit: Product | null;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({ isOpen, onClose, onSave, productToEdit }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        image_url: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Jika ada produk yang akan diedit, isi form dengan datanya
    useEffect(() => {
        if (productToEdit) {
            setFormData({
                name: productToEdit.name,
                description: productToEdit.description || '',
                price: String(productToEdit.price),
                stock: String(productToEdit.stock),
                image_url: productToEdit.image_url || ''
            });
        } else {
            // Reset form jika modal dibuka untuk membuat produk baru
            setFormData({ name: '', description: '', price: '', stock: '', image_url: '' });
        }
    }, [productToEdit, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (productToEdit) {
                // Proses Update
                await apiService(`/products/${productToEdit.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(formData),
                });
            } else {
                // Proses Create
                await apiService('/products', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                });
            }
            onSave(); // Panggil callback untuk refresh data
            onClose(); // Tutup modal
        } catch (err: any) {
            setError(err.message || 'Terjadi kesalahan saat menyimpan produk.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <h3 className="text-xl font-semibold mb-4">{productToEdit ? 'Edit Produk' : 'Tambah Produk Baru'}</h3>
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        {/* Isi Form */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input name="name" value={formData.name} onChange={handleChange} placeholder="Nama Produk" className="p-2 border rounded" required />
                            <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Harga" className="p-2 border rounded" required />
                            <input name="stock" type="number" value={formData.stock} onChange={handleChange} placeholder="Stok" className="p-2 border rounded" required />
                            <input name="image_url" value={formData.image_url} onChange={handleChange} placeholder="URL Gambar (Opsional)" className="p-2 border rounded md:col-span-2" />
                            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Deskripsi (Opsional)" className="p-2 border rounded md:col-span-2" rows={3}></textarea>
                        </div>
                    </div>
                    <div className="bg-gray-100 p-4 flex justify-end space-x-2 rounded-b-lg">
                        <button type="button" onClick={onClose} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Batal</button>
                        <button type="submit" disabled={isLoading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300">
                            {isLoading ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
