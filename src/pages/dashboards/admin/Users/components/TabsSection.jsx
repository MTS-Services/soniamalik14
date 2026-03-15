import React from 'react';

const TabsSection = ({ activeTab, activeSubTab, setActiveTab, setActiveSubTab }) => {
    return (
        <>
            {/* Main Tabs */}
            <div className="flex gap-4 mb-8">
                <button
                    onClick={() => { setActiveTab('players'); setActiveSubTab('all'); }}
                    className={`px-5 py-2 rounded-md text-sm font-medium transition ${activeTab === 'players' ? 'border border-gray-200 text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Players
                </button>
                <button
                    onClick={() => { setActiveTab('sportProviders'); setActiveSubTab('all'); }}
                    className={`px-5 py-2 rounded-md text-sm font-medium transition ${activeTab === 'sportProviders' ? 'border border-gray-200 text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Sport Providers
                </button>
                <button
                    onClick={() => { setActiveTab('serviceProviders'); setActiveSubTab('all'); }}
                    className={`px-5 py-2 rounded-md text-sm font-medium transition ${activeTab === 'serviceProviders' ? 'border border-gray-200 text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Service Providers
                </button>
            </div>

            {/* Sub Tabs */}
            <div className="mb-6 border-b border-gray-200">
                <div className="flex w-full">
                    <button
                        onClick={() => setActiveSubTab('all')}
                        className={`flex-1 pb-3 text-sm font-medium text-center transition ${activeSubTab === 'all' ? 'text-[#117b73] border-b-2 border-[#117b73]' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        {activeTab === 'players' && 'All Players'}
                        {activeTab === 'sportProviders' && 'All Sport Providers'}
                        {activeTab === 'serviceProviders' && 'All Service Providers'}
                    </button>
                    <button
                        onClick={() => setActiveSubTab('suspended')}
                        className={`flex-1 pb-3 text-sm font-medium text-center transition ${activeSubTab === 'suspended' ? 'text-[#117b73] border-b-2 border-[#117b73]' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Suspended
                    </button>
                </div>
            </div>
        </>
    );
};

export default TabsSection;
