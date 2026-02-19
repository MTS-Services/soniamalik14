import React from 'react'
import { X } from 'lucide-react'
import Button from '../../../../../components/ui/Button'

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, itemTitle = 'this item' }) => {
    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 sm:mx-6">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">Confirm Delete</h2>
                    <button onClick={onClose} className="text-[#000000] bg-[#D9D9D9] rounded-full p-1">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    <p className="text-base text-gray-700 mb-6">Are you sure you want to delete <strong>{itemTitle}</strong>? This action cannot be undone.</p>

                    <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={onClose} className="rounded-md">Cancel</Button>
                        <Button variant="primary" onClick={() => { onConfirm?.(); }} className="rounded-md bg-red-600 hover:bg-red-700">Delete</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirmationModal
