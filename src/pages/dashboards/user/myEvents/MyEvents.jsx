import React from 'react';
import { Calendar } from 'lucide-react';

const MyEvents = () => {
  const events = [
    { id: 1, title: 'Summer Sports Camp', date: '2026-06-15', status: 'Upcoming' },
    { id: 2, title: 'Basketball Tournament', date: '2026-05-20', status: 'Upcoming' },
    { id: 3, title: 'Yoga Session', date: '2026-04-12', status: 'Completed' },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-8 h-8 text-btn-primary" />
        <h1 className="text-3xl font-bold">My Events</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Event Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-gray-900">{event.title}</td>
                <td className="px-6 py-4 text-gray-600">{event.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    event.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {event.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEvents;
