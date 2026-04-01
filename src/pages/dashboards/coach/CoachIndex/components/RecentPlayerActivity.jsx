import React, { useState } from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { X } from 'lucide-react';

const RecentPlayerActivity = ({ players }) => {
    const [selected, setSelected] = useState(null);

    const openModal = (player) => setSelected(player);
    const closeModal = () => setSelected(null);

    return (
        <div className="">

            {/* Header Section */}
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Recent Player Activity</h1>
            </div>

            {/* Main Content Area */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                {/* Table Area */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#E7F1F1] border-b border-gray-100">
                                <th className="px-6 py-4 text-base font-semibold text-black whitespace-nowrap">Player Name</th>
                                <th className="px-6 py-4 text-base font-semibold text-black whitespace-nowrap">Phone number</th>
                                <th className="px-6 py-4 text-base font-semibold text-black whitespace-nowrap">Email</th>
                                <th className="px-6 py-4 text-base font-semibold text-black whitespace-nowrap">Message</th>
                                <th className="px-6 py-4 text-base font-semibold text-black whitespace-nowrap">Date</th>
                                <th className="px-6 py-4 text-base font-semibold text-black whitespace-nowrap">ACTIONS</th>

                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                            {players.map((player, idx) => (
                                <tr key={idx} className="group hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-6 text-sm text-[#374151] font-medium">{player.name}</td>
                                    <td className="px-6 py-6 text-sm text-[#374151] whitespace-nowrap">{player.phone}</td>
                                    <td className="px-6 py-6 text-sm text-[#374151] max-w-[150px] break-words leading-relaxed">{player.email}</td>
                                    <td className="px-6 py-6 text-sm text-[#4B5563] max-w-[300px] leading-relaxed">
                                        {player.message}
                                    </td>
                                    <td className="px-6 py-6 text-sm text-[#374151] whitespace-nowrap">{player.date}</td>
                                    <td className="px-6 py-6 text-sm">
                                        <button onClick={() => openModal(player)} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white hover:shadow-sm transition-all">
                                            <IoChevronForwardOutline className="text-2xl text-black" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
                    <span className="text-sm font-medium text-[#0f766e]">
                        Showing 1 to {players.length} of {players.length} results
                    </span>
                    <div className="flex gap-2">
                        <button className="px-5 py-2 text-sm font-medium text-[#0f766e] bg-white border border-[#0f766e] rounded-lg hover:bg-teal-50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/20">
                            Previous
                        </button>
                        <button className="px-5 py-2 text-sm font-medium text-[#0f766e] bg-white border border-[#0f766e] rounded-lg hover:bg-teal-50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/20">
                            Next
                        </button>
                    </div>
                </div>

                {/* Applicant Modal */}
                {selected && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                        onMouseDown={(e) => { if (e.target === e.currentTarget) closeModal(); }}
                    >
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 sm:mx-6">
                            <div className="flex items-start justify-between p-4 border-b border-gray-100">
                                <div>
                                    <h3 className="text-lg font-semibold">Applicant Details</h3>
                                </div>
                                <button onClick={closeModal} className="text-gray-600 bg-gray-100 rounded-full p-1">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                                <div className="text-sm">
                                    <div className="font-medium">{selected.name}</div>
                                    <div className="text-gray-600 mt-1">{selected.phone}</div>
                                    <div className="text-gray-600 mt-1">{selected.email}</div>
                                </div>

                                {selected.eventName && (
                                    <div className="text-sm">
                                        <div className="font-medium">Event Name:</div>
                                        <div className="text-gray-700">{selected.eventName}</div>
                                    </div>
                                )}

                                <div>
                                    <p className="text-sm text-gray-700 leading-relaxed">{selected.message}</p>
                                </div>
                            </div>

                            <div className="p-4 border-t border-gray-100 flex justify-end gap-3">
                                <button onClick={closeModal} className="px-4 py-2 rounded-md bg-[#F3FBF9] text-[#0f766e] font-medium">Close</button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default RecentPlayerActivity;
