import React, { useMemo, useState } from 'react';
import { ChevronRight, X } from 'lucide-react';
import TablePagination from '../../../../components/ui/TablePagination';
import eventAnalyticsDetailsData from '../../../../data/eventAnalyticsDetailsData.json';

const DataTable = ({
    title,
    columns,
    rows,
    rowsPerPage = 6,
    renderRow,
    renderMobileCard,
}) => {
    const [page, setPage] = useState(1);

    const totalResults = rows.length;
    const totalPages = Math.max(1, Math.ceil(totalResults / rowsPerPage));
    const safePage = Math.min(page, totalPages);
    const startIndex = (safePage - 1) * rowsPerPage;
    const currentRows = rows.slice(startIndex, startIndex + rowsPerPage);

    const handlePageChange = (nextPage) => {
        if (nextPage < 1 || nextPage > totalPages) return;
        setPage(nextPage);
    };

    return (
        <div className="overflow-hidden rounded-lg bg-white">
            <div className="border-b border-[#f1f1f1] px-5 py-4">
                <h3 className="text-[32px] font-semibold leading-10 text-[#252525] md:text-[38px]">{title}</h3>
            </div>

            <div className="overflow-x-auto hidden md:block">
                <table className="w-full" style={{ minWidth: '980px' }}>
                    <thead>
                        <tr className="bg-[#E7F1F1]">
                            {columns.map((col) => (
                                <th key={col} className="px-5 py-3 text-left text-[16px] font-normal text-[#0C0C0C]">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((row, idx) => (
                            <tr key={`${title}-${startIndex + idx}`} className="border-t border-[#efefef]">
                                {renderRow ? renderRow(row, startIndex + idx) : null}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="space-y-3  md:hidden">
                {currentRows.map((row, idx) => (
                    <div key={`${title}-mobile-${startIndex + idx}`} className="rounded-xl border border-[#e5e7eb] bg-[#fbfbfb] p-4">
                        {renderMobileCard ? renderMobileCard(row, startIndex + idx) : null}
                    </div>
                ))}
            </div>

            <TablePagination
                currentPage={safePage}
                totalPages={totalPages}
                totalResults={totalResults}
                resultsPerPage={rowsPerPage}
                onPageChange={handlePageChange}
                wrapperClass="px-5 py-4"
                resultsTextClass="text-[12px] text-[#0F766E]"
                buttonClass="text-[12px]"
            />
        </div>
    );
};

const Enquiries = () => {
    const [selectedApplicant, setSelectedApplicant] = useState(null);

    const registerInterestRows = (eventAnalyticsDetailsData.registerInterest || []).map((row) => [
        row.name,
        row.phoneNumber,
        row.email,
    ]);

    const enquiriesRows = useMemo(
        () =>
            (eventAnalyticsDetailsData.enquiries || []).map((row) => ({
                playerName: row.playerName,
                phoneNumber: row.phoneNumber,
                eventListingName: row.eventListingName || 'U16 Goalkeeper Wanted',
                message: row.message,
                date: row.date,
                email: row.email,
                details: row.details || row.message,
            })),
        []
    );

    return (
        <div className="dashboardPy bg-[#F4F6F8] text-gray-800">
            <div className="mx-auto w-full space-y-6 rounded-lg bg-white p-5" >
                <DataTable
                    title="Enquaries"
                    columns={['Player Name', 'Phone Number', 'Event/Listing Name', 'Message', 'Date', 'ACTIONS']}
                    rows={enquiriesRows}
                    renderRow={(row) => (
                        <>
                            <td className="px-5 py-6 text-[16px] font-medium leading-6 text-[#373737]">{row.playerName}</td>
                            <td className="px-5 py-6 text-[16px] text-[#373737]">{row.phoneNumber}</td>
                            <td className="px-5 py-6 text-[16px] leading-6 text-[#373737]">{row.eventListingName}</td>
                            <td className="px-5 py-6 text-[16px] leading-5 text-[#373737]">
                                <p className="line-clamp-4" style={{ maxWidth: '220px' }}>{row.message}</p>
                            </td>
                            <td className="px-5 py-6 text-[16px] text-[#373737]">{row.date}</td>
                            <td className="px-5 py-6 text-right">
                                <button
                                    type="button"
                                    onClick={() => setSelectedApplicant(row)}
                                    className="inline-flex items-center justify-center text-[#121111]"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </td>
                        </>
                    )}
                    renderMobileCard={(row) => (
                        <div className="space-y-2 text-[14px] text-[#373737]">
                            <div>
                                <p className="text-[12px] font-semibold uppercase tracking-wide text-[#6b7280]">Player Name</p>
                                <p className="text-[16px] font-semibold">{row.playerName}</p>
                            </div>
                            <div>
                                <p className="text-[12px] font-semibold uppercase tracking-wide text-[#6b7280]">Phone Number</p>
                                <p>{row.phoneNumber}</p>
                            </div>
                            <div>
                                <p className="text-[12px] font-semibold uppercase tracking-wide text-[#6b7280]">Event/Listing Name</p>
                                <p>{row.eventListingName}</p>
                            </div>
                            <div>
                                <p className="text-[12px] font-semibold uppercase tracking-wide text-[#6b7280]">Message</p>
                                <p className="line-clamp-4 leading-5">{row.message}</p>
                            </div>
                            <div className="flex items-center justify-between pt-1">
                                <div>
                                    <p className="text-[12px] font-semibold uppercase tracking-wide text-[#6b7280]">Date</p>
                                    <p>{row.date}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSelectedApplicant(row)}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d1d5db] text-[#121111]"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    )}
                />

                <DataTable
                    title="Register Interest"
                    columns={['Name', 'Phone Number', 'Email']}
                    rows={registerInterestRows}
                    renderRow={(row) => (
                        <>
                            <td className="px-5 py-6 text-[16px] font-medium leading-6 text-[#373737]">{row[0]}</td>
                            <td className="px-5 py-6 text-[16px] text-[#373737]">{row[1]}</td>
                            <td className="px-5 py-6 text-[16px] leading-5 text-[#373737] break-all">{row[2]}</td>
                        </>
                    )}
                    renderMobileCard={(row) => (
                        <div className="space-y-2 text-[14px] text-[#373737]">
                            <div>
                                <p className="text-[12px] font-semibold uppercase tracking-wide text-[#6b7280]">Name</p>
                                <p className="text-[16px] font-semibold">{row[0]}</p>
                            </div>
                            <div>
                                <p className="text-[12px] font-semibold uppercase tracking-wide text-[#6b7280]">Phone Number</p>
                                <p>{row[1]}</p>
                            </div>
                            <div>
                                <p className="text-[12px] font-semibold uppercase tracking-wide text-[#6b7280]">Email</p>
                                <p className="break-all">{row[2]}</p>
                            </div>
                        </div>
                    )}
                />
            </div>

            {selectedApplicant && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4">
                    <div className="relative w-full rounded-xl bg-white p-5 shadow-xl" style={{ maxWidth: '620px' }}>
                        <button
                            type="button"
                            onClick={() => setSelectedApplicant(null)}
                            className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#E7E7E7] text-[#4B5563]"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        <h4 className="text-[28px] font-semibold text-[#1F1F1F]">Applicant Details</h4>

                        <div className="mt-4 space-y-1 text-[14px] text-[#121111]">
                            <p className="font-semibold">{selectedApplicant.playerName}</p>
                            <p className="font-medium">{selectedApplicant.phoneNumber}</p>
                            <p className="font-medium break-all">{selectedApplicant.email}</p>
                            <p className="font-semibold">Event Name: {selectedApplicant.eventListingName}</p>
                        </div>

                        <p className="mt-4 whitespace-pre-line text-[14px] leading-6 text-[#373737]">
                            {selectedApplicant.details}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Enquiries;