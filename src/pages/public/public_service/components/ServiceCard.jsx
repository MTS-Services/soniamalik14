import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../../components/ui/Card';
import Button from '../../../../components/ui/Button';
import { MapPin, Calendar, Clock, Lock } from 'lucide-react';
import { useAuth } from '../../../../context/AuthContext';

const ServiceCard = ({ item }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Card className="p-4 h-full flex flex-col justify-between" style={{ backgroundColor: '#E7F1F180' }}>
      <div>
        <div className="relative">
          <div className="absolute top-0 left-0 m-3 bg-secondary text-btn-primary rounded-full px-3 py-2 text-base font-semibold">{item.type}</div>
          <div className="h-64 bg-gray-200 rounded-md mb-4 overflow-hidden flex items-center justify-center">
            {item.image ? (
              <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-md" />
            ) : (
              <div className="text-gray-400">Image</div>
            )}
          </div>
        </div>

        <h3 className="text-[#282828] font-semibold text-lg mb-2">{item.title}</h3>

        <div className="text-base text-[#363636] mb-1 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#363636]" />
          <span className="text-base">{item.location}</span>
        </div>

        <div className="text-base text-[#363636] mb-3 flex items-start gap-2 flex-col">
          <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#363636]" /> <span className="text-base">{item.day}</span></div>
          <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#363636]" /> <span className="text-base">{item.time}</span></div>
        </div>

        {!isAuthenticated && (
          <div className="bg-[#E7F1F1] rounded-lg p-6 text-center mb-4">
            <div className="flex flex-col items-center justify-center gap-3">
              <Lock className="w-6 h-6 text-emerald-700" />
              <span className="font-medium text-[#0B2F2C]">Login to see contact details & ability requirements</span>
              <Link to="/signin" className="w-full">
                <Button variant="primary" className="mx-auto mt-3 w-4/5 rounded-lg bg-btn-primary text-white hover:bg-[#0d655d]">
                  Login to view
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="mt-2">
        {isAuthenticated ? (
          <Link to={`/services/${item.id}`} state={{ item }}>
            <Button variant="primary" className="w-full rounded-lg bg-btn-primary text-white hover:bg-[#0d655d]">
              View Details
            </Button>
          </Link>
        ) : null}
      </div>
    </Card>
  );
};

export default ServiceCard;
