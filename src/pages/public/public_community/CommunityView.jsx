import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import CategorySidebar from './components/CategorySidebar';
import ForumTopicCard from './components/ForumTopicCard';
import ShareExperienceModal from './components/ShareExperienceModal';
import Button from '../../../components/ui/Button';
import Pagination from '../../../components/ui/Pagination';
import Container from '../../../components/layout/Container';
import SectionHeader from '../../../components/ui/SectionHeader';

const CommunityView = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All Discussion');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeSport, setActiveSport] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);

  const sports = ['All', 'Football', 'Netball', 'Padel', 'Squash', 'Cricket', 'Multi-Sport', 'Not sport-specific'];

  const handleShareExperience = (formData) => {
    // Handle the form submission
    console.log('New thread created:', formData);
    // You can add API call here to save the thread
  };

  // Sample forum topics data
  const topics = [
    {
      id: 1,
      author: 'Ralph Edwards',
      title: 'Training Tips & Daily Practice',
      description: 'Discuss drills, fitness routines, and match-day preparation.',
      replies: 4,
      avatar: '/images/avatars/user1.jpg'
    },
    {
      id: 2,
      author: 'Ralph Edwards',
      title: 'Match Experience & Learnings',
      description: 'Share match stories, key moments, and lessons learned on the field.',
      replies: 4,
      avatar: '/images/avatars/user2.jpg'
    },
    {
      id: 3,
      author: 'Ralph Edwards',
      title: 'Injury Recovery & Player Care',
      description: 'Talk about injury prevention, recovery tips, and player health.',
      replies: 4,
      avatar: '/images/avatars/user3.jpg'
    },
    {
      id: 4,
      author: 'Ralph Edwards',
      title: 'Players Needed for Our Team',
      description: 'Post trial details, required positions, and team information.',
      replies: 4,
      avatar: '/images/avatars/user4.jpg'
    },
    {
      id: 5,
      author: 'Ralph Edwards',
      title: "Women's Football Event Announcements",
      description: 'Share upcoming tournaments, trials, friendly matches, or events.',
      replies: 4,
      avatar: '/images/avatars/user5.jpg'
    },
    {
      id: 6,
      author: 'Ralph Edwards',
      title: 'Club Management & Team Building',
      description: 'Discuss team management, scheduling, and player development.',
      replies: 4,
      avatar: '/images/avatars/user6.jpg'
    },
    {
      id: 7,
      author: 'Ralph Edwards',
      title: 'Physio, Fitness & Nutrition Support',
      description: 'Offer physiotherapy, fitness training, and nutrition services.',
      replies: 4,
      avatar: '/images/avatars/user7.jpg'
    },
    {
      id: 8,
      author: 'Ralph Edwards',
      title: 'Women in Football â€“ Stories & Inspiration',
      description: 'Share journeys, success stories, and motivation for women in football.',
      replies: 4,
      avatar: '/images/avatars/user8.jpg'
    },
    {
      id: 9,
      author: 'Ralph Edwards',
      title: 'Challenges Faced by Women Footballers',
      description: 'Discuss common challenges and support each other with solutions.',
      replies: 4,
      avatar: '/images/avatars/user9.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6 lg:py-8">
      <Container>
        {/* Header */}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 lg:gap-6">
          {/* Left Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="hidden lg:block sticky top-46">
              <CategorySidebar
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>
          </div>

          {/* Main Content - Forum Topics */}
          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 ">
              <SectionHeader
                title="ESSA Community"
                className='text-3xl'
                align="left"
              />

              {/* Login/Post Button */}
              <Button
                variant="primary"
                className="rounded-md mt-4 sm:mt-0 w-full sm:w-auto"
                onClick={() => (isAuthenticated ? setShowShareModal(true) : navigate('/signin'))}
              >
                {isAuthenticated ? 'Ask Or Share' : 'Log in To Post'}
              </Button>
            </div>

            {/* Filter & Search Section - Show only when logged in */}
            {isAuthenticated && (
              <div className=" mb-6">
                {/* Sport Filter Buttons */}
                <div className="flex flex-wrap gap-2 md:gap-4 mb-4">
                  {sports.map((sport) => (
                    <button
                      key={sport}
                      onClick={() => setActiveSport(sport)}
                      className={`px-4 py-2 rounded-lg text-base font-medium transition-colors ${activeSport === sport
                        ? 'bg-btn-primary text-white'
                        : 'bg-[#91C0BC] text-[#242424] '
                        }`}
                    >
                      {sport}
                    </button>
                  ))}
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for anything..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pl-4 pr-10 rounded-lg bg-white border border-gray-200 outline-none focus:ring-2 focus:ring-btn-primary focus:border-transparent"
                  />
                  <svg
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            )}

            <div className="space-y-2 lg:space-y-4">
              {topics.map((topic) => (
                <ForumTopicCard
                  key={topic.id}
                  topic={topic}
                  isLoggedIn={isAuthenticated}
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

      {/* Share Experience Modal */}
      <ShareExperienceModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        onSubmit={handleShareExperience}
      />
    </div>
  );
};

export default CommunityView;