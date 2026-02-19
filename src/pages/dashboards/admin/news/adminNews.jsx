import React, { useState, useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../../../components/ui/Button'
import NewsCard from './components/NewsCard'
import NewsModal from './components/NewsModal'
import DeleteConfirmationModal from './components/DeleteConfirmationModal'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Search } from 'lucide-react'
import Pagination from '../../../../components/ui/Pagination'
import EmptyState from '../../../../components/ui/EmptyState'
import { fetchNews, createNews, updateNews, deleteNews } from '../../../../features/news/newsAPI'
import { selectAllNews, selectNewsLoading } from '../../../../features/news/newsSlice'

const AdminNews = () => {
  const dispatch = useDispatch()
  const newsList = useSelector(selectAllNews)
  const loading = useSelector(selectNewsLoading)

  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 6

  // Fetch news on component mount
  useEffect(() => {
    dispatch(fetchNews())
  }, [dispatch])

  const filtered = useMemo(() => {
    if (!query) return newsList
    const q = query.toLowerCase()
    return newsList.filter(n => n.title.toLowerCase().includes(q) || n.desc.toLowerCase().includes(q))
  }, [query, newsList])

  // Reset to page 1 when query changes
  const currentPage = useMemo(() => query ? 1 : page, [query, page])

  const total = Math.max(1, Math.ceil(filtered.length / pageSize))
  const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)

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

  const handleSaveNews = async (data) => {
    try {
      if (editingNews) {
        // Update existing news
        await dispatch(updateNews({
          id: editingNews.id,
          data: {
            title: data.title,
            desc: data.desc,
            img: data.image && typeof data.image === 'string' ? data.image : editingNews.img
          }
        })).unwrap()
        toast.success('News updated successfully')
      } else {
        // Create new news
        await dispatch(createNews({
          title: data.title,
          desc: data.desc,
          img: data.image && typeof data.image === 'string' ? data.image : ''
        })).unwrap()
        toast.success('News created successfully')
      }
      setEditingNews(null)
    } catch (error) {
      toast.error(error || 'Operation failed')
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">News Management</h1>
        <p className="text-base text-gray-600 mt-1">Create, edit and manage news items shown across the platform.</p>
      </div>
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

      {/* Loading State */}
      {loading && newsList.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState title={query ? 'No results found' : 'No news available'} subtitle={query ? `No news matching "${query}"` : 'There are currently no news items.'} className="mt-8" />
      ) : (
        <>
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

          <Pagination page={currentPage} total={total} onChange={(p) => setPage(p)} />
        </>
      )}
      <NewsModal isOpen={isModalOpen} initialData={editingNews} onClose={() => { setIsModalOpen(false); setEditingNews(null) }} onSave={(d) => { handleSaveNews(d); setIsModalOpen(false) }} />
      <DeleteConfirmationModal isOpen={isDeleteOpen} onClose={() => { setIsDeleteOpen(false); setDeleteTarget(null) }} itemTitle={deleteTarget?.title} onConfirm={async () => {
        if (deleteTarget) {
          try {
            await dispatch(deleteNews(deleteTarget.id)).unwrap()
            toast.success('News deleted successfully')
          } catch (error) {
            toast.error(error || 'Failed to delete news')
          }
        }
        setIsDeleteOpen(false)
        setDeleteTarget(null)
      }} />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default AdminNews
