import React from 'react';
import { Eye, Star, Flag, CheckCircle2 } from 'lucide-react';

const ActionButtons = ({ status }) => {
    return (
        <div className="flex items-center gap-3">
            <button className="text-gray-400 hover:text-gray-600 transition-colors" title="View Details">
                <Eye className="w-4 h-4" />
            </button>
            <button className="transition-colors" title={status === 'Featured' ? "Unfeature" : "Feature"}>
                <Star className={`w-4 h-4 ${status === 'Featured' ? 'fill-amber-400 text-amber-400' : 'text-amber-500 hover:fill-amber-100'}`} />
            </button>
            <button className="transition-colors" title="Flag/Ban">
                <Flag className={`w-4 h-4 ${status === 'Banned' ? 'fill-red-500 text-red-500' : 'text-red-500 hover:fill-red-100'}`} />
            </button>
            {status === 'Pending' && (
                <button className="text-emerald-500 hover:text-emerald-600 transition-colors" title="Approve">
                    <CheckCircle2 className="w-4 h-4" />
                </button>
            )}
        </div>
    );
};

export default ActionButtons;
