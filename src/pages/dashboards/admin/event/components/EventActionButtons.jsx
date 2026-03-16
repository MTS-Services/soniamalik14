import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Star, Flag, CheckCircle2 } from 'lucide-react';
import EventBanModal from './EventBanModal';

const EventActionButtons = ({ status, rowId }) => {
    const navigate = useNavigate();
    const [isBanModalOpen, setIsBanModalOpen] = useState(false);

    const handleViewDetails = () => {
        navigate(`/admin/event/${rowId}`);
    };

    const handleBanSubmit = (reason) => {
        console.log(`Event ${rowId} banned with reason:`, reason);
        setIsBanModalOpen(false);
    };

    return (
        <>
            <div className="flex items-center gap-3">
                <button
                    onClick={handleViewDetails}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    title="View"
                >
                    <Eye className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <button className="transition-colors" title="Feature">
                    <Star className={`w-4 h-4 md:w-5 md:h-5 ${status === 'Featured' ? 'fill-amber-400 text-amber-400' : 'text-amber-500 hover:fill-amber-100'}`} />
                </button>
                <button
                    onClick={() => setIsBanModalOpen(true)}
                    className="transition-colors"
                    title="Ban"
                >
                    <Flag className={`w-4 h-4 md:w-5 md:h-5 ${status === 'Banned' ? 'fill-red-500 text-red-500' : 'text-red-500 hover:fill-red-100'}`} />
                </button>
                {status === 'Pending' && (
                    <button className="text-emerald-500 hover:text-emerald-600 transition-colors" title="Approve">
                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                )}
            </div>

            <EventBanModal
                isOpen={isBanModalOpen}
                onClose={() => setIsBanModalOpen(false)}
                onSubmit={handleBanSubmit}
            />
        </>
    );
};

export default EventActionButtons;
