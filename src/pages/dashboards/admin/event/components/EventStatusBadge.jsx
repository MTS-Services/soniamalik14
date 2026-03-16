import React from 'react';

const EventStatusBadge = ({ status }) => {
    switch (status) {
        case 'Featured':
            return <span className="px-3 py-1 text-sm font-medium text-amber-700 bg-amber-100 rounded-full">Featured</span>;
        case 'Pending':
            return <span className="px-3 py-1 text-sm font-medium text-orange-600 bg-orange-100 rounded-full">Pending</span>;
        case 'Live':
            return <span className="px-3 py-1 text-sm font-medium text-teal-700 bg-teal-100 rounded-full">Live</span>;
        case 'Banned':
            return <span className="px-3 py-1 text-sm font-medium text-red-600 bg-red-100 rounded-full">Banned</span>;
        case 'Past':
            return <span className="px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-full">Past</span>;
        default:
            return null;
    }
};

export default EventStatusBadge;
