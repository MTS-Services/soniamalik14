import React, { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import Container from '../../../../components/layout/Container'
import Card from '../../../../components/ui/Card'
import ProductCard from './components/ProductCard'
import AddProductModal from './modal/AddProductModal'
import EditProductModal from './modal/EditProductModal'

const ManageProducts = () => {
  const products = Array.from({ length: 9 }).map((_, i) => ({
    id: i + 1,
    name: "Elite Women's Football Studs",
    description: 'High-performance studs with strong grip and comfort. Lightly used.',
    price: '$20',
  }))

  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  return (
    <section className="px-4 md:px-6 lg:px-8 py-6 lg:py-8">
      <div className="mx-auto">
          <div className="mb-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
              <div className="w-full md:w-auto">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#161616]">
              Marketplace – Manage Your Products
            </h1>
                <p className="text-sm md:text-base text-[#5B5B5B] mt-1">
              Sell sports kits, equipment, and training essentials to your community.
            </p>
              </div>
          </div>

          <div className="w-full md:w-auto mt-3 md:mt-0 text-left md:text-right">
            <button onClick={() => setShowAddModal(true)} className="inline-flex items-center gap-2 bg-[#0F766E] text-white px-4 py-2 rounded-md shadow">
              <FiPlus />
              <span className="text-sm font-medium">Add Product</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              item={p}
              onEdit={(item) => { setSelectedProduct(item); setShowEditModal(true) }}
              onDelete={(item) => { /* TODO: delete handler */ }}
            />
          ))}
        </div>
        {showAddModal && <AddProductModal open={showAddModal} onClose={() => setShowAddModal(false)} />}
        {showEditModal && (
          <EditProductModal
            open={showEditModal}
            onClose={() => { setShowEditModal(false); setSelectedProduct(null) }}
            product={selectedProduct}
          />
        )}
      </div>
    </section>
  )
}

export default ManageProducts
