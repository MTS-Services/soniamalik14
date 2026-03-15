import React, { useState } from 'react';
import { Download, Calendar, ChevronDown } from 'lucide-react';

const Users = () => {
    const [activeTab, setActiveTab] = useState('players');
    const [activeSubTab, setActiveSubTab] = useState('all');

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

    const renderFilters = () => (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="relative">
                <input
                    type="text"
                    placeholder="From date"
                    className="w-full pl-3 pr-10 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#117b73]"
                />
                <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
            <div className="relative">
                <input
                    type="text"
                    placeholder="To date"
                    className="w-full pl-3 pr-10 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#117b73]"
                />
                <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
            <div className="relative">
                <select className="w-full pl-3 pr-10 py-2 border border-gray-200 rounded-md text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-[#117b73] text-gray-500">
                    <option>Select Sport</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
                <select className="w-full pl-3 pr-10 py-2 border border-gray-200 rounded-md text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-[#117b73] text-gray-500">
                    <option>Status</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
        </div>
    );

    const renderTableContent = () => {
        if (activeTab === 'players') {
            return (
                <>
                    <thead className="bg-[#f2f8f7]">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Postcode</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Sports selected</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Joined</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Last login</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Events attended</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Register interest</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {playersData.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50">
                                <td className="px-4 py-4 text-sm text-gray-800">{row.name}</td>
                                <td className="px-4 py-4 text-sm text-gray-600 break-all w-40">{row.email}</td>
                                <td className="px-4 py-4 text-sm text-gray-600">{row.postcode}</td>
                                <td className="px-4 py-4 text-sm">
                                    <span className="bg-[#e6f2f1] text-[#117b73] px-3 py-1 rounded-full text-xs font-medium">{row.sport}</span>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-600">{row.joined}</td>
                                <td className="px-4 py-4 text-sm text-gray-600">{row.lastLogin}</td>
                                <td className="px-4 py-4 text-sm text-gray-600">{row.events}</td>
                                <td className="px-4 py-4 text-sm text-gray-600">{row.interest}</td>
                                <td className="px-4 py-4 text-sm text-gray-600">{row.status}</td>
                                <td className="px-4 py-4 text-sm">
                                    <button className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded text-xs font-medium hover:bg-gray-200 transition">
                                        {activeSubTab === 'all' ? 'Suspended' : 'Reinstate'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </>
            );
        }

        if (activeTab === 'sportProviders') {
            return (
                <>
                    <thead className="bg-[#f2f8f7]">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Business name</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Contact name</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Postcode</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Sport</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Joined</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Listings count</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Events count</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Interest received</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 w-24">External link clicks received</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Average response time</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {sportProvidersData.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50">
                                <td className="px-4 py-4 text-sm text-gray-800 break-words w-32">{row.businessName}</td>
                                <td className="px-4 py-4 text-sm text-gray-600">{row.contactName}</td>
                                <td className="px-4 py-4 text-sm text-gray-600 break-all w-32">{row.email}</td>
                                <td className="px-4 py-4 text-sm text-gray-600">{row.postcode}</td>
                                <td className="px-4 py-4 text-sm">
                                    <span className="bg-[#e6f2f1] text-[#117b73] px-3 py-1 rounded-full text-xs font-medium">{row.sport}</span>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-600">{row.joined}</td>
                                <td className="px-4 py-4 text-sm text-gray-600 text-center">{row.listingsCount}</td>
                                <td className="px-4 py-4 text-sm text-gray-600 text-center">{row.eventsCount}</td>
                                <td className="px-4 py-4 text-sm text-gray-600 text-center">{row.interestReceived}</td>
                                <td className="px-4 py-4 text-sm text-gray-600 text-center">{row.externalLinkClicks}</td>
                                <td className="px-4 py-4 text-sm text-gray-600">{row.avgResponseTime}</td>
                                <td className="px-4 py-4 text-sm">
                                    <button className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded text-xs font-medium hover:bg-gray-200 transition">
                                        {activeSubTab === 'all' ? 'Suspended' : 'Reinstate'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </>
            );
        }

        if (activeTab === 'serviceProviders') {
            return (
                <>
                    <thead className="bg-[#f2f8f7]">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Provider Name</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Postcode</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Sports selected</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Joined</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Last login</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Phone Number</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Organization Name</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {serviceProvidersData.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50">
                                <td className="px-4 py-4 text-sm text-gray-800">{row.providerName}</td>
                                <td className="px-4 py-4 text-sm text-gray-600 break-all w-40">{row.email}</td>
                                <td className="px-4 py-4 text-sm text-gray-600">{row.postcode}</td>
                                <td className="px-4 py-4 text-sm">
                                    <span className="bg-[#e6f2f1] text-[#117b73] px-3 py-1 rounded-full text-xs font-medium">{row.sport}</span>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-600">{row.joined}</td>
                                <td className="px-4 py-4 text-sm text-gray-600">{row.lastLogin}</td>
                                <td className="px-4 py-4 text-sm text-gray-600">{row.phone}</td>
                                <td className="px-4 py-4 text-sm text-gray-600">{row.organization}</td>
                                <td className="px-4 py-4 text-sm text-gray-600">{row.status}</td>
                                <td className="px-4 py-4 text-sm">
                                    <button className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded text-xs font-medium hover:bg-gray-200 transition">
                                        {activeSubTab === 'all' ? 'Suspended' : 'Reinstate'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </>
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
            <div className="max-w-[1400px] mx-auto">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-1">Users</h1>
                        <p className="text-sm text-gray-500">Manage platform identities and permissions.</p>
                    </div>
                    <button className="flex items-center gap-2 bg-[#117b73] text-white px-5 py-2.5 rounded-md hover:bg-[#0e635c] transition font-medium text-sm shadow-sm">
                        <Download className="w-4 h-4" />
                        Export CSV
                    </button>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                    
                    {/* Top Main Tabs */}
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

                    {/* Sub Tabs Container */}
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

                    {/* Filters Row */}
                    {renderFilters()}

                    {/* Dynamic Table Wrapper */}
                    <div className="overflow-x-auto rounded-lg border border-gray-100">
                        <table className="w-full whitespace-nowrap">
                            {renderTableContent()}
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                        <span className="text-sm text-gray-600">
                            Showing 1 to 6 of 6 results
                        </span>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
                                Previous
                            </button>
                            <button className="px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
                                Next
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Users;