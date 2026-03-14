import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../../../components/ui/Card';
import Button from '../../../../components/ui/Button';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { useAuth } from '../../../../context/AuthContext';

const DiscoverCard = ({ item }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleViewDetails = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      navigate(`/discover/${item.type}/${item.id}`, { state: { item } });
    }
  };

  const handleLoginClick = () => {
    setShowLoginModal(false);
    navigate('/signin');
  };

  return (
    <Card
      className="p-5 h-full flex flex-col justify-between border  rounded-2xl"
      style={{ backgroundColor: '#E7F1F180' }}
    >
      <div className="flex-1 flex flex-col">
        <div className="relative">
          <div className="absolute top-3 left-3">
            <span className="bg-white text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">{item.type}</span>
          </div>

          <div className="h-44 sm:h-56 bg-gray-200 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
            {item.image ? (
              <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-lg" />
            ) : (
              <div className="text-gray-400">Image</div>
            )}
          </div>
        </div>

        <h3
          className="text-[#0B2F2C] font-bold text-xl sm:text-2xl mb-3"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {item.title}
        </h3>

        <div className="text-base text-[#1f3a37] mb-2 flex items-center gap-3">
          <MapPin className="w-4 h-4 text-[#1f3a37]" />
          <span className="text-base text-gray-700">{item.location}</span>
        </div>

        <div className="text-base text-[#1f3a37] mb-4 space-y-2">
          <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#1f3a37]" /> <span className="text-base text-gray-700">{item.day}</span></div>
          <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#1f3a37]" /> <span className="text-base text-gray-700">{item.time}</span></div>
        </div>

      </div>

      <Link
        to={isAuthenticated ? `/discover/${item.type}/${item.id}` : '#'}
        onClick={handleViewDetails}
      >
        <Button variant="primary" className="w-full rounded-lg bg-btn-primary text-white hover:bg-[#0d655d]">
          View Details
        </Button>
      </Link>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 shadow-lg">
            <div className="text-center">
              <p className="text-gray-700 text-base mb-6">
                To contact this club or register interest, please log in.
              </p>
              <button
                onClick={handleLoginClick}
                className="w-full bg-btn-primary hover:bg-[#0d655d] text-white font-semibold py-3 px-4 rounded-lg transition"
              >
                Log In
              </button>
              <button
                onClick={() => setShowLoginModal(false)}
                className="w-full text-gray-500 font-semibold py-2 px-4 rounded-lg mt-3 hover:text-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default DiscoverCard;
