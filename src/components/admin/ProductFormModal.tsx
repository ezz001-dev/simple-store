import React, { useState, useEffect } from 'react';
import type { Product } from '../../types';
import { API_BASE_URL_STORAGE, apiUploadService } from '../../services/api';

interface ProductFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    productToEdit: Product | null;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({ isOpen, onClose, onSave, productToEdit }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (productToEdit) {
            setName(productToEdit.name);
            setDescription(productToEdit.description || '');
            setPrice(String(productToEdit.price));
            setStock(String(productToEdit.stock));
           
            if (productToEdit.image_url) {
                setImagePreview(`${API_BASE_URL_STORAGE}${productToEdit.image_url}`);
            } else {
                setImagePreview(null);
            }
        } else {
            setName('');
            setDescription('');
            setPrice('');
            setStock('');
            setImage(null);
            setImagePreview(null);
        }
    }, [productToEdit, isOpen]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('stock', stock);
        if (image) {
            formData.append('image', image);
        }

        try {
            if (productToEdit) {
                await apiUploadService(`/products/${productToEdit.id}`, formData, 'PUT');
            } else {
                await apiUploadService('/products', formData, 'POST');
            }
            onSave();
            onClose();
        } catch (err: any) {
            // console.log(err);
            if (err.image) {
                // Jika ada error spesifik untuk gambar, tampilkan pesannya
                setError(err.image[0]);
            } else {
                // Jika error lain, tampilkan pesan umum
                setError(err.message || 'Terjadi kesalahan saat menyimpan produk.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <h3 className="text-xl font-semibold mb-4">{productToEdit ? 'Edit Produk' : 'Tambah Produk Baru'}</h3>
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama Produk" className="p-2 border rounded md:col-span-2" required />
                            <input name="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Harga" className="p-2 border rounded" required />
                            <input name="stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Stok" className="p-2 border rounded" required />
                            <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Deskripsi (Opsional)" className="p-2 border rounded md:col-span-2" rows={3}></textarea>
                            
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Gambar Produk</label>
                                <input type="file" onChange={handleImageChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                                {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 h-32 w-32 object-cover rounded-md" />}
                            </div>
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
