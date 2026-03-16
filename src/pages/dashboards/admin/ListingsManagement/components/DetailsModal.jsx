import React from 'react';
import { X } from 'lucide-react';

const DetailsModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 flex justify-between items-center p-6 border-b border-gray-200 bg-white">
                    <h2 className="text-2xl font-bold text-gray-900">Listing Details</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DetailsModal;
