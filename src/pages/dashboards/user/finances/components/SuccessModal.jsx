import React from 'react'
import { FiCheckCircle } from 'react-icons/fi'

export default function SuccessModal({ isOpen, onClose, amount }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheckCircle className="w-8 h-8 text-green-600" />
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-2">Withdrawal Successful!</h2>
          
          <p className="text-sm text-gray-600 mb-1">
            Your withdrawal of ${amount} has been processed successfully.
          </p>
          
          <p className="text-xs text-gray-500 mb-6">
            Funds will deposit in your account 24 hour
          </p>

          <button
            onClick={onClose}
            className="w-full px-4 py-2 border border-teal-700 text-teal-700 rounded-lg hover:bg-teal-50 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
