import React, { useState, useMemo, useEffect } from 'react'
import Button from '../../../../components/ui/Button'
import NewsCard from './components/NewsCard'
import NewsModal from './components/NewsModal'
import DeleteConfirmationModal from './components/DeleteConfirmationModal'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Search } from 'lucide-react'
import Pagination from '../../../../components/ui/Pagination'

const sampleNews = [
  {
    id: 1,
    date: 'Wed Dec 10 2025',
    title: 'New Morning Yoga Classes Added',
    desc: "We've added new morning yoga sessions to help you start your day with calm energy and focus. Join now and...",
    img: 'https://i.ibb.co.com/ynYvN6kk/66e347ed7da510ae6fc8584bc37e1f711dba0ffa.jpg'
  },
  {
    id: 2,
    date: 'Wed Dec 10 2025',
    title: 'Special Workshop This Weekend',
    desc: 'Join our special weekend workshop focused on flexibility, breathing, and relaxation. Limited seats available.',
    img: 'https://i.ibb.co.com/ynYvN6kk/66e347ed7da510ae6fc8584bc37e1f711dba0ffa.jpg'
  },
  {
    id: 3,
    date: 'Wed Dec 10 2025',
    title: 'Improve Your Flexibility in 30 Days',
    desc: 'Discover how regular yoga practice can improve your flexibility and reduce stress in just 30 days.',
    img: 'https://i.ibb.co.com/ynYvN6kk/66e347ed7da510ae6fc8584bc37e1f711dba0ffa.jpg'
  },
  {
    id: 4,
    date: 'Wed Dec 10 2025',
    title: 'New Morning Yoga Classes Added',
    desc: "We've added new morning yoga sessions to help you start your day with calm energy and focus. Join now and...",
    img: 'https://i.ibb.co.com/ynYvN6kk/66e347ed7da510ae6fc8584bc37e1f711dba0ffa.jpg'
  },
  {
    id: 5,
    date: 'Wed Dec 10 2025',
    title: 'Special Workshop This Weekend',
    desc: 'Join our special weekend workshop focused on flexibility, breathing, and relaxation. Limited seats available.',
    img: 'https://i.ibb.co.com/ynYvN6kk/66e347ed7da510ae6fc8584bc37e1f711dba0ffa.jpg'
  },
  {
    id: 6,
    date: 'Wed Dec 10 2025',
    title: 'Improve Your Flexibility in 30 Days',
    desc: 'Discover how regular yoga practice can improve your flexibility and reduce stress in just 30 days.',
    img: 'https://i.ibb.co.com/ynYvN6kk/66e347ed7da510ae6fc8584bc37e1f711dba0ffa.jpg'
  }
]

const AdminNews = () => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 6

  const [newsList, setNewsList] = useState(sampleNews)

  const filtered = useMemo(() => {
    if (!query) return newsList
    const q = query.toLowerCase()
    return newsList.filter(n => n.title.toLowerCase().includes(q) || n.desc.toLowerCase().includes(q))
  }, [query, newsList])

  useEffect(() => {
    setPage(1)
  }, [query])

  const total = Math.max(1, Math.ceil(filtered.length / pageSize))
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize)

  const handleEdit = (news) => {
    // open modal with existing news data
    console.log('Edit news:', news)
    setEditingNews(news)
    setIsModalOpen(true)
  }

  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const handleDelete = (news) => {
    // open delete confirmation modal
    console.log('Delete news (request):', news)
    setDeleteTarget(news)
    setIsDeleteOpen(true)
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingNews, setEditingNews] = useState(null)

  const handleOpenModal = () => { setEditingNews(null); setIsModalOpen(true) }

  const handleSaveNews = (data) => {
    // Demo save: if editingNews exists, treat as update
    if (editingNews) {
      // update existing
      setNewsList(prev => prev.map(n => n.id === editingNews.id ? { ...n, title: data.title, desc: data.desc, img: data.image && typeof data.image === 'string' ? data.image : n.img } : n))
      toast.success('News updated (demo)')
      console.log('Updated news id:', editingNews.id, 'data:', data)
    } else {
      // add new
      const nextId = Math.max(0, ...newsList.map(n => n.id)) + 1
      const newItem = { id: nextId, date: new Date().toDateString(), title: data.title, desc: data.desc, img: data.image && typeof data.image === 'string' ? data.image : '' }
      setNewsList(prev => [newItem, ...prev])
      toast.success('News saved (demo)')
      console.log('Saved news data:', data)
    }
    // reset editing state
    setEditingNews(null)
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        {/* Search Box */}
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by News name"
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>

        {/* Add Button */}
        <Button
          variant="primary"
          onClick={handleOpenModal}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-lg font-medium"
        >
          Add a new News
        </Button>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {paged.map(item => (
          <NewsCard
            key={item.id}
            news={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <Pagination page={page} total={total} onChange={(p) => setPage(p)} />
      <NewsModal isOpen={isModalOpen} initialData={editingNews} onClose={() => { setIsModalOpen(false); setEditingNews(null) }} onSave={(d) => { handleSaveNews(d); setIsModalOpen(false) }} />
      <DeleteConfirmationModal isOpen={isDeleteOpen} onClose={() => { setIsDeleteOpen(false); setDeleteTarget(null) }} itemTitle={deleteTarget?.title} onConfirm={() => {
        if (deleteTarget) {
          setNewsList(prev => prev.filter(n => n.id !== deleteTarget.id))
          toast.success('News deleted (demo)')
          console.log('Deleted news id:', deleteTarget.id)
        }
        setIsDeleteOpen(false)
        setDeleteTarget(null)
      }} />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default AdminNews
