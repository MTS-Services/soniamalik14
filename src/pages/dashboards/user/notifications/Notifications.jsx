import React from 'react';
import { Bell } from 'lucide-react';

const Notifications = () => {
  const notifications = [
    { id: 1, title: 'Order Confirmed', message: 'Your order has been confirmed', time: '2 hours ago' },
    { id: 2, title: 'Payment Received', message: 'Payment of $100 has been received', time: '5 hours ago' },
    { id: 3, title: 'New Event', message: 'A new event has been added', time: '1 day ago' },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Bell className="w-8 h-8 text-btn-primary" />
        <h1 className="text-3xl font-bold">Notifications</h1>
      </div>

      <div className="bg-white rounded-lg shadow space-y-4">
        {notifications.map((notif) => (
          <div key={notif.id} className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition">
            <h3 className="font-semibold text-gray-900">{notif.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{notif.message}</p>
            <p className="text-gray-400 text-xs mt-2">{notif.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
