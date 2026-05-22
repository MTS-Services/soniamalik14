import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Download } from 'lucide-react';
import FilterSection from './components/FilterSection';
import PlayersTable from './components/PlayersTable';
import SportProvidersTable from './components/SportProvidersTable';
import ServiceProvidersTable from './components/ServiceProvidersTable';
import TabsSection from './components/TabsSection';
import PaginationSection from './components/PaginationSection';
import SuspendModal from './components/SuspendModal';
import { toast } from 'react-toastify';
import {
    fetchAllUsers,
    fetchSuspendedUsers,
    suspendUser,
    selectUsersByRole,
    selectUsersLoading,
    selectSuspendedUsers,
    selectSuspendedLoading,
    selectPagination,
} from '../../../../features/users/usersSlice';

const Users = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('players');
    const [activeSubTab, setActiveSubTab] = useState('all');
    const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [page, setPage] = useState(1);
    const [limit] = useState(6);

    // Redux Selectors
    const playersData = useSelector((state) => selectUsersByRole('USER')(state));
    const sportProvidersData = useSelector((state) => selectUsersByRole('COACH')(state));
    const serviceProvidersData = useSelector((state) => selectUsersByRole('PROVIDER')(state));
    const isLoading = useSelector(selectUsersLoading);

    // Fetch users depending on subtab
    const suspendedData = useSelector(selectSuspendedUsers);
    const suspendedLoading = useSelector(selectSuspendedLoading);
    const pagination = useSelector(selectPagination);

    useEffect(() => {
       
        if (activeSubTab === 'suspended') {
            const role = activeTab === 'players' ? 'USER' : activeTab === 'sportProviders' ? 'COACH' : 'PROVIDER';
            dispatch(fetchSuspendedUsers({ page, limit, filters: { role } }));
        } else {
            const role = activeTab === 'players' ? 'USER' : activeTab === 'sportProviders' ? 'COACH' : 'PROVIDER';
            dispatch(fetchAllUsers({ page, limit, filters: { role } }));
        }
    }, [dispatch, activeTab, activeSubTab, page, limit]);

    // Modal handlers
    const handleOpenSuspendModal = (userId) => {
        setSelectedUserId(userId);
        setIsSuspendModalOpen(true);
    };

    const handleCloseSuspendModal = () => {
        setIsSuspendModalOpen(false);
        setSelectedUserId(null);
    };

    const handleSubmitSuspend = async (userId, reason) => {
        try {
            const response = await dispatch(suspendUser({ userId, reason })).unwrap();
            if (response?.message) {
                toast.success(response.message);
            }
            handleCloseSuspendModal();
        } catch (error) {
            console.error('Failed to suspend user:', error);
        }
    };

    const renderTableContent = () => {
        if (isLoading || suspendedLoading) {
            return (
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            );
        }

        const isSuspendedView = activeSubTab === 'suspended';

        if (activeTab === 'players') {
            return <PlayersTable data={isSuspendedView ? (suspendedData || []) : (playersData || [])} activeSubTab={activeSubTab} onSuspend={handleOpenSuspendModal} />;
        }
        if (activeTab === 'sportProviders') {
            return <SportProvidersTable data={isSuspendedView ? (suspendedData || []) : (sportProvidersData || [])} activeSubTab={activeSubTab} onSuspend={handleOpenSuspendModal} />;
        }
        if (activeTab === 'serviceProviders') {
            return <ServiceProvidersTable data={isSuspendedView ? (suspendedData || []) : (serviceProvidersData || [])} activeSubTab={activeSubTab} onSuspend={handleOpenSuspendModal} />;
        }
    };

    return (
        <div className="flex-1 overflow-auto bg-gray-50 dashboardPy dashboardSpaceY">
            <div className="">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="text-center sm:text-left">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Users</h1>
                        <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Manage platform identities and permissions.</p>
                    </div>
                    <button className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-btn-primary text-white text-sm sm:text-base font-medium rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap">
                        <Download className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span className="hidden sm:inline">Export CSV</span>
                        <span className="sm:hidden">Export</span>
                    </button>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">

                    {/* Tabs */}
                    <TabsSection
                        activeTab={activeTab}
                        activeSubTab={activeSubTab}
                        setActiveTab={(tab) => { setActiveTab(tab); setActiveSubTab('all'); setPage(1); }}
                        setActiveSubTab={(sub) => { setActiveSubTab(sub); setPage(1); }}
                    />

                    {/* Filters */}
                    <FilterSection />

                    {/* Dynamic Table */}
                    {renderTableContent()}

                    {/* Pagination */}
                    <PaginationSection
                        page={page}
                        limit={limit}
                        total={pagination?.total || (suspendedData?.length || 0)}
                        totalPages={pagination?.totalPages || 1}
                        onPrev={() => setPage((p) => Math.max(1, p - 1))}
                        onNext={() => setPage((p) => Math.min((pagination?.totalPages || 1), p + 1))}
                    />

                </div>
            </div>

            {/* Suspend Modal */}
            <SuspendModal
                isOpen={isSuspendModalOpen}
                onClose={handleCloseSuspendModal}
                onSubmit={handleSubmitSuspend}
                userId={selectedUserId}
            />
        </div>
    );
};

export default Users;