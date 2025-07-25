import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onClose, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm text-center p-6">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 mb-6">{message}</p>
                <button 
                    type="button" 
                    onClick={onClose} 
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 w-full"
                >
                    Tutup
                </button>
            </div>
        </div>
    );
};
