import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../../../components/ui/PageHeader';
import ServiceModal from '../../../../components/ui/ServiceModal';
import ServiceCard from '../../../../components/ui/ServiceCard';
import Pagination from '../../../../components/ui/Pagination';
import { fetchServices } from '../../../../features/service/serviceApi';
import { selectAllServices, selectServicesLoading } from '../../../../features/service/serviceSlice';

const ProviderService = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const services = useSelector(selectAllServices);
    const loading = useSelector(selectServicesLoading);

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    // Pagination logic
    const paginatedServices = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return services.slice(startIndex, startIndex + itemsPerPage);
    }, [services, currentPage]);

    const totalPages = Math.ceil(services.length / itemsPerPage);

    const handleEdit = () => {
        // open modal in edit mode (not implemented in ServiceModal yet)
        setIsModalOpen(true);
    };

    const handleDelete = (item) => {
        // placeholder delete action
        console.log('delete', item);
    };

    if (loading) {
        return (
            <div className='dashboardPy dashboardSpaceY'>
                <PageHeader
                    title="Manage Your Services"
                    description="This is where you manage all the services you provide to the women's sports community."
                    ctaText="Create Service"
                    onCtaClick={() => setIsModalOpen(true)}
                />
                <div className="flex justify-center items-center h-64">
                    <p className="text-cardTitle">Loading services...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='dashboardPy dashboardSpaceY'>
            <PageHeader
                title="Manage Your Services"
                description="This is where you manage all the services you provide to the women’s sports community."
                ctaText="Create Service"
                onCtaClick={() => setIsModalOpen(true)}
            />

            <div className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3  gap-6 2xl:grid-cols-4">
                    {paginatedServices.map((s) => (
                        <ServiceCard key={s.id} item={s} onEdit={handleEdit} onDelete={handleDelete} />
                    ))}
                </div>
            </div>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}

            <ServiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default ProviderService;