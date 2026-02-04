import React, { useState } from 'react'

export default function WithdrawModal({ isOpen, onClose, onConfirm, availableBalance }) {
  const [amount, setAmount] = useState('')
  const [paymentMethod] = useState('acct_1QH72fB9XkP3L2a1')

  if (!isOpen) return null

  const handleContinue = () => {
    if (amount && parseFloat(amount) > 0) {
      onConfirm(amount, paymentMethod)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Withdraw Funds</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Enter amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="100.00"
                  step="0.01"
                  min="0"
                />
              </div>
              <p className="text-xs text-teal-600 mt-1">Available: ${availableBalance}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select payment method</label>
              <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700">
                {paymentMethod}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleContinue}
              disabled={!amount || parseFloat(amount) <= 0}
              className="flex-1 px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
