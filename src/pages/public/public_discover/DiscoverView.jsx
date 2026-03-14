

import React, { useState } from 'react';
import Container from '../../../components/layout/Container';
import PageHeader from '../../../components/ui/PageHeader';
import DiscoverCard from './components/DiscoverCard';
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
      about: 'Woking Warriors FC is a women-focused football club committed to developing talent, teamwork, and confidence. We provide a supportive environment for players to grow both on and off the field.',
      homeGround: 'Woking Community Football Stadium',
      level: 'Beginner to Intermediate',
      ageGroup: '16+ Years',
      experienceRequired: 'Basic football knowledge preferred (not mandatory)',
      trainingFrequency: '2 days per week',
      matchSchedule: 'Weekend matches & friendly games',
      seasonDuration: '6 months',
      headCoach: 'Sarah Williams',
      coachingStyle: 'Fitness-focused, tactical & player-friendly',
      trialRequired: 'Yes',
      trialDate: '15 September 2025',
      trialTime: '6:30 PM',
      trialLocation: 'Woking Community Football Stadium',
      postedBy: 'Woking Warriors FC (Club Owner)',
      contactEmail: 'info@wokingwarriorsfc.com',
      phone: '+1 234 567 890',
}));

const DiscoverView = () => {
  const [filter, setFilter] = useState('All');
  const [page, setPage] = useState(1);

  const filtered = sample.filter((s) => filter === 'All' || s.type.toLowerCase() === filter.toLowerCase());

  return (
    <section className="py-6 lg:py-8">
      <Container>
        <div className="mb-8">
          <PageHeader title="Find your sport" />
          
          {/* New Filter Section Added Here */}
          <div className="mt-4 bg-[#F0F5F4] p-2.5 rounded-lg inline-flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            
            {/* Select Sports Dropdown */}
            <div className="relative w-full sm:w-[180px]">
              <select className="appearance-none w-full bg-white border-none text-gray-700 text-sm rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer shadow-sm">
                <option value="">Select sports</option>
                <option value="football">Football</option>
                <option value="tennis">Tennis</option>
                <option value="basketball">Basketball</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-800">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Postcode/City Input */}
            <input
              type="text"
              placeholder="Enter Postcode/City"
              className="w-full sm:w-[220px] bg-white border-none text-gray-700 text-sm rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-teal-500 shadow-sm placeholder-gray-400"
            />

            {/* Distance Dropdown */}
            <div className="relative w-full sm:w-[140px]">
              <select className="appearance-none w-full bg-white border-none text-gray-700 text-sm rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer shadow-sm">
                <option value="">Distance</option>
                <option value="5">5 Miles</option>
                <option value="10">10 Miles</option>
                <option value="20">20 Miles</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-800">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
          </div>
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
              <p className="text-[#363636] text-base mb-4">
                We couldn't find any {filter !== 'All' ? filter.toLowerCase() : 'sports'} matching your search.
              </p>
              <button 
                onClick={() => setFilter('All')}
                className="text-btn-primary hover:text-[#0d655d] font-medium text-base"
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