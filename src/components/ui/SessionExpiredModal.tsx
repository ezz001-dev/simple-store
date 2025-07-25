import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface SessionExpiredModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SessionExpiredModal: React.FC<SessionExpiredModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm text-center p-6">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Sesi Berakhir</h3>
                <p className="text-gray-600 mb-6">Sesi Anda telah berakhir. Silakan login kembali untuk melanjutkan.</p>
                <button 
                    type="button" 
                    onClick={onClose} 
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 w-full"
                >
                    OK
                </button>
            </div>
        </div>
    );
};
