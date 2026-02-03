import React, { useState } from 'react'
import { FiCalendar, FiChevronDown, FiDollarSign, FiClock, FiCheckCircle } from 'react-icons/fi'
import WithdrawModal from './components/WithdrawModal'
import ConfirmWithdrawalModal from './components/ConfirmWithdrawalModal'
import SuccessModal from './components/SuccessModal'

export default function Finances() {
  const [selectedPeriod, setSelectedPeriod] = useState('30')
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [withdrawalData, setWithdrawalData] = useState({ amount: '', method: '' })

  const stats = [
    {
      title: 'Total Revenue',
      value: '$1438.00',
      subtitle: '+8% vs last month',
      icon: FiDollarSign,
      iconBg: '#E7F1F1',
      iconColor: '#0F766E',
      subtitlePositive: true
    },
    {
      title: 'Pending Payouts',
      value: '$564',
      subtitle: '',
      icon: FiClock,
      iconBg: '#E7F1F1',
      iconColor: '#0F766E',
      subtitlePositive: false
    },
    {
      title: 'Completed Payouts',
      value: '$1400',
      subtitle: 'This Month',
      icon: FiCheckCircle,
      iconBg: '#E7F1F1',
      iconColor: '#0F766E',
      subtitlePositive: false
    }
  ]

  const withdrawalHistory = [
    { id: 1, dateTime: 'Mar 20, 2019 23:14', amount: '$5,000.00', accountNumber: 'acct_1QH72fB9XkP3L2a1', status: 'Confirmed' },
    { id: 2, dateTime: 'Mar 20, 2019 23:14', amount: '$5,000.00', accountNumber: 'acct_1QH72fB9XkP3L2a1', status: 'Confirmed' },
    { id: 3, dateTime: 'Mar 20, 2019 23:14', amount: '$5,000.00', accountNumber: 'acct_1QH72fB9XkP3L2a1', status: 'Confirmed' },
    { id: 4, dateTime: 'Mar 20, 2019 23:14', amount: '$5,000.00', accountNumber: 'acct_1QH72fB9XkP3L2a1', status: 'Confirmed' },
    { id: 5, dateTime: 'Mar 20, 2019 23:14', amount: '$5,000.00', accountNumber: 'acct_1QH72fB9XkP3L2a1', status: 'Confirmed' },
    { id: 6, dateTime: 'Mar 20, 2019 23:14', amount: '$5,000.00', accountNumber: 'acct_1QH72fB9XkP3L2a1', status: 'Confirmed' },
  ]

  const [page, setPage] = useState(1)
  const pageSize = 6
  const totalPages = Math.max(1, Math.ceil(withdrawalHistory.length / pageSize))
  const pageData = withdrawalHistory.slice((page - 1) * pageSize, page * pageSize)

  const handleWithdrawClick = () => {
    setShowWithdrawModal(true)
  }

  const handleWithdrawConfirm = (amount, method) => {
    setWithdrawalData({ amount, method })
    setShowWithdrawModal(false)
    setShowConfirmModal(true)
  }

  const handleFinalConfirm = () => {
    setShowConfirmModal(false)
    setShowSuccessModal(true)
  }

  const handleCloseSuccess = () => {
    setShowSuccessModal(false)
    setWithdrawalData({ amount: '', method: '' })
  }

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header Section */}
      <div className="p-4 md:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Finances </h1>
            <p className="text-sm md:text-base text-gray-600 mt-1">Monitor your service performance</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="text-sm text-gray-700">Last {selectedPeriod} days overview</span>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="appearance-none pl-9 pr-10 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last year</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-lg p-5 md:p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs md:text-sm text-gray-600 mb-2">{stat.title}</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                  {stat.subtitle && (
                    <p className={`text-xs md:text-sm ${stat.subtitlePositive ? 'text-green-600' : 'text-gray-600'}`}>
                      {stat.subtitle}
                    </p>
                  )}
                </div>
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: stat.iconBg }}
                >
                  <stat.icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: stat.iconColor }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Platform Earnings Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
          {/* Stripe Account */}
          <div className="bg-white rounded-lg p-5 md:p-6 shadow-sm border border-gray-100">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Platform Earnings</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base text-gray-600 mb-1">Stripe</p>
                <p className="text-sm text-gray-500">acct_1QH72fB9XkP3L2a1</p>
              </div>
              <span className="px-3 py-1 bg-[#B5D5D2] text-teal-700 text-xs font-medium rounded-full">
                Primary
              </span>
            </div>
          </div>

          {/* Available Balance */}
          <div className="bg-white rounded-lg p-5 md:p-6 shadow-sm border border-gray-100">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Platform Earnings</h3>
            <div>
              <p className="text-sm text-teal-600 mb-2">Available Balance</p>
              <h4 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">$12,450</h4>
              <button 
                onClick={handleWithdrawClick}
                className="w-full bg-teal-700 hover:bg-teal-800 text-white font-medium py-2.5 md:py-3 px-4 rounded-lg transition-colors duration-200"
              >
                Withdraw Funds
              </button>
            </div>
          </div>
        </div>

        {/* Withdrawal History */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-5 md:p-6 border-b border-gray-100">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">Withdrawal History</h2>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#E7F1F1] border-b border-gray-100">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    DATE/TIME
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Account Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {pageData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.dateTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {item.accountNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-[#E7F1F1] text-teal-700">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-100">
            {pageData.map((item) => (
              <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">{item.dateTime}</p>
                    <p className="text-xs text-gray-600">{item.accountNumber}</p>
                  </div>
                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-teal-100 text-teal-700">
                    {item.status}
                  </span>
                </div>
                <div className="text-base font-bold text-gray-900">{item.amount}</div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="px-4 md:px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-sm text-gray-600">
              Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, withdrawalHistory.length)} of {withdrawalHistory.length} results
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                  page === 1
                    ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Previous
              </button>

              <div className="flex items-center gap-1">
                <span className="px-4 py-2 text-sm font-medium text-teal-700 bg-teal-50 border border-teal-200 rounded-lg">
                  {page}
                </span>
              </div>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                  page === totalPages
                    ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Next
              </button>
            </div>

      {/* Modals */}
      <WithdrawModal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        onConfirm={handleWithdrawConfirm}
        availableBalance="12,450.00"
      />

      <ConfirmWithdrawalModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleFinalConfirm}
        amount={withdrawalData.amount}
        method={withdrawalData.method}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccess}
        amount={withdrawalData.amount}
      />
          </div>
        </div>
      </div>
    </div>
  )
}
