import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

const conditions = ['New', 'Used'];
const categories = ['Cricket', 'Football', 'Tennis', 'Training', 'Other'];

export default function AddProductModal({ open, onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState(conditions[0]);
  const [category, setCategory] = useState(categories[0]);
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (open) {
      setTitle(''); setDescription(''); setCondition(conditions[0]); setCategory(categories[0]); setPrice(''); setAddress('');
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200 p-5 relative">
        <button className="absolute right-3 top-3 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center" onClick={onClose} aria-label="Close">
          <FiX />
        </button>

        <h3 className="text-lg font-semibold mb-1">Add Product</h3>
        <p className="text-sm text-gray-500 mb-4">Provide details about the product you'd like to list.</p>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium block mb-1">Tittle</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="enter tittle" className="w-full border border-gray-200 rounded-md p-2 text-sm" />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="enter description" className="w-full border border-gray-200 rounded-md p-2 text-sm h-28 resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium block mb-1">Condition</label>
              <select value={condition} onChange={(e) => setCondition(e.target.value)} className="w-full border border-gray-200 rounded-md p-2 text-sm">
                {conditions.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-gray-200 rounded-md p-2 text-sm">
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Price</label>
            <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="" className="w-full border border-gray-200 rounded-md p-2 text-sm" />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Address</label>
            <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="" className="w-full border border-gray-200 rounded-md p-2 text-sm" />
          </div>

          <div className="pt-1">
            <button
              onClick={() => {
                const priceNum = parseFloat(price) || 0;
                onSubmit?.({ title, description, condition, category, price: priceNum, address });
                onClose?.();
              }}
              className="bg-btn-primary text-white rounded-md px-4 py-2 text-sm"
            >
              Add product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
