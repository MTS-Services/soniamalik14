import React, { useState, useEffect } from 'react'
import { X, Upload } from 'lucide-react'
import Button from '../../../../../components/ui/Button'

const NewsModal = ({ isOpen, onClose, initialData = null, onSave }) => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [image, setImage] = useState(null)

    useEffect(() => {
        if (initialData) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTitle(initialData.title || '')
            setDesc(initialData.desc || '')
            setImage(initialData.img || null)
        } else {
            setTitle('')
            setDesc('')
            setImage(null)
        }
    }, [initialData, isOpen])

    const handleFile = (e) => {
        const file = e.target.files?.[0]
        if (file) setImage(file)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = { title, desc, image }
        console.log('News modal submit:', data)
        onSave?.(data)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
            <div className="bg-white rounded-lg shadow-xl w-full max-w-xl mx-4 sm:mx-6">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">Add News</h2>
                    <button onClick={onClose} className="text-[#000000] bg-[#D9D9D9] rounded-full p-1">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-base font-medium text-gray-700 mb-1">News Title</label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter news title" className="w-full bg-[#EEEEEE] px-3 py-2 border border-gray-300 rounded-md text-base" />
                    </div>

                    <div>
                        <label className="block text-base font-medium text-gray-700 mb-1">News Description</label>
                        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={4} placeholder="Description" className="w-full px-3 py-2 border border-gray-300 rounded-md text-base resize-none bg-[#EEEEEE]" />
                    </div>

                    <div>
                        <label className="block text-base font-medium text-gray-700 mb-1">Upload Image</label>
                        <label className="block cursor-pointer">
                            <div className="h-28 bg-gray-100 rounded-md mb-2 flex items-center justify-center">
                                <div className="flex flex-col items-center text-gray-500">
                                    <Upload className="w-6 h-6 mb-2" />
                                    <div className="text-sm">Click to upload</div>
                                </div>
                            </div>
                            <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
                        </label>
                    </div>

                    <div className="flex items-center gap-3 justify-end">
                        <Button type="submit" variant="primary" className='rounded-md' >Save News</Button>
                       
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewsModal
