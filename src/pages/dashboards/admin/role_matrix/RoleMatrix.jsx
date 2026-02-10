import React, { useState } from 'react'
import { FiTrash2, FiDownload } from 'react-icons/fi'

export default function RoleMatrix() {
  const [email, setEmail] = useState('')
  const [selectedRole, setSelectedRole] = useState('Admin')
  const [showAddRuleModal, setShowAddRuleModal] = useState(false)
  const [newModuleName, setNewModuleName] = useState('')

  // Edit Matrix data
  const [editMatrixRules, setEditMatrixRules] = useState([
    { id: 1, module: 'Dashboard/ Overview', admin: true, clubOwner: true, serviceProvider: false },
    { id: 2, module: 'Service Provider Profile', admin: true, clubOwner: false, serviceProvider: true },
    { id: 3, module: 'Event Management', admin: true, clubOwner: true, serviceProvider: true },
    { id: 4, module: 'Recruitment Posts', admin: true, clubOwner: true, serviceProvider: false },
    { id: 5, module: 'Product Listing', admin: true, clubOwner: false, serviceProvider: false },
    { id: 6, module: 'Financial Reporting', admin: true, clubOwner: false, serviceProvider: false },
    { id: 7, module: 'Financial Reporting', admin: true, clubOwner: false, serviceProvider: false },
  ])

  // Visibility Matrix data
  const visibilityMatrix = [
    { id: 1, module: 'Dashboard/ Overview', admin: 'Visible', clubOwner: 'Visible', serviceProvider: 'Hidden' },
    { id: 2, module: 'Service Provider Profile', admin: 'Visible', clubOwner: 'Hidden', serviceProvider: 'Visible' },
    { id: 3, module: 'Recruitment Posts', admin: 'Visible', clubOwner: 'Visible', serviceProvider: 'Hidden' },
    { id: 4, module: 'Product Listing', admin: 'Visible', clubOwner: 'Hidden', serviceProvider: 'Hidden' },
    { id: 5, module: 'Financial Reporting', admin: 'Visible', clubOwner: 'Hidden', serviceProvider: 'Hidden' },
    { id: 6, module: 'Role Matrix', admin: 'Visible', clubOwner: 'Hidden', serviceProvider: 'Hidden' },
  ]

  const handleToggle = (ruleId, field) => {
    setEditMatrixRules(rules =>
      rules.map(rule =>
        rule.id === ruleId ? { ...rule, [field]: !rule[field] } : rule
      )
    )
  }

  const handleDelete = (ruleId) => {
    setEditMatrixRules(rules => rules.filter(rule => rule.id !== ruleId))
  }

  const handleSendInvite = () => {
    if (email) {
      console.log('Sending invite to:', email, 'as', selectedRole)
      setEmail('')
    }
  }

  const handleDownload = () => {
    console.log('Downloading visibility matrix...')
  }

  const handleOpenAddRuleModal = () => {
    setShowAddRuleModal(true)
  }

  const handleCloseAddRuleModal = () => {
    setShowAddRuleModal(false)
    setNewModuleName('')
  }

  const handleSaveNewRule = () => {
    if (newModuleName.trim()) {
      const newRule = {
        id: editMatrixRules.length + 1,
        module: newModuleName,
        admin: false,
        clubOwner: false,
        serviceProvider: false
      }
      setEditMatrixRules([...editMatrixRules, newRule])
      handleCloseAddRuleModal()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Role & Permission Strategy
        </h1>
        <p className="text-base md:text-base lg:w-xl text-gray-600">
          Documentation of the access control layers implemented in Prana Studio. This ensures data security and a focused user experience for each staff role.
        </p>
      </div>

      {/* Invite Your Team Section */}
      <div className="bg-white lg:w-3xl rounded-lg shadow-sm border border-gray-200 p-5 md:p-6 mb-6">
        <h2 className="text-lg md:text-2xl font-medium text-gray-900 mb-2">
          Invite your team
        </h2>
        <p className="text-base md:text-base lg:w-xl text-gray-600 mb-4">
          Easily add new members to a role by entering their email addresses below. Once invited, they'll receive an email with a link to join.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="flex-1 px-4 py-2 border bg-[#EDEDED] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
          />
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-2 bg-[#EDEDED] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-[#EDEDED] min-w-[120px]"
          >
            <option>Admin</option>
            <option>Club Owner</option>
            <option>Service Provider</option>
          </select>
          <button
            onClick={handleSendInvite}
            className="px-6 py-2 bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-lg transition-colors text-sm whitespace-nowrap"
          >
            Send Invite
          </button>
        </div>
      </div>

      {/* Edit Matrix Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-5 md:p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">Edit Matrix</h2>
          <button 
            onClick={handleOpenAddRuleModal}
            className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-lg transition-colors text-sm"
          >
            Add New Rule
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Module / Page
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Admin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Club Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Service provider
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {editMatrixRules.map((rule) => (
                <tr key={rule.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {rule.module}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rule.admin}
                        onChange={() => handleToggle(rule.id, 'admin')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-700"></div>
                    </label>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rule.clubOwner}
                        onChange={() => handleToggle(rule.id, 'clubOwner')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-700"></div>
                    </label>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rule.serviceProvider}
                        onChange={() => handleToggle(rule.id, 'serviceProvider')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-700"></div>
                    </label>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(rule.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet Cards */}
        <div className="lg:hidden divide-y divide-gray-200">
          {editMatrixRules.map((rule) => (
            <div key={rule.id} className="p-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium text-gray-900 text-sm">{rule.module}</h3>
                <button
                  onClick={() => handleDelete(rule.id)}
                  className="text-red-600 hover:text-red-800 transition-colors ml-2"
                  title="Delete"
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Admin</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rule.admin}
                      onChange={() => handleToggle(rule.id, 'admin')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-700"></div>
                  </label>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Club Owner</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rule.clubOwner}
                      onChange={() => handleToggle(rule.id, 'clubOwner')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-700"></div>
                  </label>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Service Provider</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rule.serviceProvider}
                      onChange={() => handleToggle(rule.id, 'serviceProvider')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-700"></div>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visibility Matrix Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-5 md:p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">Visibility Matrix</h2>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-lg transition-colors text-sm"
          >
            <FiDownload className="w-4 h-4" />
            Download
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Module / Page
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Admin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Club Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Service Provider
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {visibilityMatrix.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.module}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={item.admin === 'Visible' ? 'text-teal-700 font-medium' : 'text-gray-400'}>
                      {item.admin}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={item.clubOwner === 'Visible' ? 'text-teal-700 font-medium' : 'text-gray-400'}>
                      {item.clubOwner}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={item.serviceProvider === 'Visible' ? 'text-teal-700 font-medium' : 'text-gray-400'}>
                      {item.serviceProvider}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-gray-200">
          {visibilityMatrix.map((item) => (
            <div key={item.id} className="p-4">
              <h3 className="font-medium text-gray-900 text-sm mb-3">{item.module}</h3>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Admin</p>
                  <p className={`text-sm font-medium ${item.admin === 'Visible' ? 'text-teal-700' : 'text-gray-400'}`}>
                    {item.admin}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Club Owner</p>
                  <p className={`text-sm font-medium ${item.clubOwner === 'Visible' ? 'text-teal-700' : 'text-gray-400'}`}>
                    {item.clubOwner}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Service Provider</p>
                  <p className={`text-sm font-medium ${item.serviceProvider === 'Visible' ? 'text-teal-700' : 'text-gray-400'}`}>
                    {item.serviceProvider}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Rule Modal */}
      {showAddRuleModal && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Rule</h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Module / Page Name
                </label>
                <input
                  type="text"
                  value={newModuleName}
                  onChange={(e) => setNewModuleName(e.target.value)}
                  placeholder="Enter page or module name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCloseAddRuleModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNewRule}
                  disabled={!newModuleName.trim()}
                  className="flex-1 px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
