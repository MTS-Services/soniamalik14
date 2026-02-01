import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../../components/ui/Card';
import Button from '../../../../components/ui/Button';
import { MapPin, Calendar, Clock, Lock } from 'lucide-react';
import { useAuth } from '../../../../context/AuthContext';

const DiscoverCard = ({ item }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Card className="p-4 h-full flex flex-col justify-between" hover>
      <div>
        <div className="relative">
          <div className="absolute top-0 left-0 m-3 bg-secondary text-btn-primary rounded-full px-3 py-2 text-sm font-semibold">{item.type}</div>
          <div className="h-64 bg-gray-200 rounded-md mb-4 overflow-hidden flex items-center justify-center">
            {item.image ? (
              <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-md" />
            ) : (
              <div className="text-gray-400">Image</div>
            )}
          </div>
        </div>

        <h3 className="text-[#282828] font-semibold text-lg mb-2">{item.title}</h3>

        <div className="text-sm text-[#363636] mb-1 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#363636]" />
          <span className="text-sm">{item.location}</span>
        </div>

        <div className="text-sm text-[#363636] mb-3 flex items-start gap-2 flex-col">
          <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#363636]" /> <span className="text-sm">{item.day}</span></div>
          <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#363636]" /> <span className="text-sm">{item.time}</span></div>
        </div>

        {!isAuthenticated && (
          <div className="bg-secondary rounded-md p-4 text-center text-sm mb-3">
            <div className="flex flex-col items-center justify-center gap-2">
              <Lock className="w-6 h-6 text-[#0B544E]" />
              <span className="font-medium text-cardTitle">Login to see contact details & ability requirements</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-2">
        {!isAuthenticated ? (
          <Link to="/signin">
            <Button variant="primary" className="w-full rounded-full bg-btn-primary text-white hover:bg-[#0d655d]">
              Login to view
            </Button>
          </Link>
        ) : (
          <Link to={`/discover/${item.type}/${item.id}`} state={{ item }}>
            <Button variant="primary" className="w-full rounded-full bg-btn-primary text-white hover:bg-[#0d655d]">
              View Details
            </Button>
          </Link>
        )}
      </div>
    </Card>
  );
};

export default DiscoverCard;
