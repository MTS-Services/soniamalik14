import React, { useState, useMemo, useEffect } from 'react';
import Button from '../../../../components/ui/Button';
import NewsCard from './components/NewsCard';
import NewsModal from './components/NewsModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Search } from 'lucide-react';
import Pagination from '../../../../components/ui/Pagination';
import EmptyState from '../../../../components/ui/EmptyState';
import { NewsProvider, useNews } from '../../../../context/NewsContext';

const AdminNews = () => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <NewsProvider>
        <AdminNewsContent
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          editingNews={editingNews}
          setEditingNews={setEditingNews}
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          deleteTarget={deleteTarget}
          setDeleteTarget={setDeleteTarget}
        />
      </NewsProvider>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminNews;

// Consumer component that uses NewsContext
function AdminNewsContent({
  isModalOpen,
  setIsModalOpen,
  editingNews,
  setEditingNews,
  isDeleteOpen,
  setIsDeleteOpen,
  deleteTarget,
  setDeleteTarget,
}) {
  const {
    newsList,
    loading,
    loadNews,
    createNews: ctxCreate,
    updateNews: ctxUpdate,
    deleteNews: ctxDelete,
    bulkPublish,
    bulkUnpublish,
  } = useNews();
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  const filtered = useMemo(() => {
    if (!query) return newsList;
    const q = query.toLowerCase();
    return newsList.filter(
      (n) => (n.title || '').toLowerCase().includes(q) || (n.desc || '').toLowerCase().includes(q)
    );
  }, [query, newsList]);

  const currentPage = useMemo(() => (query ? 1 : page), [query, page]);
  const total = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleEdit = (news) => {
    setEditingNews(news);
    setIsModalOpen(true);
  };

  const handleDelete = (news) => {
    setDeleteTarget(news);
    setIsDeleteOpen(true);
  };

  const handleSelect = (id, checked) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const handleBulkPublish = async () => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;
    try {
      const results = await bulkPublish(ids);
      const failed = results.filter((r) => !r.success);
      if (failed.length === 0) toast.success('All selected news published');
      else toast.warn(`${failed.length} items failed to publish`);
      setSelectedIds(new Set());
    } catch (err) {
      toast.error(err?.message || 'Bulk publish failed');
    }
  };

  const handleBulkUnpublish = async () => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;
    try {
      const results = await bulkUnpublish(ids);
      const failed = results.filter((r) => !r.success);
      if (failed.length === 0) toast.success('All selected news unpublished');
      else toast.warn(`${failed.length} items failed to unpublish`);
      setSelectedIds(new Set());
    } catch (err) {
      toast.error(err?.message || 'Bulk unpublish failed');
    }
  };

  const handleSaveNews = async (data) => {
    try {
      if (editingNews) {
        await ctxUpdate({
          id: editingNews.id,
          data: {
            title: data.title,
            desc: data.desc,
            image: data.image ? data.image : editingNews.img,
          },
        });
        toast.success('News updated successfully');
      } else {
        await ctxCreate({
          title: data.title,
          desc: data.desc,
          image: data.image && typeof data.image === 'string' ? data.image : data.image,
        });
        toast.success('News created successfully');
      }
      setEditingNews(null);
      setIsModalOpen(false);
      await loadNews();
    } catch (err) {
      toast.error(err?.message || err || 'Operation failed');
    }
  };

  return (
    <>
      {/* Header Section */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="relative min-w-[250px] flex-1">
          <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by News name"
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>

        <Button
          variant="primary"
          onClick={() => {
            setEditingNews(null);
            setIsModalOpen(true);
          }}
          className="rounded-lg bg-teal-600 px-6 py-2.5 font-medium text-white hover:bg-teal-700"
        >
          Add a new News
        </Button>
      </div>

      {loading && newsList.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-teal-600"></div>
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title={query ? 'No results found' : 'No news available'}
          subtitle={query ? `No news matching "${query}"` : 'There are currently no news items.'}
          className="mt-8"
        />
      ) : (
        <>
          {/* <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex gap-2">
              <Button
                onClick={handleBulkPublish}
                className="px-3 py-1"
                variant="primary"
                disabled={selectedIds.size === 0}
              >
                Publish selected
              </Button>
              <Button
                onClick={handleBulkUnpublish}
                className="px-3 py-1"
                variant="outline"
                disabled={selectedIds.size === 0}
              >
                Unpublish selected
              </Button>
            </div>
            <div className="text-sm text-gray-600">Selected: {selectedIds.size}</div>
          </div> */}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {paged.map((item, idx) => (
              <NewsCard
                key={item.id ?? `news-${(currentPage - 1) * pageSize + idx}`}
                news={item}
                onEdit={handleEdit}
                onDelete={handleDelete}
                selected={selectedIds.has(item.id ?? item._id ?? item.newsId ?? item?.data?.id)}
                // onSelect={handleSelect}
              />
            ))}
          </div>

          <Pagination page={currentPage} total={total} onChange={(p) => setPage(p)} />
        </>
      )}

      <NewsModal
        isOpen={isModalOpen}
        initialData={editingNews}
        onClose={() => {
          setIsModalOpen(false);
          setEditingNews(null);
        }}
        onSave={handleSaveNews}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setDeleteTarget(null);
        }}
        itemTitle={deleteTarget?.title}
        onConfirm={async () => {
          if (deleteTarget) {
            try {
              await ctxDelete(deleteTarget.id);
              toast.success('News deleted successfully');
              await loadNews();
            } catch (error) {
              toast.error(error?.message || error || 'Failed to delete news');
            }
          }
          setIsDeleteOpen(false);
          setDeleteTarget(null);
        }}
      />
    </>
  );
}
