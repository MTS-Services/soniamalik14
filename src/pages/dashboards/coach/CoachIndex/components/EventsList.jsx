import React from 'react';
import Button from '../../../../../components/ui/Button';

const EventsList = ({ onCreateEvent }) => {
    return (
        <div className= "p-2 md:p-2">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Your Events</h3>
                <button onClick={onCreateEvent} className="text-btn-primary font-medium">+ Create Event</button>
            </div>

            <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex flex-col lg:flex-row items-start lg:items-center justify-between bg-white border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="text-center bg-gray-50 rounded-lg w-14 h-14 flex flex-col items-center justify-center">
                                <div className="text-base text-[#676767]">OCT</div>
                                <div className="font-semibold !text-[#0F766E]">21</div>
                            </div>
                            <div>
                                <h4 className="font-medium">Open Trial Morning</h4>
                                <p className={`text-base mt-1 ${i < 2 ? 'text-[#0F766E]' : 'text-[#FF7700]'}`}>
                                    {i < 2 ? 'Approved' : 'Pending'}
                                </p>
                            </div>
                        </div>

                        <div className="w-full lg:w-auto mt-3 lg:mt-0">
                            <Button variant="outline" className="w-full lg:w-auto !bg-[#0F766E] !text-white rounded-lg px-2 md:px-4 py-2">See Details</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventsList;
