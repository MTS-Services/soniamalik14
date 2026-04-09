import React from 'react';
import { Bookmark } from 'lucide-react';

const Saved = () => {
  const savedItems = [
    { id: 1, title: 'Beginner Yoga Course', category: 'Course', date: 'Saved 2 days ago' },
    { id: 2, title: 'Mountain Biking Event', category: 'Event', date: 'Saved 1 week ago' },
    { id: 3, title: 'Personal Training Session', category: 'Service', date: 'Saved 3 days ago' },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Bookmark className="w-8 h-8 text-btn-primary" />
        <h1 className="text-3xl font-bold">Saved</h1>
      </div>

      <div className="bg-white rounded-lg shadow space-y-4">
        {savedItems.map((item) => (
          <div key={item.id} className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-900">{item.title}</h3>
              <p className="text-gray-600 text-sm mt-1">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">{item.category}</span>
              </p>
              <p className="text-gray-400 text-xs mt-2">{item.date}</p>
            </div>
            <Bookmark className="w-5 h-5 text-btn-primary fill-btn-primary" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Saved;
