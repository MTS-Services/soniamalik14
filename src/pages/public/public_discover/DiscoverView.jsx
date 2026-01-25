import React, { useState } from 'react';
import Container from '../../../components/layout/Container';
import PageHeader from '../../../components/ui/PageHeader';
import DiscoverCard from './components/DiscoverCard';
import Filters from './components/Filters';
import Pagination from './components/Pagination';

const sample = Array.from({ length: 9 }).map((_, i) => ({
      id: i + 1,
      title: ['Woking Warriors FC', 'Beginner Basics Boot Camp', 'Weekly 5-a-Side Session'][i % 3],
      type: ['Club', 'Training', 'Sessions'][i % 3],
      day: 'Monday, Wednesday',
      time: '19:00 - 21:00',
      location: '2972 Wetherden Rd, Santa Ana, Illinois 85486',
      summary: 'Login to see contact details & ability requirements',
      image: ['/player1.png', '/player2.png', '/player3.png'][i % 3],
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <DiscoverCard key={item.id} item={item} />
          ))}
        </div>

        <Pagination page={page} total={5} onChange={(p) => setPage(p)} />
      </Container>
    </section>
  );
};

export default DiscoverView;