import React, { useState, useEffect } from 'react';
import PageHeader from '../../../../components/ui/PageHeader';
import CoachFilter from '../components/CoachFilter';
import EventCard from '../../../../components/ui/EventCard';
import Pagination from '../../../../components/ui/Pagination';

const CoachEvent = () => {
    const events = [
        {
            id: 1,
            image: 'https://i.ibb.co/bjNWBQ7y/Frame-2147226117.png',
            title: "Women's Football Friendly Match Day",
            date: '4 Dec 2025',
            location: '1901 Thornridge Cir. Shiloh',
            status: 'Approved',
        },
        {
            id: 2,
            image: 'https://i.ibb.co/bjNWBQ7y/Frame-2147226117.png',
            title: "Junior Training Session",
            date: '10 Jan 2026',
            location: 'Community Sports Ground',
            status: 'Pending',
        },
        {
            id: 3,
            image: 'https://i.ibb.co.com/bjNWBQ7y/Frame-2147226117.png',
            title: "Open Trial Morning",
            date: '21 Oct 2025',
            location: 'Northside Stadium',
            status: 'Approved',
        },
        {
            id: 4,
            image: 'https://i.ibb.co.com/bjNWBQ7y/Frame-2147226117.png',
            title: "Community Coaching Clinic",
            date: '15 Nov 2025',
            location: 'Green Park',
            status: 'Pending',
        },
        {
            id: 5,
            image: 'https://i.ibb.co.com/bjNWBQ7y/Frame-2147226117.png',
            title: "Weekend Match Series",
            date: '2 Feb 2026',
            location: 'Eastfield Arena',
            status: 'Approved',
        },
        {
            id: 6,
            image: 'https://i.ibb.co.com/bjNWBQ7y/Frame-2147226117.png',
            title: "Skills & Drills Camp",
            date: '12 Mar 2026',
            location: 'Riverside Pitch',
            status: 'Pending',
        },
        {
            id: 7,
            image: 'https://i.ibb.co.com/bjNWBQ7y/Frame-2147226117.png',
            title: "Skills & Drills Camp",
            date: '12 Mar 2026',
            location: 'Riverside Pitch',
            status: 'Pending',
        },
        {
            id: 8,
            image: 'https://i.ibb.co.com/bjNWBQ7y/Frame-2147226117.png',
            title: "Skills & Drills Camp",
            date: '12 Mar 2026',
            location: 'Riverside Pitch',
            status: 'Pending',
        },
        {
            id: 9,
            image: 'https://i.ibb.co.com/bjNWBQ7y/Frame-2147226117.png',
            title: "Skills & Drills Camp",
            date: '12 Mar 2026',
            location: 'Riverside Pitch',
            status: 'Pending',
        },
        {
            id: 10,
            image: 'https://i.ibb.co.com/bjNWBQ7y/Frame-2147226117.png',
            title: "Skills & Drills Camp",
            date: '12 Mar 2026',
            location: 'Riverside Pitch',
            status: 'Pending',
        },
    ];

    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState({ status: 'All', query: '' });
    const perPage = 9;

    const handleEdit = (item) => {
        console.log('Edit', item);
        
    };

    const handleDelete = (item) => {
        console.log('Delete', item);
        
    };

    const applyFilters = (list) => {
        const q = (filter.query || '').trim().toLowerCase();
        return list.filter((ev) => {
            const matchesStatus = filter.status === 'All' || ev.status === filter.status;
            const matchesQuery = !q || (ev.title && ev.title.toLowerCase().includes(q)) || (ev.location && ev.location.toLowerCase().includes(q));
            return matchesStatus && matchesQuery;
        });
    };

    const filtered = applyFilters(events);
    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const paged = filtered.slice((page - 1) * perPage, page * perPage);

    useEffect(() => {
        // reset to first page when filter changes
        setPage(1);
    }, [filter]);

    return (
        <div className="dashboardPy dashboardSpaceY">
            <div className='mb-6'>
                <PageHeader title="Coach Events" description="Host matches, training sessions, trials, and community events for your club." ctaText="Create Event" />
            </div>

            <div>
                <CoachFilter onFilter={(f) => setFilter(f)} />
            </div>

            <div className="pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  gap-6 xl:grid-cols-3">
                    {paged.map((e) => (
                        <EventCard
                            key={e.id}
                            item={e}
                            onEdit={() => handleEdit(e)}
                            onDelete={() => handleDelete(e)}

                        />
                    ))}
                </div>
                <Pagination page={page} total={totalPages} onChange={(p) => setPage(p)} />
            </div>

        </div>
    );
};

export default CoachEvent;