import React, { useState, useRef, useEffect } from 'react'
import { FiX, FiUpload } from 'react-icons/fi'

export default function AddProductModal({ open, onClose }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [condition, setCondition] = useState('New')
  const [price, setPrice] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  if (!open) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    // placeholder: in real app you'd send data to API
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center sm:items-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      <div className="relative w-full max-w-2xl mx-4 sm:mx-6 bg-white rounded-lg shadow-lg overflow-hidden mt-20 sm:mt-0">
        <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100">
          <FiX className="w-5 h-5 text-gray-600" />
        </button>

        <form onSubmit={handleSubmit} className="p-6">
          <h2 className="text-lg font-semibold text-[#161616] mb-4">Add Product</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-[#5B5B5B]">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="enter title"
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-[#5B5B5B]">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="enter description"
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm min-h-[90px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm mb-1 text-[#5B5B5B]">Condition</label>
                <select value={condition} onChange={(e) => setCondition(e.target.value)} className="w-full border border-gray-200 rounded px-3 py-2 text-sm">
                  <option>New</option>
                  <option>Used</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1 text-[#5B5B5B]">Price</label>
                <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="" className="w-full border border-gray-200 rounded px-3 py-2 text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2 text-[#5B5B5B]">Upload Image</label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files && e.target.files[0]
                  if (file) {
                    if (previewUrl) URL.revokeObjectURL(previewUrl)
                    const url = URL.createObjectURL(file)
                    setImageFile(file)
                    setPreviewUrl(url)
                  }
                }}
              />

              <div
                role="button"
                tabIndex={0}
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current && fileInputRef.current.click() }}
                className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center text-center cursor-pointer relative"
              >
                {previewUrl ? (
                  <>
                    <div className="w-full flex items-center justify-center">
                      <img src={previewUrl} alt="preview" className="h-40 w-auto object-contain rounded" />
                    </div>
                    <button
                      type="button"
                      onClick={(ev) => { ev.stopPropagation(); setImageFile(null); URL.revokeObjectURL(previewUrl); setPreviewUrl(null); if (fileInputRef.current) fileInputRef.current.value = '' }}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                      aria-label="Remove image"
                    >
                      <FiX className="w-4 h-4 text-gray-600" />
                    </button>
                  </>
                ) : (
                  <>
                    <FiUpload className="w-7 h-7 text-[#10B394] mb-2" />
                    <div className="text-sm font-medium text-[#0F766E]">Upload Image</div>
                    <div className="text-xs text-gray-400 mt-1">JPEG files accepted. Max 100MB</div>
                  </>
                )}
              </div>
            </div>

            <div className="pt-2">
              <button type="submit" className="bg-[#0F766E] text-white px-4 py-2 rounded text-sm">Submit For Approval</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
