import React, { useState } from 'react';
import CategorySidebar from './components/CategorySidebar';
import ForumTopicCard from './components/ForumTopicCard';
import Button from '../../../components/ui/Button';
import Pagination from '../../../components/ui/Pagination';
import Container from '../../../components/layout/Container';
import SectionHeader from '../../../components/ui/SectionHeader';

const CommunityView = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All Discussion');
  const [currentPage, setCurrentPage] = useState(1);

  // Sample forum topics data
  const topics = [
    {
      id: 1,
      author: 'Rējní Edwards',
      title: 'Training Tips & Daily Practice',
      description: 'Discuss drills, fitness routines, and match-day preparation.',
      replies: 4,
      avatar: '/images/avatars/user1.jpg'
    },
    {
      id: 2,
      author: 'Rējní Edwards',
      title: 'Match Experience & Learnings',
      description: 'Share match stories, key moments, and lessons learned on the field.',
      replies: 4,
      avatar: '/images/avatars/user2.jpg'
    },
    {
      id: 3,
      author: 'Rējní Edwards',
      title: 'Injury Recovery & Player Care',
      description: 'Talk about injury prevention, recovery tips, and player health.',
      replies: 4,
      avatar: '/images/avatars/user3.jpg'
    },
    {
      id: 4,
      author: 'Rējní Edwards',
      title: 'Players Needed for Our Team',
      description: 'Post trial details, required positions, and team information.',
      replies: 4,
      avatar: '/images/avatars/user4.jpg'
    },
    {
      id: 5,
      author: 'Rējní Edwards',
      title: "Women's Football Event Announcements",
      description: 'Share upcoming tournaments, trials, friendly matches, or events.',
      replies: 4,
      avatar: '/images/avatars/user5.jpg'
    },
    {
      id: 6,
      author: 'Rējní Edwards',
      title: 'Club Management & Team Building',
      description: 'Discuss team management, scheduling, and player development.',
      replies: 4,
      avatar: '/images/avatars/user6.jpg'
    },
    {
      id: 7,
      author: 'Rējní Edwards',
      title: 'Physio, Fitness & Nutrition Support',
      description: 'Offer physiotherapy, fitness training, and nutrition services.',
      replies: 4,
      avatar: '/images/avatars/user7.jpg'
    },
    {
      id: 8,
      author: 'Rējní Edwards',
      title: 'Women in Football – Stories & Inspiration',
      description: 'Share journeys, success stories, and motivation for women in football.',
      replies: 4,
      avatar: '/images/avatars/user8.jpg'
    },
    {
      id: 9,
      author: 'Rējní Edwards',
      title: 'Challenges Faced by Women Footballers',
      description: 'Discuss common challenges and support each other with solutions.',
      replies: 4,
      avatar: '/images/avatars/user9.jpg'
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <Container>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <SectionHeader
            title="Community Forum"
            description="Connect, chat and support each other."
            align="left"
          />
          
          {/* Login/Post Button */}
          <Button
            variant="primary"
            className="rounded-md"
            onClick={() => setIsLoggedIn(!isLoggedIn)}
          >
            {isLoggedIn ? 'Post a thread' : 'Log in To Post'}
          </Button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Categories */}
          <div className="lg:col-span-1">
            <CategorySidebar
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          {/* Main Content - Forum Topics */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {topics.map((topic) => (
                <ForumTopicCard
                  key={topic.id}
                  topic={topic}
                  isLoggedIn={isLoggedIn}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              page={currentPage}
              total={10}
              onChange={setCurrentPage}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CommunityView;