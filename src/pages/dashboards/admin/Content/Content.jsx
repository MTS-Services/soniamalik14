import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, FileText } from 'lucide-react';

const Content = () => {
    const [contents, setContents] = useState([
        { id: 1, title: 'Getting Started Guide', type: 'Guide', status: 'Published', views: '3,560', createdDate: '03/03/2025' },
        { id: 2, title: 'FAQ - Sports Events', type: 'FAQ', status: 'Published', views: '2,340', createdDate: '02/03/2025' },
        { id: 3, title: 'Blog - Summer Season', type: 'Blog', status: 'Draft', views: '0', createdDate: '01/03/2025' },
        { id: 4, title: 'Tutorial - Booking', type: 'Tutorial', status: 'Published', views: '4,120', createdDate: '28/02/2025' },
        { id: 5, title: 'Policy Update March', type: 'Policy', status: 'Published', views: '1,890', createdDate: '27/02/2025' },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');

    const filteredContents = contents.filter((content) => {
        const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === 'All' || content.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Published':
                return 'text-green-700 bg-green-100';
            case 'Draft':
                return 'text-yellow-700 bg-yellow-100';
            case 'Archived':
                return 'text-gray-600 bg-gray-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    return (
        <div className="flex-1 overflow-auto bg-gray-50 dashboardPy dashboardSpaceY">
            <div className="">

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage and organize platform content, guides, and documentation.</p>
                    </div>
                    <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0f766e] text-white text-base font-medium rounded-lg hover:bg-teal-800 transition-colors">
                        <Plus className="w-4 h-4" />
                        Add Content
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">

                    <div className="p-6">
                        {/* Search and Filters */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">

                            {/* Search Bar */}
                            <div className="flex items-center w-full max-w-md bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 focus-within:ring-2 focus-within:ring-[#0f766e]/20 transition-all">
                                <Search className="w-5 h-5 text-gray-400 mr-3" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search content..."
                                    className="bg-transparent border-none outline-none w-full text-base text-gray-700 placeholder-gray-400"
                                />
                            </div>

                            {/* Status Filter */}
                            <div className="relative">
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="appearance-none w-48 px-4 py-2 pr-10 text-base text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:border-[#0f766e] cursor-pointer"
                                >
                                    <option value="All">All Status</option>
                                    <option value="Published">Published</option>
                                    <option value="Draft">Draft</option>
                                    <option value="Archived">Archived</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Table Area */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#f0f4f4] border-y border-gray-100">
                                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Views</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Created Date</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {filteredContents.length > 0 ? (
                                    filteredContents.map((content) => (
                                        <tr key={content.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <FileText className="w-4 h-4 text-gray-400" />
                                                    <div className="text-base font-medium text-gray-800">{content.title}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-base text-gray-600">
                                                <span className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded">
                                                    {content.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(content.status)}`}>
                                                    {content.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-base text-gray-600">
                                                {content.views}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-base text-gray-600">
                                                {content.createdDate}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <button className="text-gray-400 hover:text-gray-600 transition-colors" title="View">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button className="text-gray-400 hover:text-gray-600 transition-colors" title="Edit">
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button className="text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                            No content found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-sm text-[#0f766e]">
                            Showing {filteredContents.length} results
                        </span>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 text-sm font-medium text-[#0f766e] bg-white border border-[#0f766e] rounded-lg hover:bg-teal-50 transition-colors">
                                Previous
                            </button>
                            <button className="px-4 py-2 text-sm font-medium text-[#0f766e] bg-white border border-[#0f766e] rounded-lg hover:bg-teal-50 transition-colors">
                                Next
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Content;
