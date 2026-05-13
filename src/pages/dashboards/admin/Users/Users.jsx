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
import {
  fetchAllUsers,
  suspendUser,
  selectUsersByRole,
  selectUsersLoading,
} from '../../../../features/users/usersSlice';

const Users = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('players');
    const [activeSubTab, setActiveSubTab] = useState('all');
    const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [page] = useState(1);
    const [limit] = useState(100);

    // Redux Selectors
    const playersData = useSelector((state) => selectUsersByRole('USER')(state));
    const sportProvidersData = useSelector((state) => selectUsersByRole('COACH')(state));
    const serviceProvidersData = useSelector((state) => selectUsersByRole('PROVIDER')(state));
    const isLoading = useSelector(selectUsersLoading);

    // Fetch all users on mount
    useEffect(() => {
        dispatch(fetchAllUsers({ page, limit }));
    }, [dispatch, page, limit]);

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
            await dispatch(suspendUser({ userId, reason })).unwrap();
            handleCloseSuspendModal();
        } catch (error) {
            console.error('Failed to suspend user:', error);
        }
    };

    const renderTableContent = () => {
        if (isLoading) {
            return (
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            );
        }

        if (activeTab === 'players') {
            return <PlayersTable data={playersData || []} activeSubTab={activeSubTab} onSuspend={handleOpenSuspendModal} />;
        }
        if (activeTab === 'sportProviders') {
            return <SportProvidersTable data={sportProvidersData || []} activeSubTab={activeSubTab} onSuspend={handleOpenSuspendModal} />;
        }
        if (activeTab === 'serviceProviders') {
            return <ServiceProvidersTable data={serviceProvidersData || []} activeSubTab={activeSubTab} onSuspend={handleOpenSuspendModal} />;
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
                        setActiveTab={setActiveTab}
                        setActiveSubTab={setActiveSubTab}
                    />

                    {/* Filters */}
                    <FilterSection />

                    {/* Dynamic Table */}
                    {renderTableContent()}

                    {/* Pagination */}
                    <PaginationSection />

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