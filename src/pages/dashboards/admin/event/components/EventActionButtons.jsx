import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Star, Flag, CheckCircle2 } from 'lucide-react';
import EventBanModal from './EventBanModal';
import EventConfirmModal from './EventConfirmModal';
import { useDispatch, useSelector } from 'react-redux';
import { approveAdminEvent, rejectAdminEvent } from '../../../../../features/events/eventsAPI';
import { selectAdminEventsLoading } from '../../../../../features/events/eventsSlice';

const EventActionButtons = ({ status, rowId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isBanModalOpen, setIsBanModalOpen] = useState(false);
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const loadingAction = useSelector(selectAdminEventsLoading);

    const handleViewDetails = () => {
        navigate(`/admin/event/${rowId}`);
    };

    const handleApprove = async () => {
        try {
            await dispatch(approveAdminEvent(rowId)).unwrap();
            setIsApproveModalOpen(false);
        } catch {
            // Toast is handled in thunk; keep modal open so user can retry.
        }
    };

    const handleBanSubmit = (reason) => {
        dispatch(rejectAdminEvent({ eventId: rowId, reason }));
    };

    return (
        <>
            <div className="flex items-center gap-3">
                <button
                    onClick={handleViewDetails}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    title="View"
                    disabled={!!loadingAction}
                >
                    <Eye className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <button className="transition-colors" title="Feature" disabled={!!loadingAction}>
                    <Star className={`w-4 h-4 md:w-5 md:h-5 ${status === 'Featured' ? 'fill-amber-400 text-amber-400' : 'text-amber-500 hover:fill-amber-100'}`} />
                </button>
                <button
                    onClick={() => setIsBanModalOpen(true)}
                    className="transition-colors"
                    title="Ban"
                    disabled={!!loadingAction}
                >
                    <Flag className={`w-4 h-4 md:w-5 md:h-5 ${status === 'Banned' ? 'fill-red-500 text-red-500' : 'text-red-500 hover:fill-red-100'}`} />
                </button>
                {status === 'Pending' && (
                    <button
                        onClick={() => setIsApproveModalOpen(true)}
                        className="text-emerald-500 hover:text-emerald-600 transition-colors disabled:opacity-50"
                        title="Approve"
                        disabled={!!loadingAction}
                    >
                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                )}
            </div>

            <EventBanModal
                isOpen={isBanModalOpen}
                onClose={() => setIsBanModalOpen(false)}
                onSubmit={handleBanSubmit}
            />

            <EventConfirmModal
                isOpen={isApproveModalOpen}
                onClose={() => setIsApproveModalOpen(false)}
                onConfirm={handleApprove}
                isLoading={!!loadingAction}
                title="Approve Event"
                message="Are you sure you want to approve this event?"
                confirmText="Approve"
            />
        </>
    );
};

export default EventActionButtons;
