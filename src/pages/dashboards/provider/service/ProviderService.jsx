import React, { useState } from 'react';
import PageHeader from '../../../../components/ui/PageHeader';
import ServiceModal from '../../../../components/ui/ServiceModal';
import ServiceCard from '../../../../components/ui/ServiceCard';

const ProviderService = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dummy = [
        { id: 1, tag: 'Well being', title: 'Prioritize Your Mind, Transform Your Life', location: 'Dhaka', days: '10 Mar 2026', time: '4:00 PM – 6:00 PM', image: 'https://i.ibb.co.com/gFM5hXZb/Rectangle-2324.png' },
        { id: 2, tag: 'Physios', title: 'Empowering Women Through Cricket', location: 'Chittagong', days: '12 Mar 2026', time: '5:00 PM – 7:00 PM', image: 'https://i.ibb.co.com/gFM5hXZb/Rectangle-2324.png' },
        { id: 3, tag: 'Nutrition', title: 'Fuel Your Body, Elevate Your Life', location: 'Sylhet', days: '15 Mar 2026', time: '6:00 PM – 8:00 PM', image: 'https://i.ibb.co.com/gFM5hXZb/Rectangle-2324.png' },
        { id: 4, tag: 'Coaching', title: 'Serving Confidence, Building Champions', location: 'Dhaka', days: '18 Mar 2026', time: '3:00 PM – 5:00 PM', image: 'https://i.ibb.co.com/gFM5hXZb/Rectangle-2324.png' },
    ];

    const handleEdit = () => {
        // open modal in edit mode (not implemented in ServiceModal yet)
        setIsModalOpen(true);
    };

    const handleDelete = (item) => {
        // placeholder delete action
        console.log('delete', item);
    };

    return (
        <div className='dashboardPy dashboardSpaceY'>
            <PageHeader
                title="Manage Your Services"
                description="This is where you manage all the services you provide to the women’s sports community."
                ctaText="Create Service"
                onCtaClick={() => setIsModalOpen(true)}
            />

            <div className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3  gap-6 2xl:grid-cols-4">
                    {dummy.map((s) => (
                        <ServiceCard key={s.id} item={s} onEdit={handleEdit} onDelete={handleDelete} />
                    ))}
                </div>
            </div>

            <ServiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default ProviderService;