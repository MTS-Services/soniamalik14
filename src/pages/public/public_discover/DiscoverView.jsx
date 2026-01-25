import React, { useState } from 'react';
import Container from '../../../components/layout/Container';
import PageHeader from '../../../components/ui/PageHeader';
import DiscoverCard from './components/DiscoverCard';
import Filters from './components/Filters';
import Pagination from './components/Pagination';

const sample = Array.from({ length: 9 }).map((_, i) => ({
      id: i + 1,
      title: ['Woking Warriors FC', 'Beginner Basics Boot Camp', 'Weekly 5-a-Side Session'][i % 3],
      type: ['Clubs', 'Training', 'Sessions'][i % 3],
      day: 'Monday, Wednesday',
      time: '19:00 - 21:00',
      location: '2972 Wetherden Rd, Santa Ana, Illinois 85486',
      summary: 'Login to see contact details & ability requirements',
      image: ['/player1.png', '/player2.png', '/player3.jpg'][i % 3],
}));

const DiscoverView = () => {
  const [filter, setFilter] = useState('All');
  const [page, setPage] = useState(1);

  const filtered = sample.filter((s) => filter === 'All' || s.type.toLowerCase() === filter.toLowerCase());

  return (
    <section className="py-6 md:py-8 lg:py-12">
      <Container>
        <div className="mb-6">
          <PageHeader
            title="Find Your Sport"
            description="Browse clubs, casual sessions, and expert services."
          />
        </div>

        <div className="mb-6">
          <Filters onFilter={(t) => setFilter(t)} active={filter} />
        </div>

        {filtered.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <DiscoverCard key={item.id} item={item} />
              ))}
            </div>

            <Pagination page={page} total={5} onChange={(p) => setPage(p)} />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="text-center">
              <svg className="w-20 h-20 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-[#282828] mb-2">No Sports Found</h3>
              <p className="text-[#363636] text-sm mb-4">
                We couldn't find any {filter !== 'All' ? filter.toLowerCase() : 'sports'} matching your search.
              </p>
              <button 
                onClick={() => setFilter('All')}
                className="text-btn-primary hover:text-[#0d655d] font-medium text-sm"
              >
                Clear filters
              </button>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default DiscoverView;