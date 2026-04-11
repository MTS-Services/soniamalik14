import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import RecruitmentCard from './RecruitmentCard';
import PageHeader from '../../../../components/ui/PageHeader';
import Pagination from '../../../../components/ui/Pagination';
import { fetchRecruitments, selectRecruitments } from '../../../../features/recruitment/recruitmentSlice';
import CreateRecruitmentModal from '../../../../components/ui/CreateRecruitmentModal';

const Recruitment = () => {
    const dispatch = useDispatch();
    const items = useSelector(selectRecruitments);
    const loading = useSelector((s) => s.recruitment.loading);
    const error = useSelector((s) => s.recruitment.error);

    const [page, setPage] = useState(1);
    const perPage = 9;
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (items.length === 0) {
            dispatch(fetchRecruitments());
        }
    }, [dispatch, items.length]);

    const [selectedItem, setSelectedItem] = useState(null);

    const handleEdit = (it) => {
        // open modal with existing item for editing
        setSelectedItem(it);
        setIsModalOpen(true);
    };

    const handleDelete = (it) => {
        // TODO: implement Redux delete action
        console.log('delete', it.id);
    };

    const totalPages = Math.max(1, Math.ceil(items.length / perPage));

    if (loading) return <div className="dashboardPy">Loading recruitments...</div>;
    if (error) return <div className="dashboardPy text-red-600">Error: {error}</div>;

    return (
        <div className="dashboardPy">
            <div className='mb-6'>
                <PageHeader title="Manage your Listings" ctaText="Add New Listing" onCtaClick={() => setIsModalOpen(true)} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {items.slice((page - 1) * perPage, page * perPage).map((it) => (
                    <RecruitmentCard key={it.id} item={it} onEdit={handleEdit} onDelete={handleDelete} />
                ))}
            </div>

            <Pagination page={page} total={totalPages} onChange={(p) => setPage(p)} />

            {/* Create/Edit Recruitment Modal (separate component) */}
            <CreateRecruitmentModal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); setSelectedItem(null); }}
                initialData={selectedItem}
                mode={selectedItem ? 'edit' : 'create'}
            />
        </div>
    )
}

export default Recruitment
