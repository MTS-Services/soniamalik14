import React, { useState, useEffect } from 'react'
import { FiSearch, FiChevronDown } from 'react-icons/fi'
import TablePagination from '../../../../components/ui/TablePagination'


const STATUS = {
  completed: { label: 'Completed', color: '#28A844' },
  progress: { label: 'In process', color: '#E9AB00' },
}

export default function OrderList() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const initialRows = [
    { id: 1, name: "Women's Cricket Helmet", orderedBy: 'Brooklyn Simmons', price: '$100', qty: 1, condition: 'New', status: 'completed' },
    { id: 2, name: 'Football Boots for Women', orderedBy: 'Guy Hawkins', price: '$200', qty: 2, condition: 'Used', status: 'progress' },
    { id: 3, name: 'Tennis Racket', orderedBy: 'Ronald Richards', price: '$100', qty: 4, condition: 'Used', status: 'completed' },
    { id: 4, name: 'Squash Gear', orderedBy: 'Leslie Alexander', price: '$400', qty: 5, condition: 'New', status: 'completed' },
    { id: 5, name: 'Rugby Kit for Women', orderedBy: 'Eleanor Pena', price: '$500', qty: 6, condition: 'Used', status: 'progress' },
    { id: 6, name: 'Squash Gear', orderedBy: 'Floyd Miles', price: '$100', qty: 7, condition: 'New', status: 'completed' },
    { id: 7, name: 'Rugby Kit for Women', orderedBy: 'Savannah Nguyen', price: '$600', qty: 8, condition: 'Used', status: 'progress' },
    { id: 8, name: 'Squash Gear', orderedBy: 'Robert Fox', price: '$800', qty: 2, condition: 'New', status: 'completed' },
    { id: 9, name: 'Tennis Racket', orderedBy: 'Wade Warren', price: '$100', qty: 3, condition: 'Used', status: 'progress' },
  ]

  const [rowsData, setRowsData] = useState(initialRows)
  const [openStatus, setOpenStatus] = useState(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (openStatus !== null && !e.target.closest('.status-dropdown')) {
        setOpenStatus(null)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [openStatus])

  const filtered = rowsData.filter(r => r.name.toLowerCase().includes(query.toLowerCase()) || r.orderedBy.toLowerCase().includes(query.toLowerCase()))

  const pageSize = 10
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize)

  return (
    <section className="p-4 md:p-6 lg:p-8 bg-transparent">
      <div className="mx-auto bg-[#E7F1F1] rounded-lg shadow-sm overflow-hidden">
        {/* Header Section Updated */}
        <div className="p-4 md:p-6 border-b" style={{ borderColor: '#DDEDEB' }}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Title & Description */}
            <div className="flex-shrink-0">
              <h2 className="text-xl md:text-2xl font-bold text-black">Order List</h2>
              <p className="text-sm text-[#5B6B69] mt-1">Manage orders placed by customers</p>
            </div>

            {/* Search Bar - Styled to match image */}
            <div className="w-full md:max-w-md lg:max-w-lg">
              <label className="relative block">
                <span className="sr-only">Search</span>
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#0F766E] text-lg">
                  <FiSearch />
                </span>
                <input
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-[#B5D5D2] border border-transparent text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-[#0F766E]"

                  placeholder="Search by Product name"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setPage(1) }}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Table for md+ screens */}
        <div className="hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="text-left bg-[#B5D5D2]" >
                  <th className="px-6 py-3 text-base text-[#000000] font-medium">Product Name</th>
                  <th className="px-6 py-3 text-base text-[#000000] font-medium">Ordered By</th>
                  <th className="px-6 py-3 text-base text-[#000000] font-medium">Price</th>
                  <th className="px-6 py-3 text-base text-[#000000] font-medium">Quantity</th>
                  <th className="px-6 py-3 text-base text-[#000000] font-medium">Condition</th>
                  <th className="px-6 py-3 text-base text-[#000000] font-medium">Progress</th>
                </tr>
              </thead>
              <tbody>
                {pageData.map((r) => (
                  <tr key={r.id} className="last:border-b-0">
                    <td className="px-6 py-4">{r.name}</td>
                    <td className="px-6 py-4">{r.orderedBy}</td>
                    <td className="px-6 py-4">{r.price}</td>
                    <td className="px-6 py-4">{r.qty}</td>
                    <td className="px-6 py-4">{r.condition}</td>
                    <td className="px-6 py-4">
                      <div className="relative inline-block text-left status-dropdown">
                        <button
                          type="button"
                          onClick={() => setOpenStatus(openStatus === r.id ? null : r.id)}
                          className="inline-flex items-center gap-3 px-3 py-1 rounded-md text-white text-sm font-medium"
                          style={{ background: STATUS[r.status].color }}
                          aria-expanded={openStatus === r.id}
                        >
                          <span>{STATUS[r.status].label}</span>
                          <FiChevronDown className="w-4 h-4" aria-hidden />
                        </button>

                        {openStatus === r.id && (
                          <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg z-20" style={{ minWidth: '120px' }}>
                            {['progress', 'completed'].filter(k => k !== r.status).map(k => (
                              <button
                                key={k}
                                onClick={() => { setRowsData(prev => prev.map(it => it.id === r.id ? { ...it, status: k } : it)); setOpenStatus(null) }}
                                className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm"
                              >{STATUS[k].label}</button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile list */}
        <div className="md:hidden p-4 space-y-4">
          {pageData.map((r) => (
            <div key={r.id} className="border border-[#0F766E] rounded-lg p-3 ">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm font-semibold" style={{ color: '#000000' }}>{r.name}</div>
                  <div className="text-xs text-gray-600 mt-1">{r.orderedBy}</div>
                </div>
                <div>
                  <div className="text-sm font-extrabold">{r.price}</div>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-gray-600">Qty:</span> <span className="font-medium">{r.qty}</span></div>
                <div><span className="text-gray-600">Condition:</span> <span className="font-medium">{r.condition}</span></div>
              </div>

              <div className="mt-3 flex justify-end relative">
                <div className="relative inline-block text-right status-dropdown">
                  <button
                    type="button"
                    onClick={() => setOpenStatus(openStatus === r.id ? null : r.id)}
                    className="inline-flex items-center gap-3 px-3 py-1 rounded-md text-white text-sm font-medium"
                    style={{ background: STATUS[r.status].color }}
                    aria-expanded={openStatus === r.id}
                  >
                    <span>{STATUS[r.status].label}</span>
                    <FiChevronDown className="w-4 h-4" aria-hidden />
                  </button>

                  {openStatus === r.id && (
                    <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg z-20" style={{ minWidth: '120px' }}>
                      {['progress', 'completed'].filter(k => k !== r.status).map(k => (
                        <button
                          key={k}
                          onClick={() => { setRowsData(prev => prev.map(it => it.id === r.id ? { ...it, status: k } : it)); setOpenStatus(null) }}
                          className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm"
                        >{STATUS[k].label}</button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer / Pagination (shared component) */}
        <TablePagination
          currentPage={page}
          totalPages={totalPages}
          totalResults={filtered.length}
          resultsPerPage={pageSize}
          onPageChange={(p) => setPage(Math.max(1, Math.min(totalPages, p)))}
          wrapperStyle={{ background: '#E7F1F1' }}
          resultsTextClass={'text-[#0F766E]'}
          buttonClass={'border-[#0F766E] text-[#0F766E] bg-[#E7F1F1]'}
        />
      </div>
    </section>
  )
}
