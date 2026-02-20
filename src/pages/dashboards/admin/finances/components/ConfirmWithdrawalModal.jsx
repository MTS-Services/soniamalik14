import React from 'react'

export default function ConfirmWithdrawalModal({ isOpen, onClose, onConfirm, amount, method }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Confirm Withdrawal</h2>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-base text-gray-600">Amount:</span>
              <span className="text-base font-semibold text-gray-900">${amount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-base text-gray-600">Method:</span>
              <span className="text-base font-semibold text-gray-900">Bank Account ****{method.slice(-4)}</span>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <p className="text-xs text-gray-600 leading-relaxed">
              Please confirm the withdrawal details above. Funds will be transferred within 24 hours.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors font-medium"
            >
              Send Request
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
