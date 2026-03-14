import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import CategorySidebar from './components/CategorySidebar';
import ForumTopicCard from './components/ForumTopicCard';
import ShareExperienceModal from './components/ShareExperienceModal';
import Button from '../../../components/ui/Button';
import Pagination from '../../../components/ui/Pagination';
import Container from '../../../components/layout/Container';

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
    console.log('New thread created:', formData);
  };

  // Dynamic configuration for Header & Button based on active category
  const headerConfig = {
    'All Discussion': {
      title: 'ESSA Community',
      buttonText: 'Ask Or Share',
      titleClass: 'text-[32px] font-bold text-[#1A1D1F]',
    },
    'Stories & Experiences': {
      title: 'A space to share moments, reflections and stories from your time in sport.',
      buttonText: 'Share an Experience',
      titleClass: 'text-[18px] lg:text-[20px] font-medium text-[#1A1D1F] max-w-2xl leading-relaxed',
    },
    'Questions & Advice': {
      title: "Ask for advice, reassurance, or perspectives from others who've been there.",
      buttonText: 'Question',
      titleClass: 'text-[18px] lg:text-[20px] font-medium text-[#1A1D1F] max-w-2xl leading-relaxed',
    },
    'Match & event support': {
      title: 'Need a last-minute sub, referee, or extra help for a match or event? Post here for short-term support from the community.',
      buttonText: 'Add Post',
      titleClass: 'text-[18px] lg:text-[20px] font-medium text-[#1A1D1F] max-w-3xl leading-relaxed',
    }
  };

  // Fallback to 'All Discussion' if category doesn't match perfectly
  const currentHeader = headerConfig[activeCategory] || headerConfig['All Discussion'];

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
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6 lg:py-8">
      <Container>
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

          {/* Main Content */}
          <div className="lg:col-span-3">
            
            {/* Dynamic Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
              <div className={currentHeader.titleClass}>
                {currentHeader.title}
              </div>

              <Button
                variant="primary"
                className="rounded-md w-full sm:w-auto shrink-0 bg-[#147B6B] hover:bg-[#0D655D] text-white px-6 py-2.5 font-medium transition-colors"
                onClick={() => (isAuthenticated ? setShowShareModal(true) : navigate('/signin'))}
              >
                {isAuthenticated ? currentHeader.buttonText : 'Log in To Post'}
              </Button>
            </div>

            {/* Filter & Search Section */}
            {isAuthenticated && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 md:gap-4 mb-4">
                  {sports.map((sport) => (
                    <button
                      key={sport}
                      onClick={() => setActiveSport(sport)}
                      className={`px-4 py-2 rounded-lg text-sm md:text-base font-medium transition-colors ${
                        activeSport === sport
                          ? 'bg-[#147B6B] text-white'
                          : 'bg-[#91C0BC] text-[#242424] hover:bg-[#7db0ac]'
                      }`}
                    >
                      {sport}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for anything..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pl-4 pr-10 rounded-lg bg-white border border-gray-200 outline-none focus:ring-2 focus:ring-[#147B6B] focus:border-transparent text-[15px]"
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

            <div className="space-y-2 lg:space-y-4 mb-8">
              {topics.map((topic) => (
                <ForumTopicCard
                  key={topic.id}
                  topic={topic}
                  isLoggedIn={isAuthenticated}
                />
              ))}
            </div>

            <Pagination
              page={currentPage}
              total={10}
              onChange={setCurrentPage}
            />
          </div>
        </div>
      </Container>

      <ShareExperienceModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        onSubmit={handleShareExperience}
      />
    </div>
  );
};

export default CommunityView;