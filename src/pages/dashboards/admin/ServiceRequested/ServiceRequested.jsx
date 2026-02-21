import React, { useState, useEffect } from 'react';
import { X, Eye, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DashboardHeader from '../../../../components/ui/DashboardHeader';
import Table from '../../../../components/ui/Table';
import TablePagination from '../../../../components/ui/TablePagination';
import { useService } from '../../../../context/ServiceContext';

const ServiceRequested = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');
    const navigate = useNavigate();

    const { allServices, fetchAllServices, approveService, rejectService, loading } = useService();

    const serviceData = Array.isArray(allServices) ? allServices : [];

    useEffect(() => {
        fetchAllServices();
    }, [fetchAllServices]);

    const getText = (val, fallback = '-') => {
        if (val === null || val === undefined) return fallback;
        if (typeof val === 'string' || typeof val === 'number') return val;
        if (typeof val === 'object') return val.name || val.fullName || val.email || fallback;
        return String(val);
    };

    const formatEnum = (value) => {
        if (value === null || value === undefined) return '-';
        const str = (typeof value === 'string' || typeof value === 'number') ? String(value) : '';
        return str.replace(/_/g, ' ').replace(/-/g, ' ').toLowerCase().split(' ').map(s => s ? s[0].toUpperCase() + s.slice(1) : '').join(' ');
    };

    const getDateText = (service) => {
        if (!service) return '-';
        const dateStr = service.createdAt ?? null;
        if (!dateStr) return '-';
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
        } catch {
            return dateStr;
        }
    };

    const serviceColumns = [
        'Service Title',
        'Service Type',
        'Provider Name',
        'Category',
        'Price',
        'Date',
        'Status',
        'ACTIONS',
    ];

    const handleAction = (action, service) => {
        console.log(`${action} action for:`, service);

        if (action === 'Reject') {
            setSelectedService(service);
            setIsRejectModalOpen(true);
        }

        if (action === 'Approve') {
            handleApproveService(service);
        }

        if (action === 'See Details') {
            navigate(`/admin/service/${(service.title || '').replace(/\s+/g, '-').toLowerCase()}`, { state: { service } });
        }
    };

    const handleApproveService = async (service) => {
        if (!service?.id) {
            toast.error('Service ID is missing');
            return;
        }

        const result = await approveService(service.id);
        if (result.success) {
            console.log('Service approved:', service);
            // Refetch to update the list
            fetchAllServices();
        }
    };

    const handleRejectService = async () => {
        if (!selectedService?.id) {
            toast.error('Service ID is missing');
            return;
        }

        if (!rejectionReason.trim()) {
            toast.error('Please provide a rejection reason');
            return;
        }

        const result = await rejectService(selectedService.id, rejectionReason);
        if (result.success) {
            console.log('Service rejected:', selectedService);
            setIsRejectModalOpen(false);
            setSelectedService(null);
            setRejectionReason('');
            // Refetch to update the list
            fetchAllServices();
        }
    };

    const closeRejectModal = () => {
        setIsRejectModalOpen(false);
        setSelectedService(null);
        setRejectionReason('');
    };

    const renderServiceRow = (service) => {
        const status = (service.status || '').toUpperCase();
        const canApprove = status !== 'ACTIVE' && status !== 'APPROVED';
        const canReject = status !== 'INACTIVE' && status !== 'REJECTED';

        return (
            <>
                <td className="px-4 py-4 text-base">{service.title}</td>
                <td className="px-4 py-4 text-base">{formatEnum(service.serviceType)}</td>
                <td className="px-4 py-4 text-base">{getText(service.provider) || service.providerName}</td>
                <td className="px-4 py-4 text-base">{service.category || '-'}</td>
                <td className="px-4 py-4 text-base">${service.price || '0'}</td>
                <td className="px-4 py-4 text-base">{getDateText(service)}</td>
                <td className="px-4 py-4">
                    <span
                        className="text-base font-medium"
                        style={{ color: status === 'APPROVED' ? 'var(--color-btn-primary)' : status === 'REJECTED' ? '#ef4444' : 'var(--color-dashboardPending)' }}
                    >
                        {formatEnum(service.status)}
                    </span>
                </td>
                <td className="px-4 py-4 text-left">
                    <div className={`flex flex-row items-center gap-2 whitespace-nowrap justify-start`}>
                        <button
                            onClick={() => handleAction('See Details', service)}
                            className="inline-flex w-9 h-9 items-center justify-center bg-[#0F766E] text-white rounded-md text-sm p-0"
                            aria-label="View"
                            title="View"
                        >
                            <Eye className="w-4 h-4" />
                        </button>
                        {canApprove && (
                            <button
                                onClick={() => handleAction('Approve', service)}
                                className="inline-flex w-9 h-9 items-center justify-center bg-white border border-gray-200 rounded-md text-sm hover:bg-gray-50 text-green-600 p-0"
                                aria-label="Approve"
                                title="Approve"
                            >
                                <Check className="w-4 h-4" />
                            </button>
                        )}
                        {canReject && (
                            <button
                                onClick={() => handleAction('Reject', service)}
                                className="inline-flex w-9 h-9 items-center justify-center bg-white border border-red-200 text-red-600 rounded-md text-sm hover:bg-red-50 p-0"
                                aria-label="Reject"
                                title="Reject"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </td>
            </>
        );
    };

    const handleEventPageChange = (page) => {
        setCurrentPage(page);
    };

    const itemsPerPage = 10;
    const totalPages = Math.ceil(serviceData.length / itemsPerPage);
    const paginatedData = serviceData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="flex-1 overflow-auto bg-gray-50  dashboardPy dashboardSpaceY">
            <DashboardHeader title="Service Requests" />

            {loading ? (
                <div className="flex items-center justify-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0F766E]"></div>
                </div>
            ) : (
                <>
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <Table
                            columns={serviceColumns}
                            data={paginatedData}
                            renderRow={renderServiceRow}
                            emptyMessage="No service requests found"
                        />


                        {serviceData.length > 0 && (
                            <TablePagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                totalResults={serviceData.length}
                                resultsPerPage={itemsPerPage}
                                onPageChange={handleEventPageChange}
                            />
                        )}
                    </div>
                </>
            )}

            {/* Reject Modal */}
            {isRejectModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50"
                    onClick={closeRejectModal}
                >
                    <div
                        className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-semibold mb-4">Reject Service</h2>
                        <p className="text-base text-gray-600 mb-4">
                            Are you sure you want to reject "{selectedService?.title}"?
                        </p>
                        <textarea
                            placeholder="Enter rejection reason..."
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-3 text-base focus:outline-none focus:border-[#0F766E] mb-4"
                            rows="4"
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={closeRejectModal}
                                className="px-4 py-2 text-base text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRejectService}
                                className="px-4 py-2 text-base text-white bg-red-600 rounded-md"
                            >
                                Reject Service
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceRequested;
