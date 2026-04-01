import React from 'react';
import { Plus } from 'lucide-react';

const ListingHeader = ({ onAddClick }) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h1 className="text-2xl font-bold text-gray-800">Manage your Listings</h1>
            <button
                onClick={onAddClick}
                className="flex items-center gap-2 bg-[#007A70] text-white px-4 py-2 rounded-lg hover:bg-[#00665e] transition-colors font-medium"
            >
                <Plus size={18} />
                Add New Listing
            </button>
        </div>
    );
};

export default ListingHeader;
