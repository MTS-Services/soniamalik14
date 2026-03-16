import React from 'react';

const StatusBadge = ({ status }) => {
    const badgeStyles = {
        'Featured': 'px-3 py-1 text-xs font-medium text-amber-700 bg-amber-100 rounded-full',
        'Pending': 'px-3 py-1 text-xs font-medium text-orange-600 bg-orange-100 rounded-full',
        'Live': 'px-3 py-1 text-xs font-medium text-teal-700 bg-teal-100 rounded-full',
        'Banned': 'px-3 py-1 text-xs font-medium text-red-600 bg-red-100 rounded-full'
    };

    return (
        <span className={badgeStyles[status] || ''}>
            {status}
        </span>
    );
};

export default StatusBadge;
