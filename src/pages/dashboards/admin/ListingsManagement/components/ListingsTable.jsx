import React from 'react';
import { Eye, Heart, MessageCircle, Flag, Share } from 'lucide-react';

const ListingsTable = ({ data, activeTab }) => {
    const getStatusColor = (status) => {
        const statusColors = {
            'Featured': 'bg-yellow-50 text-yellow-700',
            'Pending': 'bg-orange-50 text-orange-700',
            'Live': 'bg-green-50 text-green-700',
            'Banned': 'bg-red-50 text-red-700',
        };
        return statusColors[status] || 'bg-gray-50 text-gray-700';
    };

    return (
        <div className="overflow-x-auto rounded-lg border border-gray-100">
            <table className="w-full whitespace-nowrap">
                <thead className="bg-[#f2f8f7]">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Listing</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Provider</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Category</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Postcode</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Engagement</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                    {data.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4 text-sm text-gray-800">
                                <div>
                                    <p className="font-medium">{row.listing}</p>
                                    <p className="text-xs text-gray-500">{row.date}</p>
                                </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-600 break-all w-40">{row.provider}</td>
                            <td className="px-4 py-4 text-sm text-gray-600">{row.category}</td>
                            <td className="px-4 py-4 text-sm text-gray-600">{row.postcode}</td>
                            <td className="px-4 py-4 text-sm">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(row.status)}`}>
                                    {row.status}
                                </span>
                            </td>
                            <td className="px-4 py-4 text-sm">
                                <div className="flex gap-2">
                                    <span className="flex items-center gap-1 text-gray-600">
                                        <Eye className="w-4 h-4" />
                                        {row.engagement.views}
                                    </span>
                                    <span className="flex items-center gap-1 text-gray-600">
                                        <Heart className="w-4 h-4" />
                                        {row.engagement.saves}
                                    </span>
                                    <span className="flex items-center gap-1 text-gray-600">
                                        <MessageCircle className="w-4 h-4" />
                                        {row.engagement.messages}
                                    </span>
                                    <span className="flex items-center gap-1 text-gray-600">
                                        <Share className="w-4 h-4" />
                                        {row.engagement.shares}
                                    </span>
                                </div>
                            </td>
                            <td className="px-4 py-4 text-sm flex gap-2">
                                <button className="text-gray-400 hover:text-gray-600 transition">
                                    <Eye className="w-5 h-5" />
                                </button>
                                <button className="text-gray-400 hover:text-red-500 transition">
                                    <Heart className="w-5 h-5" />
                                </button>
                                <button className="text-gray-400 hover:text-blue-500 transition">
                                    <Flag className="w-5 h-5" />
                                </button>
                                <button className="text-gray-400 hover:text-red-600 transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListingsTable;
