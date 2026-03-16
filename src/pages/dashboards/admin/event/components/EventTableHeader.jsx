import React from 'react';

const EventTableHeader = () => {
    const headers = [
        'Event Name',
        'Provider',
        'Sport',
        'Postcode',
        'Status',
        'Engagement',
        'Actions'
    ];

    return (
        <thead>
            <tr className="bg-[#f0f4f4] border-y border-gray-100">
                {headers.map((header) => (
                    <th key={header} className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                        {header}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default EventTableHeader;
