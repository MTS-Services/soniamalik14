import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import Button from './Button';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, title = "Delete Event", message = "Are you sure you want to delete this event? This action cannot be undone." }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-[#000000] bg-[#D9D9D9] rounded-full p-1 transition-colors hover:bg-gray-300"
                        aria-label="Close"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <p className="text-gray-700 text-base">{message}</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 flex gap-3">
                    <Button
                        onClick={onClose}
                        variant="outline"
                        className="flex-1 rounded-lg py-2 !border-2 !border-gray-300 !bg-white !text-gray-700 hover:!bg-gray-50"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        variant="primary"
                        className="flex-1 rounded-lg py-2 !bg-red-600 !border-red-600 hover:!bg-red-700"
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
