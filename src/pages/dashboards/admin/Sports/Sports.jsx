import React, { useMemo, useState, useRef, useEffect } from 'react';
import DashboardHeader from '../../../../components/ui/DashboardHeader';
import TablePagination from '../../../../components/ui/TablePagination';
import recruitments from '../../../../data/recruitments.json';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Sports = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [customSports, setCustomSports] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newSportName, setNewSportName] = useState('');

    // Arrow visibility control korar jonno state
    const [canScroll, setCanScroll] = useState(false);
    const scrollContainerRef = useRef(null);

    const staticSports = [
        'Football', 'Squash', 'Rugby', 'Netball', 'Cricket', 'Padel', 'Tennis'
    ];

    const allChips = useMemo(() => {
        return [...staticSports, ...customSports];
    }, [customSports]);

    // Check korbe chips gula ki screen size er theke boro kina
    const checkOverflow = () => {
        if (scrollContainerRef.current) {
            const { scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScroll(scrollWidth > clientWidth);
        }
    };

    useEffect(() => {
        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
    }, [allChips]);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 200;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const resultsPerPage = 8;
    const totalPages = Math.max(1, Math.ceil(recruitments.length / resultsPerPage));
    const pageData = recruitments.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage);

    const columns = ['Player name', 'Location', 'Contact Number', 'Sport', 'Level', 'Preferred Days', 'Preference'];

    const renderRow = (item) => (
        <>
            <td className="px-4 py-4 text-base text-gray-900 whitespace-nowrap">{item.postedBy || '—'}</td>
            <td className="px-4 py-4 text-base text-gray-600 whitespace-nowrap">{item.trialLocation || '—'}</td>
            <td className="px-4 py-4 text-base text-gray-600 whitespace-nowrap">{item.phone || '—'}</td>
            <td className="px-4 py-4 text-base text-gray-600 whitespace-nowrap">{item.sportType || '—'}</td>
            <td className="px-4 py-4 text-base text-gray-600 whitespace-nowrap">{item.skillLevel || '—'}</td>
            <td className="px-4 py-4 text-base text-gray-600 whitespace-nowrap">{item.trainingFrequency || '—'}</td>
            <td className="px-4 py-4 text-base text-gray-600 whitespace-nowrap">{item.sessionFormat || '—'}</td>
        </>
    );

    return (
        <div className="flex-1 overflow-auto dashboardPy dashboardSpaceY flex flex-col">
            <DashboardHeader title="Sport Name" subtitle="" />

            <div className="flex items-center gap-2 mb-4 px-2">
                {/* Arrow button shudhu thakbe jodi scroll korar jaiga na thake */}
                {canScroll && (
                    <button
                        onClick={() => scroll('left')}
                        className="p-1 rounded-full border border-gray-200 bg-white hover:bg-gray-50 shrink-0"
                    >
                        <ChevronLeft size={18} />
                    </button>
                )}

                <div
                    ref={scrollContainerRef}
                    className="flex flex-1 gap-2 overflow-x-auto no-scrollbar scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {allChips.map((s) => (
                        <button
                            key={s}
                            className="whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium bg-[#C1DCDC] text-[#064E3B]"
                        >
                            {s}
                        </button>
                    ))}
                </div>

                {canScroll && (
                    <button
                        onClick={() => scroll('right')}
                        className="p-1 rounded-full border border-gray-200 bg-white hover:bg-gray-50 shrink-0"
                    >
                        <ChevronRight size={18} />
                    </button>
                )}

                <button
                    onClick={() => setShowAddModal(true)}
                    className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full bg-[#0F766E] text-white shadow-sm"
                >
                    +
                </button>
            </div>

            {/* Table Area - Mobile friendly scrolling added */}
            <div className="flex-1">
                <div className="border border-gray-200 rounded-lg overflow-hidden flex flex-col bg-white">
                    <div className="overflow-x-auto">
                        <div className="bg-[#FFFFFF] px-4 py-3 border-b border-gray-200">
                            <div className="max-w-full">
                                <h3 className="text-2xl font-medium text-gray-900">Interested Player</h3>
                            </div>
                        </div>

                        {/* Table for large screens */}
                        <div className="hidden lg:block">
                            <table className="w-full">
                                <thead className="bg-[#DFDFDF]">
                                    <tr>
                                        {columns.map((col, idx) => (
                                            <th
                                                key={idx}
                                                className="text-left text-base text-[#000000] font-medium uppercase px-4 py-3 whitespace-nowrap"
                                            >
                                                {col}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody className="bg-white">
                                    {pageData.map((item, index) => (
                                        <tr key={item.id || index} className="border-b border-gray-100 text-sm text-tableText last:border-b-0">
                                            {renderRow(item)}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Cards for tablet and mobile: 2 columns on md (tablet), 1 column on smaller screens */}
                        <div className="block lg:hidden p-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {pageData.map((item, index) => (
                                    <div key={item.id || index} className="bg-white p-4 rounded-lg border border-gray-200">
                                        <div className="flex justify-between mb-2">
                                            <div>
                                                <div className="font-medium text-sm text-gray-900">{item.postedBy || '—'}</div>
                                                <div className="text-xs text-gray-500">{item.trialLocation || '—'}</div>
                                            </div>
                                            <div className="text-base text-gray-700">{item.sportType || '—'}</div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 text-base text-gray-600">
                                            <div>
                                                <div className="text-base text-gray-500">Contact</div>
                                                <div className="mt-1">{item.phone || '—'}</div>
                                            </div>
                                            <div>
                                                <div className="text-base text-gray-500">Level</div>
                                                <div className="mt-1">{item.skillLevel || '—'}</div>
                                            </div>
                                            <div>
                                                <div className="text-base text-gray-500">Preferred Days</div>
                                                <div className="mt-1">{item.trainingFrequency || '—'}</div>
                                            </div>
                                            <div>
                                                <div className="text-base text-gray-500">Preference</div>
                                                <div className="mt-1">{item.sessionFormat || '—'}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <TablePagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalResults={recruitments.length}
                        resultsPerPage={resultsPerPage}
                        onPageChange={(p) => setCurrentPage(Math.max(1, Math.min(totalPages, p)))}
                    />
                </div>
            </div>

            {/* Add Sport Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white rounded-xl w-full max-w-sm overflow-hidden shadow-2xl">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-800">Add New Sport</h3>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                        </div>
                        <div className="p-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Sport Name</label>
                            <input
                                className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-[#0F766E] focus:border-transparent outline-none transition-all"
                                value={newSportName}
                                onChange={(e) => setNewSportName(e.target.value)}
                                placeholder="e.g. Badminton"
                                autoFocus
                            />
                        </div>
                        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
                            <button 
                                onClick={() => setShowAddModal(false)} 
                                className="px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={() => {
                                    if (newSportName.trim()) {
                                        setCustomSports([...customSports, newSportName.trim()]);
                                        setNewSportName('');
                                        setShowAddModal(false);
                                    }
                                }}
                                className="px-6 py-2 text-base font-medium bg-[#0F766E] text-white rounded-lg hover:bg-[#0d635d] shadow-md transition-all"
                            >
                                Save Sport
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sports;