import React, { useState } from 'react'
import RecruitmentCard from './RecruitmentCard';
import PageHeader from '../../../../components/ui/PageHeader';
import Pagination from '../../../../components/ui/Pagination';

const makeSample = (count = 15) => {
    const tags = ['CLUB', 'Training', 'Sessions', 'TRIAL'];
    const titles = [
        'Woking Warriors FC',
        'Beginner Basics Boot Camp',
        'Weekly 5-a-Side Session',
        'City Strikers Trials',
        'Elite Goalkeeper Clinic',
        'Women Veteran Outreach',
        'Speed & Agility Workshop',
        'Summer Development Camp'
    ];

    return Array.from({ length: count }).map((_, i) => ({
        id: i + 1,
        tag: tags[i % tags.length],
        title: titles[i % titles.length] + (i >= titles.length ? ` ${i + 1}` : ''),
        location: '2972 Westheimer Rd. Santa Ana, Illinois 85486',
        days: i % 2 === 0 ? 'Monday, Wednesday' : 'Tuesday, Thursday',
        time: i % 3 === 0 ? '18:00 - 20:00' : '19:00 - 21:00'
    }));
}

const Recruitment = () => {
    const [items, setItems] = useState(() => makeSample(15));
    const [page, setPage] = useState(1);
    const perPage = 9;

    const handleEdit = (it) => {
        // placeholder: open edit modal or navigate to edit page
        console.log('edit', it.id);
    };

    const handleDelete = (it) => {
        setItems((s) => s.filter((x) => x.id !== it.id));
        const totalAfter = items.length - 1;
        const totalPagesAfter = Math.max(1, Math.ceil(totalAfter / perPage));
        if (page > totalPagesAfter) setPage(totalPagesAfter);
    };

    const totalPages = Math.max(1, Math.ceil(items.length / perPage));

    return (
        <div className="dashboardPy">
            <div className='mb-6'>
                <PageHeader title="Create a Recruitment" ctaText="Create New Recruitment" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                {items.slice((page - 1) * perPage, page * perPage).map((it) => (
                    <RecruitmentCard key={it.id} item={it} onEdit={handleEdit} onDelete={handleDelete} />
                ))}
            </div>

            <Pagination page={page} total={totalPages} onChange={(p) => setPage(p)} />
        </div>
    )
}

export default Recruitment
