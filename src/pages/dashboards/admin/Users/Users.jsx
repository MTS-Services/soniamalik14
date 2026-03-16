import React, { useState } from 'react';
import { Download } from 'lucide-react';
import FilterSection from './components/FilterSection';
import PlayersTable from './components/PlayersTable';
import SportProvidersTable from './components/SportProvidersTable';
import ServiceProvidersTable from './components/ServiceProvidersTable';
import TabsSection from './components/TabsSection';
import PaginationSection from './components/PaginationSection';
import SuspendModal from './components/SuspendModal';

const Users = () => {
    const [activeTab, setActiveTab] = useState('players');
    const [activeSubTab, setActiveSubTab] = useState('all');
    const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    // Dummy Data
    const playersData = Array(6).fill({
        name: 'Floyd Miles',
        email: 'michael.mitc@example.com',
        postcode: '10282',
        sport: 'Cricket',
        joined: '3/3/2026',
        lastLogin: '3/3/2026',
        events: 20,
        interest: 16,
        status: 'Active',
        suspendedReason: 'Fake listing',
    }).map((item, i) => ({
        ...item,
        id: i,
        name: ['Leslie Alexander', 'Savannah Nguyen', 'Floyd Miles', 'Cody Fisher', 'Eleanor Pena', 'Esther Howard'][i],
        email: ['dolores.chambers@example.com', 'deanna.curtis@example.com', 'michael.mitc@example.com', 'debra.holt@example.com', 'bill.sanders@example.com', 'debbie.baker@example.com'][i],
        status: activeSubTab === 'all' ? 'Active' : ['Fake listing', 'Inactivity', 'Policy breach', 'Fake listing', 'Harassment', 'Inactivity'][i],
    }));

    const sportProvidersData = Array(6).fill({
        businessName: 'Woking Warriors FC',
        contactName: 'sara cruz',
        email: 'sara.cruz@example.com',
        postcode: '10282',
        sport: 'Cricket',
        joined: '3/3/2026',
        listingsCount: 20,
        eventsCount: 20,
        interestReceived: 16,
        externalLinkClicks: 10,
        avgResponseTime: '1 ms',
    }).map((item, i) => ({ ...item, id: i }));

    const serviceProvidersData = Array(6).fill({
        providerName: 'Floyd Miles',
        email: 'sara.cruz@example.com',
        postcode: '10282',
        sport: 'Cricket',
        joined: '3/3/2026',
        lastLogin: '3/3/2026',
        phone: '(316) 555-0116',
        organization: 'Woking Warriors FC',
        status: 'Active',
    }).map((item, i) => ({ ...item, id: i }));

    // Modal handlers
    const handleOpenSuspendModal = (userId) => {
        setSelectedUserId(userId);
        setIsSuspendModalOpen(true);
    };

    const handleCloseSuspendModal = () => {
        setIsSuspendModalOpen(false);
        setSelectedUserId(null);
    };

    const handleSubmitSuspend = (userId, reason) => {
        console.log(`User ${userId} suspended with reason: ${reason}`);
        // TODO: Make API call to suspend user
        handleCloseSuspendModal();
    };

    const renderTableContent = () => {
        if (activeTab === 'players') return <PlayersTable data={playersData} activeSubTab={activeSubTab} onSuspend={handleOpenSuspendModal} />;
        if (activeTab === 'sportProviders') return <SportProvidersTable data={sportProvidersData} activeSubTab={activeSubTab} onSuspend={handleOpenSuspendModal} />;
        if (activeTab === 'serviceProviders') return <ServiceProvidersTable data={serviceProvidersData} activeSubTab={activeSubTab} onSuspend={handleOpenSuspendModal} />;
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