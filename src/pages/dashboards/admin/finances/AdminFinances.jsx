import React, { useState } from 'react'
import { FiCalendar, FiChevronDown, FiDollarSign, FiClock, FiCheckCircle, FiX, FiCheck } from 'react-icons/fi'
import WithdrawModal from './components/WithdrawModal'
import ConfirmWithdrawalModal from './components/ConfirmWithdrawalModal'
import SuccessModal from './components/SuccessModal'

export default function AdminFinances() {
  const [selectedPeriod, setSelectedPeriod] = useState('30')
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [withdrawalData, setWithdrawalData] = useState({ amount: '', method: '' })
  const [activeTab, setActiveTab] = useState('earnings')

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

  const payoutRequests = [
    { id: 1, sellerName: 'Theresa Webb', amount: '$5,000.00', accountNumber: 'acct_1QH72fB9XkP3L2a5', status: 'Pending' },
    { id: 2, sellerName: 'Kristin Watson', amount: '$5,000.00', accountNumber: 'acct_1QH72fB9XkP3L2a5', status: 'Pending' },
    { id: 3, sellerName: 'Savannah Nguyen', amount: '$5,000.00', accountNumber: 'acct_1QH72fB9XkP3L2a5', status: 'Pending' },
    { id: 4, sellerName: 'Esther Howard', amount: '$5,000.00', accountNumber: 'acct_1QH72fB9XkP3L2a5', status: 'Pending' },
    { id: 5, sellerName: 'Jane Cooper', amount: '$5,000.00', accountNumber: 'acct_1QH72fB9XkP3L2a5', status: 'Pending' },
    { id: 6, sellerName: 'Kathryn Murphy', amount: '$5,000.00', accountNumber: 'acct_1QH72fB9XkP3L2a5', status: 'Pending' },
  ]

  const paymentLogs = [
    { id: 1, date: 'Mar 20, 2019 23:14', sellerName: 'Savannah Nguyen', accountNumber: 'acct_1QH72fB9XkP3L2a5', amount: '$5,000.00', method: 'Stripe', status: 'Completed' },
    { id: 2, date: 'Mar 20, 2019 23:14', sellerName: 'Devon Lane', accountNumber: 'acct_1QH72fB9XkP3L2a5', amount: '$5,000.00', method: 'Stripe', status: 'Failed' },
    { id: 3, date: 'Mar 20, 2019 23:14', sellerName: 'Esther Howard', accountNumber: 'acct_1QH72fB9XkP3L2a5', amount: '$5,000.00', method: 'Stripe', status: 'Completed' },
    { id: 4, date: 'Mar 20, 2019 23:14', sellerName: 'Floyd Miles', accountNumber: 'acct_1QH72fB9XkP3L2a5', amount: '$5,000.00', method: 'Stripe', status: 'Completed' },
    { id: 5, date: 'Mar 20, 2019 23:14', sellerName: 'Ralph Edwards', accountNumber: 'acct_1QH72fB9XkP3L2a5', amount: '$5,000.00', method: 'Stripe', status: 'Completed' },
    { id: 6, date: 'Mar 20, 2019 23:14', sellerName: 'Darlene Robertson', accountNumber: 'acct_1QH72fB9XkP3L2a5', amount: '$5,000.00', method: 'Stripe', status: 'Completed' },
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
            <p className="text-base md:text-base text-gray-600 mt-1">Monitor your service performance</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="text-base text-gray-700">Last {selectedPeriod} days overview</span>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-base" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="appearance-none pl-9 pr-10 py-2 border border-gray-300 rounded-lg text-base bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last year</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-base pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg p-3 mb-6 border border-gray-100">
          {/* Desktop Tabs */}
          <nav className="hidden md:flex items-center space-x-6" role="tablist" aria-label="Finance tabs">
            {[
              { key: 'earnings', label: 'Earnings Overview' },
              { key: 'payouts', label: 'Payout Requests' },
              { key: 'logs', label: 'Payment Logs' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                role="tab"
                aria-selected={activeTab === tab.key}
                className={`py-2 px-3 text-base font-medium transition-colors ${activeTab === tab.key
                    ? 'text-teal-700 border-b-2 border-teal-700'
                    : 'text-gray-600 hover:text-gray-800'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Mobile Select Dropdown */}
          <div className="md:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-base bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="earnings">Earnings Overview</option>
              <option value="payouts">Payout Requests</option>
              <option value="logs">Payment Logs</option>
            </select>
          </div>
        </div>

        {/* Earnings Overview Tab Content */}
        {activeTab === 'earnings' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white rounded-lg p-5 md:p-6 shadow-sm border border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-xs md:text-base text-gray-600 mb-2">{stat.title}</p>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                      {stat.subtitle && (
                        <p className={`text-xs md:text-base ${stat.subtitlePositive ? 'text-green-600' : 'text-gray-600'}`}>
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
                    <p className="text-base text-gray-500">acct_1QH72fB9XkP3L2a1</p>
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
                  <p className="text-base text-teal-600 mb-2">Available Balance</p>
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
                        <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900">
                          {item.dateTime}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">
                          {item.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-base text-gray-600">
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
                        <p className="text-base font-medium text-gray-900 mb-1">{item.dateTime}</p>
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
                <div className="text-base text-gray-600">
                  Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, withdrawalHistory.length)} of {withdrawalHistory.length} results
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className={`px-4 py-2 text-base font-medium rounded-lg border transition-colors ${page === 1
                        ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    Previous
                  </button>

                  <div className="flex items-center gap-1">
                    <span className="px-4 py-2 text-base font-medium text-teal-700 bg-teal-50 border border-teal-200 rounded-lg">
                      {page}
                    </span>
                  </div>

                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className={`px-4 py-2 text-base font-medium rounded-lg border transition-colors ${page === totalPages
                        ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Payout Requests Tab Content */}
        {activeTab === 'payouts' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-5 md:p-6 border-b border-gray-100">
              <h2 className="text-lg md:text-xl font-bold text-gray-900">Payout Requests</h2>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#E7F1F1] border-b border-gray-100">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Seller Name
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {payoutRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900">
                        {request.sellerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">
                        {request.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base text-gray-600">
                        {request.accountNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-[#E7F1F1] text-teal-700">
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <button
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Reject"
                          >
                            <FiX className="w-5 h-5" />
                          </button>
                          <button
                            className="text-green-600 hover:text-green-800 transition-colors"
                            title="Approve"
                          >
                            <FiCheck className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-100">
              {payoutRequests.map((request) => (
                <div key={request.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-base font-medium text-gray-900 mb-1">{request.sellerName}</p>
                      <p className="text-xs text-gray-600">{request.accountNumber}</p>
                    </div>
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-[#E7F1F1] text-teal-700">
                      {request.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-base font-bold text-gray-900">{request.amount}</div>
                    <div className="flex items-center gap-3">
                      <button
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Reject"
                      >
                        <FiX className="w-5 h-5" />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-800 transition-colors"
                        title="Approve"
                      >
                        <FiCheck className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="px-4 md:px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-base text-gray-600">
                Showing 1 to 6 of 6 results
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled
                  className="px-4 py-2 text-base font-medium rounded-lg border bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
                >
                  Previous
                </button>

                <button
                  disabled
                  className="px-4 py-2 text-base font-medium rounded-lg border bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Payment Logs Tab Content */}
        {activeTab === 'logs' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-5 md:p-6 border-b border-gray-100">
              <h2 className="text-lg md:text-xl font-bold text-gray-900">Payment Logs</h2>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#E7F1F1] border-b border-gray-100">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Seller Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Account number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {paymentLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900">
                        {log.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900">
                        {log.sellerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base text-gray-600">
                        {log.accountNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">
                        {log.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base text-gray-600">
                        {log.method}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${log.status === 'Completed'
                            ? 'bg-[#E7F1F1] text-teal-700'
                            : 'bg-red-100 text-red-700'
                          }`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-100">
              {paymentLogs.map((log) => (
                <div key={log.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-base font-medium text-gray-900 mb-1">{log.sellerName}</p>
                      <p className="text-xs text-gray-600 mb-1">{log.date}</p>
                      <p className="text-xs text-gray-600">{log.accountNumber}</p>
                    </div>
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${log.status === 'Completed'
                        ? 'bg-[#E7F1F1] text-teal-700'
                        : 'bg-red-100 text-red-700'
                      }`}>
                      {log.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-base font-bold text-gray-900">{log.amount}</div>
                    <div className="text-xs text-gray-600">{log.method}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="px-4 md:px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-base text-gray-600">
                Showing 1 to 6 of 6 results
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled
                  className="px-4 py-2 text-base font-medium rounded-lg border bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
                >
                  Previous
                </button>

                <button
                  disabled
                  className="px-4 py-2 text-base font-medium rounded-lg border bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

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
  )
}
