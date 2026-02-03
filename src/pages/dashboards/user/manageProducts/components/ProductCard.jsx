import React from 'react'
import { FiTag } from 'react-icons/fi'

export default function ProductCard({ item }) {
  return (
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden" style={{ borderColor: '#E6F7F4' }}>
      <div className="p-3">
        <div className="relative rounded-md overflow-hidden bg-gray-50">
          <img
            src={item.image || 'https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder'}
            alt={item.name}
            className="w-full h-64 object-cover rounded-md"
          />

          <div className="absolute top-3 left-3 bg-[#E7F1F1] text-[#0F766E] px-3 py-1 rounded-md text-xs font-medium flex items-center gap-2 shadow-sm">
            <FiTag className="w-3.5 h-3.5 text-[#0F766E]" aria-hidden />
            Used
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 pt-1">
        <h3 className="text-lg font-semibold mb-2" style={{ color: '#161616' }}>{item.name}</h3>
        <p className="text-sm mb-4 leading-relaxed" style={{ color: '#5B5B5B' }}>{item.description}</p>

        <div className="mb-4">
          <div className="text-2xl font-extrabold" style={{ color: '#161616' }}>{item.price}</div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="w-full py-2 rounded-md text-white text-sm" style={{ background: '#0F766E' }}>Edit</button>
          <button className="w-full py-2 rounded-md text-white text-sm" style={{ background: '#10B394' }}>Delete</button>
        </div>
      </div>
    </div>
  )
}
