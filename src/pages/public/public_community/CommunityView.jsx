import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import CategorySidebar from './components/CategorySidebar';
import ForumTopicCard from './components/ForumTopicCard';
import StartADiscussion from './components/StartADiscussion';
import ShareAnExperienceModal from './components/ShareAnExperienceModal';
import AskAQuestionModal from './components/AskAQuestionModal';
import AddPostModal from './components/AddPostModal';
import Button from '../../../components/ui/Button';
import Pagination from '../../../components/ui/Pagination';
import Container from '../../../components/layout/Container';
import PageHeader from '../../../components/ui/PageHeader';

const CommunityView = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All posts');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeSport, setActiveSport] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  const sports = [
    'All',
    'Football',
    'Netball',
    'Padel',
    'Squash',
    'Cricket',
    'Multi-Sport',
    'Not sport-specific',
  ];
  const itemsPerPage = 6;
  const subheadingTextClass = 'text-base md:text-lg text-[#585858] leading-relaxed';

  const handleShareExperience = (formData) => {
    console.log('New thread created:', formData);
  };

  const handleOpenModal = () => {
    if (isAuthenticated) {
      setShowModal(true);
    } else {
      navigate('/signin');
    }
  };

  // Dynamic configuration for Header & Button based on active category
  const headerConfig = {
    'All posts': {
      title: 'ESSA Community',
      buttonText: 'Ask Or Share',
      titleClass: 'text-[32px] font-bold text-[#0B544E]',
    },
    'Stories & Experiences': {
      title: 'A space to share moments, reflections and stories from your time in sport.',
      buttonText: 'Share an Experience',
      titleClass: `${subheadingTextClass} max-w-2xl`,
    },
    'Questions & Advice': {
      title: "Ask for advice, reassurance, or perspectives from others who've been there.",
      buttonText: 'Question',
      titleClass: `${subheadingTextClass} max-w-2xl`,
    },
    'Match & event support': {
      title:
        'Need a last-minute sub, referee, or extra help for a match or event? Post here for short-term support from the community.',
      buttonText: 'Add Post',
      titleClass: `${subheadingTextClass} max-w-3xl`,
    },
  };

  // Fallback to the community overview if category doesn't match perfectly
  const currentHeader = headerConfig[activeCategory] || headerConfig['All posts'];

  const topics = [
    {
      id: 1,
      author: 'Ralph Edwards',
      title: 'Training Tips & Daily Practice',
      description: 'Discuss drills, fitness routines, and match-day preparation.',
      replies: 4,
      avatar: '/images/avatars/user1.jpg',
    },
    {
      id: 2,
      author: 'Ralph Edwards',
      title: 'Match Experience & Learnings',
      description: 'Share match stories, key moments, and lessons learned on the field.',
      replies: 4,
      avatar: '/images/avatars/user2.jpg',
    },
    {
      id: 3,
      author: 'Ralph Edwards',
      title: 'Injury Recovery & Player Care',
      description: 'Talk about injury prevention, recovery tips, and player health.',
      replies: 4,
      avatar: '/images/avatars/user3.jpg',
    },
    {
      id: 4,
      author: 'Ralph Edwards',
      title: 'Players Needed for Our Team',
      description: 'Post trial details, required positions, and team information.',
      replies: 4,
      avatar: '/images/avatars/user4.jpg',
    },
    {
      id: 5,
      author: 'Ralph Edwards',
      title: "Women's Football Event Announcements",
      description: 'Share upcoming tournaments, trials, friendly matches, or events.',
      replies: 4,
      avatar: '/images/avatars/user5.jpg',
    },
    {
      id: 6,
      author: 'Ralph Edwards',
      title: 'Club Management & Team Building',
      description: 'Discuss team management, scheduling, and player development.',
      replies: 4,
      avatar: '/images/avatars/user6.jpg',
    },
    {
      id: 7,
      author: 'Ralph Edwards',
      title: 'Physio, Fitness & Nutrition Support',
      description: 'Offer physiotherapy, fitness training, and nutrition services.',
      replies: 4,
      avatar: '/images/avatars/user7.jpg',
    },
    {
      id: 8,
      author: 'Ralph Edwards',
      title: 'Women in Football – Stories & Inspiration',
      description: 'Share journeys, success stories, and motivation for women in football.',
      replies: 4,
      avatar: '/images/avatars/user8.jpg',
    },
    {
      id: 9,
      author: 'Ralph Edwards',
      title: 'Challenges Faced by Women Footballers',
      description: 'Discuss common challenges and support each other with solutions.',
      replies: 4,
      avatar: '/images/avatars/user9.jpg',
    },
    {
      id: 10,
      author: 'Ralph Edwards',
      title: 'Mental Health & Wellbeing',
      description: 'Discuss mental strength, dealing with pressure, and player wellness.',
      replies: 4,
      avatar: '/images/avatars/user10.jpg',
    },
    {
      id: 11,
      author: 'Ralph Edwards',
      title: 'Sponsorship & Funding Opportunities',
      description: 'Share information about sponsorships, grants, and funding for clubs.',
      replies: 4,
      avatar: '/images/avatars/user11.jpg',
    },
    {
      id: 12,
      author: 'Ralph Edwards',
      title: 'Youth Development Programs',
      description: 'Discuss grassroots development and youth engagement in sports.',
      replies: 4,
      avatar: '/images/avatars/user12.jpg',
    },
  ].map((topic) => ({ ...topic, titleColor: '#0B544E' }));

  // Calculate pagination
  const totalPages = Math.ceil(topics.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTopics = topics.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-6 lg:py-10">
      <Container>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-4 lg:gap-6">
          {/* Left Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="sticky top-46 hidden lg:block">
              <CategorySidebar
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Mobile Title - Above Dropdown (Mobile Only) */}
            <div className="mb-4 lg:hidden">
              <PageHeader
                title="ESSA Community"
                description={
                  activeCategory === 'All posts'
                    ? 'Browse all conversations across the community - from questions to shared experiences.'
                    : activeCategory === 'Stories & Experiences'
                    ? 'A space to share moments, reflections and stories from your time in sport.'
                    : activeCategory === 'Questions & Advice'
                    ? 
                      "Ask for advice, reassurance, or perspectives from others who've been there."
                    : activeCategory === 'Match & event support'
                    ? 'Need a last-minute sub, referee, or extra help for a match or event? Post here for short-term support from the community.'
                    : ''
                }
              />
            </div>

            {/* Mobile Category Dropdown */}
            <div className="mb-6 lg:hidden">
              <select
                value={activeCategory}
                onChange={(e) => {
                  setActiveCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 font-medium text-[#1A1D1F] focus:border-transparent focus:ring-2 focus:ring-[#147B6B] focus:outline-none"
              >
                <option value="All posts">All posts</option>
                <option value="Stories & Experiences">Stories & Experiences</option>
                <option value="Questions & Advice">Questions & Advice</option>
                <option value="Match & event support">Match & event support</option>
              </select>
            </div>

            {/* Mobile Button (Mobile Only) */}
            <div className="mb-6 lg:hidden">
              <Button
                variant="primary"
                className="w-full rounded-md bg-[#147B6B] px-6 py-3 font-medium text-white transition-colors hover:bg-[#0D655D]"
                onClick={handleOpenModal}
              >
                {isAuthenticated ? 'Ask Or Share' : 'Log in To Post'}
              </Button>
            </div>

            {/* Dynamic Header Section */}
            <div className="mb-6 hidden flex-col items-start justify-between gap-4 sm:flex-row lg:flex">
              <div>
                {/* Always show the ESSA Community title */}
                <div className="text-[32px] font-bold text-[#0B544E]">ESSA Community</div>
                {/* Show dynamic subheading/description for each category */}
                {activeCategory === 'All posts' && (
                  <p className={`${subheadingTextClass} mt-1 md:mt-2.5 max-w-3xl`}>
                    Browse all conversations across the community - from questions to shared experiences.
                  </p>
                )}
                {activeCategory === 'Stories & Experiences' && (
                  <p className={`${subheadingTextClass} mt-1 md:mt-2.5 max-w-2xl`}>
                    A space to share moments, reflections and stories from your time in sport.
                  </p>
                )}
                {activeCategory === 'Questions & Advice' && (
                  <p className={`${subheadingTextClass} mt-1 md:mt-2.5 max-w-2xl`}>
                    Ask for advice, reassurance, or perspectives from others who've been there.
                  </p>
                )}
                {activeCategory === 'Match & event support' && (
                  <p className={`${subheadingTextClass} mt-1 md:mt-2.5 max-w-3xl`}>
                    Need a last-minute sub, referee, or extra help for a match or event? Post here for short-term support from the community.
                  </p>
                )}
              </div>

              <Button
                variant="primary"
                className="w-full shrink-0 rounded-md bg-[#147B6B] px-6 py-2.5 font-medium text-white transition-colors hover:bg-[#0D655D] sm:w-auto"
                onClick={handleOpenModal}
              >
                {isAuthenticated ? currentHeader.buttonText : 'Log in To Post'}
              </Button>
            </div>

            {/* Filter & Search Section */}
            {isAuthenticated && (
              <div className="mb-6">
                <div className="mb-4 flex flex-wrap gap-2 md:gap-4">
                  {sports.map((sport) => (
                    <button
                      key={sport}
                      onClick={() => setActiveSport(sport)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors md:text-base ${
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
                    placeholder=" Search topics, questions or keywords"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 pr-10 pl-4 text-[15px] outline-none focus:border-transparent focus:ring-2 focus:ring-[#147B6B]"
                  />
                  <svg
                    className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400"
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

            <div className="mb-8 space-y-2 lg:space-y-4">
              {paginatedTopics.map((topic) => (
                <ForumTopicCard key={topic.id} topic={topic} isLoggedIn={isAuthenticated} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination page={currentPage} total={totalPages} onChange={setCurrentPage} />
            )}
          </div>
        </div>
      </Container>

      <StartADiscussion
        isOpen={showModal && activeCategory === 'All posts'}
        onClose={() => setShowModal(false)}
        onSubmit={handleShareExperience}
      />

      <ShareAnExperienceModal
        isOpen={showModal && activeCategory === 'Stories & Experiences'}
        onClose={() => setShowModal(false)}
        onSubmit={handleShareExperience}
      />

      <AskAQuestionModal
        isOpen={showModal && activeCategory === 'Questions & Advice'}
        onClose={() => setShowModal(false)}
        onSubmit={handleShareExperience}
      />

      <AddPostModal
        isOpen={showModal && activeCategory === 'Match & event support'}
        onClose={() => setShowModal(false)}
        onSubmit={handleShareExperience}
      />
    </div>
  );
};

export default CommunityView;
