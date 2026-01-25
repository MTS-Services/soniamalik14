import React from 'react';
import Card from '../../../../components/ui/Card';
import Button from '../../../../components/ui/Button';
import { MapPin, Calendar, Clock, Lock } from 'lucide-react';

const DiscoverCard = ({ item }) => {
  return (
    <Card className="p-4 h-full flex flex-col justify-between" hover>
      <div>
        <div className="relative">
          <div className="absolute top-0 left-0 m-3 bg-white/90 text-teal-600 rounded-full px-3 py-1 text-xs font-semibold">{item.type}</div>
          <div className="h-53 bg-gray-200 rounded-md mb-4 overflow-hidden flex items-center justify-center">
            {item.image ? (
              <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-md" />
            ) : (
              <div className="text-gray-400">Image</div>
            )}
          </div>
        </div>

        <h3 className="text-cardTitle font-semibold text-lg mb-2">{item.title}</h3>

        <div className="text-sm text-gray-600 mb-1 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-sm">{item.location}</span>
        </div>

        <div className="text-sm text-gray-600 mb-3 flex items-center gap-4">
          <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-gray-500" /> <span className="text-sm">{item.day}</span></div>
          <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-gray-500" /> <span className="text-sm">{item.time}</span></div>
        </div>

        <div className="bg-secondary rounded-md p-4 text-center text-sm text-gray-600 mb-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-gray-500" />
            <span className="font-medium">Login to see contact details & ability requirements</span>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <Button variant="primary" className="w-full rounded-full">Login to view</Button>
      </div>
    </Card>
  );
};

export default DiscoverCard;
