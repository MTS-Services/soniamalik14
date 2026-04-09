import React from 'react';
import { Users } from 'lucide-react';

const Community = () => {
  const communities = [
    { id: 1, name: 'Sports Enthusiasts', members: 1250, joined: true },
    { id: 2, name: 'Fitness Lovers', members: 2100, joined: true },
    { id: 3, name: 'Marathon Runners', members: 890, joined: false },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-8 h-8 text-btn-primary" />
        <h1 className="text-3xl font-bold">Community</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities.map((community) => (
          <div key={community.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{community.name}</h3>
            <p className="text-gray-600 mb-4">{community.members} members</p>
            <button
              className={`w-full px-4 py-2 rounded-md font-medium transition ${
                community.joined
                  ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  : 'bg-btn-primary text-white hover:opacity-90'
              }`}
            >
              {community.joined ? 'Joined' : 'Join'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
